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

  constructor(scene: Phaser.Scene, x: number, y: number) {
    this.sprite = scene.physics.add.sprite(x, y, "key");
  }

  collect(callback: () => void) {
    this.sprite.destroy();
    callback();
  }
}