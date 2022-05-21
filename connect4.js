/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

var WIDTH = 7;
var HEIGHT = 6;

var currPlayer = 1; // active player: 1 or 2
var board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
  for (let i = 0; i < WIDTH; i++) {
    board[i] = [];
    for (let j = 0; j < HEIGHT; j++) {
      board[i].push(null);
    }
  }
  return board;
}


/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
  const htmlBoard = document.getElementById('board');
  // TODO: add comment for this code

  //new table row is created as the top variable
  //top is then given an id of 'column-top'
  //top is then given an event listener so on click the handleClick function is run
  var top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);

  //new table data is created as a headCell variable 
  //headCell is then given an id of 'x'
  //headCell is then appended to the top row created above
  //this functionality occurs once for every instance of width
  //when loop ends, the top tr with all tds is appended to the htmlboard
  for (var x = 0; x < WIDTH; x++) {
    var headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  htmlBoard.append(top);

  // TODO: add comment for this code

  //for each instance of height a new table row element is created and set to variable row
  //for every one loop of height, each instance of width is looped
  //in the inner loop a new table data element is created and set to cell variable
  //this cell variable is given an id of the y coordinate and x coordinate and then appended to the row
  //in the outer loop this row, with all the individual tds, is appended to the htmlboard
  //this repeats for each instance of height
  for (var y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr");
    for (var x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`);
      row.append(cell);
    }
    htmlBoard.append(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 0
  for (let i = board[x].length-1; i >= 0; i--) {
    if (board[x][i] === null) {
      return i;
    } 
  }
  return null;
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
  
  const gamePiece = document.createElement('div');
  const pieceSlot = document.getElementById(`${y}-${x}`);
  pieceSlot.appendChild(gamePiece); 
  gamePiece.classList.add('piece');
  
  if(currPlayer === 1) {
    gamePiece.classList.add('p1'); 
  } else {
    gamePiece.classList.add('p2');
  }
  board[x][y] = currPlayer; 
}

/** endGame: announce game end */

function endGame(msg) {
  // TODO: pop up alert message
  alert(msg);
}

////
function boardFull(arr) {
  for (let i = 0; i < arr.length; i++) {
    console.log(arr[i]);
    return arr[i].every(function(x) {
      console.log(x, 'x');
      if (x === null) {
        return false;
      }
      return true; 
    })
  }
}
////

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {

  // get x from ID of clicked cell
  var x = +evt.target.id;


  // get next spot in column (if none, ignore click)
  var y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  placeInTable(y, x);

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame
 
  if (boardFull(board)) {
    endGame('This game is a tie!');
  } 
  
  // switch players
  // TODO: switch currPlayer 1 <-> 2
  
  if (currPlayer === 1) {
    currPlayer = 2; 
  } else {
    currPlayer = 1; 
  }
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.

  //for each column, each td is checked according to various winning scenarios
  for (var y = 0; y < HEIGHT; y++) {
    for (var x = 0; x < WIDTH; x++) {
      //are there 4 in a row horizontally
      var horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      //are there 4 in a row vertically
      var vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      //are there 4 in a row diagonally going up to the right
      var diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      //are there 4 in a row diagonally going up to the left
      var diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
