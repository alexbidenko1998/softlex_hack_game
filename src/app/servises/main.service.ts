import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CalculationService} from './calculation.service';
import {WorldService} from './world.service';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  updaterIndex: number;
  intervalUpdateList: (() => void)[] = [
    () => this.enemiesUpdater(),
    () => this.finishUpdater()
  ];

  constructor(
    private http: HttpClient,
    private calculation: CalculationService,
    private world: WorldService
  ) {
    this.updater();
    this.http.get<any>('https://ipinfo.io').subscribe(result => {
      const loc = result.loc.split(',');
      const body = new FormData();
      // tslint:disable-next-line:max-line-length
      body.append('url', `https://weather.api.here.com/weather/1.0/report.json?app_id=UdRH6PlISTlADYsW6mzl&app_code=lfrrTheP9nBedeJyy1NtIA&product=forecast_7days_simple&latitude=${loc[0]}&longitude=${loc[1]}&language=russian`);
      this.http.post<any>('https://admire.social/back/get-weather.php', body).subscribe(weather => {
        if (weather.dailyForecasts.forecastLocation.forecast[0].highTemperature < 0) {
          this.world.weather = 2;
        } else if (weather.dailyForecasts.forecastLocation.forecast[0].description.toLowerCase().indexOf('облачно') > -1) {
          this.world.weather = 3;
        }
      });
    });
    for (let i = 0; i < 5; i++) {
      this.world.enemies.push({
        width: 100,
        height: 200,
        Y: 210,
        X: 1000 + i * 400 + (Math.random() * 400),
        speed: 3 + i * 0.5,
        isRevers: false,
        contact: () => {
          clearInterval(this.updaterIndex);
          if (confirm('Извините, но вы проиграли :( Желаете попробовать еще раз?')) {
            window.location.assign('/');
          }
        },
        texture: Math.floor(Math.random() * 3) + 1,
        isVisible: false
      });
    }
    this.world.finish.contact = () => {
      clearInterval(this.updaterIndex);
      if (confirm('Поздравляю, вы выиграли! Желаете попробовать еще раз?')) {
        window.location.assign('/');
      }
    };
  }

  private updater() {
    this.updaterIndex = setInterval(() => {
      this.intervalUpdateList.forEach(toUpdate => {
        toUpdate();
      });
    }, 150);
  }

  private enemiesUpdater() {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.world.enemies.length; i++) {
      this.world.enemies[i].isVisible = this.calculation.isUnitVisible(this.world.enemies[i]);
      if (this.world.enemies[i].isVisible) {
        if (Math.random() < 0.05) {
          this.world.enemies[i].isRevers = !this.world.enemies[i].isRevers;
        }
        this.world.enemies[i].X += (this.world.enemies[i].isRevers ? 1 : -1) * this.world.enemies[i].speed;
        if (this.calculation.checkContact(this.world.enemies[i], this.world.player, true) && this.world.isAtack) {
          this.world.enemies.splice(i, 1);
          this.world.count++;
        } else if (this.calculation.checkContact(this.world.enemies[i], this.world.player)) {
          this.world.enemies[i].contact();
        }
      }
    }
  }

  private finishUpdater() {
    if (this.calculation.checkContact(this.world.finish, this.world.player)) {
      this.world.finish.contact();
    }
  }

  hardContact() {
    const move = this.world.player.lastMove.split('|');
    this.world.player[move[0]] -= +move[1] * 2;
  }
}
