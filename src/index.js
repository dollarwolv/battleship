import { Player } from "./player";
import { DOMManager } from "./dom";
import "./style.css";

// import { Gameboard } from "./gameboard";

class GameManager {
  constructor() {
    this.player = new Player("player");
    this.computer = new Player("computer");
    this.dom = new DOMManager();
  }

  setupGame() {
    this.dom.renderGameBoard(this.handleSquareClick, this.player);
    this._makeShip(4, 6, 5, 5, this.player);
    this._makeShip(1, 2, 5, 5, this.player);
    this._makeShip(6, 9, 4, 4, this.player);
    this._makeShip(5, 5, 2, 3, this.player);
    this._makeShip(2, 2, 0, 4, this.player);
    this.dom.renderGameBoard(this.handleSquareClick, this.computer);
  }

  handleSquareClick = (row, col) => {
    const hit = this.player.gameboard.receiveAttack(row, col);
    this.dom.updateSquare(row, col, hit);
  };

  _makeShip(rowStart, rowEnd, colStart, colEnd, target) {
    target.gameboard.placeShip(rowStart, rowEnd, colStart, colEnd);
    this.dom.renderShip(
      rowStart,
      rowEnd,
      colStart,
      colEnd,
      target.gameboard._calculateShipLength(rowStart, rowEnd, colStart, colEnd),
      target,
    );
  }
}

const manage = new GameManager();
manage.setupGame();
