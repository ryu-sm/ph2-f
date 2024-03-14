export const downloadImageAsync = async (imageUrl, desiredFilename = 'desiredFilename.png') => {
  const response = await fetch(imageUrl);
  const blob = await response.blob();

  const blobUrl = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = blobUrl;
  a.download = desiredFilename;
  document.body.appendChild(a);
  a.click();

  document.body.removeChild(a);
  URL.revokeObjectURL(blobUrl);
};
