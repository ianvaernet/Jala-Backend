import { GameMapper } from '../../game';
import { PositionMapper } from '../../position';
import { King, Piece, Queen } from '../core';
import { PieceEntity, PieceType } from '../infrastructure';
import { PieceDTO } from './piece.dto';

export class PieceMapper {
  public static toDTO(piece: Piece): PieceDTO {
    return new PieceDTO(piece.getColor(), piece.constructor.name);
  }

  public static toDomain(pieceEntity: PieceEntity): Piece {
    const pieceTypes = {
      King: King,
      Queen: Queen,
      Pawn: Queen,
      Bishop: Queen,
      Knight: Queen,
      Rook: Queen,
    };
    return new pieceTypes[pieceEntity.type](pieceEntity.color, PositionMapper.toDomain(pieceEntity.position));
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
