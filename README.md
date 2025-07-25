# Battleship

A fully interactive browser-based Battleship game, built using vanilla JavaScript and Webpack. This project showcases my understanding of DOM manipulation, modular architecture, test-driven development (TDD), and advanced browser features like drag-and-drop.

## Features

- 10x10 grid for each player
- Player vs Computer gameplay
- Interactive ship placement using drag-and-drop
- Visual feedback on hits, misses, and sunk ships
- Game ends when all ships of one player are sunk
- Clear separation of game logic, DOM rendering, and player state

## What I Learned

### 🧠 JavaScript Fundamentals

- How to write modular JavaScript using ES6 modules
- Handling events like `click`, `dragstart`, `drop`, and `dragover`
- Updating the DOM efficiently without mixing logic and rendering

### 🔄 Webpack

- How to configure a custom Webpack setup (entry/output, loaders, asset handling)
- Using `require.context` to dynamically load and render many images
- Understanding how asset naming conflicts can arise and how to fix them using `asset/resource` + `generator.filename`

### 🧪 Test-Driven Development (TDD)

- Wrote unit tests first for core game logic: ship placement, hit detection, sunk ship tracking
- Used TDD to ensure reliability before integrating with the UI
- Practiced debugging through test feedback and logical isolation

### 📦 Separation of Concerns

- Game logic (like attacking, checking for valid moves, turn handling) is isolated from UI logic
- DOMManager is responsible only for rendering and event wiring
- This structure made it easier to debug and test specific parts without side effects

### 🎮 UX + Edge Cases

- Implemented rules like preventing ships from overlapping
- Automatically starts the game when all ships are placed
- Gracefully handles errors like invalid drops or repeat attacks

## Development Setup

1. Clone the repo
2. Run `npm install`
3. Start dev server: `npm run start`
4. Build for production: `npm run build`

Webpack handles bundling JS, loading images, and injecting everything into a clean `dist/` folder.

## Credits

Sprites were hand-edited in GIMP and used to build a simple but nostalgic UI. This project was part of [The Odin Project](https://www.theodinproject.com) curriculum.

---

Built with frustration, stubbornness, and a lot of `console.log`.
