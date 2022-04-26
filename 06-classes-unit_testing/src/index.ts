import Piece from "./piece";
import King from "./king";
import Position from "./position";

class Game { }

const king = new King('White', 'A', 1);
console.log(king.canMove(new Position('B', 2)));
console.log(king.canMove(new Position('D', 2)));

// class King extends Piece { }
// class Queen extends Piece { }
// class Bishop extends Piece { }
// class Rook extends Piece { }
// class Pawn extends Piece { }
// class knight extends Piece { }

//new Piece('Black', 'A', 1);