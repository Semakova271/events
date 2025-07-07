import { Board } from './Board.js';
import { Goblin } from './Goblin.js';

export default class Game {
  constructor() {
    this.board = new Board();
    this.goblin = new Goblin(this.board);
    this.score = 0;
    this.missed = 0;
    this.maxMissed = 5;
    this.scoreElement = document.getElementById('hits');
    this.missedElement = document.getElementById('misses');
    this.modal = document.getElementById('modal');
    this.modalTitle = document.getElementById('modal-title');
    this.modalMessage = document.getElementById('modal-message');
    this.restartBtn = document.getElementById('restart-btn');
    this.initGame();
  }

  initGame() {
    // Убрали кастомный курсор через JS (будем через CSS)
    
    this.restartBtn.addEventListener('click', () => {
      this.restartGame();
    });

    // Game logic
    this.startGameLoop();

    this.board.boardElement.addEventListener('click', (e) => {
      if (e.target.classList.contains('goblin')) {
        this.score++;
        this.scoreElement.textContent = this.score;
        this.goblin.disappear();
        this.missed = 0;
        this.missedElement.textContent = this.missed;
      } else if (e.target.classList.contains('cell')) {
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
      this.goblin.disappear();
      this.goblin.appear();

      setTimeout(() => {
        if (this.goblin.currentCell && this.goblin.currentCell.contains(this.goblin.goblinElement)) {
          this.missed++;
          this.missedElement.textContent = this.missed;
          
          if (this.missed >= this.maxMissed) {
            this.gameOver();
          }
        }
      }, 1000);
    }, 1100);
  }

  gameOver() {
    clearInterval(this.interval);
    this.modalTitle.textContent = 'Игра окончена!';
    this.modalMessage.textContent = `Ваш счет: ${this.score}`;
    this.modal.classList.remove('hidden');
  }

  restartGame() {
    this.modal.classList.add('hidden');
    this.score = 0;
    this.missed = 0;
    this.scoreElement.textContent = this.score;
    this.missedElement.textContent = this.missed;
    this.goblin.disappear();
    this.startGameLoop();
  }
}