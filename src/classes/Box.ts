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
      .setDisplaySize(1170 / 7, 2532 / 15).refreshBody().setDepth(20);
    this.sprite.setImmovable(false);
  }

  push(velocity: Phaser.Math.Vector2) {
    const speed = 10; // Adjust the pushing speed
    this.sprite.setVelocity(velocity.x * speed, velocity.y * speed);
  }
  
  moveOpposite(velocity: Phaser.Math.Vector2) {
    const speed = 10;
    this.sprite.setVelocity(-velocity.x * speed, -velocity.y * speed); // Move in the opposite direction
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