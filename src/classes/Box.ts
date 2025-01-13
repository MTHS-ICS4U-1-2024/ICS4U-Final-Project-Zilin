/*
* the is the box program
*
* @author Zilin
* @version 1.0
* @since 2025-01-13
*/
import Phaser from "phaser";

export default class Box {
  public sprite: Phaser.Physics.Arcade.Sprite;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    this.sprite = scene.physics.add.sprite(x, y, "box");
    this.sprite.setImmovable(true);
  }

  push() {
    // Add behavior to destroy pit and itself
    console.log("Box pushed!");
  }
}