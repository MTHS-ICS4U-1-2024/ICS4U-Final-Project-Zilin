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

      
  handleCollisions(scene: Phaser.Scene, wallGroup: Phaser.Physics.Arcade.Group, brokenWallGroup: Phaser.Physics.Arcade.Group) {
    scene.physics.add.collider(this.sprite, wallGroup, () => {
      // Collision with a normal wall - simply stop movement
      this.sprite.setVelocity(0);
    });

    scene.physics.add.collider(this.sprite, brokenWallGroup, (rock, brokenWall) => {
      // Collision with a broken wall - destroy both the rock and the broken wall
      this.sprite.destroy();
      rock.destroy();
      brokenWall.destroy();
    });
  }
}
