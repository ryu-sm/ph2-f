import JSZip from 'jszip';
import { saveAs } from 'file-saver';

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

export const downloadImageZipAsync = async (files, zipName) => {
  const zip = new JSZip();
  const folder = zip.folder(`${zipName}`);
  files.forEach(async (item) => {
    const response = await fetch(item?.src);
    const blob = await response.blob();
    folder.file(item?.name, blob);
  });
  await Promise.all(
    files.map(async (item) => {
      const response = await fetch(item?.src);
      const blob = await response.blob();
      folder.file(item?.name, blob);
    })
  );
  zip.generateAsync({ type: 'blob' }).then((content) => {
    saveAs(content, `${zipName}.zip`);
  });
};

export const downloadExcelAsync = async (excelUrl, excelName = 'data.xlsx') => {
  const response = await fetch(excelUrl);
  const blob = await response.blob();

  const blobUrl = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = blobUrl;
  a.download = excelName;
  document.body.appendChild(a);
  a.click();

  document.body.removeChild(a);
  URL.revokeObjectURL(blobUrl);
};
