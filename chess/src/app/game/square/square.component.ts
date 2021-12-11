import { Component, OnInit, Input } from '@angular/core';
import { BoardSpace } from '../board/models/boardSpace';
import { CdkDrag, CdkDragDrop, CdkDragStart, CdkDropList } from '@angular/cdk/drag-drop';
import { Piece } from '../board/models/piece';
import { BehaviorSubject } from 'rxjs';
import { GameService } from '../../services/game.service';

// ======================================================================== //

@Component({
  selector: 'app-square',
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.css']
})
export class SquareComponent implements OnInit {
  @Input() public square: BoardSpace;

  // ======================================================================== //

  constructor(private _gameService: GameService) 
  {
  }

  // ======================================================================== //

  ngOnInit() {}

  // ======================================================================== //

  onDrag(event: CdkDragStart<BoardSpace>)
  {
    this._gameService.pieceSelected(event);
  }

  // ======================================================================== //

  onDrop(event: CdkDragDrop<BoardSpace>) 
  {
    if (event.isPointerOverContainer) 
    {
      const from: BoardSpace = event.previousContainer.data;
      const to: BoardSpace = event.container.data;

      if (to.canDrop)
      {
        from.piece.hasMoved = true;

        if (event.previousContainer !== event.container) 
        {
          if (to.piece.pieceName != '0')
          {
            this.capturePiece(from.piece, to.piece);
          }
          to.piece = from.piece;
          from.piece = new Piece('0', from.arrayRow, from.arrayCol);

          to.piece.arrayRow = event.container.data.arrayRow;
          to.piece.arrayCol = event.container.data.arrayCol;
        } 
        else 
        {
          to.piece = from.piece;
        }

        this._gameService.moveCompleted(event);
      }
    }
    else
    {
      this._gameService.moveCompleted(event);
    }
  }
  
  // ======================================================================== //

  capturePiece(capturer: Piece, prisoner: Piece)
  {
    this._gameService.capturePiece(capturer, prisoner);
  }
  
  // ======================================================================== //
}
