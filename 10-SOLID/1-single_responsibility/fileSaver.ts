export class FileSaver {
  saveFile(file: File, name: string) {
    FileAPI.save(file, name);
    console.log('Saving to PDF...');
  }
}
