import { Player } from "./player";
import { Gameboard } from "./gameboard";

test("Player correctly instantiates gameboard", () => {
  const computer = new Player("computer");
  expect(computer.gameboard).toBeInstanceOf(Gameboard);
});
