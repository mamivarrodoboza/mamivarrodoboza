import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const PDFViewer = dynamic(() => import('../components/pdf-viewer'), {
  ssr: false,
});

function AdatkezelesiTajekoztato() {
  const [pdfWidth, setPdfWidth] = useState(350);
  // const [device, setDevice] = useState('desktop');

  const checkDevice = () => {
    if (window.innerWidth < 3000) {
      // setDevice('monitor');
      setPdfWidth(1100);
    }
    if (window.innerWidth < 1200) {
      // setDevice('desktop');
      setPdfWidth(900);
    }
    if (window.innerWidth < 1024) {
      // setDevice('tablet');
      setPdfWidth(700);
    }
    if (window.innerWidth < 768) {
      // setDevice('mobile-large');
      setPdfWidth(400);
    }
    if (window.innerWidth < 510) {
      // setDevice('mobile-small');
      setPdfWidth(340);
    }
  };

  useEffect(() => {
    checkDevice();
  }, []);

  return (
    <section className="w-full min-h-screen flex justify-center py-8">
      <PDFViewer pdfWidth={pdfWidth} />
    </section>
  );
}

export default AdatkezelesiTajekoztato;
