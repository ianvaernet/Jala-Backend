import { PieceMapper } from '../../piece';
import { File, Position, Rank } from '../core';
import { PositionResponseDTO } from '../API/positionResponse.dto';

export class PositionMapper {
  static toDTO(position: Position): PositionResponseDTO {
    const positionDTO = new PositionResponseDTO();
    positionDTO.file = position.getFile();
    positionDTO.rank = position.getRank();
    const occupiedBy = position.getOccupiedBy();
    positionDTO.occupiedBy = occupiedBy ? PieceMapper.toDTO(occupiedBy) : null;
    return positionDTO;
  }

  static toDomain({ file, rank }: { file: File; rank: Rank }) {
    return new Position(file, rank);
  }
}
