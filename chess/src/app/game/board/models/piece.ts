
export class Piece {
    pieceName: string;
    graphic: string;
    arrayRow: number;
    arrayCol: number;

    constructor (name: string, row: number, col: number)
    {
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
            pieceGraphic = '♙';
        }
        else if (name == 'N')
        {
            pieceGraphic = '♘';
        }
        else if (name == 'B')
        {
            pieceGraphic = '♗';
        }
        else if (name == 'R')
        {
            pieceGraphic = '♖';
        }
        else if (name == 'K')
        {
            pieceGraphic = '♔';
        }
        else if (name == 'Q')
        {
            pieceGraphic = '♕';
        }
        else if (name == 'p')
        {
            pieceGraphic = '♟';
        }
        else if (name == 'n')
        {
            pieceGraphic = '♞';
        }
        else if (name == 'b')
        {
            pieceGraphic = '♝';
        }
        else if (name == 'r')
        {
            pieceGraphic = '♜';
        }
        else if (name == 'k')
        {
            pieceGraphic = '♚';
        }
        else if (name == 'q')
        {
            pieceGraphic = '♛';
        }
        else if (name == '0')
        {
            pieceGraphic = ' ';
        }

        return pieceGraphic;
    }
}