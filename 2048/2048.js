class Game {
  constructor(board_size) {
    this.board_size = board_size;
    this.board = this.initBoard();
    this.createBoard();
    this.score = 2;
    this.updateScore();
    var event = document.getElementById("event-display");
    event.innerHTML = "";
  }

  initBoard() {
    let board = [],
      line = [];
    for (var i = 0; i < board_size; i++) {
      line = [];
      for (var j = 0; j < board_size; j++) {
        line.push(0);
      }
      board.push(line);
    }
    board[parseInt(Math.random() * board_size)][
      parseInt(Math.random() * board_size)
    ] = 2;
    return board;
  }

  perc2color(perc) {
    var r,
      g,
      b = 0;
    if (100 - perc / 2 < 50) {
      r = 255;
      g = Math.round(5.1 * (100 - perc / 2));
    } else {
      g = 255;
      r = Math.round(510 - 5.1 * (100 - perc / 2));
    }
    var h = r * 0x10000 + g * 0x100 + b * 0x1;
    return "#" + ("000000" + h.toString(16)).slice(-6);
  }

  createBoard() {
    var grid = document.getElementById("grid-container");

    while (grid.firstChild) {
      grid.removeChild(grid.firstChild);
    }

    for (var i = 0; i < board_size; i++) {
      var line = document.createElement("div");
      line.className = "row";
      for (var j = 0; j < board_size; j++) {
        var cell = document.createElement("div");
        cell.className = "cell col";
        cell.innerHTML = this.board[i][j] === 0 ? " " : this.board[i][j];
        cell.style.backgroundColor =
          this.board[i][j] === 0 ? "#bc9" : this.perc2color(this.board[i][j]);
        cell.style.width = parseInt(400 / board_size) + "px";
        cell.style.height = parseInt(400 / board_size) + "px";
        line.appendChild(cell);
      }
      grid.appendChild(line);
    }
  }

  updateScore() {
    var score = document.getElementById("score");
    score.innerHTML = "Score : " + this.score;
  }

  isSimplifiedLine(line) {
    for (var i = 0; i < line.length - 1; i++) {
      if (
        (line[i] !== 0 && line[i] === line[i + 1]) ||
        (line[i] === 0 && line[i + 1] !== 0)
      ) {
        return false;
      }
    }
    return true;
  }

  moveLine(line) {
    let newLine = line;
    while (!this.isSimplifiedLine(newLine)) {
      for (var i = 0; i < line.length - 1; i++) {
        if (newLine[i] !== 0 && newLine[i] === newLine[i + 1]) {
          newLine[i] = 2 * newLine[i];
          newLine[i + 1] = 0;
          this.score += newLine[i];
        } else if (newLine[i] === 0) {
          for (var j = i; j < line.length - 1; j++) {
            newLine[j] = newLine[j + 1];
          }
          newLine[line.length - 1] = 0;
        }
      }
    }
    return newLine;
  }

  newRandomCell(newBoard) {
    let hasEmptyCell = false;
    for (var i = 0; i < newBoard.length; i++) {
      for (var j = 0; j < newBoard.length; j++) {
        if (newBoard[i][j] === 0) {
          hasEmptyCell = true;
          break;
        }
      }
    }
    if (!hasEmptyCell) {
      return null;
    }
    while (true) {
      var x = parseInt(Math.random() * board_size),
        y = parseInt(Math.random() * board_size);
      if (newBoard[x][y] === 0) {
        return [x, y];
      }
    }
  }

  transposeBoard(board) {
    let transposeBoard = [],
      transposeLine;
    for (var i = 0; i < board_size; i++) {
      transposeLine = [];
      for (var j = 0; j < board_size; j++) {
        transposeLine.push(board[j][i]);
      }
      transposeBoard.push(transposeLine);
    }
    return transposeBoard;
  }

  newBoard(direction) {
    let newBoard = [],
      line;
    if (direction === "left" || direction === "right") {
      for (var i = 0; i < this.board_size; i++) {
        if (direction === "left") {
          line = this.moveLine(this.board[i]);
        } else if (direction === "right") {
          line = this.moveLine(this.board[i].reverse()).reverse();
        }
        newBoard.push(line);
      }
    } else if (direction === "up" || direction === "down") {
      let transposeBoard = this.transposeBoard(this.board);
      for (var i = 0; i < this.board_size; i++) {
        if (direction === "up") {
          line = this.moveLine(transposeBoard[i]);
        } else if (direction === "down") {
          line = this.moveLine(transposeBoard[i].reverse()).reverse();
        }
        newBoard.push(line);
      }
      newBoard = this.transposeBoard(newBoard);
    }

    let newCell = this.newRandomCell(newBoard);
    if (newCell !== null) {
      newBoard[newCell[0]][newCell[1]] = 2;
      this.score += 2;
    } else {
      if (!this.isFinishBoard()) {
        console.log("Board full but not end");
      } else {
        this.end();
      }
    }

    return newBoard;
  }

  move(direction) {
    this.board = this.newBoard(direction);
    this.createBoard();
    this.updateScore();
  }

  isFinishBoard() {
    for (var i = 0; i < this.board_size; i++) {
      for (var j = 0; j < this.board_size; j++) {
        if (this.board[i][j] === 0) {
          return false;
        }
      }
    }

    for (var i = 0; i < this.board_size - 1; i++) {
      for (var j = 0; j < this.board_size - 1; j++) {
        if (
          this.board[i][j] === this.board[i][j + 1] ||
          this.board[i][j] === this.board[i + 1][j]
        ) {
          return false;
        }
      }
    }
    return true;
  }

  end() {
    var event = document.getElementById("event-display");
    event.innerHTML = "You lose";
  }
}

var board_size = 4;
let game = new Game(board_size);

slider = document.getElementById("slide-range");

slider.addEventListener("change", (e) => {
  board_size = slider.value;
  game = new Game(board_size);
});

document.onkeydown = checkKey;

function checkKey(e) {
  e = e || window.event;
  if (e.keyCode == "38") {
    // up arrow
    game.move("up");
  } else if (e.keyCode == "40") {
    // down arrow
    game.move("down");
  } else if (e.keyCode == "37") {
    // left arrow
    game.move("left");
  } else if (e.keyCode == "39") {
    // right arrow
    game.move("right");
  }
}
