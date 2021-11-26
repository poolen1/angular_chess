import { Component, OnInit, Input } from '@angular/core';
import { BoardSpace } from '../board/models/boardSpace';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Piece } from '../board/models/piece';

@Component({
  selector: 'app-square',
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.css']
})
export class SquareComponent implements OnInit {
  @Input() public square: BoardSpace;
  private temp: Piece;

  constructor() {}

  ngOnInit() {}

  onDrop(event: CdkDragDrop<BoardSpace>) {
    // console.log(event.previousIndex);
    // console.log(event.currentIndex);
    if (event.isPointerOverContainer) {
      const from: BoardSpace = event.previousContainer.data;
      const to: BoardSpace = event.container.data;
      if (event.previousContainer !== event.container) {
        to.piece = from.piece;
        from.piece = undefined;
      } else {
        to.piece = from.piece;
      }
    }
    // if (event.previousContainer === event.container) {
    //   moveItemInArray(event.container.data,
    //     event.previousIndex,
    //     event.currentIndex);
    // } else {
    //   transferArrayItem(event.previousContainer.data,
    //     event.container.data,
    //     event.previousIndex, event.currentIndex);
    // }
  }

  enteredDrop(event: CdkDragDrop<BoardSpace>) {
  }

  exitedDrop(event: CdkDragDrop<BoardSpace>) {
  }

  sortedDrop(event: CdkDragDrop<BoardSpace>) {
  }

}
