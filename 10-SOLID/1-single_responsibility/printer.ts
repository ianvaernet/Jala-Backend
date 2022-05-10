import { PDFExportable } from './PDFexportable';

export class Printer {
  print(printable: PDFExportable, size: 'string') {
    const pdf = printable.toPDF();
    printerAPI.print(pdf, size);
    console.log('Printing...');
  }
}
