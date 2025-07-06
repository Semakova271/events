export class Board {
  constructor() {
    this.boardElement = document.getElementById('game-board');
    this.cells = [];
    this.createBoard();
  }

  createBoard() {
    for (let i = 0; i < 16; i++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      this.boardElement.appendChild(cell);
      this.cells.push(cell);
    }
  }

  getRandomCell() {
    return this.cells[Math.floor(Math.random() * this.cells.length)];
  }
}
