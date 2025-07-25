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
    this.dom.renderGameBoard(
      this.handleSquareClick,
      this._makePlayerShip.bind(this),
      this.player,
    );
    this._makePlayerShip(4, 6, 5, 5);
    this._makePlayerShip(1, 2, 5, 5);
    this._makePlayerShip(6, 9, 4, 4);
    this._makePlayerShip(5, 5, 2, 3);
    this._makePlayerShip(2, 2, 0, 4);
    this.dom.renderGameBoard(
      this.handleSquareClick.bind(this),
      this._makePlayerShip,
      this.computer,
    );
    this._makeComputerShip(3, 3, 0, 4);
    this._makeComputerShip(0, 1, 5, 5);
    this._makeComputerShip(6, 9, 8, 8);
    this._makeComputerMove();
  }

  handleSquareClick(row, col, target) {
    const hit = target.gameboard.receiveAttack(row, col);
    const [isHit, isSunk, location] = hit;

    // update square to show hit marker
    this.dom.updateSquare(target, row, col, isHit);

    // render ship if whole ship was sunk
    if (isSunk && target.type === "computer") {
      const [rowStart, rowEnd, colStart, colEnd] = location;
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
        target,
      );
    }

    // win logic
    if (target.gameboard.allSunk() && target.type === "computer")
      this.dom.displayWin(this.player);
    else if (target.gameboard.allSunk() && target.type === "player")
      this.dom.displayWin(this.computer);
  }

  setupGame2() {
    this.dom.renderGameBoard(
      this.handleSquareClick.bind(this),
      this._makePlayerShip.bind(this),
      this.player,
    );
    this.dom.renderShipSelection();
  }

  startGame() {
    this.dom.renderGameBoard(
      this.handleSquareClick.bind(this),
      this._makePlayerShip.bind(this),
      this.computer,
    );
    this._placeRandomComputerShips();
  }

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
    if (this.player.gameboard.numberOfShips === 5) this.startGame();
  }

  _makeComputerShip(rowStart, rowEnd, colStart, colEnd) {
    this.computer.gameboard.placeShip(rowStart, rowEnd, colStart, colEnd);
  }

  _makeComputerMove() {
    const row = this._getRandomInt(9);
    const col = this._getRandomInt(9);

    if (
      !this.computer.gameboard.hitSquares.some(
        (coord) => coord[0] === row && coord[1] === col,
      )
    ) {
      setTimeout(
        this.handleSquareClick(row, col, this.player),
        Math.random() * 5000,
      );
    } else this._makeComputerMove();
  }

  _getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  _placeRandomComputerShips() {
    for (let i = 0; i < 5; i++) {
      let horizontal = this._getRandomInt(2) === 0;
      let placed = false;
      if (horizontal) {
        while (!placed) {
          try {
            const rowStart = this._getRandomInt(4);
            const rowEnd = rowStart + i;
            const random = this._getRandomInt(10);
            const colStart = random;
            const colEnd = random;
            this._makeComputerShip(rowStart, rowEnd, colStart, colEnd);
            placed = true;
          } catch (err) {
            console.log(err);
          }
        }
      } else {
        while (!placed) {
          try {
            const random = this._getRandomInt(10);
            const rowStart = random;
            const rowEnd = random;
            const colStart = this._getRandomInt(4);
            const colEnd = colStart + i;
            this._makeComputerShip(rowStart, rowEnd, colStart, colEnd);
            placed = true;
          } catch (err) {
            console.log(err);
          }
        }
      }
    }
  }
}

const manage = new GameManager();

// manage.setupGame();
manage.setupGame2();
