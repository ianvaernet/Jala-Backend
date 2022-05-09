import { PDFExportable } from './PDFexportable';

export class FileSaver {
  saveToPDF(exportable: PDFExportable, name: string, antialiasing = false) {
    FileAPI.save(exportable.toPDF(), `${name}.pdf`, antialiasing);
    console.log('Saving to PDF...');
  }

  saveToSVG(exportable: SVGExportable, name: string) {
    FileAPI.save(exportable.toPNG(), `${name}.png`);
    console.log('Saving to PNG...');
  }
}
