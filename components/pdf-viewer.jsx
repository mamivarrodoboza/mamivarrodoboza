/* eslint-disable react/jsx-no-bind */
import { useState } from 'react';
// import default react-pdf entry
import { Document, Page, pdfjs } from 'react-pdf';

// import pdf worker as a url, see `next.config.js` and `pdf-worker.js`
import workerSrc from '../pdf-worker';

pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

export default function PDFViewer({ pdfWidth }) {
  const [numPages, setNumPages] = useState(null);

  function onDocumentLoadSuccess({ numPages: nextNumPages }) {
    setNumPages(nextNumPages);
  }

  // const { setTemporaryModalIsVisible } = useContext(PresaleContext);

  return (
    <div className="">
      <Document
        file="/adatkezelesi_nyilatkozat.pdf"
        onLoadSuccess={onDocumentLoadSuccess}
      >
        {Array.from({ length: numPages }, (_, index) => (
          <Page
            key={`page_${index + 1}`}
            pageNumber={index + 1}
            renderAnnotationLayer={false}
            renderTextLayer={false}
            width={pdfWidth}
          />
        ))}
      </Document>
    </div>
  );
}
