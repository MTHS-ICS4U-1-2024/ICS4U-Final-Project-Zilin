/*
* This is player program
*
* @author Zilin
* @version 1.0
* @since 2025-01-09
*/
import Phaser from 'phaser';
import Rock from './Rock';
import Box from './Box';

export default class Player {
  private scene: Phaser.Scene;
  public sprite: Phaser.Physics.Arcade.Sprite;

  constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
    this.scene = scene;

    // Create the player sprite
    this.sprite = this.scene.physics.add.sprite(x, y, texture);
    this.sprite.setCollideWorldBounds(true);

    // Add keyboard controls
    this.addControls();
  }

  private addControls() {
    const cursors = this.scene.input.keyboard.createCursorKeys();
    const wasd = this.scene.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      right: Phaser.Input.Keyboard.KeyCodes.D,
    });

    this.scene.events.on('update', () => {
      this.sprite.setVelocity(0);

      // Arrow keys
      if (cursors.left.isDown || wasd.left.isDown) {
        this.sprite.setVelocityX(-165);
      } else if (cursors.right.isDown || wasd.right.isDown) {
        this.sprite.setVelocityX(165);
      }

      if (cursors.up.isDown || wasd.up.isDown) {
        this.sprite.setVelocityY(-165);
      } else if (cursors.down.isDown || wasd.down.isDown) {
        this.sprite.setVelocityY(165);
      }
    });
  }

  public handleInteractions(stairs: Phaser.Physics.Arcade.Group, rocks: Phaser.Physics.Arcade.Group, boxes: Phaser.Physics.Arcade.Group, pits: Phaser.Physics.Arcade.Group) {
    // Stair interaction
    this.scene.physics.add.overlap(this.sprite, stairs, (player, stair) => {
      const stairObjects = stairs.getChildren();

      if (stairObjects.length === 2) {
        const otherStair = stairObjects.find(s => s !== stair);
        if (otherStair) {
          player.setPosition(otherStair.x, otherStair.y);
        }
      }
    });

    // Rock interaction
    this.scene.physics.add.collider(this.sprite, rocks, (player, rock: Phaser.Physics.Arcade.Sprite) => {
      const velocity = player.body.velocity;

      this.scene.tweens.add({
        targets: rock,
        x: rock.x + velocity.x * 2,
        y: rock.y + velocity.y * 2,
        duration: 300,
        onComplete: () => {
          // Check collision with walls or broken walls
          const colliders = this.scene.physics.overlapRect(rock.x, rock.y, rock.width, rock.height);
          const wallCollision = colliders.some(c => c.gameObject?.name === 'wall' || c.gameObject?.name === 'brokenWall');

          if (wallCollision) {
            const brokenWall = colliders.find(c => c.gameObject?.name === 'brokenWall');
            if (brokenWall) brokenWall.gameObject.destroy();
            rock.destroy();
          }
        },
      });
    });

    // Box interaction
    this.scene.physics.add.collider(this.sprite, boxes, (player, box: Phaser.Physics.Arcade.Sprite) => {
      const velocity = player.body.velocity;

      this.scene.tweens.add({
        targets: box,
        x: box.x + velocity.x,
        y: box.y + velocity.y,
        duration: 200,
        onComplete: () => {
          // Check collision with pits
          const colliders = this.scene.physics.overlapRect(box.x, box.y, box.width, box.height);
          const pitCollision = colliders.some(c => c.gameObject?.name === 'pit');

          if (pitCollision) {
            const pit = colliders.find(c => c.gameObject?.name === 'pit');
            if (pit) pit.gameObject.destroy();
            box.destroy();
          }
        },
      });
    });
  }
}