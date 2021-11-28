
export class Piece {
    pieceName: string;
    graphic: string;
    arrayRow: number;
    arrayCol: number;
    color: number; // white == 0, black == 1

// ======================================================================== //

    constructor (name: string, row: number, col: number)
    {
        if (name == '0')
        {
            return undefined;
        }
        this.pieceName = name;
        this.graphic = this.initGraphic(name);
        this.arrayRow = row;
        this.arrayCol = col;
        this.color = this.getColor(name);
    }

// ======================================================================== //

    initGraphic(name: string): string
    {
        let pieceGraphic: string = '';

        
        if (name == 'P')
        {
            pieceGraphic = 'assets/wP.png';
        }
        else if (name == 'N')
        {
            pieceGraphic = 'assets/wN.png';
        }
        else if (name == 'B')
        {
            pieceGraphic = 'assets/wB.png';
        }
        else if (name == 'R')
        {
            pieceGraphic = 'assets/wR.png';
        }
        else if (name == 'K')
        {
            pieceGraphic = 'assets/wK.png';
        }
        else if (name == 'Q')
        {
            pieceGraphic = 'assets/wQ.png';
        }
        else if (name == 'p')
        {
            pieceGraphic = 'assets/bP.png';
        }
        else if (name == 'n')
        {
            pieceGraphic = 'assets/bN.png';
        }
        else if (name == 'b')
        {
            pieceGraphic = 'assets/bB.png';
            this.color = 1;
        }
        else if (name == 'r')
        {
            pieceGraphic = 'assets/bR.png';
        }
        else if (name == 'k')
        {
            pieceGraphic = 'assets/bK.png';
        }
        else if (name == 'q')
        {
            pieceGraphic = 'assets/bQ.png';
        }

        return pieceGraphic;
    }

// ======================================================================== //

    getColor(name: string)
    {
        let theColor: number;
        if (this.isUpper(name))
        {
            theColor = 0;
        }
        else if (this.isLower(name))
        {
            theColor = 1;
        }
        else
        {
            theColor = undefined;
        }

        return theColor;
    }
        
    // ======================================================================== //

    isUpper(char: string)
    {
        if (char == char.toUpperCase())
        {
        return true;
        }
        else
        {
        return false;
        }
    }

    // ======================================================================== //

    isLower(char: string)
    {
        if (char == char.toLowerCase())
        {
        return true;
        }
        else
        {
        return false;
        }
    }

    // ======================================================================== //

    getLegalMoves()
    {
        
    }

    // ======================================================================== //

}