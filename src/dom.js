class DOMManager {
  constructor() {}

  renderGameBoard(handleSquareClick, player) {
    const mainContainer = document.getElementById("main-container");
    const gameContainer = document.createElement("div");
    gameContainer.classList.add("board");
    gameContainer.id = `${player.type}-container`;

    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        // make square and append to gameContainer
        const square = document.createElement("div");
        square.classList.add("square");
        square.dataset.row = i;
        square.dataset.col = j;
        square.dataset.ship = false;
        square.addEventListener("click", () => {
          handleSquareClick(i, j);
        });
        gameContainer.appendChild(square);
      }
    }

    mainContainer.append(gameContainer);
  }

  renderShip(xStart, xEnd, yStart, yEnd, length, player) {
    let partIndex = 1;
    if (xStart !== xEnd) {
      // loop through xs
      for (let i = xStart; i <= xEnd; i++) {
        const square = this._getSquare(player, i, yStart);
        square.style.backgroundImage = `url("/img/ship_${length}_rotated/image_part_00${partIndex}.jpg")`;
        square.style.backgroundSize = "cover";
        square.style.backgroundRepeat = "no-repeat";
        square.style.backgroundPosition = "center";
        partIndex++;
      }
    } else {
      // loop through ys
      for (let i = yStart; i <= yEnd; i++) {
        const square = this._getSquare(player, xStart, i);
        square.style.backgroundImage = `url("/img/ship_${length}/image_part_00${partIndex}.jpg")`;
        square.style.backgroundSize = "cover";
        square.style.backgroundRepeat = "no-repeat";
        square.style.backgroundPosition = "center";
        partIndex++;
      }
    }
  }

  _getSquare(player, row, col) {
    const board = document.getElementById(`${player.type}-container`);
    return board.querySelector(`[data-row="${row}"][data-col="${col}"]`);
  }

  updateSquare(row, col, hit) {
    const square = this._getSquare(row, col);
    if (hit)
      square.innerHTML = `<img src="/img/fire.gif" class="hit-overlay" />`;
    else
      square.innerHTML = `<img src="/img/water_hit.jpg" class="hit-overlay" />`;
  }
}

export { DOMManager };
