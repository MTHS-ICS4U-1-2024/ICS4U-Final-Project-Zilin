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

  constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
    this.sprite = scene.physics.add.sprite(x, y, texture)
    .setDisplaySize(1170 / 7, 2532 / 15).refreshBody();
    this.sprite.setImmovable(true);
  }

  push(velocity: Phaser.Math.Vector2) {
    const speed = 150; // Adjust the pushing speed
    this.sprite.setVelocity(velocity.x * speed, velocity.y * speed);
  }

  stop() {
    this.sprite.setVelocity(0);
  }

  handleCollisionWithPit(pit: Phaser.GameObjects.GameObject) {
    console.log("Box destroyed along with pit!");
    this.sprite.destroy(); // Destroy the box
    pit.destroy(); // Destroy the pit
  }
}