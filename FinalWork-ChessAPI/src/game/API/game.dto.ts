import { PositionResponseDTO } from '../../position';

export class GameDTO {
  constructor(public status: string, public board: PositionResponseDTO[], public turn: string) {}
}
