import { Board } from '../core';
import { PieceMapper } from '../../piece';
import { FileNumber, Position, PositionDTO, PositionMapper, Rank } from '../../position';
import { GameEntity } from '../../game';

export class BoardMapper {
  static toDTO(board: Board): PositionDTO[] {
    return board.getGrid().map((position) => PositionMapper.toDTO(position));
  }

  static toDomain(gameEntity: GameEntity): Board {
    const grid: Position[] = [];
    for (let file: FileNumber = 0; file < 8; file++) {
      for (let rank: Rank = 1; rank < 9; rank++) {
        grid.push(new Position(file as FileNumber, rank as Rank));
      }
    }
    gameEntity.pieces?.forEach((pieceEntity) => {
      const piece = PieceMapper.toDomain(pieceEntity);
      grid[piece.getPosition().getFileAsNumber() * 8 + piece.getPosition().getRank() - 1].setOccupiedBy(piece);
    });
    return new Board(grid);
  }
}
