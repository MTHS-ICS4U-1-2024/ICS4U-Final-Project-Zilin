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

  constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
    this.sprite = scene.physics.add.sprite(x, y, texture)
    .setDisplaySize(1170 / 7, 2532 / 15).refreshBody();
    this.sprite.setImmovable(true);
  }

  moveOpposite(playerVelocity: Phaser.Math.Vector2) {
    const speed = 150;
    if (playerVelocity.x > 0) this.sprite.setVelocityX(speed);
    if (playerVelocity.x < 0) this.sprite.setVelocityX(-speed);
    if (playerVelocity.y > 0) this.sprite.setVelocityY(speed);
    if (playerVelocity.y < 0) this.sprite.setVelocityY(-speed);
  }

      
  handleCollisions(scene: Phaser.Scene, wallGroup: Phaser.Physics.Arcade.Group, brokenWallGroup: Phaser.Physics.Arcade.Group | Phaser.Physics.Arcade.StaticGroup) {
    scene.physics.add.collider(this.sprite, wallGroup);
    scene.physics.add.collider(this.sprite, brokenWallGroup, (_, brokenWall) => {
        if (brokenWall instanceof Phaser.GameObjects.GameObject) {
            this.sprite.destroy(); // Destroy the rock
            brokenWall.destroy(); // Destroy the broken wall
        }
    });
}
}
