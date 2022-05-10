import { PDFExportable } from './PDFexportable';
import { SVGExportable } from './SVGExportable';

export class InvoiceExporter implements PDFExportable, SVGExportable {
  constructor(public invoice: Invoice) {}

  toPDF() {
    const pdf = new PDF();
    pdf.addText(this.invoice.book.title, { x: 100, y: 50 });
    pdf.addText(this.invoice.book.quantity, { x: 150, y: 50 });
    pdf.addText(this.invoice.tax, { x: 200, y: 100 });
    pdf.addText(this.invoice.total, { x: 200, y: 150 });
    return pdf;
  }

  toSVG() {
    const svg = new SVG();
    this.invoice.book.title.forEach((character) => svg.addLine(char, 100, 100, 200, 200));
    return svg;
  }
}
