import { GameMapper } from '../../game';
import { PositionMapper } from '../../position';
import { Bishop, King, Knight, Pawn, Piece, Queen, Rook } from '../core';
import { PieceEntity, PieceType } from './piece.entity';
import { PieceDTO } from '../API/piece.dto';

export class PieceMapper {
  public static toDTO(piece: Piece): PieceDTO {
    return new PieceDTO(piece.getColor(), piece.constructor.name);
  }

  public static toDomain(pieceEntity: PieceEntity): Piece {
    const pieceTypes = {
      King,
      Queen,
      Pawn,
      Bishop,
      Knight,
      Rook,
    };
    const piece = new pieceTypes[pieceEntity.type](
      pieceEntity.color,
      PositionMapper.toDomain(pieceEntity.position)
    );
    piece.setId(pieceEntity.id);
    return piece;
  }

  public static toPersistence(piece: Piece): PieceEntity {
    const pieceEntity = new PieceEntity();
    if (piece.getId()) pieceEntity.id = piece.getId();
    pieceEntity.game = GameMapper.toPersistence(piece.getBoard().getGame());
    const position = piece.getPosition();
    pieceEntity.position = { file: position.getFile(), rank: position.getRank() };
    pieceEntity.color = piece.getColor();
    pieceEntity.type = piece.constructor.name as PieceType;
    return pieceEntity;
  }
}
