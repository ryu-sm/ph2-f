import { useEffect, useState } from 'react';

export const PdfPreviewPage = () => {
  const [pdfUrl, setPdfUrl] = useState('');

  useEffect(() => {
    const fileData = localStorage.getItem('fileData');
    const fileName = localStorage.getItem('fileName');
    document.title = fileName;
    document.body.style.margin = '0';
    document.body.style.padding = '0';

    if (fileData) {
      const pdfData = atob(fileData.split(',')[1]);
      const byteNumbers = new Array(pdfData.length);
      for (let i = 0; i < pdfData.length; i++) {
        byteNumbers[i] = pdfData.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: 'application/pdf' });
      const blobUrl = URL.createObjectURL(blob);
      setPdfUrl(blobUrl);

      return () => {
        URL.revokeObjectURL(blobUrl);
      };
    }
  }, []);

  return (
    <>
      {pdfUrl && (
        <iframe
          src={pdfUrl}
          style={{
            width: '100%',
            height: '100vh',
            border: 'none',
          }}
          title={document.title}
        />
      )}
    </>
  );
};
