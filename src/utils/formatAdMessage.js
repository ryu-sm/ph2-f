export const formatAdMessage = (inputText) => {
  let escapedText = inputText.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  escapedText = escapedText.replace(/\n/g, '<br>');

  const markdownLinkPattern = /\[([^\]]+)\]\((https?:\/\/[^\s]+)\)/g;
  const formattedText = escapedText.replace(markdownLinkPattern, (match, text, url) => {
    try {
      const domain = new URL(url).hostname;
      return `${text} <a href="${url}" target="_blank">${domain}</a>`;
    } catch (error) {
      return match;
    }
  });

  return `<span>${formattedText}</span>`;
};
