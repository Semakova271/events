import './css/style.css';

class Game {
  constructor() {
    this.boardSize = 4;
    this.hits = 0;
    this.misses = 0;
    this.maxMisses = 5;
    this.currentGoblinCell = null;
    this.lastGoblinCell = null;
    this.gameInterval = null;
    this.isGameRunning = false;

    this.initDOM();
    this.initEventListeners();
  }

  initDOM() {
    this.boardElement = document.getElementById('game-board');
    this.hitsElement = document.getElementById('hits');
    this.missesElement = document.getElementById('misses');
    this.modalElement = document.getElementById('modal');
    this.modalTitle = document.getElementById('modal-title');
    this.modalMessage = document.getElementById('modal-message');
    this.restartBtn = document.getElementById('restart-btn');

    this.createBoard();
  }

  createBoard() {
    this.boardElement.innerHTML = '';
    this.boardElement.style.gridTemplateColumns = `repeat(${this.boardSize}, 1fr)`;

    for (let i = 0; i < this.boardSize ** 2; i++) {
      const cell = document.createElement('div');
      cell.className = 'cell';
      cell.dataset.index = i;
      this.boardElement.append(cell);
    }
  }

  initEventListeners() {
    this.boardElement.addEventListener('click', (e) => this.handleCellClick(e));
    this.restartBtn.addEventListener('click', () => this.startGame());
  }

  handleCellClick(e) {
    if (!this.isGameRunning) return;

    const cell = e.target.closest('.cell');
    if (!cell) return;

    if (cell === this.currentGoblinCell) {
      this.hits++;
      this.hitsElement.textContent = this.hits;
      this.removeGoblin();
    } else {
      this.misses++;
      this.missesElement.textContent = this.misses;
      this.checkGameOver();
    }
  }

  placeGoblin() {
    this.removeGoblin();

    const cells = document.querySelectorAll('.cell');
    let randomIndex;
    
    do {
      randomIndex = Math.floor(Math.random() * cells.length);
    } while (cells[randomIndex] === this.lastGoblinCell && cells.length > 1);

    this.currentGoblinCell = cells[randomIndex];
    this.lastGoblinCell = this.currentGoblinCell;

    const goblin = document.createElement('div');
    goblin.className = 'goblin';
    this.currentGoblinCell.append(goblin);

    setTimeout(() => {
      if (this.currentGoblinCell && this.currentGoblinCell.contains(goblin)) {
        this.removeGoblin();
        this.misses++;
        this.missesElement.textContent = this.misses;
        this.checkGameOver();
      }
    }, 1000);
  }

  removeGoblin() {
    if (this.currentGoblinCell) {
      const goblin = this.currentGoblinCell.querySelector('.goblin');
      if (goblin) {
        goblin.remove();
      }
      this.currentGoblinCell = null;
    }
  }

  checkGameOver() {
    if (this.misses >= this.maxMisses) {
      this.endGame(false);
    }
  }

  startGame() {
    this.hits = 0;
    this.misses = 0;
    this.hitsElement.textContent = '0';
    this.missesElement.textContent = '0';
    this.modalElement.classList.add('hidden');
    this.isGameRunning = true;

    this.gameInterval = setInterval(() => {
      this.placeGoblin();
    }, 1000);
  }

  endGame(isWin) {
    clearInterval(this.gameInterval);
    this.isGameRunning = false;
    this.removeGoblin();

    this.modalTitle.textContent = isWin ? 'Победа!' : 'Игра окончена';
    this.modalMessage.textContent = isWin 
      ? `Вы победили с результатом ${this.hits} попаданий!` 
      : `Вы проиграли! Попаданий: ${this.hits}, Промахов: ${this.misses}`;
    this.modalElement.classList.remove('hidden');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const game = new Game();
  game.startGame();
});