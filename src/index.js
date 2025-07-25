import { Player } from "./player";
import { DOMManager } from "./dom";
import "./style.css";

// import { Gameboard } from "./gameboard";

class GameManager {
  constructor() {
    this.player = new Player("player");
    this.computer = new Player("computer");
    this.dom = new DOMManager();
    this.won = false;
    this.currentTurn = "player";
    this.setupGame();
  }

  handleSquareClick(row, col, target) {
    if (this.won) return;
    if (this.currentTurn !== target.type) {
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
      this.move += 1;
      this._checkWin(target);

      if (!this.won) {
        this.currentTurn = "computer";
        setTimeout(() => {
          this._makeComputerMove();
        }, 800);
      }
    } else {
      return;
    }
  }

  setupGame() {
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
    const row = this._getRandomInt(10);
    const col = this._getRandomInt(10);

    if (
      !this.player.gameboard.hitSquares.some(
        (coord) => coord[0] === row && coord[1] === col,
      )
    ) {
      setTimeout(
        () => {
          this.handleSquareClick(row, col, this.player);
          this.currentTurn = "player";
        },
        Math.random() * 1000 + 500,
      );
    } else {
      console.log("accidentally shot the same square oops");
      this._makeComputerMove();
    }
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

  _checkWin(target) {
    if (target.gameboard.allSunk()) {
      this.won = true;
      this.dom.displayWin(target === this.player ? this.computer : this.player);
    }
  }
}

new GameManager();
