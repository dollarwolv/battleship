class DOMManager {
  constructor() {}

  renderGameBoard() {
    const gameContainer = document.createElement("div");
    gameContainer.id = "game-container";

    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        // make square and append to gameContainer
        const square = document.createElement("div");
        square.classList.add("square");
        square.dataset.row = i;
        square.dataset.col = j;
        square.dataset.ship = false;
        gameContainer.appendChild(square);
      }
    }

    document.body.append(gameContainer);
  }

  renderShip(xStart, xEnd, yStart, yEnd, length) {
    let partIndex = 1;
    if (xStart !== xEnd) {
      // loop through xs
      for (let i = xStart; i <= xEnd; i++) {
        const square = this._getSquare(i, yStart);

        square.style.backgroundImage = `url("/img/ship_${length}_rotated/image_part_00${partIndex}.jpg")`;
        square.style.backgroundSize = "cover";
        square.style.backgroundRepeat = "no-repeat";
        square.style.backgroundPosition = "center";
        partIndex++;
      }
    } else {
      // loop through ys
      for (let i = yStart; i <= yEnd; i++) {
        const square = this._getSquare(xStart, i);
        square.style.backgroundImage = `url("/img/ship_${length}/image_part_00${partIndex}.jpg")`;
        square.style.backgroundSize = "cover";
        square.style.backgroundRepeat = "no-repeat";
        square.style.backgroundPosition = "center";
        partIndex++;
      }
    }
  }

  _getSquare(row, col) {
    return document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
  }
}

export { DOMManager };
