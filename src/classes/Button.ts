/*
* this is the program about the button
* that user click the button will control the character
* 
* @author Zilin
* @version 1.0
* @since 2025-01-09
*/
import { Scene } from 'phaser';

export default class Button {
    scene: Scene;
    button: Phaser.GameObjects.Image;
    direction: string;

    constructor(scene: Scene, x: number, y: number, texture: string, direction: string, player: Phaser.Physics.Arcade.Sprite) {
        this.scene = scene;
        this.direction = direction;

        // Create the button
        this.button = scene.add.image(x, y, texture).setInteractive();
        this.button.setScrollFactor(0); // Ensure button stays in place

        // Handle pointer (touch) input
        this.button.on('pointerdown', () => this.handleInput(player));
    }

    handleInput(player: Phaser.Physics.Arcade.Sprite) {
        switch (this.direction) {
            case 'up':
                player.setVelocityY(-165);
                break;
            case 'down':
                player.setVelocityY(165);
                break;
            case 'left':
                player.setVelocityX(-165);
                break;
            case 'right':
                player.setVelocityX(165);
                break;
        }
    }

    // Adds WASD keyboard controls
  static addWASDControls(scene: Scene, player: Phaser.Physics.Arcade.Sprite) {
    if (!scene.input.keyboard) {
      console.error("Keyboard input is not available in the scene.");
      return;
    }

    const keyboard = scene.input.keyboard;

    // WASD Key Down
    keyboard.on("keydown-W", () => player.setVelocityY(-165));
    keyboard.on("keydown-A", () => player.setVelocityX(-165));
    keyboard.on("keydown-S", () => player.setVelocityY(165));
    keyboard.on("keydown-D", () => player.setVelocityX(165));

    // WASD Key Up
    keyboard.on("keyup-W", () => player.setVelocityY(0));
    keyboard.on("keyup-A", () => player.setVelocityX(0));
    keyboard.on("keyup-S", () => player.setVelocityY(0));
    keyboard.on("keyup-D", () => player.setVelocityX(0));
  }
}
