import { Ship } from "./ship";

test("Ship initialized correctly", () => {
  expect(new Ship(4).length).toBe(4);
});

test("Ship hits increased correclty", () => {
  const ship = new Ship(4);
  ship.hit();
  expect(ship.hits).toBe(1);
});

test("Ship correctly recognized as sunk", () => {
  const ship = new Ship(4);
  ship.hit();
  ship.hit();
  ship.hit();
  ship.hit();
  expect(ship.isSunk()).toBe(true);
});

test("Ship correctly assigned random ID", () => {
  const ship = new Ship(4);
  expect(typeof ship.shipID).toBe("string");
});
