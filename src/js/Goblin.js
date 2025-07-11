export class Goblin {
  constructor(board) {
    this.board = board;
    this.currentCell = null;
    this.goblinElement = document.createElement('div');
    this.goblinElement.className = 'goblin';
    this.lastPosition = null; // Последняя позиция перед исчезновением
    this.duplicateCount = 0;
    this.positionHistory = []; // История позиций для отладки
  }

  appear() {
    if (this.currentCell) {
      this.goblinElement.remove();
      this.lastPosition = this.currentCell.dataset.index; // Сохраняем последнюю позицию
      this.currentCell = null;
    }

    // Исключаем последнюю позицию при выборе новой
    const newCell = this.board.getRandomCellExcluding(this.lastPosition);
    
    if (newCell) {
      const newIndex = newCell.dataset.index;
      
      // Логирование дубликатов
      if (this.positionHistory.includes(newIndex)) {
        this.duplicateCount++;
        //console.log(`Duplicate position: ${newIndex}, count: ${this.duplicateCount}`);
      } else {
        this.duplicateCount = 0;
      }
      
      //console.log(`New position: ${newIndex}`);
      this.positionHistory.push(newIndex);
      
      // Ограничиваем историю 10 последними позициями
      if (this.positionHistory.length > 10) {
        this.positionHistory.shift();
      }

      this.currentCell = newCell;
      this.currentCell.appendChild(this.goblinElement);
    }
  }

  disappear() {
    if (this.currentCell) {
      this.goblinElement.remove();
      this.lastPosition = this.currentCell.dataset.index; // Сохраняем позицию при исчезновении
      this.currentCell = null;
    }
  }
}