
class Piece {
    constructor(row, col, type, player) {
        this.row = row;
        this.col = col;
        this.type = type;
        this.player = player;


    }
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //Function that checks if the a specific cell is "friendly" to a certain piece or not. Depending on the cell's piece color. 
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    getColor() {

        if (this.player === WHITE_PLAYER) {
            return BLACK_PLAYER;

        } else if (this.player !== WHITE_PLAYER) {
            return WHITE_PLAYER;

        }

    }
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //Function that makes sure a piece is declared a "KING" when getting to the sevenTH/zeroTH row depending on the piece's color
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    checksIfKing() {
        console.log(this.row, this.player)
        if (this.row === 7 && this.player === WHITE_PLAYER) {
            this.type = KING

            console.log("check white")

        } else if (this.row === 0 && this.player === BLACK_PLAYER) {
            console.log("check black")
            this.type = KING

            console.log("check black")
        }
    }

    ///////////////////////////////////////////////////////////////////////////////////////
    //Get the moves data of the getPawnMoves+getKingMoves into possibleMoves function
    ///////////////////////////////////////////////////////////////////////////////////////
    getPossibleMoves(boardData) {
        let moves;
        if (this.type === PAWN) {
            moves = this.getPawnMoves(boardData);
        } else if (this.type === KING) {
            moves = this.getKingMoves(boardData);
        } else {
        }
       

        let filteredMoves = [];
        for (const absoluteMove of moves) {
            const absoluteRow = absoluteMove.row;
            const absoluteCol = absoluteMove.col;
            if (absoluteRow >= 0 && absoluteRow <= 7 && absoluteCol >= 0 && absoluteCol <= 7) {
                filteredMoves.push(absoluteMove);

            }
        }
        console.log('filteredMoves', filteredMoves);
        return filteredMoves;
    }


    /////////////////////////////////////////////
    // Defines Pawn moves + specific eating move
    /////////////////////////////////////////////
    getPawnMoves(boardData) {
        let result = [];


        let direction = 1;
        let attDirection = 2

        if (this.player === BLACK_PLAYER) {
            direction = -1;
            attDirection = -2

        }
        let position1 = [this.row + direction, this.col + direction];
        let position2 = [this.row + direction, this.col - direction];
        let positionAttack1 = [this.row + attDirection, this.col + attDirection];
        let positionAttack2 = [this.row + attDirection, this.col - attDirection];



        //Checks  diagonal side position 1
        if (boardData.isEmpty(position1[0], position1[1])) {
            result.push(new PossibleMove(position1[0], position1[1], []))



            // Checks if 1 possible moves of "eating" can be made for position1
        } else if (boardData.isPlayer(position1[0], position1[1], this.getColor()) && boardData.isEmpty(positionAttack1[0], positionAttack1[1])) {

            result.push(new PossibleMove(positionAttack1[0], positionAttack1[1], [position1]))

            // Checks if 2 possible moves of "eating" can be made for position1
        } else if (boardData.isPlayer(position2[0], position2[1], this.getColor()) && boardData.isPlayer(position1[0], position1[1], this.getColor())
            && boardData.isEmpty(positionAttack2[0], positionAttack2[1]) && boardData.isEmpty(positionAttack1[0], positionAttack1[1])) {

            result.push(new PossibleMove(positionAttack2[0], positionAttack2[1], [position2]))
            result.push(new PossibleMove(positionAttack1[0], positionAttack1[1], [position1]))



        }
        //Checks  diagonal side position 2
        if (boardData.isEmpty(position2[0], position2[1])) {
            result.push(new PossibleMove(position1[0], position2[1], []))



            // Checks if 1 possible moves of "eating" can be made for position2
        } else if (boardData.isPlayer(position2[0], position2[1], this.getColor()) && boardData.isEmpty(positionAttack2[0], positionAttack2[1])) {
            result.push(positionAttack2)
            result.push(new PossibleMove(positionAttack2[0], positionAttack2[1], [position2]))

            // Checks if 2 possible moves of "eating" can be made for position2
        } else if (boardData.isPlayer(position2[0], position2[1], this.getColor()) && boardData.isPlayer(position1[0], position1[1], this.getColor())
            && boardData.isEmpty(positionAttack2[0], positionAttack2[1]) && boardData.isEmpty(positionAttack1[0], positionAttack1[1])) {


            result.push(new PossibleMove(positionAttack2[0], positionAttack2[1], [position2]))
            result.push(new PossibleMove(positionAttack1[0], positionAttack1[1], [position1]))


        }
        return result;
    }


    ///////////////////////////////////////////////////////////////////////////////////////
    //Takes movements rules from pawn. getKingMoves makes king backwards movements and jump
    ///////////////////////////////////////////////////////////////////////////////////////

    getKingMoves(boardData) {
        let result = [];
        let direction = 1;
        let attDirection = 2;

        if (this.player === BLACK_PLAYER) {
            direction = -1;
            attDirection = -2;
        }
        let position3 = [this.row - direction, this.col + direction];
        let position4 = [this.row - direction, this.col - direction];
        let positionAttack3 = [this.row - attDirection, this.col + attDirection];
        let positionAttack4 = [this.row - attDirection, this.col - attDirection];



        //Checks  diagonal side position 3
        if (boardData.isEmpty(position3[0], position3[1])) {
            result.push(new PossibleMove(position3[0], position3[1], []))



            // Checks if 1 possible moves of "eating" can be made for position3
        } else if (boardData.isPlayer(position3[0], position3[1], this.getColor()) && boardData.isEmpty(positionAttack3[0], positionAttack3[1])) {
            result = [];
            result.push(new PossibleMove(positionAttack3[0], positionAttack3[1], [position3]))


            // Checks if 2 possible moves of "eating" can be made for position3
        } else if (boardData.isPlayer(position4[0], position4[1], this.getColor()) && boardData.isPlayer(position3[0], position3[1], this.getColor())
            && boardData.isEmpty(positionAttack4[0], positionAttack4[1]) && boardData.isEmpty(positionAttack3[0], positionAttack3[1])) {

            result.push(new PossibleMove(positionAttack3[0], positionAttack3[1], [position3]))
            result.push(new PossibleMove(positionAttack4[0], positionAttack4[1], [position4]))



        }
        // Checks diagonal side position 4
        if (boardData.isEmpty(position4[0], position4[1])) {
            result.push(new PossibleMove(position4[0], position4[1], []))



            // Checks if 1 possible moves of "eating" can be made for position4
        } else if (boardData.isPlayer(position4[0], position4[1], this.getColor()) && boardData.isEmpty(positionAttack4[0], positionAttack4[1])) {
            result.push(new PossibleMove(positionAttack4[0], positionAttack4[1], [position4]))


            // Checks if 2 possible moves of "eating" can be made  for position3
        } else if (boardData.isPlayer(position4[0], position4[1], this.getColor()) && boardData.isPlayer(position3[0], position3[1], this.getColor())
            && boardData.isEmpty(positionAttack4[0], positionAttack4[1]) && boardData.isEmpty(positionAttack3[0], positionAttack3[1])) {
            result.push(new PossibleMove(positionAttack3[0], positionAttack3[1], [position3]))
            result.push(new PossibleMove(positionAttack4[0], positionAttack4[1], [position4]))



        }
        //Takes getPawnMoves result and add the getPawnMoves result to it.
        result = result.concat(this.getPawnMoves(boardData))
        return result;

    }


}











