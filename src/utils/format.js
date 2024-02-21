export function formatMessageInput(inputText) {
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
