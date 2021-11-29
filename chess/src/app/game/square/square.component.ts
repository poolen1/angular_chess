import { Component, OnInit, Input } from '@angular/core';
import { BoardSpace } from '../board/models/boardSpace';
import { CdkDragDrop, CdkDragStart } from '@angular/cdk/drag-drop';
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
    console.log("piece: ", event.source.dropContainer.data.piece);

    this._gameService.pieceSelected(event);
  }

  // ======================================================================== //

  onDrop(event: CdkDragDrop<BoardSpace>) 
  {
    if (event.isPointerOverContainer) 
    {
      this._gameService.moveCompleted(event);

      const from: BoardSpace = event.previousContainer.data;
      const to: BoardSpace = event.container.data;
      if (event.previousContainer !== event.container) 
      {
        to.piece = from.piece;
        from.piece = undefined;
      } else 
      {
        to.piece = from.piece;
      }
    }
  }

  // ======================================================================== //

  piecePredicate(): boolean
  {
    if (this.square)
    {
      return this.square.canDrop;
    }
    else
    {
      return false;
    }
  }
  
  // ======================================================================== //

}
