class Game {
  constructor(firstPlayer) {
    this.boardData = new BoardData();
    this.currentPlayer = firstPlayer;
    this.winner = undefined;

  }

  //////////////////////////////////////////////////////////
  //A function that allows pieces to attempt to make a move.
  //////////////////////////////////////////////////////////
  tryMove(movePiece, row, col) {
    const possibleMoves = this.getPossibleMoves(movePiece);

    ////////////////////////////////////////////
    //Updates the p element who's turn is it.
    ////////////////////////////////////////////
    for (const possibleMove of possibleMoves) {
      if (possibleMove.row === row && possibleMove.col === col) {
        let turns = document.getElementById('turns')
        turns.innerHTML = movePiece.getColor() + "'s turn"


        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //Loops through possible moves and defines what a removed pieces is according to the attacked cells of the possibleMove class
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        for (let i = 0; i < possibleMove.attacks.length; i++) {
          let attack = possibleMove.attacks[i]
          const removedPiece = this.boardData.removePiece(attack[0], attack[1]);
        }
        movePiece.col = col;
        movePiece.row = row;
        /////////////////////////////////////////////////////////////////
        //Within each move made, checks if this piece became a KING type
        /////////////////////////////////////////////////////////////////
        movePiece.checksIfKing()



        ////////////////////////////////////////////////////////////////////////
        //Loops through the pieces array and counting the remained enemy pieces
        ////////////////////////////////////////////////////////////////////////
        let enemyPieceCount = 0
        for (let i = 0; i < this.boardData.pieces.length; i++) {
          let currentPiece = this.boardData.pieces[i]
          if (currentPiece.getColor() !== movePiece.getColor()) {
            enemyPieceCount++
          }
        }

        if (enemyPieceCount === 0) {
          this.winner = movePiece.player;
        }


        this.currentPlayer = movePiece.getColor();

        return true;
      }
    }
    return false;
  }


////////////////////////////////////////////////////////////////////////////////////////
//A function that makes sure opponents wont be able to make a move on this.player's turn
////////////////////////////////////////////////////////////////////////////////////////
  getPossibleMoves(piece) {
    if (this.currentPlayer !== piece.player || this.winner !== undefined) {
      return [];
    }
    return piece.getPossibleMoves(this.boardData)
  }
}




