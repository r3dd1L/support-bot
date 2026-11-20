const Database = require('better-sqlite3');

const db = new Database('support_bot.db');

const defaultConfig = {
  welcome_message: '👋 Привет! Это техническая поддержка. Напишите ваше сообщение, и мы ответим как можно скорее!',
  ticket_created: '✅ Ваше сообщение отправлено в техническую поддержку. Мы свяжемся с вами в ближайшее время!',
  user_blocked: '❌ Вы заблокированы в боте.',
  maintenance_message: '🔧 Бот на техническом обслуживании. Пожалуйста, попробуйте позже.',
  maintenance_mode: '0'
};

for (const [key, value] of Object.entries(defaultConfig)) {
  db.prepare('REPLACE INTO config (key, value) VALUES (?, ?)').run(key, value);
  console.log(`✅ Reset config key "${key}" to: ${value}`);
}

console.log('🎉 Config reset complete!');
db.close();
