import { Piece } from "./piece";

export class Bitboard {
    name: string;
    board: any[];

    // ======================================================================== //

    constructor(boardName: string)
    {
        this.name = boardName;
        this.board = this.initBitboard();
    }

    // ======================================================================== //

    initBitboard(): any
    {
        let gameBoard: any[] = [];

        for (let i=0; i<8; i++)
        {
            let row: number[] = []
            gameBoard.push(row);
            for (let j=0; j<8; j++)
            {
                gameBoard[i].push(0);
            }
        }

        if (this.name == 'P')
        {
            for (let i=0; i<8; i++)
            {
                gameBoard[6][i] = 1;
            }
        }
        else if (this.name == 'N')
        {
            gameBoard[7][1] = 1;
            gameBoard[7][6] = 1;
        }
        else if (this.name == 'B')
        {
            gameBoard[7][2] = 1;
            gameBoard[7][5] = 1;
        }
        else if (this.name == 'R')
        {
            gameBoard[7][0] = 1;
            gameBoard[7][7] = 1;
        }
        else if (this.name == 'K')
        {
            gameBoard[7][4] = 1;
        }
        else if (this.name == 'Q')
        {
            gameBoard[7][3] = 1;
        }
        else if (this.name == 'p')
        {
            for (let i=0; i<8; i++)
            {
                gameBoard[1][i] = 1;
            }
        }
        else if (this.name == 'n')
        {
            gameBoard[0][1] = 1;
            gameBoard[0][6] = 1;
        }
        else if (this.name == 'b')
        {
            gameBoard[0][2] = 1;
            gameBoard[0][5] = 1;
        }
        else if (this.name == 'r')
        {
            gameBoard[0][0] = 1;
            gameBoard[0][7] = 1;
        }
        else if (this.name == 'k')
        {
            gameBoard[0][4] = 1;
        }
        else if (this.name == 'q')
        {
            gameBoard[0][3] = 1;
        }

        return gameBoard;
    }
    
    // ======================================================================== //

    updateBitboard(piece: Piece)
    {
        
    }

    // ======================================================================== //
}