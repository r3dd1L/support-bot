import { useState, useEffect, useMemo } from 'react';
import Lottie from 'lottie-react';

// Load Lottie animations
import logoAnimation from './icons/logo.json';
import userAnimation from './icons/user.json';
import blockAnimation from './icons/block.json';
import ticketAnimation from './icons/ticket.json';
import completeAnimation from './icons/complete.json';

// Lottie icon components
const LottieLogo = ({ className = "" }) => (
  <div className={className}>
    <Lottie animationData={logoAnimation} loop={true} style={{ width: '100%', height: '100%' }} />
  </div>
);

const LottieUser = ({ className = "" }) => (
  <div className={className}>
    <Lottie animationData={userAnimation} loop={true} style={{ width: '100%', height: '100%' }} />
  </div>
);

const LottieBlock = ({ className = "" }) => (
  <div className={className}>
    <Lottie animationData={blockAnimation} loop={true} style={{ width: '100%', height: '100%' }} />
  </div>
);

const LottieTicket = ({ className = "" }) => (
  <div className={className}>
    <Lottie animationData={ticketAnimation} loop={true} style={{ width: '100%', height: '100%' }} />
  </div>
);

const LottieComplete = ({ className = "" }) => (
  <div className={className}>
    <Lottie animationData={completeAnimation} loop={true} style={{ width: '100%', height: '100%' }} />
  </div>
);

// Premium SVG Icons (Modern, Pixel-Perfect)
const IconUser = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M20.59 20.59C18.9466 22.2333 16.742 23 14.5 23H9.5C7.25804 23 5.05345 22.2333 3.41 20.59C3.02702 20.207 2.99907 19.5678 3.33165 19.1384C5.14207 16.8265 8.68629 15.5 12 15.5C15.3137 15.5 18.8579 16.8265 20.6684 19.1384C21.0009 19.5678 20.973 20.207 20.59 20.59Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconSettings = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M19.4 15C19.1 16.2 18.3 17.2 17.2 17.8L15.6 16.2C16 15.8 16.3 15.2 16.3 14.5C16.3 13.8 16 13.2 15.6 12.8L17.2 11.2C18.3 11.8 19.1 12.8 19.4 14C19.5 14.3 19.5 14.7 19.4 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M4.6 15C4.9 16.2 5.7 17.2 6.8 17.8L8.4 16.2C8 15.8 7.7 15.2 7.7 14.5C7.7 13.8 8 13.2 8.4 12.8L6.8 11.2C5.7 11.8 4.9 12.8 4.6 14C4.5 14.3 4.5 14.7 4.6 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 4.6C10.8 4.9 9.8 5.7 9.2 6.8L10.8 8.4C11.2 8 11.8 7.7 12.5 7.7C13.2 7.7 13.8 8 14.2 8.4L15.8 6.8C15.2 5.7 14.2 4.9 13 4.6C12.7 4.5 12.3 4.5 12 4.6Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 19.4C13.2 19.1 14.2 18.3 14.8 17.2L13.2 15.6C12.8 16 12.2 16.3 11.5 16.3C10.8 16.3 10.2 16 9.8 15.6L8.2 17.2C8.8 18.3 9.8 19.1 11 19.4C11.3 19.5 11.7 19.5 12 19.4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconStats = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 3V21H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M7 17L12 10L16 13L21 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconTemplates = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M8 13H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M8 17H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconAutoReplies = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 10v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 18h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconBroadcast = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 8A6 6 0 0 0 6 8C6 14 3 16 3 16H21C21 16 18 14 18 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M13.73 21A2 2 0 0 0 15.88 19.5L16 18H8L8.12 19.5A2 2 0 0 0 10.27 21H13.73Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconClose = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconText = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 3H18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 3V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6 21H18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconImage = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="3" width="18" height="18" rx="4" stroke="currentColor" strokeWidth="2"/>
    <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor"/>
    <path d="M21 15L16 10L5 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconVideo = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="2" width="20" height="20" rx="4" stroke="currentColor" strokeWidth="2"/>
    <path d="M10 8L15 12L10 16V8Z" fill="currentColor"/>
  </svg>
);

const IconDocument = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconBold = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 4H11C12.6569 4 14 5.34315 14 7C14 8.65685 12.6569 10 11 10H6V4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6 10H13C14.6569 10 16 11.3431 16 13C16 14.6569 14.6569 16 13 16H6V10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconItalic = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <line x1="19" y1="4" x2="10" y2="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <line x1="14" y1="20" x2="5" y2="20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <line x1="15" y1="4" x2="9" y2="20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const IconUnderline = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 3V11C6 14.3137 8.68629 17 12 17C15.3137 17 18 14.3137 18 11V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M4 21H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const IconTime = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
    <path d="M12 7V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconCode = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 18L22 12L16 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M8 6L2 12L8 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconPlus = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <line x1="12" y1="5" x2="12" y2="19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <line x1="5" y1="12" x2="19" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const IconMinus = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <line x1="5" y1="12" x2="19" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const IconVariable = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 4H20V20H4V4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 9H15L12 15L9 9Z" fill="currentColor"/>
  </svg>
);

const IconSave = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19 21H5C5.46957 21 5.96086 21.7893 6.33594 21.4142C6.71101 21.0391 7 20.5304 7 20V5C7 4.46957 7.21071 3.96086 7.58579 3.58579C7.96086 3.21071 8.46957 3 9 3H14L20 8V20C20 20.5304 19.7893 21.0391 19.4142 21.4142C19.0391 21.7893 18.5304 22 18 22H19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M17 21V13H7V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M7 3V8H12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconTrash = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 6H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 12.58579 2.58579C12.96086 2.21071 13.4696 2 14 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconBan = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
    <path d="M4.93 4.93L19.07 19.07" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const IconCheck = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconWarning = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 9V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 17H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M10.29 3.86L1.82 18C1.54174 18.4829 1.39747 19.0505 1.40691 19.629C1.41634 20.2074 1.57867 20.7702 1.87349 21.2441C2.16831 21.718 2.58435 22.0821 3.07293 22.299C3.56152 22.516 4.10115 22.5769 4.63 22.472L22.63 18.472C23.1213 18.3634 23.5676 18.0961 23.9116 17.7147C24.2556 17.3334 24.4796 16.8569 24.5484 16.348C24.6171 15.839 24.5265 15.3226 24.291 14.86L17.29 3.86C17.0058 3.39646 16.6017 3.01179 16.1182 2.75037C15.6347 2.48895 15.0884 2.36117 14.5392 2.38727C13.99 2.41337 13.4645 2.59182 13.01 2.9L12 3.86H10.29Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Component to render message preview with formatting
const MessagePreview = ({ content }) => {
  let parsedData;
  try {
    parsedData = typeof content === 'string' && content.startsWith('{') ? JSON.parse(content) : { text: content, type: 'text' };
  } catch (e) {
    parsedData = { text: content, type: 'text' };
  }

  const renderTextWithFormatting = () => {
    // Если нет текста, но content есть (строка), показываем его
    if (!parsedData.text && content && typeof content === 'string') {
      parsedData.text = content;
    }
    
    if (!parsedData.text) {
      return <span className="text-slate-500 text-sm">Пустое сообщение</span>;
    }
    
    const text = parsedData.text;
    
    // Replace HTML formatting tags with JSX
    let formattedParts = [];
    let currentText = '';
    let i = 0;
    
    while (i < text.length) {
      if (text.substring(i, i + 3) === '<b>') {
        if (currentText) {
          formattedParts.push(<span key={formattedParts.length}>{currentText}</span>);
          currentText = '';
        }
        const endIdx = text.indexOf('</b>', i + 3);
        if (endIdx !== -1) {
          formattedParts.push(<strong key={formattedParts.length}>{text.substring(i + 3, endIdx)}</strong>);
          i = endIdx + 4;
        } else {
          i += 3;
        }
      } else if (text.substring(i, i + 3) === '<i>') {
        if (currentText) {
          formattedParts.push(<span key={formattedParts.length}>{currentText}</span>);
          currentText = '';
        }
        const endIdx = text.indexOf('</i>', i + 3);
        if (endIdx !== -1) {
          formattedParts.push(<em key={formattedParts.length}>{text.substring(i + 3, endIdx)}</em>);
          i = endIdx + 4;
        } else {
          i += 3;
        }
      } else if (text.substring(i, i + 3) === '<u>') {
        if (currentText) {
          formattedParts.push(<span key={formattedParts.length}>{currentText}</span>);
          currentText = '';
        }
        const endIdx = text.indexOf('</u>', i + 3);
        if (endIdx !== -1) {
          formattedParts.push(<u key={formattedParts.length}>{text.substring(i + 3, endIdx)}</u>);
          i = endIdx + 4;
        } else {
          i += 3;
        }
      } else if (text.substring(i, i + 6) === '<code>') {
        if (currentText) {
          formattedParts.push(<span key={formattedParts.length}>{currentText}</span>);
          currentText = '';
        }
        const endIdx = text.indexOf('</code>', i + 6);
        if (endIdx !== -1) {
          formattedParts.push(<code key={formattedParts.length} className="px-2 py-1 rounded bg-white/10 font-mono text-sm">{text.substring(i + 6, endIdx)}</code>);
          i = endIdx + 7;
        } else {
          i += 6;
        }
      } else {
        currentText += text[i];
        i++;
      }
    }
    
    if (currentText) {
      formattedParts.push(<span key={formattedParts.length}>{currentText}</span>);
    }
    
    return formattedParts.length > 0 ? formattedParts : <span className="text-slate-500 text-sm">Пустое сообщение</span>;
  };

  return (
    <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
      {parsedData.type !== 'text' && parsedData.fileId && (
        <div className="mb-3 p-3 rounded-xl bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 border border-violet-500/30 flex items-center gap-2">
          {parsedData.type === 'photo' && <IconImage className="w-5 h-5 text-violet-400" />}
          {parsedData.type === 'video' && <IconVideo className="w-5 h-5 text-violet-400" />}
          {parsedData.type === 'document' && <IconDocument className="w-5 h-5 text-violet-400" />}
          <span className="text-xs text-violet-400 font-mono truncate">{parsedData.fileId}</span>
        </div>
      )}
      
      <div className="text-slate-300 break-words leading-relaxed">
        {renderTextWithFormatting()}
      </div>
      
      {parsedData.buttons && parsedData.buttons.length > 0 && (
        <div className="mt-4 space-y-2">
          <span className="text-xs text-slate-500 font-medium">Инлайн кнопки:</span>
          {parsedData.buttons.map((row, rowIdx) => (
            <div key={rowIdx} className="flex gap-2 flex-wrap">
              {row.map((btn, btnIdx) => (
                btn.text && (
                  <div key={btnIdx} className="px-3 py-1.5 rounded-lg bg-gradient-to-br from-violet-600/30 to-fuchsia-600/30 border border-violet-500/30 text-xs text-violet-300">
                    {btn.text}
                    {btn.url && <span className="ml-1 text-slate-500 text-[10px]">(URL)</span>}
                  </div>
                )
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// URL validation function
const isValidUrl = (urlString) => {
  if (!urlString || urlString.trim() === '') return true; // Empty URL is allowed (button will just have text)
  try {
    const url = new URL(urlString);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch (_) {
    return false;
  }
};

// Modal Component (Optimized for Mobile)
const MessageEditorModal = ({ isOpen, onClose, onSave, initialData, mode, initialTemplate, templates }) => {
  const [data, setData] = useState({
    text: '',
    type: 'text',
    fileId: '',
    buttons: []
  });
  const [templateData, setTemplateData] = useState({ name: '', command: '' });

  const variables = [
    { name: 'id', label: 'ID', description: 'Telegram ID' },
    { name: 'ник', label: 'Ник', description: '@username' },
    { name: 'имя', label: 'Имя', description: 'First name' },
    { name: 'фамилия', label: 'Фамилия', description: 'Last name' }
  ];

  useEffect(() => {
    if (isOpen) {
      // Reset states when modal opens
      if (initialTemplate) {
        setTemplateData({ name: initialTemplate.name || '', command: initialTemplate.command || '' });
      } else {
        setTemplateData({ name: '', command: '' });
      }

      if (initialData) {
        try {
          const parsed = typeof initialData === 'string' && initialData.startsWith('{') ? JSON.parse(initialData) : { text: initialData, type: 'text', fileId: '', buttons: [] };
          setData({
            text: parsed.text || '',
            type: parsed.type || 'text',
            fileId: parsed.fileId || '',
            buttons: parsed.buttons || []
          });
        } catch (e) {
          setData({
            text: initialData || '',
            type: 'text',
            fileId: '',
            buttons: []
          });
        }
      } else {
        setData({ text: '', type: 'text', fileId: '', buttons: [] });
      }
    }
  }, [initialData, isOpen, initialTemplate]);

  const formatText = (format) => {
    const textarea = document.getElementById('modalMessageText');
    if (!textarea) return;
    
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = data.text.substring(start, end);
    
    let formattedText = '';
    switch (format) {
      case 'bold': formattedText = `<b>${selectedText}</b>`; break;
      case 'italic': formattedText = `<i>${selectedText}</i>`; break;
      case 'code': formattedText = `<code>${selectedText}</code>`; break;
      case 'underline': formattedText = `<u>${selectedText}</u>`; break;
    }
    
    setData(prev => ({
      ...prev,
      text: prev.text.substring(0, start) + formattedText + prev.text.substring(end)
    }));
  };

  const insertVariable = (variableName) => {
    const textarea = document.getElementById('modalMessageText');
    if (!textarea) return;
    
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    
    const variableText = `{${variableName}}`;
    
    setData(prev => ({
      ...prev,
      text: prev.text.substring(0, start) + variableText + prev.text.substring(end)
    }));
    
    setShowVariables(false);
  };

  const addButtonRow = () => {
    setData(prev => ({
      ...prev,
      buttons: [...prev.buttons, [{ text: '', url: '' }]]
    }));
  };

  const removeButtonRow = (rowIndex) => {
    setData(prev => {
      const newButtons = [...prev.buttons];
      newButtons.splice(rowIndex, 1);
      return { ...prev, buttons: newButtons };
    });
  };

  const updateButton = (rowIndex, btnIndex, field, value) => {
    setData(prev => {
      const newButtons = prev.buttons.map((row, ri) => 
        row.map((btn, bi) => 
          ri === rowIndex && bi === btnIndex ? { ...btn, [field]: value } : btn
        )
      );
      return { ...prev, buttons: newButtons };
    });
  };

  const addButtonToRow = (rowIndex) => {
    setData(prev => {
      const newButtons = prev.buttons.map((row, ri) => 
        ri === rowIndex ? [...row, { text: '', url: '' }] : row
      );
      return { ...prev, buttons: newButtons };
    });
  };

  const removeButtonFromRow = (rowIndex, btnIndex) => {
    setData(prev => {
      const newButtons = prev.buttons.map((row, ri) => {
        if (ri !== rowIndex) return row;
        const newRow = [...row];
        newRow.splice(btnIndex, 1);
        return newRow.length > 0 ? newRow : null;
      }).filter(Boolean);
      
      return { ...prev, buttons: newButtons };
    });
  };

  const handleSave = () => {
    // Just save the data - let the parent decide to close or not
    onSave(data, templateData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex flex-col sm:flex-col items-end sm:items-center justify-end sm:justify-center p-0 sm:p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fadeIn" onClick={onClose} />
      
      {/* Modal Card (Mobile-First) */}
      <div className="relative w-full max-w-3xl bg-gradient-to-br from-slate-900/98 via-slate-900 to-slate-900/98 border-t sm:border border-white/10 sm:rounded-3xl rounded-t-3xl shadow-2xl overflow-hidden animate-slideUpFromBottom flex flex-col max-h-[95vh] sm:max-h-[90vh]">
        {/* Header with Mobile Pull Indicator */}
        <div className="flex flex-col bg-gradient-to-b from-white/5 to-transparent border-b border-white/10 flex-shrink-0">
          {/* Pull Indicator for Mobile */}
          <div className="flex justify-center py-2 sm:hidden">
            <div className="w-12 h-1.5 bg-white/20 rounded-full" />
          </div>
          
          <div className="flex items-center justify-between px-5 py-3 sm:px-8 sm:py-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-violet-500/30 to-fuchsia-500/30 flex items-center justify-center">
                <IconSettings className="w-5 h-5 text-violet-400" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-white tracking-tight">Редактор сообщения</h3>
                <p className="text-xs sm:text-sm text-slate-400">Настройте контент и кнопки</p>
              </div>
            </div>
            <button onClick={onClose} className="p-3 rounded-2xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all duration-200">
              <IconClose className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-8 space-y-5 sm:space-y-6 overflow-y-auto custom-scrollbar flex-1">
          {/* Template Name & Command (when in template mode) */}
          {mode === 'template' && (
            <div className="space-y-3 animate-fadeIn">
              <label className="text-sm font-medium text-slate-300">Информация о шаблоне</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-2">
                  <span className="text-xs text-slate-400">Название шаблона</span>
                  <input
                    type="text"
                    placeholder="Приветствие"
                    className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all"
                    value={templateData.name}
                    onChange={(e) => setTemplateData(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <span className="text-xs text-slate-400">Команда (без /)</span>
                  <input
                    type="text"
                    placeholder="hello"
                    className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all"
                    value={templateData.command}
                    onChange={(e) => setTemplateData(prev => ({ ...prev, command: e.target.value }))}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Auto Reply Keyword (when in auto_reply mode) */}
          {mode === 'auto_reply' && (
            <div className="space-y-3 animate-fadeIn">
              <label className="text-sm font-medium text-slate-300">Настройки автоответа</label>
              <div className="space-y-2">
                <span className="text-xs text-slate-400">Ключевое слово (сообщение пользователя должно содержать это слово)</span>
                <input
                  type="text"
                  placeholder="хочу сотрудничать"
                  className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all"
                  value={templateData.command}
                  onChange={(e) => setTemplateData(prev => ({ ...prev, command: e.target.value }))}
                />
              </div>
            </div>
          )}
          
          {/* Content Type Selector */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-slate-300">Тип контента</label>
            <div className="grid grid-cols-4 sm:grid-cols-4 gap-2">
              {[
                { type: 'text', icon: IconText, label: 'Текст' },
                { type: 'photo', icon: IconImage, label: 'Фото' },
                { type: 'video', icon: IconVideo, label: 'Видео' },
                { type: 'document', icon: IconDocument, label: 'Документ' }
              ].map(({ type, icon: Icon, label }) => (
                <button
                  key={type}
                  onClick={() => setData(prev => ({ ...prev, type }))}
                  className={`flex flex-col items-center gap-2 p-3 rounded-2xl border-2 transition-all duration-300 active:scale-95 ${
                    data.type === type ? 'border-violet-500 bg-gradient-to-br from-violet-500/20 to-fuchsia-500/15 text-violet-400' : 'border-white/10 hover:border-white/20 text-slate-400 hover:text-slate-200 bg-white/5'
                  }`}
                  type="button"
                >
                  <Icon className="w-6 h-6" />
                  <span className="text-xs font-medium text-center">{label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* File ID (if media type) */}
          {data.type !== 'text' && (
            <div className="space-y-3 animate-fadeIn">
              <label className="text-sm font-medium text-slate-300">File ID из Telegram</label>
              <input
                type="text"
                placeholder="Вставьте file_id..."
                className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all text-base"
                value={data.fileId}
                onChange={(e) => setData(prev => ({ ...prev, fileId: e.target.value }))}
              />
            </div>
          )}

          {/* Text Input with Formatter */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-slate-300">Текст сообщения</label>
            
            {/* Format Toolbar - Fixed for Mobile */}
            <div className="flex items-center justify-between gap-2 p-2 bg-white/5 rounded-2xl border border-white/10 w-full">
              {[
                { format: 'bold', icon: IconBold, title: 'Жирный' },
                { format: 'italic', icon: IconItalic, title: 'Курсив' },
                { format: 'underline', icon: IconUnderline, title: 'Подчеркнутый' },
                { format: 'code', icon: IconCode, title: 'Код' }
              ].map(({ format, icon: Icon, title }) => (
                <button
                  key={format}
                  onClick={() => formatText(format)}
                  className="flex-1 p-3 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-all duration-200 active:scale-95"
                  title={title}
                  type="button"
                >
                  <Icon className="w-5 h-5" />
                </button>
              ))}
            </div>

            {/* Variables Menu (Separate Row) */}
            <div className="mt-3 flex gap-2 p-2 bg-white/5 rounded-2xl border border-white/10 overflow-x-auto">
              {variables.map((variable) => (
                <button
                  key={variable.name}
                  onClick={() => insertVariable(variable.name)}
                  className="px-4 py-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-all duration-200 active:scale-95 text-sm whitespace-nowrap"
                  title={`Вставить {${variable.name}}`}
                  type="button"
                >
                  {variable.label}
                </button>
              ))}
            </div>

            {/* Templates Menu (Horizontal) - Only if not in template mode */}
            {mode !== 'template' && templates && templates.length > 0 && (
              <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
                {templates.map((template) => (
                  <button
                    key={template.id}
                    onClick={() => {
                      // Load template content
                      try {
                        const parsed = typeof template.content === 'string' && template.content.startsWith('{') 
                          ? JSON.parse(template.content) 
                          : { text: template.content, type: 'text', fileId: '', buttons: [] };
                        
                        setData({
                          text: parsed.text || '',
                          type: parsed.type || 'text',
                          fileId: parsed.fileId || '',
                          buttons: parsed.buttons || []
                        });
                      } catch (e) {
                        setData({
                          text: template.content || '',
                          type: 'text',
                          fileId: '',
                          buttons: []
                        });
                      }
                    }}
                    className="px-4 py-2 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/30 text-amber-400 text-sm font-medium whitespace-nowrap active:scale-95 transition-all"
                    type="button"
                  >
                    {template.name}
                  </button>
                ))}
              </div>
            )}

            <textarea
              id="modalMessageText"
              placeholder="Начните писать сообщение..."
              className="w-full min-h-[160px] px-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all text-base resize-vertical"
              value={data.text}
              onChange={(e) => setData(prev => ({ ...prev, text: e.target.value }))}
            />
            
            {/* Live Preview */}
            {data.text && (
              <div className="mt-3">
                <label className="text-xs font-medium text-slate-500 mb-2 block">Предпросмотр:</label>
                <MessagePreview content={JSON.stringify(data)} />
              </div>
            )}
          </div>

          {/* Inline Buttons Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-slate-300">Инлайн-кнопки</label>
              <button
                onClick={addButtonRow}
                className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white text-sm font-medium transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/25 active:scale-95"
                type="button"
              >
                <IconPlus className="w-4.5 h-4.5" />
                Добавить
              </button>
            </div>

            {data.buttons.map((row, rowIndex) => (
              <div key={rowIndex} className="space-y-3 p-4 rounded-2xl bg-white/5 border border-white/10">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-400">Ряд {rowIndex + 1}</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => addButtonToRow(rowIndex)}
                      className="p-2 rounded-xl text-emerald-400 hover:bg-emerald-500/10 hover:text-emerald-300 transition-all active:scale-95"
                      type="button"
                    >
                      <IconPlus className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => removeButtonRow(rowIndex)}
                      className="p-2 rounded-xl text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 transition-all active:scale-95"
                      type="button"
                    >
                      <IconTrash className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-3">
                  {row.map((btn, btnIndex) => {
                    const isUrlInvalid = btn.url && !isValidUrl(btn.url);
                    return (
                      <div key={btnIndex} className="space-y-2 p-3 rounded-xl bg-white/5">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] text-slate-500 font-medium">Кнопка {btnIndex + 1}</span>
                          {row.length > 1 && (
                            <button
                              onClick={() => removeButtonFromRow(rowIndex, btnIndex)}
                              className="text-slate-500 hover:text-rose-400 transition-all p-1 active:scale-95"
                              type="button"
                            >
                              <IconMinus className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                        <input
                          type="text"
                          placeholder="Текст кнопки"
                          className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all text-sm"
                          value={btn.text}
                          onChange={(e) => updateButton(rowIndex, btnIndex, 'text', e.target.value)}
                        />
                        <input
                          type="text"
                          placeholder="https://example.com"
                          className={`w-full px-3 py-2.5 bg-white/5 border rounded-xl text-white placeholder-slate-500 focus:outline-none transition-all text-sm ${
                            isUrlInvalid 
                              ? 'border-rose-500 focus:border-rose-400 focus:ring-2 focus:ring-rose-500/20' 
                              : 'border-white/10 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20'
                          }`}
                          value={btn.url}
                          onChange={(e) => updateButton(rowIndex, btnIndex, 'url', e.target.value)}
                        />
                        {isUrlInvalid && (
                          <p className="text-xs text-rose-400 flex items-center gap-1">
                            <IconWarning className="w-3 h-3" />
                            Неверный URL (должен начинаться с http:// или https://)
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3 px-5 py-4 sm:px-8 sm:py-6 border-t border-white/10 bg-gradient-to-t from-slate-900 to-slate-900 flex-shrink-0">
          <button
            onClick={onClose}
            className="px-6 py-3.5 rounded-2xl font-semibold text-slate-400 hover:text-white hover:bg-white/10 transition-all duration-200 active:scale-95"
            type="button"
          >
            Отмена
          </button>
          <button
            onClick={handleSave}
            className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl font-semibold text-white bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 transition-all duration-300 hover:shadow-xl hover:shadow-violet-500/30 active:scale-95"
            type="button"
          >
            <IconSave className="w-5 h-5" />
            Сохранить
          </button>
        </div>
      </div>
    </div>
  );
};

// Confirmation Modal
const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, message, confirmText, cancelText }) => {
  if (!isOpen) return null;
  
  // Format newlines in message
  const formattedMessage = message.split('\n').map((line, i) => (
    <span key={i}>
      {line}
      {i < message.split('\n').length - 1 && <br />}
    </span>
  ));
  
  return (
    <div className="fixed inset-0 z-[150] flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-fadeIn" onClick={onClose} />
      <div className="relative w-full max-w-md bg-gradient-to-br from-slate-900/98 to-slate-900 border-t sm:border border-white/10 sm:rounded-3xl rounded-t-3xl shadow-2xl overflow-hidden animate-slideUpFromBottom">
        <div className="p-6 sm:p-8 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center">
            <IconWarning className="w-8 h-8 text-amber-400" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
          <p className="text-slate-400 mb-6 whitespace-pre-line">{formattedMessage}</p>
          <div className="flex flex-col-reverse sm:flex-row gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 rounded-2xl text-slate-400 hover:text-white hover:bg-white/10 font-semibold transition-all"
            >
              {cancelText || 'Отмена'}
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 px-6 py-3 rounded-2xl font-semibold bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white shadow-lg hover:shadow-rose-500/25 transition-all active:scale-95"
            >
              {confirmText || 'Подтвердить'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Main App Component
export default function App() {
  const [activeTab, setActiveTab] = useState('stats');
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [config, setConfig] = useState(null);
  const [templates, setTemplates] = useState([]);
  const [autoReplies, setAutoReplies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [broadcastMessage, setBroadcastMessage] = useState('');
  const [newTemplate, setNewTemplate] = useState({ name: '', command: '', content: '' });
  const [editingTemplate, setEditingTemplate] = useState(null);
  
  // Modal States
  const [modalState, setModalState] = useState({ isOpen: false, mode: null, target: null, initialData: null });
  const [confirmState, setConfirmState] = useState({ isOpen: false, title: '', message: '', onConfirm: null });

  // Lock body scroll when modals are open
  useEffect(() => {
    if (modalState.isOpen || confirmState.isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [modalState.isOpen, confirmState.isOpen]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [statsRes, usersRes, configRes, templatesRes, autoRepliesRes] = await Promise.all([
        fetch('/api/stats').then(r => r.json()),
        fetch('/api/users').then(r => r.json()),
        fetch('/api/config').then(r => r.json()),
        fetch('/api/templates').then(r => r.json()),
        fetch('/api/auto-replies').then(r => r.json())
      ]);

      setStats(statsRes);
      setUsers(usersRes);
      setConfig(configRes);
      setTemplates(templatesRes);
      setAutoReplies(autoRepliesRes);
      setLoading(false);
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  };

  const toggleBlock = async (userId) => {
    try {
      await fetch(`/api/users/${userId}/toggle-block`, { method: 'POST' });
      loadData();
    } catch (e) {
      console.error(e);
    }
  };

  const saveConfig = async () => {
    try {
      await fetch('/api/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config)
      });
      alert('✅ Настройки сохранены!');
    } catch (e) {
      console.error(e);
    }
  };

  const openModal = (mode, target = null, initialData = null) => {
    setModalState({ isOpen: true, mode, target, initialData });
  };

  const closeModal = () => {
    setModalState({ isOpen: false, mode: null, target: null, initialData: null });
  };

  const handleModalSave = (data, templateData = null) => {
    const shouldSaveAsJson = (data.type !== 'text' && data.fileId) || (data.buttons && data.buttons.length > 0);
    const contentToSave = shouldSaveAsJson ? JSON.stringify(data) : data.text;
    
    // Validation: Check for empty content
    const hasContent = data.text?.trim() || (data.type !== 'text' && data.fileId);
    
    if (!hasContent) {
      alert('❌ Сообщение не может быть пустым!');
      return;
    }
    
    // Validate all button URLs
    if (data.buttons && data.buttons.length > 0) {
      for (let rowIdx = 0; rowIdx < data.buttons.length; rowIdx++) {
        const row = data.buttons[rowIdx];
        for (let btnIdx = 0; btnIdx < row.length; btnIdx++) {
          const btn = row[btnIdx];
          if (btn.url && !isValidUrl(btn.url)) {
            alert(`❌ Неверный URL в кнопке ${btnIdx + 1} ряда ${rowIdx + 1}!\nURL должен начинаться с http:// или https://`);
            return;
          }
        }
      }
    }

    if (modalState.mode === 'config' && modalState.target) {
      setConfig(prev => ({
        ...prev,
        [modalState.target]: contentToSave
      }));
    } else if (modalState.mode === 'template') {
      // Template validation
      if (!templateData?.name?.trim()) {
        alert('❌ Введите название шаблона!');
        return;
      }
      if (!templateData?.command?.trim()) {
        alert('❌ Введите команду для шаблона!');
        return;
      }
      createTemplate(contentToSave, templateData);
    } else if (modalState.mode === 'auto_reply') {
      if (!templateData?.command?.trim()) { // Используем command для ключевого слова
        alert('❌ Введите ключевое слово для автоответа!');
        return;
      }
      createAutoReply(contentToSave, templateData);
    } else if (modalState.mode === 'broadcast') {
      showConfirmAndSendBroadcast(contentToSave);
    }
    
    // Close the modal after handling
    closeModal();
  };

  const showConfirmAndSendBroadcast = (contentToSave) => {
    const count = stats?.totalUsers || 0;
    
    // First confirmation
    setConfirmState({
      isOpen: true,
      title: '⚠️ Подтвердите рассылку',
      message: `Вы действительно хотите отправить рассылку ${count} пользователям?\n\nЭто действие нельзя отменить. Проверьте содержимое сообщения перед отправкой.`,
      confirmText: 'Далее',
      cancelText: 'Отмена',
      onConfirm: () => {
        // Second confirmation
        setConfirmState({
          isOpen: true,
          title: '⚠️ ВНИМАНИЕ! Подтвердите рассылку',
          message: `Вы ABSOLUTELY уверены? Рассылка будет отправлена ${count} пользователям. Это действие НЕВОЗМОЖНО отменить!`,
          confirmText: '✅ ОТПРАВИТЬ РАССЫЛКУ',
          cancelText: 'Отмена',
          onConfirm: () => {
            sendBroadcast(contentToSave);
            setConfirmState({ ...confirmState, isOpen: false });
          }
        });
      }
    });
  };

  const createTemplate = async (content, templateData) => {
    try {
      if (editingTemplate) {
        await fetch(`/api/templates/${editingTemplate.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            name: templateData?.name || newTemplate.name, 
            command: templateData?.command || newTemplate.command, 
            content 
          })
        });
      } else {
        await fetch('/api/templates', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            name: templateData?.name || newTemplate.name, 
            command: templateData?.command || newTemplate.command, 
            content 
          })
        });
      }
      
      setNewTemplate({ name: '', command: '', content: '' });
      setEditingTemplate(null);
      loadData();
    } catch (e) {
      console.error(e);
    }
  };

  const sendBroadcast = async (content) => {
    try {
      await fetch('/api/broadcast', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: content })
      });
      setBroadcastMessage('');
      alert('✅ Рассылка отправлена!');
    } catch (e) {
      console.error(e);
    }
  };

  const deleteTemplate = async (id) => {
    try {
      await fetch(`/api/templates/${id}`, { method: 'DELETE' });
      loadData();
    } catch (e) {
      console.error(e);
    }
  };

  const createAutoReply = async (content, templateData) => {
    try {
      if (editingTemplate) {
        await fetch(`/api/auto-replies/${editingTemplate.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            keyword: templateData?.command || newTemplate.command, 
            content 
          })
        });
      } else {
        await fetch('/api/auto-replies', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            keyword: templateData?.command || newTemplate.command, 
            content 
          })
        });
      }
      
      setNewTemplate({ name: '', command: '', content: '' });
      setEditingTemplate(null);
      loadData();
    } catch (e) {
      console.error(e);
    }
  };

  const deleteAutoReply = async (id) => {
    try {
      await fetch(`/api/auto-replies/${id}`, { method: 'DELETE' });
      loadData();
    } catch (e) {
      console.error(e);
    }
  };

  const tabs = useMemo(() => [
    { id: 'stats', label: 'Статистика', icon: IconStats, gradient: 'from-emerald-500 to-cyan-500', glow: 'shadow-emerald-500/25' },
    { id: 'config', label: 'Настройки', icon: IconSettings, gradient: 'from-violet-500 to-fuchsia-500', glow: 'shadow-violet-500/25' },
    { id: 'users', label: 'Пользователи', icon: IconUser, gradient: 'from-blue-500 to-indigo-500', glow: 'shadow-blue-500/25' },
    { id: 'templates', label: 'Шаблоны', icon: IconTemplates, gradient: 'from-amber-500 to-orange-500', glow: 'shadow-amber-500/25' },
    { id: 'auto_replies', label: 'Автоответы', icon: IconAutoReplies, gradient: 'from-pink-500 to-rose-500', glow: 'shadow-pink-500/25' },
    { id: 'broadcast', label: 'Рассылка', icon: IconBroadcast, gradient: 'from-rose-500 to-pink-500', glow: 'shadow-rose-500/25' }
  ], []);

  // Loading Screen
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6">
        <div className="text-center space-y-8 animate-fadeIn">
          <div className="animate-float">
            <svg className="w-24 h-24 mx-auto" viewBox="0 0 24 24" fill="none">
              <defs>
                <linearGradient id="loadGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#8B5CF6"/>
                  <stop offset="100%" stopColor="#EC4899"/>
                </linearGradient>
              </defs>
              <circle cx="12" cy="12" r="9" stroke="url(#loadGrad)" strokeWidth="2.5" className="animate-spin"/>
              <circle cx="12" cy="12" r="5" fill="url(#loadGrad)" className="animate-pulse opacity-30"/>
            </svg>
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold text-white tracking-tight">Загрузка...</h2>
            <p className="text-slate-400">Подключаемся к базе данных</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 pb-8">
      {/* Modals */}
      <MessageEditorModal 
        isOpen={modalState.isOpen} 
        onClose={closeModal} 
        onSave={handleModalSave} 
        initialData={modalState.initialData} 
        mode={modalState.mode}
        initialTemplate={editingTemplate}
        templates={templates}
      />
      <ConfirmationModal isOpen={confirmState.isOpen} onClose={() => setConfirmState({ ...confirmState, isOpen: false })} onConfirm={confirmState.onConfirm} title={confirmState.title} message={confirmState.message} />
      
      {/* Maintenance Banner */}
      {config && config.maintenance_mode === '1' && (
        <div className="sticky top-0 z-40 bg-gradient-to-r from-amber-500 to-orange-600 py-4 px-6 shadow-lg shadow-orange-500/20 animate-pulse">
          <div className="max-w-5xl mx-auto flex items-center justify-center gap-3">
            <IconWarning className="w-6 h-6 text-white" />
            <span className="text-white font-semibold text-sm sm:text-base">Бот на техническом обслуживании</span>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="px-5 sm:px-6 pt-8 sm:pt-12 pb-6">
        <div className="max-w-5xl mx-auto">
          <div className="animate-slideDown">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center shadow-xl shadow-violet-500/30 p-1">
                <LottieLogo className="w-full h-full" />
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                  <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-rose-400 bg-clip-text text-transparent">Support Bot</span>
                </h1>
                <p className="text-slate-400 text-sm sm:text-base font-light">Панель управления</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="sticky top-0 z-30 bg-slate-950/80 backdrop-blur-xl border-b border-white/5 px-5 sm:px-6 py-3 sm:py-4 mb-6 sm:mb-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex gap-1.5 sm:gap-2 overflow-x-auto pb-1 snap-x scrollbar-hide">
            {tabs.map((tab, idx) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2.5 sm:gap-3 px-4 sm:px-5 py-3.5 sm:py-4 rounded-2xl font-medium whitespace-nowrap transition-all duration-300 snap-start ${
                    isActive ? `bg-gradient-to-r ${tab.gradient} text-white shadow-lg ${tab.glow}` : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 border border-white/10'
                  }`}
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-sm sm:text-base">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="px-5 sm:px-6">
        <div className="max-w-5xl mx-auto space-y-6">
          {/* Stats Tab */}
          {activeTab === 'stats' && stats && (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 animate-fadeIn">
              {[
                { value: stats.totalUsers, icon: LottieUser, label: 'Всего пользователей', gradient: 'from-blue-500 to-indigo-600', glow: 'shadow-blue-500/25', delay: 0 },
                { value: stats.blockedUsers, icon: LottieBlock, label: 'Заблокированных', gradient: 'from-rose-500 to-red-600', glow: 'shadow-rose-500/25', delay: 0.1 },
                { value: stats.totalTickets, icon: LottieTicket, label: 'Всего тикетов', gradient: 'from-violet-500 to-fuchsia-600', glow: 'shadow-violet-500/25', delay: 0.2 },
                { value: stats.closedTickets, icon: LottieComplete, label: 'Закрыто тикетов', gradient: 'from-emerald-500 to-cyan-600', glow: 'shadow-emerald-500/25', delay: 0.3 }
              ].map(({ value, icon: Icon, label, gradient, glow, delay }) => (
                <div key={label} className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-8 transition-all duration-500 hover:-translate-y-1 hover:bg-white/10 hover:shadow-xl animate-slideUp" style={{ animationDelay: `${delay}s` }}>
                  <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-10 group-hover:opacity-20 transition-opacity duration-500`} />
                  <div className="relative z-10">
                    <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${gradient} mb-5 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-9 h-9" />
                    </div>
                    <div className="text-4xl sm:text-5xl font-bold text-white mb-2 tracking-tight">{value}</div>
                    <p className="text-slate-400 text-sm sm:text-base font-medium">{label}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Config Tab */}
          {activeTab === 'config' && config && (
            <div className="space-y-4 sm:space-y-6 animate-fadeIn">
              {[
                { key: 'welcome_message', label: 'Приветственное сообщение', icon: '👋' },
                { key: 'ticket_created', label: 'Сообщение о создании тикета', icon: '✅' },
                { key: 'user_blocked', label: 'Сообщение о блокировке', icon: '🚫' },
                { key: 'maintenance_message', label: 'Сообщение техобслуживания', icon: '🔧' }
              ].map(({ key, label, icon }, idx) => (
                <div key={key} className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-5 sm:p-6 transition-all duration-300 hover:bg-white/10 animate-slideUp" style={{ animationDelay: `${idx * 0.1}s` }}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-2xl bg-white/10 flex items-center justify-center text-xl">{icon}</div>
                      <h3 className="text-base sm:text-lg font-semibold text-white">{label}</h3>
                    </div>
                    <button
                      onClick={() => openModal('config', key, config[key])}
                      className="flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white text-xs sm:text-sm font-medium transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/25 active:scale-95"
                      type="button"
                    >
                      <IconSettings className="w-4 h-4" />
                      Редактор
                    </button>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-slate-500 mb-2 block">Предпросмотр:</label>
                    <MessagePreview content={config[key]} />
                  </div>
                </div>
              ))}

              {/* Maintenance Toggle */}
              <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-5 sm:p-6 transition-all duration-300 hover:bg-white/10 animate-slideUp" style={{ animationDelay: '0.4s' }}>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                      config.maintenance_mode === '1' ? 'bg-gradient-to-br from-amber-500/20 to-orange-600/20' : 'bg-white/10'
                    }`}>
                      <IconWarning className={`w-7 h-7 ${config.maintenance_mode === '1' ? 'text-amber-400' : 'text-slate-400'}`} />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-semibold text-white mb-1">Режим техобслуживания</h3>
                      <p className="text-slate-400 text-xs sm:text-sm">
                        {config.maintenance_mode === '1' ? 'Бот сейчас не принимает сообщения' : 'Включите для временной приостановки работы'}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setConfig(prev => ({ ...prev, maintenance_mode: prev.maintenance_mode === '1' ? '0' : '1' }))}
                    className={`relative inline-flex h-12 w-24 sm:w-28 items-center rounded-3xl transition-all duration-500 ${
                      config.maintenance_mode === '1' ? 'bg-gradient-to-r from-amber-500 to-orange-600' : 'bg-slate-800'
                    }`}
                    type="button"
                  >
                    <span className={`inline-block h-9 w-9 sm:h-10 sm:w-10 mx-1.5 transform rounded-2xl bg-white shadow-lg transition-all duration-500 ${config.maintenance_mode === '1' ? 'translate-x-11 sm:translate-x-14' : ''}`} />
                    <span className="absolute inset-0 flex items-center justify-center text-[10px] sm:text-xs font-bold text-white pointer-events-none">
                      {config.maintenance_mode === '1' ? 'ВКЛ' : 'ВЫКЛ'}
                    </span>
                  </button>
                </div>
              </div>

              {/* Auto Close Toggle */}
              <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-5 sm:p-6 transition-all duration-300 hover:bg-white/10 animate-slideUp" style={{ animationDelay: '0.45s' }}>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                      config.auto_close_enabled === '1' ? 'bg-gradient-to-br from-violet-500/20 to-fuchsia-600/20' : 'bg-white/10'
                    }`}>
                      <IconTime className={`w-7 h-7 ${config.auto_close_enabled === '1' ? 'text-violet-400' : 'text-slate-400'}`} />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-semibold text-white mb-1">Автозакрытие тикетов</h3>
                      <p className="text-slate-400 text-xs sm:text-sm">
                        {config.auto_close_enabled === '1' ? 'Тикеты закрываются автоматически' : 'Отключено'}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setConfig(prev => ({ ...prev, auto_close_enabled: prev.auto_close_enabled === '1' ? '0' : '1' }))}
                    className={`relative inline-flex h-12 w-24 sm:w-28 items-center rounded-3xl transition-all duration-500 ${
                      config.auto_close_enabled === '1' ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600' : 'bg-slate-800'
                    }`}
                    type="button"
                  >
                    <span className={`inline-block h-9 w-9 sm:h-10 sm:w-10 mx-1.5 transform rounded-2xl bg-white shadow-lg transition-all duration-500 ${config.auto_close_enabled === '1' ? 'translate-x-11 sm:translate-x-14' : ''}`} />
                    <span className="absolute inset-0 flex items-center justify-center text-[10px] sm:text-xs font-bold text-white pointer-events-none">
                      {config.auto_close_enabled === '1' ? 'ВКЛ' : 'ВЫКЛ'}
                    </span>
                  </button>
                </div>
              </div>

              {/* Auto Close Minutes */}
              {config.auto_close_enabled === '1' && (
                <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-5 sm:p-6 transition-all duration-300 hover:bg-white/10 animate-slideUp" style={{ animationDelay: '0.48s' }}>
                  <h3 className="text-base sm:text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <IconTime className="w-5 h-5 text-violet-400" />
                    Время неактивности
                  </h3>
                  <div className="flex flex-col gap-3">
                    <input
                      type="number"
                      min="1"
                      placeholder="Количество минут"
                      className="w-full px-4 sm:px-5 py-3.5 sm:py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all text-sm sm:text-base"
                      value={config.auto_close_minutes}
                      onChange={(e) => setConfig(prev => ({ ...prev, auto_close_minutes: e.target.value }))}
                    />
                    <p className="text-xs text-slate-500">
                      Через сколько минут без активности закрывать тикет
                    </p>
                  </div>
                </div>
              )}

              {/* Auto Close Message */}
              {config.auto_close_enabled === '1' && (
                <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-5 sm:p-6 transition-all duration-300 hover:bg-white/10 animate-slideUp" style={{ animationDelay: '0.5s' }}>
                  <h3 className="text-base sm:text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <IconSettings className="w-5 h-5 text-violet-400" />
                    Сообщение автозакрытия
                  </h3>
                  <div className="space-y-3">
                    <textarea
                      className="w-full min-h-[100px] px-4 sm:px-5 py-3.5 sm:py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all resize-vertical text-sm sm:text-base"
                      value={config.auto_close_message}
                      onChange={(e) => setConfig(prev => ({ ...prev, auto_close_message: e.target.value }))}
                    />
                    <button
                      onClick={() => openModal('config', 'auto_close_message', config.auto_close_message)}
                      className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-white/10 hover:bg-white/15 text-violet-400 hover:text-violet-300 font-medium transition-all text-sm active:scale-95"
                      type="button"
                    >
                      <IconSettings className="w-4.5 h-4.5" />
                      Расширенный редактор
                    </button>
                  </div>
                </div>
              )}

              {/* Antispam Toggle */}
              <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-5 sm:p-6 transition-all duration-300 hover:bg-white/10 animate-slideUp" style={{ animationDelay: '0.55s' }}>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                      config.antispam_enabled === '1' ? 'bg-gradient-to-br from-amber-500/20 to-orange-600/20' : 'bg-white/10'
                    }`}>
                      <IconTime className={`w-7 h-7 ${config.antispam_enabled === '1' ? 'text-amber-400' : 'text-slate-400'}`} />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-semibold text-white mb-1">Антиспам</h3>
                      <p className="text-slate-400 text-xs sm:text-sm">
                        {config.antispam_enabled === '1' ? 'Защита от спама включена' : 'Антиспам отключен'}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setConfig(prev => ({ ...prev, antispam_enabled: prev.antispam_enabled === '1' ? '0' : '1' }))}
                    className={`relative inline-flex h-12 w-24 sm:w-28 items-center rounded-3xl transition-all duration-500 ${
                      config.antispam_enabled === '1' ? 'bg-gradient-to-r from-amber-500 to-orange-600' : 'bg-slate-800'
                    }`}
                    type="button"
                  >
                    <span className={`inline-block h-9 w-9 sm:h-10 sm:w-10 mx-1.5 transform rounded-2xl bg-white shadow-lg transition-all duration-500 ${config.antispam_enabled === '1' ? 'translate-x-11 sm:translate-x-14' : ''}`} />
                    <span className="absolute inset-0 flex items-center justify-center text-[10px] sm:text-xs font-bold text-white pointer-events-none">
                      {config.antispam_enabled === '1' ? 'ВКЛ' : 'ВЫКЛ'}
                    </span>
                  </button>
                </div>
              </div>

              {/* Antispam Interval */}
              {config.antispam_enabled === '1' && (
                <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-5 sm:p-6 transition-all duration-300 hover:bg-white/10 animate-slideUp" style={{ animationDelay: '0.58s' }}>
                  <h3 className="text-base sm:text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <IconTime className="w-5 h-5 text-violet-400" />
                    Интервал антиспама
                  </h3>
                  <div className="flex flex-col gap-3">
                    <input
                      type="number"
                      min="1"
                      placeholder="Количество секунд"
                      className="w-full px-4 sm:px-5 py-3.5 sm:py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all text-sm sm:text-base"
                      value={config.antispam_interval}
                      onChange={(e) => setConfig(prev => ({ ...prev, antispam_interval: e.target.value }))}
                    />
                    <p className="text-xs text-slate-500">
                      Минимальный интервал между сообщениями в секундах
                    </p>
                  </div>
                </div>
              )}

              {/* Antispam Message */}
              {config.antispam_enabled === '1' && (
                <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-5 sm:p-6 transition-all duration-300 hover:bg-white/10 animate-slideUp" style={{ animationDelay: '0.6s' }}>
                  <h3 className="text-base sm:text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <IconSettings className="w-5 h-5 text-violet-400" />
                    Сообщение антиспама
                  </h3>
                  <div className="space-y-3">
                    <textarea
                      className="w-full min-h-[100px] px-4 sm:px-5 py-3.5 sm:py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all resize-vertical text-sm sm:text-base"
                      value={config.antispam_message}
                      onChange={(e) => setConfig(prev => ({ ...prev, antispam_message: e.target.value }))}
                    />
                    <button
                      onClick={() => openModal('config', 'antispam_message', config.antispam_message)}
                      className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-white/10 hover:bg-white/15 text-violet-400 hover:text-violet-300 font-medium transition-all text-sm active:scale-95"
                      type="button"
                    >
                      <IconSettings className="w-4.5 h-4.5" />
                      Расширенный редактор
                    </button>
                  </div>
                </div>
              )}

              {/* Blocked Message Types */}
              <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-5 sm:p-6 transition-all duration-300 hover:bg-white/10 animate-slideUp" style={{ animationDelay: '0.65s' }}>
                <h3 className="text-base sm:text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <IconSettings className="w-5 h-5 text-violet-400" />
                  Блокировка типов сообщений
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { key: 'block_text', label: 'Текст', desc: 'Блокировать текстовые сообщения' },
                    { key: 'block_photo', label: 'Фото', desc: 'Блокировать фотографии' },
                    { key: 'block_document', label: 'Документы', desc: 'Блокировать файлы' },
                    { key: 'block_video', label: 'Видео', desc: 'Блокировать видеофайлы' },
                    { key: 'block_audio', label: 'Аудио', desc: 'Блокировать музыку' },
                    { key: 'block_voice', label: 'Голосовые', desc: 'Блокировать голосовые сообщения' },
                    { key: 'block_video_note', label: 'Кружочки', desc: 'Блокировать видеосообщения' },
                    { key: 'block_sticker', label: 'Стикеры', desc: 'Блокировать стикеры' },
                    { key: 'block_animation', label: 'GIF', desc: 'Блокировать анимации' }
                  ].map((item, idx) => (
                    <div key={item.key} className="flex items-center justify-between gap-4 p-3 rounded-2xl bg-white/5">
                      <div>
                        <h4 className="text-sm font-semibold text-white">{item.label}</h4>
                        <p className="text-xs text-slate-400">{item.desc}</p>
                      </div>
                      <button
                        onClick={() => setConfig(prev => ({ ...prev, [item.key]: prev[item.key] === '1' ? '0' : '1' }))}
                        className={`relative inline-flex h-10 w-20 items-center rounded-2xl transition-all duration-500 ${
                          config[item.key] === '1' ? 'bg-gradient-to-r from-rose-600 to-red-600' : 'bg-slate-800'
                        }`}
                        type="button"
                      >
                        <span className={`inline-block h-8 w-8 mx-1 transform rounded-xl bg-white shadow-lg transition-all duration-500 ${config[item.key] === '1' ? 'translate-x-10' : ''}`} />
                        <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-white pointer-events-none">
                          {config[item.key] === '1' ? 'ЗАБ' : 'ДОП'}
                        </span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Save Config */}
              <button
                onClick={saveConfig}
                className="flex items-center justify-center gap-3 w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 rounded-3xl text-white text-base sm:text-lg font-semibold bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 transition-all duration-300 hover:shadow-2xl hover:shadow-violet-500/30 hover:-translate-y-0.5 animate-slideUp"
                style={{ animationDelay: '0.7s' }}
                type="button"
              >
                <IconSave className="w-6 h-6" />
                Сохранить все настройки
              </button>
            </div>
          )}

          {/* Users Tab */}
          {activeTab === 'users' && (
            <div className="space-y-3 sm:space-y-4 animate-fadeIn">
              {users.map((user, idx) => (
                <div key={user.id} className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-5 sm:p-6 transition-all duration-300 hover:bg-white/10 hover:shadow-xl animate-slideUp" style={{ animationDelay: `${idx * 0.05}s` }}>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center text-2xl sm:text-3xl font-bold text-white flex-shrink-0">
                        {user.first_name?.charAt(0) || 'U'}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-base sm:text-lg font-semibold text-white truncate">{user.first_name} {user.last_name}</span>
                          {user.username && <span className="text-slate-500 font-mono text-xs sm:text-sm truncate">@{user.username}</span>}
                        </div>
                        <p className="text-slate-500 font-mono text-xs sm:text-sm mt-1">ID: {user.id}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => toggleBlock(user.id)}
                      className={`flex items-center gap-2 w-full sm:w-auto justify-center px-5 py-3 rounded-2xl font-semibold transition-all duration-300 text-sm sm:text-base ${
                        user.is_blocked ? 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white hover:shadow-lg hover:shadow-emerald-500/25 active:scale-95' : 'bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white hover:shadow-lg hover:shadow-rose-500/25 active:scale-95'
                      }`}
                      type="button"
                    >
                      {user.is_blocked ? <><IconCheck className="w-5 h-5" />Разблокировать</> : <><IconBan className="w-5 h-5" />Заблокировать</>}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Templates Tab */}
          {activeTab === 'templates' && (
            <div className="space-y-6 sm:space-y-8 animate-fadeIn">
              {/* Add Template */}
              <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-5 sm:p-8 transition-all duration-300 hover:bg-white/10">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 flex items-center justify-center">
                      <IconPlus className="w-5 h-5 text-violet-400" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-semibold text-white">Шаблоны</h3>
                  </div>
                  <button
                    onClick={() => {
                      setEditingTemplate(null);
                      openModal('template', null, '');
                    }}
                    className="flex items-center gap-2.5 px-8 py-4 rounded-2xl text-white font-semibold bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 transition-all duration-300 hover:shadow-xl hover:shadow-violet-500/30 active:scale-95"
                    type="button"
                  >
                    <IconPlus className="w-5 h-5" />
                    Добавить шаблон
                  </button>
                </div>
              </div>

              {/* Templates List */}
              <div className="space-y-3 sm:space-y-4">
                {templates.map((template, idx) => (
                  <div key={template.id} className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-5 sm:p-6 transition-all duration-300 hover:bg-white/10 hover:shadow-xl animate-slideUp" style={{ animationDelay: `${idx * 0.05}s` }}>
                    <div className="flex flex-col sm:flex-row items-start justify-between gap-4 mb-4">
                      <div className="flex items-center gap-4">
                        <div className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-400 font-mono font-bold text-xs sm:text-sm">
                          /{template.command}
                        </div>
                        <span className="text-base sm:text-lg font-semibold text-white">{template.name}</span>
                      </div>
                      <div className="flex items-center gap-3 w-full sm:w-auto">
                        <button
                          onClick={() => {
                            setEditingTemplate(template);
                            openModal('template', null, template.content);
                          }}
                          className="p-3 rounded-2xl text-violet-400 hover:bg-violet-500/10 hover:text-violet-300 transition-all w-full sm:w-auto justify-center active:scale-95"
                          type="button"
                        >
                          <IconSettings className="w-6 h-6" />
                        </button>
                        <button
                          onClick={() => deleteTemplate(template.id)}
                          className="p-3 rounded-2xl text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 transition-all w-full sm:w-auto justify-center active:scale-95"
                          type="button"
                        >
                          <IconTrash className="w-6 h-6" />
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-slate-500 mb-2 block">Предпросмотр:</label>
                      <MessagePreview content={template.content} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Auto Replies Tab */}
          {activeTab === 'auto_replies' && (
            <div className="space-y-6 sm:space-y-8 animate-fadeIn">
              <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-5 sm:p-8 transition-all duration-300 hover:bg-white/10">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-pink-500/20 to-rose-500/20 flex items-center justify-center">
                      <IconAutoReplies className="w-5 h-5 text-pink-400" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-semibold text-white">Автоответы</h3>
                  </div>
                  <button
                    onClick={() => {
                      setEditingTemplate(null);
                      openModal('auto_reply', null, '');
                    }}
                    className="flex items-center gap-2.5 px-8 py-4 rounded-2xl text-white font-semibold bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 transition-all duration-300 hover:shadow-xl hover:shadow-pink-500/30 active:scale-95"
                    type="button"
                  >
                    <IconPlus className="w-5 h-5" />
                    Добавить автоответ
                  </button>
                </div>
              </div>

              {/* Auto Replies List */}
              <div className="space-y-3 sm:space-y-4">
                {autoReplies.map((reply, idx) => (
                  <div key={reply.id} className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-5 sm:p-6 transition-all duration-300 hover:bg-white/10 hover:shadow-xl animate-slideUp" style={{ animationDelay: `${idx * 0.05}s` }}>
                    <div className="flex flex-col sm:flex-row items-start justify-between gap-4 mb-4">
                      <div className="flex items-center gap-4">
                        <div className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-pink-500/20 to-rose-500/20 text-pink-400 font-mono font-bold text-xs sm:text-sm">
                          "{reply.keyword}"
                        </div>
                      </div>
                      <div className="flex items-center gap-3 w-full sm:w-auto">
                        <button
                          onClick={() => {
                            // Using editingTemplate state but adapted for auto-reply
                            setEditingTemplate({ id: reply.id, command: reply.keyword });
                            openModal('auto_reply', null, reply.content);
                          }}
                          className="p-3 rounded-2xl text-violet-400 hover:bg-violet-500/10 hover:text-violet-300 transition-all w-full sm:w-auto justify-center active:scale-95"
                          type="button"
                        >
                          <IconSettings className="w-6 h-6" />
                        </button>
                        <button
                          onClick={() => deleteAutoReply(reply.id)}
                          className="p-3 rounded-2xl text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 transition-all w-full sm:w-auto justify-center active:scale-95"
                          type="button"
                        >
                          <IconTrash className="w-6 h-6" />
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-slate-500 mb-2 block">Предпросмотр ответа:</label>
                      <MessagePreview content={reply.content} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Broadcast Tab */}
          {activeTab === 'broadcast' && (
            <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-5 sm:p-8 transition-all duration-300 hover:bg-white/10 animate-fadeIn">
              <h3 className="text-xl sm:text-2xl font-semibold text-white mb-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-rose-500/20 to-pink-500/20 flex items-center justify-center">
                  <IconBroadcast className="w-5 h-5 text-rose-400" />
                </div>
                Рассылка сообщений
                {stats && <span className="text-xs text-slate-500 ml-auto bg-white/10 px-3 py-1 rounded-full">Получателей: {stats.totalUsers}</span>}
              </h3>
              <div className="space-y-5">
                <textarea
                  placeholder="Напишите сообщение для всех пользователей..."
                  className="w-full min-h-[200px] px-4 sm:px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all resize-vertical text-sm sm:text-base"
                  value={broadcastMessage}
                  onChange={(e) => setBroadcastMessage(e.target.value)}
                />
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <button
                    onClick={() => openModal('broadcast', null, broadcastMessage)}
                    className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/15 text-violet-400 hover:text-violet-300 font-medium transition-all text-sm sm:text-base active:scale-95"
                    type="button"
                  >
                    <IconSettings className="w-4.5 h-4.5" />
                    Расширенный редактор
                  </button>
                  <button
                    onClick={() => openModal('broadcast', null, broadcastMessage)}
                    className="flex items-center justify-center gap-3 px-8 py-4 rounded-2xl text-white font-semibold bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 transition-all duration-300 hover:shadow-xl hover:shadow-rose-500/30 w-full sm:w-auto active:scale-95"
                    type="button"
                  >
                    <IconBroadcast className="w-6 h-6" />
                    Отправить рассылку
                  </button>
                </div>
                {broadcastMessage && (
                  <div className="pt-2">
                    <label className="text-xs font-medium text-slate-500 mb-2 block">Предпросмотр:</label>
                    <MessagePreview content={broadcastMessage} />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Global Styles */}
      <style>{`
        /* Animations */
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideUpFromBottom {
          from { opacity: 0; transform: translateY(100%); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        
        .animate-fadeIn { animation: fadeIn 0.5s ease-out forwards; }
        .animate-slideDown { animation: slideDown 0.5s ease-out forwards; }
        .animate-slideUp { animation: slideUp 0.5s ease-out forwards; opacity: 0; }
        .animate-slideUpFromBottom { animation: slideUpFromBottom 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards; }
        .animate-float { animation: float 4s ease-in-out infinite; }
        .animate-spin { animation: spin 2s linear infinite; }
        .animate-pulse { animation: pulse 2s ease-in-out infinite; }
        
        /* Custom Scrollbar */
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.15); }
        
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
