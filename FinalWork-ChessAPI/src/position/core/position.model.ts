import { Piece } from '../../piece';

export type File = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H';
export type FileNumber = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
export type Rank = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
const CHAR_CODE_FOR_A = 65;

export class Position {
  private file: File;
  private occupiedBy: Piece;

  constructor(file: File | FileNumber, private rank: Rank) {
    if (typeof file === 'number') {
      this.file = String.fromCharCode(CHAR_CODE_FOR_A + file) as File;
    } else {
      this.file = file;
    }
  }

  getFile() {
    return this.file;
  }

  getFileAsNumber() {
    return this.file.charCodeAt(0) - CHAR_CODE_FOR_A;
  }

  getRank() {
    return this.rank;
  }

  getOccupiedBy() {
    return this.occupiedBy;
  }

  setOccupiedBy(piece: Piece) {
    this.occupiedBy = piece;
  }

  isEmpty() {
    return this.occupiedBy === null;
  }
}
