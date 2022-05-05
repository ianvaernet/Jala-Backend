import { Game } from '../../game';
import { Position } from '../../position';

export class Board {
  private game: Game;
  constructor(private grid: Position[]) {
    grid.forEach((position) => {
      if (position.getOccupiedBy()) position.getOccupiedBy().setBoard(this);
    });
  }

  getGrid(): Position[] {
    return this.grid;
  }

  getGame() {
    return this.game;
  }
  setGame(game: Game) {
    this.game = game;
  }

  public isPositionEmpty(position: Position): boolean {
    return position.isEmpty();
  }
}
