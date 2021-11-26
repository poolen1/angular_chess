
export class Piece {
    pieceName: string;
    graphic: string;
    arrayRow: number;
    arrayCol: number;

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
    }

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
}