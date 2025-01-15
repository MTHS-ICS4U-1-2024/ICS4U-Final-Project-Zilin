/**
 * This is the Rock program
 * 
 * @author Zilin
 * @version 1.0
 * @since 2025-01-13
 */
import Phaser from "phaser";

export default class Rock {
  public sprite: Phaser.Physics.Arcade.Sprite;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    this.sprite = scene.physics.add.sprite(x, y, "rock")
    .setDisplaySize(1170 / 7, 2532 / 15);
    this.sprite.setImmovable(true);
  }

  moveOpposite(playerVelocity: Phaser.Math.Vector2) {
    const speed = 150;
    if (playerVelocity.x > 0) this.sprite.setVelocityX(speed);
    if (playerVelocity.x < 0) this.sprite.setVelocityX(-speed);
    if (playerVelocity.y > 0) this.sprite.setVelocityY(speed);
    if (playerVelocity.y < 0) this.sprite.setVelocityY(-speed);
  }
}
