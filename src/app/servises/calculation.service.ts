import { Injectable } from '@angular/core';
import {Unit} from '../models/models';
import {WorldService} from './world.service';

@Injectable({
  providedIn: 'root'
})
export class CalculationService {

  constructor(
    private world: WorldService
  ) { }

  public checkContact(a: Unit, b: Unit, isLight: boolean = false): boolean {
    return  a.X < b.X + b.width + (isLight ? 50 : 0)
      && a.X + a.width > b.X
      && a.Y - a.height < b.Y
      && a.Y > b.Y - b.height;
  }

  public isUnitVisible(a: Unit): boolean {
    return a.X < this.world.mapX + window.innerWidth + 500
      && a.X + a.width > this.world.mapX - 500;
  }
}
