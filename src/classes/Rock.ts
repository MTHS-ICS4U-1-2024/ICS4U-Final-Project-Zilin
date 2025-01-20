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
      .setDisplaySize(1170 / 7, 2532 / 15) // Scale the sprite for display
      .setImmovable(immovable) // Set immovable property
      .setCollideWorldBounds(true)
      .setDepth(20); // Ensure rock stays within game bounds
  }

  /**
   * Applies a rolling movement to the rock based on player's velocity.
   * @param playerVelocity - The velocity of the player pushing the rock.
   */
  roll(playerVelocity: Phaser.Math.Vector2) {
    const speed = 150; // Speed of the rock
    const moveVector = playerVelocity.clone().normalize().scale(speed);

    // Apply velocity in the direction opposite to the player's push
    this.sprite.setVelocityX(moveVector.x);
    this.sprite.setVelocityY(moveVector.y);
  }

  /**
   * Handles collision behavior for the rock with walls and broken walls.
   * @param scene - The current game scene.
   * @param wallGroup - Group of solid walls.
   * @param brokenWallGroup - Group of breakable walls.
   */
  handleCollisionsWithWall(scene: Phaser.Scene, wallGroup: Phaser.Physics.Arcade.Group) {
    // Collision with solid walls stops the rock
    scene.physics.add.collider(this.sprite, wallGroup, () => {
      this.sprite.setVelocity(0); // Stop the rock
    });
  }

  handleCollisionsWithBrokenWall(brokenWall: Phaser.GameObjects.GameObject) {
    console.log('The rock destroyed the broken wall.');
      this.sprite.destroy(); // Destroy the rock
      brokenWall.destroy(); // Destroy the broken wall
  }
};
