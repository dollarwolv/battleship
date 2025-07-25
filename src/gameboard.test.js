import { Gameboard } from "./gameboard";
import { Ship } from "./ship";

test("Gameboard initialized with correct board size", () => {
  const gameboard = new Gameboard();
  expect(gameboard.board.length).toBe(10);
  gameboard.board.forEach((row) => {
    expect(row.length).toBe(10);
  });
});

test("Gameboard does not allow ships to be placed over multiple rows/columns", () => {
  const gameboard = new Gameboard();
  expect(() => {
    gameboard.placeShip(2, 3, 4, 5);
  }).toThrow("Ships cannot be placed over multiple lines.");
  expect(() => {
    gameboard.placeShip(2, 4, 4, 4);
  }).not.toThrow("Ships cannot be placed over multiple lines.");
});

test("Gameboard places ships at correct spot", () => {
  const gameboard = new Gameboard();
  gameboard.placeShip(4, 6, 4, 4);
  expect(gameboard.board[4][4]).toBeInstanceOf(Ship);
  expect(gameboard.board[6][4]).toBeInstanceOf(Ship);
  expect(gameboard.board[3][4]).toBeFalsy();

  gameboard.placeShip(3, 3, 5, 8);
  expect(gameboard.board[3][6]).toBeInstanceOf(Ship);
  expect(gameboard.board[3][2]).toBeFalsy();
});

test("Gameboard calculates a ship's length correctly", () => {
  const gameboard = new Gameboard();
  expect(gameboard._calculateShipLength(4, 6, 4, 4)).toBe(3);
});

test("Gameboard does not allow ships to be placed over one another", () => {
  const gameboard = new Gameboard();
  gameboard.placeShip(4, 6, 4, 4);
  expect(() => {
    gameboard.placeShip(5, 5, 3, 5);
  }).toThrow("Ships cannot occupy the same spot.");
  expect(gameboard.ships.length).toBe(1);
});

test("Gameboard does not allow ships to be placed out of bounds", () => {
  const gameboard = new Gameboard();
  expect(() => {
    gameboard.placeShip(5, 5, 9, 12);
  }).toThrow("Ships cannot be placeed out of bounds.");
});

test("Gameboard sends hit to the correct ship", () => {
  const gameboard = new Gameboard();
  gameboard.placeShip(2, 4, 4, 4);
  gameboard.placeShip(5, 7, 4, 4);
  gameboard.receiveAttack(3, 4);
  expect(gameboard.ships[0].hits).toBe(1);
});

test("Gameboard adds 'X' if there's no ship", () => {
  const gameboard = new Gameboard();
  gameboard.placeShip(2, 4, 4, 4);
  gameboard.placeShip(5, 7, 4, 4);
  gameboard.receiveAttack(3, 5);
  expect(gameboard.board[3][5]).toBe("X");
});

test("Gameboard correctly determines if all ships are sunk", () => {
  const gameboard = new Gameboard();
  gameboard.placeShip(2, 4, 4, 4);
  gameboard.receiveAttack(2, 4);
  gameboard.receiveAttack(3, 4);
  gameboard.receiveAttack(4, 4);

  expect(gameboard.allSunk()).toBe(true);
  gameboard.placeShip(5, 8, 4, 4);
  expect(gameboard.allSunk()).toBe(false);
  gameboard.receiveAttack(5, 4);
  gameboard.receiveAttack(6, 4);
  gameboard.receiveAttack(7, 4);
  expect(gameboard.allSunk()).toBe(false);
  gameboard.receiveAttack(8, 4);
  expect(gameboard.allSunk()).toBe(true);
});

test("Gameboard returns true if attack lands, and false if it didn't.", () => {
  const gameboard = new Gameboard();
  gameboard.placeShip(2, 4, 4, 4);
  expect(gameboard.receiveAttack(2, 4)[0]).toBe(true);
  expect(gameboard.receiveAttack(1, 4)[0]).toBe(false);
});
