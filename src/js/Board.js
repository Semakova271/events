export class Board {
  constructor() {
    this.boardElement = document.getElementById('board');
    if (!this.boardElement) {
      this.boardElement = document.createElement('div');
      this.boardElement.id = 'board';
      document.getElementById('root').appendChild(this.boardElement);
    }
    
    this.cells = [];
    this.createBoard();
  }

  createBoard() {
    for (let i = 0; i < 16; i++) {
      const cell = document.createElement('div');
      cell.className = 'cell';
      cell.dataset.index = i;
      this.cells.push(cell);
      this.boardElement.appendChild(cell);
    }
  }

  getRandomCellExcluding(excludedIndex) {
    const availableCells = this.cells.filter(cell => {
      return cell.dataset.index !== excludedIndex;
    });

    if (availableCells.length === 0) {
      return this.getRandomCell(); 
    }

    const randomIndex = Math.floor(Math.random() * availableCells.length);
    return availableCells[randomIndex];
  }
}