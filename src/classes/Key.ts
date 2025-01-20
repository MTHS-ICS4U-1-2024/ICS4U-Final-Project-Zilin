/*
* This is the stair program
*
* @author Zilin
* @version 1.0
* @since 2025-01-13
*/

import Phaser from "phaser";

export default class Key {
  public sprite: Phaser.Physics.Arcade.Sprite;

  constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
    this.sprite = scene.physics.add.sprite(x, y, texture)
    .setDisplaySize(1170 / 7, 2532 / 15);
  }

  collect(callback: () => void) {
    this.sprite.destroy();
    callback();
    console.log('This key might open something');
  }
}