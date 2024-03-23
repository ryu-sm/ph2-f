import { dayjs } from '@/libs';

export function formatApMessage(inputText) {
  let escapedText = inputText.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  let formattedText = escapedText.replace(/\n/g, '<br>');

  formattedText = formattedText.replace(/(https?:\/\/[^\s]+)/g, (url) => {
    try {
      const domain = new URL(url).hostname;
      return `<a href="${url}" target="_blank">${domain}</a>`;
    } catch (error) {
      return url;
    }
  });
  return `<span>${formattedText}</span>`;
}

export function formatTimeMessage(dateTimeString) {
  dayjs.locale('ja');
  return dayjs(dateTimeString).format('MM月DD日 (ddd) HH:mm');
}

export const formatAdMessage = (inputText) => {
  let escapedText = inputText.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  escapedText = escapedText.replace(/\n/g, '<br>');

  const markdownLinkPattern = /\[([^\]]+)\]\((https?:\/\/[^\s]+)\)/g;
  const formattedText = escapedText.replace(markdownLinkPattern, (match, text, url) => {
    try {
      return `<a href="${url}" target="_blank">${text}</a>`;
    } catch (error) {
      return match;
    }
  });

  return `<span>${formattedText}</span>`;
};
