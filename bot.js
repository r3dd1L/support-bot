const { Telegraf, Markup } = require('telegraf');
const Database = require('better-sqlite3');
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const db = new Database('support_bot.db');

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY,
    username TEXT,
    first_name TEXT,
    last_name TEXT,
    is_blocked INTEGER DEFAULT 0,
    created_at INTEGER DEFAULT (strftime('%s', 'now'))
  );

  CREATE TABLE IF NOT EXISTS tickets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    topic_id INTEGER,
    is_closed INTEGER DEFAULT 0,
    created_at INTEGER DEFAULT (strftime('%s', 'now')),
    last_activity INTEGER DEFAULT (strftime('%s', 'now')),
    closed_at INTEGER,
    FOREIGN KEY (user_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ticket_id INTEGER,
    from_user INTEGER,
    message_id INTEGER,
    created_at INTEGER DEFAULT (strftime('%s', 'now')),
    FOREIGN KEY (ticket_id) REFERENCES tickets(id)
  );

  CREATE TABLE IF NOT EXISTS config (
    key TEXT PRIMARY KEY,
    value TEXT
  );

  CREATE TABLE IF NOT EXISTS templates (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    command TEXT,
    content TEXT
  );

  CREATE TABLE IF NOT EXISTS auto_replies (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    keyword TEXT,
    content TEXT
  );

  CREATE TABLE IF NOT EXISTS groups (
    id INTEGER PRIMARY KEY,
    title TEXT,
    is_supergroup INTEGER DEFAULT 0,
    has_admin_rights INTEGER DEFAULT 0,
    created_at INTEGER DEFAULT (strftime('%s', 'now'))
  );
`);

// Миграция: добавить колонку last_activity, если она отсутствует
try {
  db.prepare('SELECT last_activity FROM tickets LIMIT 1').get();
} catch (e) {
  if (e.message.includes('no such column: last_activity')) {
    console.log('Миграция: добавляем колонку last_activity в tickets');
    // Сначала добавляем колонку без значения по умолчанию
    db.exec('ALTER TABLE tickets ADD COLUMN last_activity INTEGER');
    // Затем обновляем все строки текущим временем
    const now = Math.floor(Date.now() / 1000);
    db.prepare('UPDATE tickets SET last_activity = ?').run(now);
    console.log('Миграция завершена');
  }
}

const defaultConfig = {
  welcome_message: '👋 Привет! Это техническая поддержка. Напишите ваше сообщение, и мы ответим как можно скорее!',
  ticket_created: '✅ Ваше сообщение отправлено в техническую поддержку. Мы свяжемся с вами в ближайшее время!',
  user_blocked: '❌ Вы заблокированы в боте.',
  maintenance_message: '🔧 Бот на техническом обслуживании. Пожалуйста, попробуйте позже.',
  maintenance_mode: '0',
  auto_close_enabled: '1',
  auto_close_minutes: '15',
  auto_close_message: '⏰ Ваш тикет был автоматически закрыт из-за отсутствия активности. Если у вас возникнут новые вопросы, не стесняйтесь писать!',
  block_text: '0',
  block_photo: '0',
  block_document: '0',
  block_video: '0',
  block_audio: '0',
  block_voice: '0',
  block_video_note: '0',
  block_sticker: '0',
  block_animation: '0',
  antispam_enabled: '1',
  antispam_interval: '3',
  antispam_message: '⏳ Пожалуйста, не спамьте. Попробуйте снова через несколько секунд.',
  selected_support_group_id: null
};

for (const [key, value] of Object.entries(defaultConfig)) {
  try {
    db.prepare('INSERT OR IGNORE INTO config (key, value) VALUES (?, ?)').run(key, value);
  } catch (e) {}
}

const replaceVariables = (text, user) => {
  let processedText = text;
  processedText = processedText.replace(/\{имя\}/gi, user.first_name || '');
  processedText = processedText.replace(/\{фамилия\}/gi, user.last_name || '');
  processedText = processedText.replace(/\{ник\}/gi, user.username ? `@${user.username}` : '');
  processedText = processedText.replace(/\{id\}/gi, user.id ? user.id.toString() : '');
  return processedText;
};

const getConfig = (key) => {
  const row = db.prepare('SELECT value FROM config WHERE key = ?').get(key);
  return row ? row.value : defaultConfig[key];
};

const setConfig = (key, value) => {
  db.prepare('REPLACE INTO config (key, value) VALUES (?, ?)').run(key, value);
};

const getSelectedSupportGroupId = () => {
  const val = getConfig('selected_support_group_id');
  // First, check if we have a config value set
  if (val && val !== 'null') {
    return parseInt(val);
  }
  // Fall back to the environment variable if available
  if (process.env.SUPPORT_GROUP_ID) {
    return parseInt(process.env.SUPPORT_GROUP_ID);
  }
  return null;
};

// Helper function: checks if the bot is ready to work!
const checkBotIsReady = async (ctx) => {
  // Only check these things for admin, and ignore for regular users? Wait no! Wait user request says:
  // Wait user request says:
  // 1. If bot has no groups: show the /admin interface when user (wait no, wait point 1 says: 
  // "Если бот не добавлен ни в одну группу, то при отправке команды /start ему необходимо показывать то же самое интерфейс и набор опций, который выводится при команде /admin."
  // Wait point 1 is only for /start? Or for every command? Let's re-read user's request carefully!
  const groups = db.prepare('SELECT * FROM groups').all();
  const selectedGroupId = getSelectedSupportGroupId();
  const groupsWithAdminRights = groups.filter(g => g.has_admin_rights === 1);

  if (ctx.from.id === parseInt(process.env.ADMIN_USER_ID)) {
    // ADMIN checks!
    if (groups.length === 0) {
      // No groups, show add button!
      const botUsername = (await ctx.telegram.getMe()).username;
      const addButton = Markup.button.url('➕ Добавить в группу', `https://t.me/${botUsername}?startgroup=true`);
      await ctx.reply(
        'Для полноценной работы бота, добавьте его в вашу супер-группу с включенными "топиками" и выдайте боту права администратора.',
        Markup.inlineKeyboard([[addButton]])
      );
      return false;
    } else if (groupsWithAdminRights.length === 0) {
      // Has groups but no admin rights anywhere!
      const buttons = groups.map(g => [
        Markup.button.url(`📋 ${g.title}`, `https://t.me/c/${g.id.toString().slice(4)}/1`)
      ]);
      await ctx.reply(
        'Пожалуйста, выдайте мне права администратора хотя бы в одной группе, чтобы я мог работать!',
        Markup.inlineKeyboard(buttons)
      );
      return false;
    } else if (!selectedGroupId || !groupsWithAdminRights.find(g => g.id === selectedGroupId)) {
      // Multiple groups with admin rights, need to select one!
      const buttons = groupsWithAdminRights.map(group => 
        [Markup.button.callback(
          `${group.title}${selectedGroupId === group.id ? ' ✅' : ''}`, 
          `select_group:${group.id}`
        )]
      );
      await ctx.reply('Выберите основную группу для работы с тикетами:', Markup.inlineKeyboard(buttons));
      return false;
    }
    // All checks passed!
    return true;
  } else {
    // REGULAR USER checks!
    if (!selectedGroupId || groups.length === 0 || groupsWithAdminRights.length === 0) {
      // Bot isn't ready yet, just tell the user we're not ready!
      await ctx.reply('⚠️ Бот еще не готов к работе. Пожалуйста, подождите, пока администратор настроит его!');
      return false;
    }
    return true;
  }
};

// Storage for album media groups
const mediaGroups = new Map();

// Storage for antispam timestamps
const userLastMessageTime = new Map();
// Storage for active media group IDs to skip antispam
const activeMediaGroups = new Set();

// Update ticket last activity
const updateTicketActivity = (ticketId) => {
  db.prepare('UPDATE tickets SET last_activity = strftime(\'%s\', \'now\') WHERE id = ?').run(ticketId);
};

// Auto-reply function
const processAutoReplies = async (ctx, ticket, text) => {
  if (!text) return;
  
  const lowerText = text.toLowerCase();
  const autoReplies = db.prepare('SELECT * FROM auto_replies').all();
  
  for (const reply of autoReplies) {
    if (reply.keyword && lowerText.includes(reply.keyword.toLowerCase())) {
      // Отправляем пользователю
      await sendMessageContent(ctx.chat.id, reply.content, ctx.from);
      
      // Отправляем в топик администраторам, чтобы они видели, что ответил бот
      const groupId = getSelectedSupportGroupId();
      if (groupId && ticket && ticket.topic_id) {
        await bot.telegram.sendMessage(
          groupId,
          `🤖 <b>Сработал автоответ по ключевому слову:</b> <code>${reply.keyword}</code>`,
          { parse_mode: 'HTML', message_thread_id: ticket.topic_id }
        );
        
        try {
          const parsedContent = parseMessageContent(reply.content);
          const replyText = parsedContent.text ? replaceVariables(parsedContent.text, ctx.from) : 'Медиа-сообщение';
          await bot.telegram.sendMessage(
            groupId,
            `Текст ответа:\n${replyText}`,
            { parse_mode: 'HTML', message_thread_id: ticket.topic_id }
          );
        } catch (e) {
          console.error('Error sending auto-reply preview to topic:', e);
        }
      }
      break; // Останавливаемся на первом совпадении
    }
  }
};

const bot = new Telegraf(process.env.BOT_TOKEN);
let botId = null;

bot.telegram.getMe().then(me => {
  botId = me.id;
  // Удаляем бота из базы, если он там есть
  try {
    db.prepare('DELETE FROM users WHERE id = ?').run(me.id);
  } catch (e) {
    console.error('Error deleting bot from users:', e);
  }
});

bot.use(async (ctx, next) => {
  if (ctx.from && !ctx.from.is_bot) {
    try {
      const existingUser = db.prepare('SELECT * FROM users WHERE id = ?').get(ctx.from.id);
      if (!existingUser) {
        db.prepare('INSERT INTO users (id, username, first_name, last_name) VALUES (?, ?, ?, ?)').run(
          ctx.from.id,
          ctx.from.username || '',
          ctx.from.first_name || '',
          ctx.from.last_name || ''
        );
      } else {
        db.prepare('UPDATE users SET username = ?, first_name = ?, last_name = ? WHERE id = ?').run(
          ctx.from.username || '',
          ctx.from.first_name || '',
          ctx.from.last_name || '',
          ctx.from.id
        );
      }
    } catch (e) {
      console.error('Error saving user:', e);
    }
  }
  return next();
});

bot.start(async (ctx) => {
  if (ctx.from.id === parseInt(process.env.ADMIN_USER_ID)) {
    // If ADMIN starts bot, first do checkBotIsReady, and if not ready, it shows the necessary UI!
    const isReady = await checkBotIsReady(ctx);
    if (!isReady) return;
  }

  const maintenanceMode = getConfig('maintenance_mode');
  if (maintenanceMode === '1' && ctx.from.id !== parseInt(process.env.ADMIN_USER_ID)) {
    await sendMessageContent(ctx.chat.id, getConfig('maintenance_message'), ctx.from);
    return;
  }

  const user = db.prepare('SELECT * FROM users WHERE id = ?').get(ctx.from.id);
  if (user && user.is_blocked) {
    await sendMessageContent(ctx.chat.id, getConfig('user_blocked'), ctx.from);
    return;
  }

  await sendMessageContent(ctx.chat.id, getConfig('welcome_message'), ctx.from);
});

bot.command('admin', async (ctx) => {
  if (ctx.from.id !== parseInt(process.env.ADMIN_USER_ID)) return;

  const isReady = await checkBotIsReady(ctx);
  if (!isReady) return;

  // Okay, bot is ready now! Show the webapp via inline button!
  await ctx.reply('📊 Панель администратора', Markup.inlineKeyboard([
    [Markup.button.webApp('⚙️ Настройки', process.env.WEBAPP_URL)]
  ]));
});

const isAdmin = (id) => id === parseInt(process.env.ADMIN_USER_ID);

const parseMessageContent = (content) => {
  try {
    const parsed = JSON.parse(content);
    return parsed;
  } catch (e) {
    return { text: content, type: 'text' };
  }
};

const sendMessageContent = async (chatId, content, user = null) => {
  let processedContent = content;
  
  if (user) {
    const data = parseMessageContent(content);
    if (data.text) {
      data.text = replaceVariables(data.text, user);
    }
    
    // Check if content was JSON string, reconstruct with replaced text
    try {
      const parsed = JSON.parse(content);
      if (parsed.text) {
        parsed.text = replaceVariables(parsed.text, user);
        processedContent = JSON.stringify(parsed);
      }
    } catch (e) {
      // If not JSON, just replace variables in plain text
      if (typeof content === 'string') {
        processedContent = replaceVariables(content, user);
      }
    }
  }
  
  const data = parseMessageContent(processedContent);
  
  let replyMarkup = undefined;
  if (data.buttons && data.buttons.length > 0) {
    const keyboard = data.buttons.map(row => 
      row.filter(btn => btn.text).map(btn => 
        btn.url 
          ? Markup.button.url(btn.text, btn.url) 
          : Markup.button.callback(btn.text, btn.data || btn.text)
      )
    ).filter(row => row.length > 0);
    
    if (keyboard.length > 0) {
      replyMarkup = Markup.inlineKeyboard(keyboard);
    }
  }

  try {
    // Extract the actual reply_markup from Telegraf's Markup object
    const extra = { parse_mode: 'HTML' };
    if (replyMarkup) {
      extra.reply_markup = replyMarkup.reply_markup || replyMarkup;
    }

    if (data.type === 'photo' && data.fileId) {
      extra.caption = data.text;
      return await bot.telegram.sendPhoto(chatId, data.fileId, extra);
    } else if (data.type === 'gif' && data.fileId) {
      extra.caption = data.text;
      return await bot.telegram.sendAnimation(chatId, data.fileId, extra);
    } else if (data.type === 'document' && data.fileId) {
      extra.caption = data.text;
      return await bot.telegram.sendDocument(chatId, data.fileId, extra);
    } else if (data.type === 'video' && data.fileId) {
      extra.caption = data.text;
      return await bot.telegram.sendVideo(chatId, data.fileId, extra);
    } else {
      return await bot.telegram.sendMessage(chatId, data.text || content, extra);
    }
  } catch (e) {
    console.error('Error sending rich message:', e);
    // Fallback to simple text message
    return await bot.telegram.sendMessage(chatId, data.text || content, { parse_mode: 'HTML' });
  }
};

bot.command('close', async (ctx) => {
  if (ctx.chat.type !== 'supergroup' && ctx.chat.type !== 'group') return;

  const topicId = ctx.message.message_thread_id;
  if (!topicId) return;

  const ticket = db.prepare('SELECT * FROM tickets WHERE topic_id = ? AND is_closed = 0').get(topicId);
  if (!ticket) return;

  db.prepare('UPDATE tickets SET is_closed = 1, closed_at = strftime(\'%s\', \'now\') WHERE id = ?').run(ticket.id);

  try {
    const user = db.prepare('SELECT * FROM users WHERE id = ?').get(ticket.user_id);
    if (user) {
      await bot.telegram.sendMessage(user.id, '✅ Ваш тикет был закрыт. Если у вас возникнут новые вопросы, не стесняйтесь писать!');
    }

    // Close the forum topic
    const groupId = getSelectedSupportGroupId();
    if (groupId) {
      await bot.telegram.closeForumTopic(groupId, topicId);
    }
    
    await ctx.reply('✅ Тикет закрыт! Сообщение отправлено пользователю.');
  } catch (e) {
    console.error('Error closing ticket:', e);
  }
});

bot.on('callback_query', async (ctx) => {
  const data = ctx.callbackQuery.data;
  if (!data) return;

  if (!isAdmin(ctx.from.id)) {
    await ctx.answerCbQuery('❌ Нет прав для выполнения этого действия');
    return;
  }

  if (data.startsWith('block_user:')) {
    const userId = parseInt(data.split(':')[1]);
    const user = db.prepare('SELECT * FROM users WHERE id = ?').get(userId);
    
    if (!user) {
      await ctx.answerCbQuery('❌ Пользователь не найден');
      return;
    }

    // Determine new state and button text FIRST
    const newIsBlocked = user.is_blocked ? 0 : 1;
    const buttonText = user.is_blocked ? 'Заблокировать' : 'Разблокировать';
    const feedbackText = user.is_blocked ? 'заблокирован' : 'разблокирован';

    // Then update user
    db.prepare('UPDATE users SET is_blocked = ? WHERE id = ?').run(newIsBlocked, userId);
    
    await ctx.answerCbQuery(`✅ Пользователь ${feedbackText}`);
    const updatedKeyboard = Markup.inlineKeyboard([
      [
        Markup.button.url('Открыть чат', `tg://user?id=${userId}`),
        Markup.button.callback(buttonText, `block_user:${userId}`)
      ]
    ]);
    
    try {
      await ctx.editMessageReplyMarkup(updatedKeyboard.reply_markup || updatedKeyboard);
    } catch (e) {
      // Ignore "message not modified" error
      if (!e.message.includes('message is not modified')) {
        throw e;
      }
    }
  } else if (data.startsWith('select_group:')) {
    const groupId = parseInt(data.split(':')[1]);
    // Update config!
    setConfig('selected_support_group_id', groupId.toString());
    // Update the buttons!
    const groups = db.prepare('SELECT * FROM groups').all();
    const buttons = groups.map(group => 
      [Markup.button.callback(
        `${group.title}${groupId === group.id ? ' ✅' : ''}`, 
        `select_group:${group.id}`
      )]
    );
    await ctx.editMessageReplyMarkup(Markup.inlineKeyboard(buttons).reply_markup || Markup.inlineKeyboard(buttons));
    await ctx.answerCbQuery('✅ Группа выбрана!');
    // Send webapp button!
    await ctx.reply('📊 Панель администратора', Markup.keyboard([
      [Markup.button.webApp('⚙️ Настройки', process.env.WEBAPP_URL)]
    ]).resize());
  }
});

// Handler for when bot is added/removed from a chat!
bot.on('my_chat_member', async (ctx) => {
  const chat = ctx.myChatMember.chat;
  const oldStatus = ctx.myChatMember.old_chat_member.status;
  const newStatus = ctx.myChatMember.new_chat_member.status;

  if (chat.type === 'supergroup' || chat.type === 'group') {
    // Check if bot was added!
    if (newStatus === 'administrator' || newStatus === 'member') {
      // Add group to database!
      const existingGroup = db.prepare('SELECT * FROM groups WHERE id = ?').get(chat.id);
      const isSupergroup = chat.type === 'supergroup' ? 1 : 0;
      const hasAdminRights = newStatus === 'administrator' ? 1 : 0;
      if (!existingGroup) {
        db.prepare('INSERT INTO groups (id, title, is_supergroup, has_admin_rights) VALUES (?, ?, ?, ?)').run(
          chat.id, chat.title, isSupergroup, hasAdminRights
        );
      } else {
        db.prepare('UPDATE groups SET title = ?, is_supergroup = ?, has_admin_rights = ? WHERE id = ?').run(
          chat.title, isSupergroup, hasAdminRights, chat.id
        );
      }

      // If we don't have a selected group yet, select this one!
      const selectedGroupId = getSelectedSupportGroupId();
      if (!selectedGroupId) {
        setConfig('selected_support_group_id', chat.id.toString());
      }

      // If bot doesn't have admin rights yet, send a message!
      if (!hasAdminRights) {
        await ctx.reply(
          'Пожалуйста, выдайте мне права администратора для работы с топиками и сообщениями!'
        );
      } else {
        await ctx.reply('Отлично! Я готов к работе!');
      }

    } else if (newStatus === 'left' || newStatus === 'kicked') {
      // Remove from database!
      db.prepare('DELETE FROM groups WHERE id = ?').run(chat.id);
      // If this was the selected group, clear the config!
      const selectedGroupId = getSelectedSupportGroupId();
      if (selectedGroupId === chat.id) {
        setConfig('selected_support_group_id', null);
      }
    }
  }
});

// Handler for when admin rights change!
bot.on('chat_member', async (ctx) => {
  const chat = ctx.chatMember.chat;
  const newMember = ctx.chatMember.new_chat_member;
  // Only care if this is about our bot!
  const me = await ctx.telegram.getMe();
  if (newMember.user.id !== me.id) return;

  const hasAdminRights = newMember.status === 'administrator' ? 1 : 0;
  // Update database!
  db.prepare('UPDATE groups SET has_admin_rights = ? WHERE id = ?').run(hasAdminRights, chat.id);

  if (hasAdminRights) {
    await ctx.reply('Спасибо! Теперь у меня есть права администратора и я могу работать с топиками!');
  } else {
    await ctx.reply('Я потерял права администратора! Пожалуйста, верните их, чтобы я мог корректно работать!');
  }
});

// Storage for admin media groups
const adminMediaGroups = new Map();

bot.on('message', async (ctx) => {
  const maintenanceMode = getConfig('maintenance_mode');

  // Handle group messages first
  if (ctx.chat.type === 'supergroup' || ctx.chat.type === 'group') {
    // Check for /close command first
    if (ctx.message.text && ctx.message.text.trim() === '/close') {
      // Command will be handled by separate handler
      return;
    }
    
    // Check for template commands first
    if (ctx.message.text && ctx.message.text.startsWith('/')) {
      const commandName = ctx.message.text.slice(1).split(' ')[0];
      const template = db.prepare('SELECT * FROM templates WHERE command = ?').get(commandName);
      
      if (template && isAdmin(ctx.from.id)) {
        // Check if we're in a topic with an open ticket
        const topicId = ctx.message.message_thread_id;
        if (topicId) {
          const ticket = db.prepare('SELECT * FROM tickets WHERE topic_id = ? AND is_closed = 0').get(topicId);
          if (ticket) {
            const user = db.prepare('SELECT * FROM users WHERE id = ?').get(ticket.user_id);
            if (user) {
              await sendMessageContent(user.id, template.content, user);
              await ctx.reply('✅ Шаблон отправлен пользователю!');
            }
          }
        }
        return;
      }
    }

    if (!ctx.message.reply_to_message) return;
    if (!ctx.message.reply_to_message.forum_topic_created && !ctx.message.reply_to_message.is_topic_message) return;

    const topicId = ctx.message.reply_to_message.message_thread_id || ctx.message.message_thread_id;
    const ticket = db.prepare('SELECT * FROM tickets WHERE topic_id = ? AND is_closed = 0').get(topicId);
    if (!ticket) return;

    const user = db.prepare('SELECT * FROM users WHERE id = ?').get(ticket.user_id);
    if (!user) return;

    // Update ticket activity
    updateTicketActivity(ticket.id);

    try {
      // Handle media groups from admins
      if (ctx.message.media_group_id) {
        const mediaGroupId = ctx.message.media_group_id;
        
        if (!adminMediaGroups.has(mediaGroupId)) {
          const groupData = {
            ticket_id: ticket.id,
            user_id: user.id,
            media: [],
            caption: null
          };
          
          // Add current item to group
          if (ctx.message.photo) {
            const photo = ctx.message.photo[ctx.message.photo.length - 1];
            groupData.media.push({ type: 'photo', media: photo.file_id });
            if (ctx.message.caption) groupData.caption = ctx.message.caption;
          } else if (ctx.message.document) {
            groupData.media.push({ type: 'document', media: ctx.message.document.file_id });
            if (ctx.message.caption) groupData.caption = ctx.message.caption;
          } else if (ctx.message.video) {
            groupData.media.push({ type: 'video', media: ctx.message.video.file_id });
            if (ctx.message.caption) groupData.caption = ctx.message.caption;
          } else if (ctx.message.audio) {
            groupData.media.push({ type: 'audio', media: ctx.message.audio.file_id });
            if (ctx.message.caption) groupData.caption = ctx.message.caption;
          }
          
          adminMediaGroups.set(mediaGroupId, groupData);
          
          // Wait and send the media group
          setTimeout(async () => {
            const finalGroup = adminMediaGroups.get(mediaGroupId);
            if (!finalGroup) return;
            
            adminMediaGroups.delete(mediaGroupId);
            
            if (finalGroup.media.length > 0) {
              // Apply caption to first item
              if (finalGroup.caption && finalGroup.media[0]) {
                finalGroup.media[0].caption = finalGroup.caption;
                finalGroup.media[0].parse_mode = 'HTML';
              }
              
              // Send media group
              await bot.telegram.sendMediaGroup(
                finalGroup.user_id,
                finalGroup.media
              );
            }
          }, 1000);
        } else {
          // Add current item to existing group
          const group = adminMediaGroups.get(mediaGroupId);
          if (group) {
            if (ctx.message.photo) {
              const photo = ctx.message.photo[ctx.message.photo.length - 1];
              group.media.push({ type: 'photo', media: photo.file_id });
              if (ctx.message.caption) group.caption = ctx.message.caption;
            } else if (ctx.message.document) {
              group.media.push({ type: 'document', media: ctx.message.document.file_id });
              if (ctx.message.caption) group.caption = ctx.message.caption;
            } else if (ctx.message.video) {
              group.media.push({ type: 'video', media: ctx.message.video.file_id });
              if (ctx.message.caption) group.caption = ctx.message.caption;
            } else if (ctx.message.audio) {
              group.media.push({ type: 'audio', media: ctx.message.audio.file_id });
              if (ctx.message.caption) group.caption = ctx.message.caption;
            }
          }
        }
      } else {
        // Single message
        if (ctx.message.text) {
          await bot.telegram.sendMessage(user.id, ctx.message.text, { parse_mode: 'HTML' });
        } else if (ctx.message.photo) {
          const photo = ctx.message.photo[ctx.message.photo.length - 1];
          await bot.telegram.sendPhoto(user.id, photo.file_id, { caption: ctx.message.caption, parse_mode: 'HTML' });
        } else if (ctx.message.document) {
          await bot.telegram.sendDocument(user.id, ctx.message.document.file_id, { caption: ctx.message.caption, parse_mode: 'HTML' });
        } else if (ctx.message.video) {
          await bot.telegram.sendVideo(user.id, ctx.message.video.file_id, { caption: ctx.message.caption, parse_mode: 'HTML' });
        } else if (ctx.message.audio) {
          await bot.telegram.sendAudio(user.id, ctx.message.audio.file_id, { caption: ctx.message.caption, parse_mode: 'HTML' });
        } else if (ctx.message.voice) {
          await bot.telegram.sendVoice(user.id, ctx.message.voice.file_id);
        } else if (ctx.message.video_note) {
          await bot.telegram.sendVideoNote(user.id, ctx.message.video_note.file_id);
        } else if (ctx.message.sticker) {
          await bot.telegram.sendSticker(user.id, ctx.message.sticker.file_id);
        } else if (ctx.message.animation) {
          await bot.telegram.sendAnimation(user.id, ctx.message.animation.file_id, { caption: ctx.message.caption, parse_mode: 'HTML' });
        }
      }
    } catch (e) {
      console.error('Error sending message to user:', e);
    }
    return;
  }

  // Check if the bot is ready for private messages
  const isReady = await checkBotIsReady(ctx);
  if (!isReady) return;

  if (maintenanceMode === '1' && !isAdmin(ctx.from.id)) {
    await sendMessageContent(ctx.chat.id, getConfig('maintenance_message'), ctx.from);
    return;
  }

  const user = db.prepare('SELECT * FROM users WHERE id = ?').get(ctx.from.id);
  if (user && user.is_blocked) {
    await sendMessageContent(ctx.chat.id, getConfig('user_blocked'), ctx.from);
    return;
  }

  let ticket = db.prepare('SELECT * FROM tickets WHERE user_id = ? AND is_closed = 0').get(ctx.from.id);

  if (!ticket) {
    // Check if there's a CLOSED ticket for this user
    const closedTicket = db.prepare('SELECT * FROM tickets WHERE user_id = ? AND is_closed = 1 ORDER BY closed_at DESC LIMIT 1').get(ctx.from.id);
    
    if (closedTicket) {
      // Try to reopen the topic
      try {
        const groupId = getSelectedSupportGroupId();
        if (!groupId) {
          console.error('No support group selected, cannot reopen topic');
          closedTicket = null;
        } else {
          await bot.telegram.reopenForumTopic(groupId, closedTicket.topic_id);
          // Mark ticket as open, reset last activity
          db.prepare('UPDATE tickets SET is_closed = 0, last_activity = strftime(\'%s\', \'now\') WHERE id = ?').run(closedTicket.id);
          ticket = closedTicket;
          
          // Notify admin group that ticket is reopened
          const keyboard = Markup.inlineKeyboard([
            [
              Markup.button.url('Открыть чат', `tg://user?id=${ctx.from.id}`),
              Markup.button.callback('Заблокировать', `block_user:${ctx.from.id}`)
            ]
          ]);
          
          await bot.telegram.sendMessage(
            groupId,
            `🔄 Тикет переоткрыт!\n\n👤 Пользователь: ${ctx.from.first_name}${ctx.from.last_name ? ` ${ctx.from.last_name}` : ''}\n🆔 ID: ${ctx.from.id}${ctx.from.username ? `\n📝 Username: @${ctx.from.username}` : ''}`,
            {
              message_thread_id: closedTicket.topic_id,
              reply_markup: keyboard.reply_markup || keyboard
            }
          );
        }
      } catch (e) {
        console.error('Error reopening topic, creating new one:', e);
        // If we can't reopen (topic was deleted), create a new one
        closedTicket = null;
      }
    }
    
    if (!ticket) {
      // Still no ticket, create a new one
      const groupId = getSelectedSupportGroupId();
      if (!groupId) {
        await ctx.reply('❌ Бот не настроен. Пожалуйста, выполните команду /admin.');
        return;
      }
      
      const userDisplay = `${ctx.from.first_name}${ctx.from.last_name ? ` ${ctx.from.last_name}` : ''}${ctx.from.username ? ` @${ctx.from.username}` : ''}`;
      const topicName = `${userDisplay} | ${ctx.from.id}`;
      try {
        const topic = await bot.telegram.createForumTopic(
          groupId,
          topicName
        );

        const ticketId = db.prepare('INSERT INTO tickets (user_id, topic_id) VALUES (?, ?)').run(
          ctx.from.id,
          topic.message_thread_id
        ).lastInsertRowid;

        ticket = db.prepare('SELECT * FROM tickets WHERE id = ?').get(ticketId);

        const keyboard = Markup.inlineKeyboard([
          [
            Markup.button.url('Открыть чат', `tg://user?id=${ctx.from.id}`),
            Markup.button.callback('Заблокировать', `block_user:${ctx.from.id}`)
          ]
        ]);
        
        await bot.telegram.sendMessage(
          groupId,
          `🆕 Новый тикет!\n\n👤 Пользователь: ${ctx.from.first_name}${ctx.from.last_name ? ` ${ctx.from.last_name}` : ''}\n🆔 ID: ${ctx.from.id}${ctx.from.username ? `\n📝 Username: @${ctx.from.username}` : ''}`,
          {
            message_thread_id: topic.message_thread_id,
            reply_markup: keyboard.reply_markup || keyboard
          }
        );
      } catch (e) {
        console.error('Error creating topic:', e);
        await ctx.reply('❌ Произошла ошибка, попробуйте позже.');
        return;
      }
    }
  }

  // Check if message type is blocked
  let isBlocked = false;
  let blockKey = null;
  
  if (ctx.message.text) {
    blockKey = 'block_text';
  } else if (ctx.message.photo) {
    blockKey = 'block_photo';
  } else if (ctx.message.document) {
    blockKey = 'block_document';
  } else if (ctx.message.video) {
    blockKey = 'block_video';
  } else if (ctx.message.audio) {
    blockKey = 'block_audio';
  } else if (ctx.message.voice) {
    blockKey = 'block_voice';
  } else if (ctx.message.video_note) {
    blockKey = 'block_video_note';
  } else if (ctx.message.sticker) {
    blockKey = 'block_sticker';
  } else if (ctx.message.animation) {
    blockKey = 'block_animation';
  }
  
  if (blockKey && getConfig(blockKey) === '1') {
    await ctx.reply('❌ Этот тип сообщений не принимается поддержкой.');
    return;
  }
  
  // Antispam check
  const antispamEnabled = getConfig('antispam_enabled') === '1';
  if (antispamEnabled) {
    const now = Date.now();
    const interval = parseInt(getConfig('antispam_interval')) * 1000;
    const userId = ctx.from.id;
    const mediaGroupId = ctx.message.media_group_id;
    
    // Check if it's part of an active media group - skip antispam
    let isPartOfMediaGroup = false;
    if (mediaGroupId && activeMediaGroups.has(mediaGroupId)) {
      isPartOfMediaGroup = true;
    }
    
    if (!isPartOfMediaGroup) {
      const lastTime = userLastMessageTime.get(userId) || 0;
      if (now - lastTime < interval) {
        await sendMessageContent(ctx.chat.id, getConfig('antispam_message'), ctx.from);
        return;
      }
      
      // Update last message time
      userLastMessageTime.set(userId, now);
      
      // If it's a media group, add to active groups for subsequent items
      if (mediaGroupId) {
        activeMediaGroups.add(mediaGroupId);
        // Clean up after 5 seconds
        setTimeout(() => {
          activeMediaGroups.delete(mediaGroupId);
        }, 5000);
      }
    }
  }
  
  // Update ticket activity
  updateTicketActivity(ticket.id);

  try {
    // Handle media groups (albums)
    if (ctx.message.media_group_id) {
      const mediaGroupId = ctx.message.media_group_id;
      
      if (!mediaGroups.has(mediaGroupId)) {
        const groupData = {
          ticket_id: ticket.id,
          topic_id: ticket.topic_id,
          user_id: ctx.from.id,
          media: [],
          caption: null
        };
        
        // Add current item to group
        if (ctx.message.photo) {
          const photo = ctx.message.photo[ctx.message.photo.length - 1];
          groupData.media.push({ type: 'photo', media: photo.file_id });
          if (ctx.message.caption) groupData.caption = ctx.message.caption;
        } else if (ctx.message.document) {
          groupData.media.push({ type: 'document', media: ctx.message.document.file_id });
          if (ctx.message.caption) groupData.caption = ctx.message.caption;
        } else if (ctx.message.video) {
          groupData.media.push({ type: 'video', media: ctx.message.video.file_id });
          if (ctx.message.caption) groupData.caption = ctx.message.caption;
        } else if (ctx.message.audio) {
          groupData.media.push({ type: 'audio', media: ctx.message.audio.file_id });
          if (ctx.message.caption) groupData.caption = ctx.message.caption;
        }
        
        mediaGroups.set(mediaGroupId, groupData);
        
        // Wait a bit for all group items to come
        setTimeout(async () => {
          try {
            const finalGroup = mediaGroups.get(mediaGroupId);
            if (!finalGroup) return;
            
            mediaGroups.delete(mediaGroupId);
            
            if (finalGroup.media.length > 0) {
              // Apply caption to first item
              if (finalGroup.caption && finalGroup.media[0]) {
                finalGroup.media[0].caption = finalGroup.caption;
              }
              
              // Send media group
              const groupId = getSelectedSupportGroupId();
              if (groupId) {
                await bot.telegram.sendMediaGroup(
                  groupId,
                  finalGroup.media,
                  { message_thread_id: finalGroup.topic_id }
                );
              }
            }
            
            db.prepare('INSERT INTO messages (ticket_id, from_user, message_id) VALUES (?, ?, ?)').run(
              finalGroup.ticket_id,
              finalGroup.user_id,
              ctx.message.message_id
            );
            
            await sendMessageContent(ctx.chat.id, getConfig('ticket_created'), ctx.from);
            
            // Проверка автоответов (в медиагруппе текст может быть в caption)
            if (finalGroup.caption) {
              await processAutoReplies(ctx, { ...ticket, topic_id: finalGroup.topic_id }, finalGroup.caption);
            }
          } catch (e) {
            console.error('Error processing media group:', e);
          }
        }, 1500);
      } else {
        // Add current item to existing group
        const group = mediaGroups.get(mediaGroupId);
        if (group) {
          if (ctx.message.photo) {
            const photo = ctx.message.photo[ctx.message.photo.length - 1];
            group.media.push({ type: 'photo', media: photo.file_id });
            if (ctx.message.caption) group.caption = ctx.message.caption;
          } else if (ctx.message.document) {
            group.media.push({ type: 'document', media: ctx.message.document.file_id });
            if (ctx.message.caption) group.caption = ctx.message.caption;
          } else if (ctx.message.video) {
            group.media.push({ type: 'video', media: ctx.message.video.file_id });
            if (ctx.message.caption) group.caption = ctx.message.caption;
          } else if (ctx.message.audio) {
            group.media.push({ type: 'audio', media: ctx.message.audio.file_id });
            if (ctx.message.caption) group.caption = ctx.message.caption;
          }
        }
      }
    } else {
      // Single message
      const groupId = getSelectedSupportGroupId();
      if (groupId) {
        if (ctx.message.text) {
          await bot.telegram.sendMessage(
            groupId,
            ctx.message.text,
            { message_thread_id: ticket.topic_id }
          );
        } else if (ctx.message.photo) {
          const photo = ctx.message.photo[ctx.message.photo.length - 1];
          await bot.telegram.sendPhoto(
            groupId,
            photo.file_id,
            { caption: ctx.message.caption, message_thread_id: ticket.topic_id }
          );
        } else if (ctx.message.document) {
          await bot.telegram.sendDocument(
            groupId,
            ctx.message.document.file_id,
            { caption: ctx.message.caption, message_thread_id: ticket.topic_id }
          );
        } else if (ctx.message.video) {
          await bot.telegram.sendVideo(
            groupId,
            ctx.message.video.file_id,
            { caption: ctx.message.caption, message_thread_id: ticket.topic_id }
          );
        } else if (ctx.message.audio) {
          await bot.telegram.sendAudio(
            groupId,
            ctx.message.audio.file_id,
            { caption: ctx.message.caption, message_thread_id: ticket.topic_id }
          );
        } else if (ctx.message.voice) {
          await bot.telegram.sendVoice(
            groupId,
            ctx.message.voice.file_id,
            { message_thread_id: ticket.topic_id }
          );
        } else if (ctx.message.video_note) {
          await bot.telegram.sendVideoNote(
            groupId,
            ctx.message.video_note.file_id,
            { message_thread_id: ticket.topic_id }
          );
        } else if (ctx.message.sticker) {
          await bot.telegram.sendSticker(
            groupId,
            ctx.message.sticker.file_id,
            { message_thread_id: ticket.topic_id }
          );
        } else if (ctx.message.animation) {
          await bot.telegram.sendAnimation(
            groupId,
            ctx.message.animation.file_id,
            { caption: ctx.message.caption, message_thread_id: ticket.topic_id }
          );
        }
      }

      db.prepare('INSERT INTO messages (ticket_id, from_user, message_id) VALUES (?, ?, ?)').run(
        ticket.id,
        ctx.from.id,
        ctx.message.message_id
      );

      await sendMessageContent(ctx.chat.id, getConfig('ticket_created'));
      
      // Проверка автоответов
      const userMessageText = ctx.message.text || ctx.message.caption || '';
      await processAutoReplies(ctx, ticket, userMessageText);
    }
  } catch (e) {
    console.error('Error forwarding message:', e);
    await ctx.reply('❌ Произошла ошибка при отправке сообщения, попробуйте позже.');
  }
});

app.get('/api/stats', (req, res) => {
  try {
    const totalUsers = db.prepare('SELECT COUNT(*) as count FROM users WHERE id != ?').get(botId || 0).count;
    const blockedUsers = db.prepare('SELECT COUNT(*) as count FROM users WHERE is_blocked = 1 AND id != ?').get(botId || 0).count;
    const totalTickets = db.prepare('SELECT COUNT(*) as count FROM tickets').get().count;
    const closedTickets = db.prepare('SELECT COUNT(*) as count FROM tickets WHERE is_closed = 1').get().count;

    res.json({
      totalUsers,
      blockedUsers,
      totalTickets,
      closedTickets
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get('/api/users', (req, res) => {
  try {
    const users = db.prepare('SELECT * FROM users WHERE id != ? ORDER BY created_at DESC').all(botId || 0);
    res.json(users);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post('/api/users/:id/toggle-block', (req, res) => {
  try {
    const { id } = req.params;
    const user = db.prepare('SELECT * FROM users WHERE id = ?').get(id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    db.prepare('UPDATE users SET is_blocked = ? WHERE id = ?').run(user.is_blocked ? 0 : 1, id);
    res.json({ success: true, is_blocked: user.is_blocked ? 0 : 1 });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get('/api/config', (req, res) => {
  try {
    const config = db.prepare('SELECT * FROM config').all();
    const configObj = {};
    config.forEach(row => {
      configObj[row.key] = row.value;
    });
    res.json(configObj);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post('/api/config', (req, res) => {
  try {
    for (const [key, value] of Object.entries(req.body)) {
      setConfig(key, value);
    }
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get('/api/templates', (req, res) => {
  try {
    const templates = db.prepare('SELECT * FROM templates').all();
    res.json(templates);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post('/api/templates', (req, res) => {
  try {
    const { name, command, content } = req.body;
    const id = db.prepare('INSERT INTO templates (name, command, content) VALUES (?, ?, ?)').run(name, command, content).lastInsertRowid;
    res.json({ id, name, command, content });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.put('/api/templates/:id', (req, res) => {
  try {
    const { name, command, content } = req.body;
    db.prepare('UPDATE templates SET name = ?, command = ?, content = ? WHERE id = ?').run(name, command, content, req.params.id);
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.delete('/api/templates/:id', (req, res) => {
  try {
    db.prepare('DELETE FROM templates WHERE id = ?').run(req.params.id);
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get('/api/auto-replies', (req, res) => {
  try {
    const autoReplies = db.prepare('SELECT * FROM auto_replies').all();
    res.json(autoReplies);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post('/api/auto-replies', (req, res) => {
  try {
    const { keyword, content } = req.body;
    const id = db.prepare('INSERT INTO auto_replies (keyword, content) VALUES (?, ?)').run(keyword, content).lastInsertRowid;
    res.json({ id, keyword, content });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.put('/api/auto-replies/:id', (req, res) => {
  try {
    const { keyword, content } = req.body;
    db.prepare('UPDATE auto_replies SET keyword = ?, content = ? WHERE id = ?').run(keyword, content, req.params.id);
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.delete('/api/auto-replies/:id', (req, res) => {
  try {
    db.prepare('DELETE FROM auto_replies WHERE id = ?').run(req.params.id);
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post('/api/broadcast', async (req, res) => {
  try {
    const { message } = req.body;
    const users = db.prepare('SELECT id FROM users WHERE is_blocked = 0').all();
    let sent = 0;

    for (const user of users) {
      try {
        await sendMessageContent(user.id, message);
        sent++;
      } catch (e) {
        console.error(`Error sending to ${user.id}:`, e);
      }
    }

    res.json({ success: true, sent });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.use(express.static('webapp/dist'));

// Auto-close tickets function
const checkAndCloseInactiveTickets = async () => {
  try {
    const enabled = getConfig('auto_close_enabled') === '1';
    if (!enabled) return;

    const minutes = parseInt(getConfig('auto_close_minutes'));
    const cutoff = Math.floor(Date.now() / 1000) - (minutes * 60);
    
    const inactiveTickets = db.prepare('SELECT * FROM tickets WHERE is_closed = 0 AND last_activity < ?').all(cutoff);
    
    for (const ticket of inactiveTickets) {
      // Close ticket
      db.prepare('UPDATE tickets SET is_closed = 1, closed_at = strftime(\'%s\', \'now\') WHERE id = ?').run(ticket.id);
      
      // Notify user
      try {
        const user = db.prepare('SELECT * FROM users WHERE id = ?').get(ticket.user_id);
        if (user) {
          await sendMessageContent(user.id, getConfig('auto_close_message'), user);
        }
      } catch (e) {
        console.error('Error notifying user about auto-close:', e);
      }
      
      // Close the forum topic and notify in group
      const groupId = getSelectedSupportGroupId();
      if (groupId) {
        try {
          await bot.telegram.sendMessage(
            groupId,
            '⏰ Тикет автоматически закрыт из-за отсутствия активности.',
            { message_thread_id: ticket.topic_id }
          );
          await bot.telegram.closeForumTopic(groupId, ticket.topic_id);
        } catch (e) {
          console.error('Error notifying group about auto-close:', e);
        }
      }
    }
  } catch (e) {
    console.error('Error checking inactive tickets:', e);
  }
};

// Check every minute
setInterval(checkAndCloseInactiveTickets, 60000);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Web server running on port ${PORT}`);
});

bot.launch().then(() => {
  console.log('Bot started!');
});

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
