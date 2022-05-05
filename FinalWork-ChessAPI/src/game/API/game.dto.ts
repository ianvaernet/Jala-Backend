import { PositionDTO } from '../../position';

export class GameDTO {
  constructor(public status: string, public board: PositionDTO[], public turn: string) {}
}
