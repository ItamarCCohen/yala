
class BoardData {
    constructor() {
        this.initPieces();
    }

/////////////////////////////////////////////////////////////////////////////////////
//function that sets the pieces in their right places on the generating of the board
/////////////////////////////////////////////////////////////////////////////////////
    initPieces() {
        this.pieces = [];

        for (let i = 0; i < BOARD_SIZE; i += 2) {
            this.pieces.push(new Piece(0, 1 + i, PAWN, WHITE_PLAYER));
            this.pieces.push(new Piece(1, i, PAWN, WHITE_PLAYER));
            this.pieces.push(new Piece(2, 1 + i, PAWN, WHITE_PLAYER));
            this.pieces.push(new Piece(5, i, PAWN, BLACK_PLAYER));
            this.pieces.push(new Piece(6, 1 + i, PAWN, BLACK_PLAYER));
            this.pieces.push(new Piece(7, i, PAWN, BLACK_PLAYER));
            console.log(this.pieces)
        }
    }


    /////////////////////////////////////////////////////////
    // Returns piece in row, col, or undefined if not exists
    /////////////////////////////////////////////////////////
    getPiece(row, col) {
        for (const piece of this.pieces) {
            if (piece.row === row && piece.col === col) {
                return piece;

            }

        }
    }



    ////////////////////////////////////////////////////////
    // Checks if the cell has a piece in it or not is empty
    ///////////////////////////////////////////////////////
    isEmpty(row, col) {

        return this.getPiece(row, col) === undefined;

    }

    ///////////////////////////////////////////
    // Checks if piece is from the same player
    ///////////////////////////////////////////
    isPlayer(row, col, player) {

        const piece = this.getPiece(row, col);

        return piece !== undefined && piece.player === player;
    }

    ////////////////////////////////////////////////////////////////////////////
    //A function that is incharge of removing the piece out of the pieces items
    ////////////////////////////////////////////////////////////////////////////
    removePiece(row, col) {
        for (let i = 0; i < this.pieces.length; i++) {
            const piece = this.pieces[i];
            console.log(row, col)
            if ((piece.row === row && piece.col === col)) {
                this.pieces.splice(i, 1);
                return piece;
            }
        }

    }
}
