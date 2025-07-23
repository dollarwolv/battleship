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
}

export { DOMManager };
