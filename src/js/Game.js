import { Board } from './Board.js';
import { Goblin } from './Goblin.js';

// Определяем класс Game и экспортируем его как default
export default class Game {
  constructor() {
    this.board = new Board();
    this.goblin = new Goblin(this.board);
    this.score = 0;
    this.missed = 0;
    this.scoreElement = document.getElementById('score');
    this.initGame();
  }

  initGame() {
    // Custom cursor
    const hammer = document.createElement('img');
    hammer.src = 'public/hammer.png';
    hammer.style.position = 'absolute';
    hammer.style.width = '50px';
    hammer.style.pointerEvents = 'none';
    document.body.appendChild(hammer);

    document.addEventListener('mousemove', (e) => {
      hammer.style.left = `${e.pageX}px`;
      hammer.style.top = `${e.pageY}px`;
    });

    // Game logic
    this.interval = setInterval(() => {
      this.goblin.disappear();
      this.goblin.appear();

      setTimeout(() => {
        if (this.goblin.currentCell.contains(this.goblin.goblinElement)) {
          this.missed++;
          if (this.missed >= 5) {
            clearInterval(this.interval);
            alert('Game Over!');
          }
        }
      }, 1000);
    }, 1100);

    this.board.boardElement.addEventListener('click', (e) => {
      if (e.target.id === 'goblin') {
        this.score++;
        this.scoreElement.textContent = `Score: ${this.score}`;
        this.goblin.disappear();
        this.missed = 0; // Reset missed count on successful hit
      }
    });
  }
}
