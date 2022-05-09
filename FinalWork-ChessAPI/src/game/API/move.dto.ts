import { Color } from '../../piece';
import { PositionDTO } from '../../position';

export class MoveDTO {
  constructor(public color: Color, public from: PositionDTO, public to: PositionDTO) {}
}
