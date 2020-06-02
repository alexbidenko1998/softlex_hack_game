import {Component, HostListener} from '@angular/core';
import {WorldService} from './servises/world.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'GameFront';

  playerOndMapDelta = 200;

  constructor(
    private world: WorldService
  ) {
  }

  @HostListener('document:keydown.d') arrowRight() {
    this.world.player.X += this.world.player.speed;
    this.world.player.lastMove = 'X|+' + this.world.player.speed;
    this.world.player.isRevers = true;

    this.world.mapX = this.world.player.X > this.playerOndMapDelta ?
      this.world.player.X - this.playerOndMapDelta : 0;
  }

  @HostListener('document:keydown.a') arrowLeft() {
    this.world.player.X -= this.world.player.speed;
    if (this.world.player.X <= 0) {
      this.world.player.X = 0;
    }
    this.world.player.lastMove = 'X|-' + this.world.player.speed;
    this.world.player.isRevers = false;

    this.world.mapX = this.world.player.X > this.playerOndMapDelta ?
      this.world.player.X - this.playerOndMapDelta : 0;
  }

  @HostListener('document:keydown.f') attack() {
    this.world.isAtack = true;
  }

  @HostListener('document:keyup.f') stop() {
    this.world.isAtack = false;
  }
}
