import { Ship } from "./ship";

class Gameboard {
  constructor() {
    this.board = [...Array(10)].map(() => [...Array(10)]);
    this.maxShips = 5;
    this.numberOfShips = 0;
    this.ships = [];
  }

  placeShip(startX, endX, startY, endY) {
    // copy the board
    const boardCopy = this.board.map((row) => [...row]);

    // test if size is acceptable
    if (startX - endX !== 0) {
      if (startY - endY !== 0) {
        throw new Error("Ships cannot be placed over multiple lines.");
      }
    } else if (startY - endY !== 0) {
      if (startX - endX !== 0) {
        throw new Error("Ships cannot be placed over multiple lines.");
      }
    }

    // create ship
    this.numberOfShips += 1;
    const ship = new Ship(
      this._calculateShipLength(startX, endX, startY, endY),
    );

    // place ship
    if (startX - endX !== 0) {
      for (let i = startX; i <= endX; i++) {
        if (boardCopy[i][startY]) {
          throw new Error("Ships cannot occupy the same spot.");
        }
        boardCopy[i][startY] = ship;
      }
    } else {
      for (let i = startY; i <= endY; i++) {
        if (boardCopy[startX][i]) {
          throw new Error("Ships cannot occupy the same spot.");
        }
        boardCopy[startX][i] = ship;
      }
    }
    this.ships.push(ship);
    this.board = boardCopy;
  }

  receiveAttack(x, y) {
    if (this.board[x][y] instanceof Ship) {
      this.board[x][y].hit();
      this.board[x][y].isSunk();
    } else {
      this.board[x][y] = "X";
    }
  }

  _calculateShipLength(startX, endX, startY, endY) {
    if (startX - endX !== 0) return Math.abs(startX - endX) + 1;
    else return Math.abs(startY - endY) + 1;
  }
}

module.exports = { Gameboard };
