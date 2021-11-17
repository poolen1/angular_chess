import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameComponent } from './game/game.component';
import { BoardComponent } from './game/board/board.component';
import { Piece } from './game/pieces/pieces.component';

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    BoardComponent,
    Piece
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
