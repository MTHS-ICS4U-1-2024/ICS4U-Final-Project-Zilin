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

    /**
     * Create a new Button instance.
     * @param scene The Phaser scene.
     * @param x The x position of the button.
     * @param y The y position of the button.
     * @param texture The texture key for the button.
     * @param onClick The function to execute when the button is clicked.
     */
    constructor(scene: Scene, x: number, y: number, texture: string, onClick: () => void) {
        this.scene = scene;

        // Create the button
        this.button = scene.add.image(x, y, texture)
        .setInteractive().setDisplaySize(200, 200);
        this.button.setScrollFactor(0); // Ensure button stays in place

        // Add interactive behavior
        this.button.on('pointerdown', () => {
            this.button.setScale(0.9); // Feedback
            onClick(); // Trigger action
        });
        this.button.on('pointerup', () => {
            this.button.setScale(1); // Reset feedback
        });
    }

    /**
     * Add WASD keyboard controls to a player sprite.
     * @param scene The Phaser scene.
     * @param player The player's sprite.
     * @param velocity The movement velocity (default 165).
     */
    static addWASDControls(scene: Scene, player: Phaser.Physics.Arcade.Sprite, velocity: number = 165) {
        if (!scene.input.keyboard) {
            console.error("Keyboard input is not available in the scene.");
            return;
        }

        const keyboard = scene.input.keyboard;

        // WASD Key Down
        keyboard.on("keydown-W", () => player.setVelocityY(-velocity));
        keyboard.on("keydown-A", () => player.setVelocityX(-velocity));
        keyboard.on("keydown-S", () => player.setVelocityY(velocity));
        keyboard.on("keydown-D", () => player.setVelocityX(velocity));

        // WASD Key Up
        keyboard.on("keyup-W", () => player.setVelocityY(0));
        keyboard.on("keyup-A", () => player.setVelocityX(0));
        keyboard.on("keyup-S", () => player.setVelocityY(0));
        keyboard.on("keyup-D", () => player.setVelocityX(0));
    }
}
