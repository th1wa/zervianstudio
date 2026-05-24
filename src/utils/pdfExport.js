import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

// element: DOM node to export
export async function exportElementToPdf(element, fileName = 'document.pdf') {
  if (!element) throw new Error('No element provided for PDF export');

  const originalBackground = element.style.backgroundColor;

  // ensure white background for PDF clarity
  element.style.backgroundColor = getComputedStyle(document.body).backgroundColor || '#ffffff';

  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    allowTaint: false,
  });

  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF('p', 'pt', 'a4');
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = pdf.internal.pageSize.getHeight();

  const imgWidth = canvas.width;
  const imgHeight = canvas.height;
  const ratio = imgWidth / pdfWidth;
  const renderedHeight = imgHeight / ratio;

  let position = 0;
  pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, renderedHeight);

  // Add additional pages if necessary
  let heightLeft = renderedHeight - pdfHeight;
  while (heightLeft > 0) {
    position = heightLeft - renderedHeight;
    pdf.addPage();
    pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, renderedHeight);
    heightLeft -= pdfHeight;
  }

  // restore
  element.style.backgroundColor = originalBackground;

  pdf.save(fileName);
}

export default exportElementToPdf;
