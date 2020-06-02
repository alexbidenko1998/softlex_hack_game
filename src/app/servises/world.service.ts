import { Injectable } from '@angular/core';
import {Enemy, Player, Static} from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class WorldService {

  mapX = 0;
  weather = 1;

  player: Player = {
    X: 100,
    Y: 210,
    width: 100,
    height: 200,
    speed: 6,
    lastMove: 'X|0',
    isRevers: true
  };

  isAtack = false;
  count = 0;

  enemies: Enemy[] = [];

  finish: Static = {
    width: 10000,
    height: 300,
    Y: 0,
    X: 5000,
    speed: 0,
    contact: () => {}
  };

  constructor() { }
}
