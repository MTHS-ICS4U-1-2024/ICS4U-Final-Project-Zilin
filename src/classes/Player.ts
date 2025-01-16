/*
* This is player program
*
* @author Zilin
* @version 1.0
* @since 2025-01-09
*/
import Phaser from "phaser";
import Button from "./Button";
import Stair from "./Stair";

export default class Player extends Phaser.Physics.Arcade.Sprite {
  sprite: Phaser.GameObjects.Sprite;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private wasd!: { [key: string]: Phaser.Input.Keyboard.Key };
  upButton: Button;
  downButton: Button;
  leftButton: Button;
  rightButton: Button;

  constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
    // Call the parent class constructor to initialize Phaser.Physics.Arcade.Sprite
    super(scene, x, y, texture);

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

    // Add player to the scene and set physics
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setDisplaySize(140, 140); // Ensure player has the correct size
  }

  private createVirtualButtons() {
    const screenWidth = this.scene.scale.width;
    const screenHeight = this.scene.scale.height;
  
    // Button size relative to screen dimensions (for example, 8% of screen width)
    const buttonSize = 400;
    const buttonSpacing = 20;
  
    // Adjust positions based on screen size
    this.upButton = new Button(
      this.scene,
      screenWidth / 2,
      screenHeight - (buttonSize * 2) - buttonSpacing,
      "upButton",
      () => this.setVelocityY(-300)
    );
    this.upButton.button.setDisplaySize(buttonSize, buttonSize);
    this.upButton.button.on('pointerup', () => this.setVelocityY(0));
  
    this.downButton = new Button(
      this.scene,
      screenWidth / 2,
      screenHeight - buttonSize,
      "downButton",
      () => this.setVelocityY(300)
    );
    this.downButton.button.setDisplaySize(buttonSize, buttonSize);
    this.upButton.button.on('pointerup', () => this.setVelocityY(0));
  
    this.leftButton = new Button(
      this.scene,
      screenWidth / 2 - buttonSize - buttonSpacing,
      screenHeight - buttonSize * 1.5,
      "leftButton",
      () => this.setVelocityX(-300)
    );
    this.leftButton.button.setDisplaySize(buttonSize, buttonSize);
    this.upButton.button.on('pointerup', () => this.setVelocityX(0));
  
    this.rightButton = new Button(
      this.scene,
      screenWidth / 2 + buttonSize + buttonSpacing,
      screenHeight - buttonSize * 1.5,
      "rightButton",
      () => this.setVelocityX(300)
    );
    this.rightButton.button.setDisplaySize(buttonSize, buttonSize);
    this.upButton.button.on('pointerup', () => this.setVelocityX(0));
  }

  public update() {
    // Handle player movement
    if (this.cursors.left.isDown || this.wasd.left.isDown) {
      this.setVelocityX(-165);
    } else if (this.cursors.right.isDown || this.wasd.right.isDown) {
      this.setVelocityX(165);
    } else {
      this.setVelocityX(0);
    }

    if (this.cursors.up.isDown || this.wasd.up.isDown) {
      this.setVelocityY(-165);
    } else if (this.cursors.down.isDown || this.wasd.down.isDown) {
      this.setVelocityY(165);
    } else {
      this.setVelocityY(0);
    }
  }

  public handleInteractions(
    stairs: Phaser.Physics.Arcade.Group,
    rocks: Phaser.Physics.Arcade.Group,
    boxes: Phaser.Physics.Arcade.Group,
    pits?: Phaser.Physics.Arcade.Group
  ) {
    // Teleport between stairs
    this.scene.physics.add.overlap(this, stairs, (player, stair) => {
      const otherStair = stairs.getChildren().find((s) => s !== stair);
      if (otherStair) {
        (player as Phaser.Physics.Arcade.Sprite).setPosition(
          (otherStair as Phaser.GameObjects.Sprite).x,
          (otherStair as Phaser.GameObjects.Sprite).y
        );
      }
    });

    // Handle rocks
    this.scene.physics.add.collider(this, rocks, (player, rock) => {
      const playerBody = (player as Phaser.Physics.Arcade.Sprite)?.body;
      if (!playerBody) return;

      const velocity = playerBody.velocity;
      (rock as Phaser.Physics.Arcade.Sprite).setVelocity(velocity.x, velocity.y);
    });

    // Handle boxes and pits
    if (pits) {
      this.scene.physics.add.collider(this, boxes, (player, box) => {
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
