/*
* This is player program
*
* @author Zilin
* @version 1.0
* @since 2025-01-09
*/
import Phaser from "phaser";
import Button from "./Button";

export default class Player {
    private scene: Phaser.Scene;
    private _sprite: Phaser.Physics.Arcade.Sprite;
    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
    private wasd!: { [key: string]: Phaser.Input.Keyboard.Key };
    upButton: Button;
    downButton: Button;
    leftButton: Button;
    rightButton: Button;

  
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
      this.scene = scene;
      this._sprite = scene.physics.add.sprite(x, y, texture)
      .setDisplaySize(140, 140);
  
      // Add keyboard controls
      this.cursors = this.scene.input.keyboard!.createCursorKeys();
      this.wasd = this.scene.input.keyboard!.addKeys({
        up: Phaser.Input.Keyboard.KeyCodes.W,
        down: Phaser.Input.Keyboard.KeyCodes.S,
        left: Phaser.Input.Keyboard.KeyCodes.A,
        right: Phaser.Input.Keyboard.KeyCodes.D,
      }) as { [key: string]: Phaser.Input.Keyboard.Key };
  
      // Add virtual buttons
      this.createVirtualButtons();
    }

    get sprite(): Phaser.Physics.Arcade.Sprite {
      return this._sprite;
    }
  
    private createVirtualButtons() {
      const screenWidth = this.scene.scale.width;
      const screenHeight = this.scene.scale.height;
    
      const buttonSize = 150; // Size of buttons
      const buttonSpacing = 30; // Spacing between buttons

      this.upButton = new Button(
        this.scene,
        screenWidth / 2,
        screenHeight - (buttonSize * 2) - buttonSpacing,
        "upButton",
        () => this.sprite.setVelocityY(-300)
      );
  
      this.downButton = new Button(
        this.scene,
        screenWidth / 2,
        screenHeight - buttonSize,
        "downButton",
        () => this.sprite.setVelocityY(300)
      );
  
      this.leftButton = new Button(
        this.scene,
        screenWidth / 2 - buttonSize - buttonSpacing,
        screenHeight - buttonSize * 1.5,
        "leftButton",
        () => this.sprite.setVelocityX(-300)
      );
  
      this.rightButton = new Button(
        this.scene,
        screenWidth / 2 - buttonSize - buttonSpacing,
        screenHeight - buttonSize * 1.5,
        "rightButton",
        () => this.sprite.setVelocityX(300)
      );
    }
  
    public update() {
      if (this.cursors.left.isDown || this.wasd.left.isDown) {
        this.sprite.setVelocityX(-165);
      } else if (this.cursors.right.isDown || this.wasd.right.isDown) {
        this.sprite.setVelocityX(165);
      } else {
        this.sprite.setVelocityX(0);
      }
  
      if (this.cursors.up.isDown || this.wasd.up.isDown) {
        this.sprite.setVelocityY(-165);
      } else if (this.cursors.down.isDown || this.wasd.down.isDown) {
        this.sprite.setVelocityY(165);
      } else {
        this.sprite.setVelocityY(0);
      }
    }

  public handleInteractions(
    stairs: Phaser.Physics.Arcade.Group,
    rocks: Phaser.Physics.Arcade.Group,
    boxes: Phaser.Physics.Arcade.Group,
    pits?: Phaser.Physics.Arcade.Group
  ) {
    // Teleport between stairs
    this.scene.physics.add.overlap(this.sprite, stairs, (player, stair) => {
      const otherStair = stairs.getChildren().find((s) => s !== stair);
      if (otherStair) {
        (player as Phaser.Physics.Arcade.Sprite).setPosition(
          (otherStair as Phaser.GameObjects.Sprite).x,
          (otherStair as Phaser.GameObjects.Sprite).y
        );
      }
    });

    // Handle rocks
    this.scene.physics.add.collider(this.sprite, rocks, (player, rock) => {
      const playerBody = (player as Phaser.Physics.Arcade.Sprite)?.body;
      if (!playerBody) return;

      const velocity = playerBody.velocity;
      (rock as Phaser.Physics.Arcade.Sprite).setVelocity(velocity.x, velocity.y);
    });

    // Handle boxes and pits
    if (pits) {
      this.scene.physics.add.collider(this.sprite, boxes, (player, box) => {
        const playerBody = (player as Phaser.Physics.Arcade.Sprite)?.body;
        if (!playerBody) return;

        const velocity = playerBody.velocity;
        const boxSprite = box as Phaser.Physics.Arcade.Sprite;
        boxSprite.setVelocity(velocity.x, velocity.y);

        // Check for overlap with pits
        this.scene.physics.add.overlap(boxSprite, pits, () => {
          boxSprite.destroy();
          pits.getChildren().forEach((pit) => {
            const pitSprite = pit as Phaser.Physics.Arcade.Sprite;
            if (this.scene.physics.overlap(boxSprite, pitSprite)) {
              pitSprite.destroy();
            }
          });
        });
      });
    }
  }
}