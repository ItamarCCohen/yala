//global scoped vars
const BOARD_SIZE = 8;
const WHITE_PLAYER = 'white';
const BLACK_PLAYER = 'black';

const PAWN = 'pawn';
const KING = 'king';


const CHECKERS_BOARD_ID = "checkers-board";

let game;
let table;
let selectedPiece;
let winner


//////////////////////////////////////////////////////////////////////////////////////////////////
//Updates board in terms of cells classes possible-moves and selected classes after making a move
//////////////////////////////////////////////////////////////////////////////////////////////////

function tryUpdateSelectedPiece(row, col) {
  // Clear all previous possible moves
  for (let i = 0; i < BOARD_SIZE; i++) {
    for (let j = 0; j < BOARD_SIZE; j++) {
      table.rows[i].cells[j].classList.remove('possible-move');
      table.rows[i].cells[j].classList.remove('selected');
    }
  }

///////////////////////////////////////////////////////////////////////
//Adds "possible-move" class to a cell that a piece's allowed to move to
///////////////////////////////////////////////////////////////////////
  const piece = game.boardData.getPiece(row, col);
  if (piece !== undefined) {
    let possibleMoves = game.getPossibleMoves(piece);
    for (let possibleMove of possibleMoves) {
      const cell = table.rows[possibleMove.row].cells[possibleMove.col];
      cell.classList.add('possible-move');
    }
  }
  ///////////////////////////////////////////////
  // Adds the "selected" class to a clicked cell
  ///////////////////////////////////////////////
  table.rows[row].cells[col].classList.add('selected');
  selectedPiece = piece;
}

  ///////////////////////////////////////////////////////////////////////////
  //A function thats incharge on adding the pieces img on the generated cell.
  ///////////////////////////////////////////////////////////////////////////

function addImage(cell, type, name) {
  let image = document.createElement('img');
  image.src = 'images/' + type + name + '.png';
  image.draggable = false;
  cell.appendChild(image);

}
  ///////////////////////////////////////////////////////////////////
  //A function that defines "on click" interactions
  ///////////////////////////////////////////////////////////////////

function onCellClick(row, col) {

  if (selectedPiece !== undefined && game.tryMove(selectedPiece, row, col)) {
    selectedPiece = undefined;
    createCheckersBoard(game.boardData);
    console.log(game.boardData.pieces)

  } else {
    tryUpdateSelectedPiece(row, col);
  }
}

  ///////////////////////////////////////////////////////////////////
  //The main function thats incharge on generating the checkersBoard
  ///////////////////////////////////////////////////////////////////
function createCheckersBoard(boardData) {
  table = document.getElementById(CHECKERS_BOARD_ID);
  if (table != null) {
    table.remove();
  }
  ///////////////////////////////
  // Create empty checkers board
  ///////////////////////////////
  table = document.createElement('table');
  table.id = CHECKERS_BOARD_ID;
  document.body.appendChild(table);
  for (let row = 0; row < BOARD_SIZE; row++) {
    const rowElement = table.insertRow();
    for (let col = 0; col < BOARD_SIZE; col++) {
      const cell = rowElement.insertCell();


      ////////////////////////////
      //Adds darkcells/lightcells
      ////////////////////////////
      if ((row + col) % 2 === 0) {
        cell.className = 'light-cell';
      } else {
        cell.className = 'dark-cell';
      }
      cell.addEventListener('click', () => onCellClick(row, col));


      //////////////////////
      //Game Restart Button
      //////////////////////
      const btn = document.getElementById('restartGame')
      btn.addEventListener("click", initGame)





    }

  }
  ////////////////////////////////////////////////////////
  // Adds the pieces images according to the pieces array
  ////////////////////////////////////////////////////////
  
  for (let piece of boardData.pieces) {
    const cell = table.rows[piece.row].cells[piece.col];
    addImage(cell, piece.player, piece.type);
  }


  
  if (game.winner !== undefined) {
    winnerDiv(game.winner.charAt(0).toUpperCase() + game.winner.slice(1))
  }

}


////////////////////////////////////////
//Popup div function that tells who won
////////////////////////////////////////
function winnerDiv(winner) {
  const winnerPopup = document.createElement('div');
  winnerPopup.textContent = winner + "player wins!";
  winnerPopup.classList.add('winner-dialog')
  //Deletes the turns p element value
  let turns = document.getElementById('turns')
  turns.innerHTML = ""
  table.appendChild(winnerPopup)
}




///////////////////////////////////////////////////////////////
//The sum up of it all. declares WHITE_PLAYER as first player
///////////////////////////////////////////////////////////////
function initGame() {
  game = new Game(WHITE_PLAYER);
  createCheckersBoard(game.boardData);
}

//////////////////////////////////////////////////////////////
//Waiting for the DOM to load and then initiating the program
//////////////////////////////////////////////////////////////
window.addEventListener("load", initGame);






