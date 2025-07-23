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
  }
}

const manage = new GameManager();
