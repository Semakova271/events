import { Board } from './Board.js';
import { Goblin } from './Goblin.js';

export default class Game {
  constructor() {
    if (process.env.NODE_ENV === 'development') {
      // Отладочная информация при необходимости
    }
    
    this.createScoreboard();
    this.board = new Board();
    this.goblin = new Goblin(this.board);
    this.score = 0;
    this.missed = 0;
    this.maxMissed = 5;
    this.isGameActive = true;
    this.interval = null;
    this.initGame();
  }

  createScoreboard() {
    const root = document.getElementById('root');
    
    const scoreboard = document.createElement('div');
    scoreboard.id = 'scoreboard';
    scoreboard.innerHTML = `
      <div>Попадания: <span id="hits">0</span></div>
      <div>Промахи: <span id="misses">0</span></div>
    `;
    root.append(scoreboard);
    
    const modal = document.createElement('div');
    modal.id = 'modal';
    modal.className = 'hidden';
    modal.innerHTML = `
      <div class="modal-content">
        <h2 id="modal-title"></h2>
        <p id="modal-message"></p>
        <button id="restart-btn">Играть снова</button>
      </div>
    `;
    root.append(modal);
  }

  initGame() {
    this.scoreElement = document.getElementById('hits');
    this.missedElement = document.getElementById('misses');
    this.modal = document.getElementById('modal');
    this.modalTitle = document.getElementById('modal-title');
    this.modalMessage = document.getElementById('modal-message');
    this.restartBtn = document.getElementById('restart-btn');

    this.restartBtn.addEventListener('click', () => {
      this.restartGame();
    });

    this.startGameLoop();

    this.board.boardElement.addEventListener('click', (e) => {
      if (!this.isGameActive) return;
      
      const cell = e.target.closest('.cell');
      if (!cell) return;
      
      if (cell.contains(this.goblin.goblinElement)) {
        // Попадание по гоблину
        this.score++;
        this.scoreElement.textContent = this.score;
        this.goblin.disappear();
      } else {
        // Промах при клике на пустую ячейку
        this.missed++;
        this.missedElement.textContent = this.missed;
        
        if (this.missed >= this.maxMissed) {
          this.gameOver();
        }
      }
    });
  }

  startGameLoop() {
    this.interval = setInterval(() => {
      if (!this.isGameActive) return;

      // Промах при пропуске гоблина (бездействии игрока)
      if (this.goblin.currentCell) {
        this.missed++;
        this.missedElement.textContent = this.missed;
        
        if (this.missed >= this.maxMissed) {
          this.gameOver();
          return;
        }
      }

      this.goblin.disappear();
      this.goblin.appear();
    }, 1000);
  }

  gameOver() {
    this.isGameActive = false;
    clearInterval(this.interval);
    this.goblin.disappear();
    this.modalTitle.textContent = 'Игра окончена!';
    this.modalMessage.textContent = `Ваш счет: ${this.score}`;
    this.modal.classList.remove('hidden');
  }

  restartGame() {
    this.isGameActive = true;
    this.score = 0;
    this.missed = 0;
    this.scoreElement.textContent = this.score;
    this.missedElement.textContent = this.missed;
    this.modal.classList.add('hidden');
    
    clearInterval(this.interval);
    this.startGameLoop();
  }
}