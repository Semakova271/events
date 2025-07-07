export class Goblin {
  constructor(board) {
    this.board = board;
    this.currentCell = null;
    this.goblinElement = document.createElement('div');
    this.goblinElement.className = 'goblin';
  }

  appear() {
    if (this.currentCell) {
      this.goblinElement.remove();
    }

    const newCell = this.board.getRandomCellExcluding(this.currentCell);
    
    if (newCell) {
      this.currentCell = newCell;
      this.currentCell.append(this.goblinElement);
    }
  }

  disappear() {
    if (this.currentCell && this.currentCell.contains(this.goblinElement)) {
      this.goblinElement.remove();
    }
    this.currentCell = null;
  }
}