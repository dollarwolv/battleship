const shipImages = require.context("./img", true, /\.(png|jpe?g|gif)$/);

class DOMManager {
  constructor() {}

  renderGameBoard(handleSquareClick, _makePlayerShip, target) {
    const mainContainer = document.getElementById("main-container");
    const parentDiv = document.createElement("div");
    parentDiv.id = "parent";
    mainContainer.appendChild(parentDiv);
    const gameContainer = document.createElement("div");
    gameContainer.classList.add("board");
    gameContainer.id = `${target.type}-container`;

    const nameContainer = document.createElement("h3");
    nameContainer.textContent = target.type;
    parentDiv.appendChild(nameContainer);

    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        // make square and append to gameContainer
        const square = document.createElement("div");
        square.classList.add("square");
        square.dataset.row = i;
        square.dataset.col = j;
        square.dataset.ship = false;

        // event listener for clicking ship
        square.addEventListener("click", () => {
          if (target.type === "computer") handleSquareClick(i, j, target);
        });
        square.addEventListener("dragover", (e) => e.preventDefault());

        // handle drop logic for when ship is placed
        square.addEventListener("drop", (e) => {
          e.preventDefault();
          const shipLength = parseInt(e.dataTransfer.getData("length"));
          const orientation = e.dataTransfer.getData("orientation");
          if (orientation === "horizontal") {
            try {
              _makePlayerShip(i, i, j, j + shipLength - 1);
              this._removeShipsOfLength(shipLength);
            } catch {
              return;
            }
          } else if (orientation === "vertical") {
            try {
              _makePlayerShip(i, i + shipLength - 1, j, j);
              this._removeShipsOfLength(shipLength);
            } catch {
              return;
            }
          }
        });
        gameContainer.appendChild(square);
      }
    }

    parentDiv.append(gameContainer);
  }

  renderShip(xStart, xEnd, yStart, yEnd, length, target) {
    let partIndex = 1;
    if (xStart !== xEnd) {
      // loop through xs
      for (let i = xStart; i <= xEnd; i++) {
        const square = this._getSquare(target, i, yStart);
        const imgPath = shipImages(
          `./ship_${length}_rotated/image_part_00${partIndex}.jpg`,
        );
        square.style.backgroundImage = `url(${imgPath})`;
        square.style.backgroundSize = "cover";
        square.style.backgroundRepeat = "no-repeat";
        square.style.backgroundPosition = "center";
        partIndex++;
      }
    } else {
      // loop through ys
      for (let i = yStart; i <= yEnd; i++) {
        const square = this._getSquare(target, xStart, i);
        const imgPath = shipImages(
          `./ship_${length}/image_part_00${partIndex}.jpg`,
        );
        square.style.backgroundImage = `url(${imgPath})`;
        square.style.backgroundSize = "cover";
        square.style.backgroundRepeat = "no-repeat";
        square.style.backgroundPosition = "center";
        partIndex++;
      }
    }
  }

  _getSquare(target, row, col) {
    const board = document.getElementById(`${target.type}-container`);
    return board.querySelector(`[data-row="${row}"][data-col="${col}"]`);
  }

  updateSquare(target, row, col, hit) {
    const square = this._getSquare(target, row, col);
    if (hit) {
      const fireGif = shipImages("./fire.gif");
      square.innerHTML = `<img src="${fireGif}" class="hit-overlay" />`;
    } else {
      const waterImg = shipImages("./water_hit.jpg");
      square.innerHTML = `<img src="${waterImg}" class="hit-overlay" />`;
    }
  }

  displayWin(target) {
    // Remove any existing win modal
    const existing = document.getElementById("win-modal");
    if (existing) existing.remove();

    // Build a new modal overlay
    const modal = document.createElement("div");
    modal.classList.add("modal");
    modal.id = "win-modal";

    const content = document.createElement("div");
    content.classList.add("modal-content");

    const closeBtn = document.createElement("span");
    closeBtn.classList.add("close");
    closeBtn.textContent = "×";

    const header = document.createElement("h2");
    header.textContent =
      target.type === "player" ? "You won!" : "Computer won!";

    content.append(closeBtn, header);
    modal.appendChild(content);
    document.body.appendChild(modal);

    // Dismiss modal on close button click
    closeBtn.addEventListener("click", () => {
      modal.remove();
    });
  }

  renderShipSelection() {
    const shipSelection = document.createElement("div");
    shipSelection.id = "ship-selection";

    const horizontalShips = document.createElement("div");
    horizontalShips.id = "horizontal-ships";
    const verticalShips = document.createElement("div");
    verticalShips.id = "vertical-ships";

    for (let i = 1; i < 6; i++) {
      const horizontalImg = document.createElement("img");
      horizontalImg.src = shipImages(`./ship_${i}/ship_${i}_full.jpg`);
      horizontalImg.draggable = "true";
      horizontalImg.dataset.length = i;
      horizontalImg.dataset.orientation = "horizontal";
      horizontalImg.addEventListener("dragstart", this._handleDragStart);
      horizontalShips.appendChild(horizontalImg);

      if (i === 1) {
        const verticalImg = document.createElement("img");
        verticalImg.src = shipImages(`./ship_${i}/ship_${i}_full.jpg`);
        verticalImg.draggable = "true";
        verticalImg.dataset.length = i;
        verticalImg.dataset.orientation = "vertical";
        verticalImg.addEventListener("dragstart", this._handleDragStart);
        verticalShips.appendChild(verticalImg);
      } else {
        const verticalImg = document.createElement("img");
        verticalImg.src = shipImages(`./ship_${i}_rotated/ship_${i}_full.jpg`);
        verticalImg.draggable = "true";
        verticalImg.dataset.length = i;
        verticalImg.dataset.orientation = "vertical";
        verticalImg.addEventListener("dragstart", this._handleDragStart);
        verticalShips.appendChild(verticalImg);
      }
    }
    shipSelection.append(horizontalShips, verticalShips);
    document.body.appendChild(shipSelection);
  }

  _handleDragStart(e) {
    e.dataTransfer.setData("length", e.target.dataset.length);
    e.dataTransfer.setData("orientation", e.target.dataset.orientation);
  }

  _removeShipsOfLength(length) {
    for (let i = 0; i < 2; i++) {
      const ship = document.querySelector(`[data-length="${length}"]`);
      if (ship) ship.parentNode.removeChild(ship);
    }
  }
}

export { DOMManager };
