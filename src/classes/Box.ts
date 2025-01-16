/*
* this is the box program
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

  // Method to push the box in a given direction, with adjusted speed
  push(velocity: Phaser.Math.Vector2) {
    const speed = 10; // Adjust the pushing speed as needed
    this.sprite.setVelocity(velocity.x * speed, velocity.y * speed);
  }

  // Method to stop the box
  stop() {
    this.sprite.setVelocity(0, 0);
  }

  // Handle collision with pit, destroy both the box and pit
  handleCollisionWithPit(pit: Phaser.GameObjects.GameObject) {
    console.log("Box destroyed along with pit!");
    this.sprite.destroy(); // Destroy the box
    pit.destroy(); // Destroy the pit
  }
}