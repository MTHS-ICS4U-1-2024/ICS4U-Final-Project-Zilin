/*
* this is the program about the button
* that user click the button will control the character
* 
* @author Zilin
* @version 1.0
* @since 2025-01-09
*/
import { Scene } from "phaser";

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
        this.button = scene.add.image(x, y, texture).setInteractive();
        this.button.setScrollFactor(0); // Ensure button stays in place

        const initialScale = this.button.scale;

        // Add interactive behavior
        this.button.on("pointerdown", () => {
            this.button.setScale(initialScale * 0.9); // Feedback
            onClick(); // Trigger action
        });
        this.button.on("pointerup", () => {
            this.button.setScale(initialScale); // Reset feedback
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

        if (!(player.body instanceof Phaser.Physics.Arcade.Body)) {
            console.error("The provided player does not have a physics body.");
            return;
        }

        const keyboard = scene.input.keyboard;

        // Define keydown and keyup actions
        const moveUp = () => player.setVelocityY(-velocity);
        const moveLeft = () => player.setVelocityX(-velocity);
        const moveDown = () => player.setVelocityY(velocity);
        const moveRight = () => player.setVelocityX(velocity);
        const stopVertical = () => player.setVelocityY(0);
        const stopHorizontal = () => player.setVelocityX(0);

        // Add listeners
        keyboard.on("keydown-W", moveUp);
        keyboard.on("keydown-A", moveLeft);
        keyboard.on("keydown-S", moveDown);
        keyboard.on("keydown-D", moveRight);
        keyboard.on("keyup-W", stopVertical);
        keyboard.on("keyup-A", stopHorizontal);
        keyboard.on("keyup-S", stopVertical);
        keyboard.on("keyup-D", stopHorizontal);

        // Clean up on scene shutdown
        scene.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
            keyboard.off("keydown-W", moveUp);
            keyboard.off("keydown-A", moveLeft);
            keyboard.off("keydown-S", moveDown);
            keyboard.off("keydown-D", moveRight);
            keyboard.off("keyup-W", stopVertical);
            keyboard.off("keyup-A", stopHorizontal);
            keyboard.off("keyup-S", stopVertical);
            keyboard.off("keyup-D", stopHorizontal);
        });
    }
}
