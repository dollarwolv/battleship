import { Player } from "./player";
import { DOMManager } from "./dom";
import "./style.css";

// import { Gameboard } from "./gameboard";

class GameManager {
  constructor() {
    this.player = new Player("player");
    this.computer = new Player("computer");
    this.dom = new DOMManager();
    this.dom.renderGameBoard();

    // just quickly testing this
    this.dom.renderShip(4, 4, 4, 6, 3);
    this.dom.renderShip(2, 3, 2, 2, 2);
  }
}

const manage = new GameManager();
