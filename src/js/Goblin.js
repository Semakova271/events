export class Goblin {
  constructor(board) {
    this.board = board;
    this.currentCell = null;
    this.goblinElement = document.createElement('div');
    this.goblinElement.className = 'goblin';
    this.lastPosition = null;
  }

  appear() {
    if (this.currentCell) {
      this.goblinElement.remove();
      this.lastPosition = this.currentCell.dataset.index;
      this.currentCell = null;
    }

    const newCell = this.board.getRandomCellExcluding(this.lastPosition);
    if (newCell) {
      this.currentCell = newCell;
      this.currentCell.append(this.goblinElement);
    }
  }

  disappear() {
    if (this.currentCell) {
      this.goblinElement.remove();
      this.lastPosition = this.currentCell.dataset.index;
      this.currentCell = null;
    }
  }
}