export class Unit {
  width: number;
  height: number;
  X: number;
  Y: number;
  speed: number;
}
export class Player extends Unit {
  lastMove: string;
  isRevers: boolean;
}
export class Enemy extends Unit {
  isVisible: boolean;
  contact: () => void;
  texture: number;
  isRevers: boolean;
}
export class Static extends Unit {
  contact: () => void;
}
