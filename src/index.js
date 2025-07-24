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
    this._makePlayerShip(4, 6, 5, 5);
    this._makePlayerShip(1, 2, 5, 5);
    this._makePlayerShip(6, 9, 4, 4);
    this._makePlayerShip(5, 5, 2, 3);
    this._makePlayerShip(2, 2, 0, 4);
    this.dom.renderGameBoard(this.handleSquareClick.bind(this), this.computer);
    this._makeComputerShip(3, 3, 0, 4);
    this._makeComputerShip(0, 1, 5, 5);
    this._makeComputerShip(6, 9, 8, 8);
  }

  handleSquareClick = (row, col, target) => {
    const hit = target.gameboard.receiveAttack(row, col);
    this.dom.updateSquare(target, row, col, hit);
    if (target.gameboard.allSunk() && target.type === "computer")
      this.dom.displayWin(this.player);
    else if (target.gameboard.allSunk() && target.type === "player")
      this.dom.displayWin(this.computer);
  };

  _makePlayerShip(rowStart, rowEnd, colStart, colEnd) {
    this.player.gameboard.placeShip(rowStart, rowEnd, colStart, colEnd);
    this.dom.renderShip(
      rowStart,
      rowEnd,
      colStart,
      colEnd,
      this.player.gameboard._calculateShipLength(
        rowStart,
        rowEnd,
        colStart,
        colEnd,
      ),
      this.player,
    );
  }

  _makeComputerShip(rowStart, rowEnd, colStart, colEnd) {
    this.computer.gameboard.placeShip(rowStart, rowEnd, colStart, colEnd);
  }
}

const manage = new GameManager();
manage.setupGame();
