/**
 * This is the Rock program
 * 
 * @author Zilin
 * @version 1.0
 * @since 2025-01-13
 */
export default class Rock extends Phaser.Physics.Arcade.Sprite {
    constructor(scene: Phaser.Scene, x: number, y: number) {
      super(scene, x, y, "rock");
      scene.add.existing(this);
      scene.physics.add.existing(this);
    }
  
    push(direction: Phaser.Math.Vector2) {
      const velocity = direction.scale(150); // Adjust speed as needed
      this.setVelocity(velocity.x, velocity.y);
  
      // Stop when hitting a wall or broken wall
      this.scene.physics.add.collider(this, this.scene.wallGroup, () => {
        this.setVelocity(0);
      });
  
      this.scene.physics.add.collider(this, this.scene.brokenWallGroup, (rock: Rock, brokenWall: Phaser.GameObjects.Sprite) => {
        rock.destroy();
        brokenWall.destroy();
      });
    }
  }