
export class Piece {
    pieceName: string;
    graphic: string;

    constructor (name: string)
    {
        this.pieceName = name;
        this.graphic = this.initGraphic(name);
    }

    initGraphic(name: string): string
    {
        let pieceGraphic: string = '';
        
        if (name == 'P')
        {
            pieceGraphic = '&#9817;';
        }
        else if (name == 'N')
        {
            pieceGraphic = '&#9816;';
        }
        else if (name == 'B')
        {
            pieceGraphic = '&#9815;';
        }
        else if (name == 'R')
        {
            pieceGraphic = '&#9814;';
        }
        else if (name == 'K')
        {
            pieceGraphic = '&#9812;';
        }
        else if (name == 'Q')
        {
            pieceGraphic = '&#9813;';
        }
        else if (name == 'p')
        {
            pieceGraphic = '&#9823;';
        }
        else if (name == 'n')
        {
            pieceGraphic = '&#9822;';
        }
        else if (name == 'b')
        {
            pieceGraphic = '&#9821;';
        }
        else if (name == 'r')
        {
            pieceGraphic = '&#9820;';
        }
        else if (name == 'k')
        {
            pieceGraphic = '&#9818;';
        }
        else if (name == 'q')
        {
            pieceGraphic = '&#9819;';
        }

        return pieceGraphic;
    }
}