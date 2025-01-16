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

  constructor(scene: Phaser.Scene, x: number, y: number, texture: string, immovable: boolean = false) {
    this.sprite = scene.physics.add.sprite(x, y, texture)
      .setDisplaySize(1170 / 7, 2532 / 15).refreshBody();
    this.sprite.setImmovable(immovable); // You can set immovable as a parameter
  }

  moveOpposite(playerVelocity: Phaser.Math.Vector2) {
    const speed = 150;
    const moveVector = playerVelocity.clone().normalize().scale(speed); // Ensure the rock moves in the opposite direction
    
    // Set opposite direction
    this.sprite.setVelocityX(-moveVector.x);
    this.sprite.setVelocityY(-moveVector.y);
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
