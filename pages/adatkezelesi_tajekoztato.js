import React from 'react';
import dynamic from 'next/dynamic';

const PDFViewer = dynamic(() => import('../components/pdf-viewer'), {
  ssr: false,
});

function AdatkezelesiTajekoztato() {
  return (
    <section>
      <PDFViewer />
    </section>
  );
}

export default AdatkezelesiTajekoztato;
