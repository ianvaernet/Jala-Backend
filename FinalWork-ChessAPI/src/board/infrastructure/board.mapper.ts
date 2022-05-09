import { Board } from '../core';
import { PieceMapper } from '../../piece';
import { PositionResponseDTO, PositionMapper } from '../../position';
import { GameEntity } from '../../game';

export class BoardMapper {
  static toDTO(board: Board): PositionResponseDTO[] {
    return board.getGrid().map((position) => PositionMapper.toDTO(position));
  }

  static toDomain(gameEntity: GameEntity): Board {
    const pieces = gameEntity.pieces?.map((pieceEntity) => PieceMapper.toDomain(pieceEntity));
    return new Board(pieces);
  }
}
