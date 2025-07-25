class Ship {
  constructor(length, location) {
    this.length = length;
    this.hits = 0;
    this.sunk = false;
    this.shipID = this.makeID();
    this.location = location;
  }

  hit() {
    this.hits += 1;
  }

  isSunk() {
    if (this.hits >= this.length) {
      this.sunk = true;
      return this.sunk;
    }
  }

  makeID() {
    return Math.random().toString(36).substr(2, 6);
  }
}

export { Ship };
