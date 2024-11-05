import { Bullet } from "./bullet";
import { intersectRect } from "../physics/rect";
import { Vec2 } from "../physics/vec2";
import { Entity, World } from "../world";
import { AssaultRifle, Minigun, Pistol, Rifle } from "./pistol";
import { Shotgun } from "./shotgun";

export interface Gun {
  dir: Vec2;
  vel: number;
  ammo: number;
  clip: number;
  isReloading: boolean;
  length: number;
  isInWall?: boolean;
  shoot(world: World): Bullet[];
  reload(): void;
  doStep(world: World): Bullet[] | undefined;
}

export class GunDrop implements Entity {
  readonly size = Vec2.square(20);
  readonly color = "lightblue";
  constructor(public readonly pos: Vec2, private readonly gun: Gun) {}

  doStep(world: World): boolean {
    if (intersectRect(this, world.player)) {
      world.activeGun = this.gun;
      return false;
    }
    return true;
  }
}

export function RandomGun(): Gun {
  const guns: Gun[] = [
    new Pistol(),
    // new Shotgun(),
    new AssaultRifle(),
    new Rifle(),
    new Minigun(),
  ];
  const r = Math.floor(Math.random() * guns.length);
  return guns[r];
}
