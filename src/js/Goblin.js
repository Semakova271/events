export class Goblin {
  constructor(board) {
    this.board = board;
    this.currentCell = null;
    this.goblinElement = document.createElement('img');
    this.goblinElement.src = 'public/goblin.png';
    this.goblinElement.id = 'goblin';
  }

  appear() {
    if (this.currentCell) {
      this.currentCell.removeChild(this.goblinElement);
    }

    let newCell;
    do {
      newCell = this.board.getRandomCell();
    } while (newCell === this.currentCell);

    this.currentCell = newCell;
    this.currentCell.appendChild(this.goblinElement);
  }

  disappear() {
    if (this.currentCell) {
      this.currentCell.removeChild(this.goblinElement);
      this.currentCell = null;
    }
  }
}
