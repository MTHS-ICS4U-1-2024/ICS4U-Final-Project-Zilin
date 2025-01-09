/*
* this is the program about the button
* that user click the button will control the character
* 
* @author Zilin
* @version 1.0
* @since 2025-01-09
*/
import { Scene } from 'phaser';

export class DPad {
    private scene: Scene;
    private movement: { up: boolean; down: boolean; left: boolean; right: boolean };

    constructor(scene: Scene) {
        this.scene = scene;
        this.movement = { up: false, down: false, left: false, right: false };

        this.createButtons();
    }

    private createButtons() {
        const buttonSize = 50;
        const buttonOffset = 75;

        // Up Button
        this.scene.add.rectangle(100, 500 - buttonOffset, buttonSize, buttonSize, 0x00ff00)
            .setInteractive()
            .on('pointerdown', () => (this.movement.up = true))
            .on('pointerup', () => (this.movement.up = false));

        // Down Button
        this.scene.add.rectangle(100, 500 + buttonOffset, buttonSize, buttonSize, 0x00ff00)
            .setInteractive()
            .on('pointerdown', () => (this.movement.down = true))
            .on('pointerup', () => (this.movement.down = false));

        // Left Button
        this.scene.add.rectangle(50, 500, buttonSize, buttonSize, 0x00ff00)
            .setInteractive()
            .on('pointerdown', () => (this.movement.left = true))
            .on('pointerup', () => (this.movement.left = false));

        // Right Button
        this.scene.add.rectangle(150, 500, buttonSize, buttonSize, 0x00ff00)
            .setInteractive()
            .on('pointerdown', () => (this.movement.right = true))
            .on('pointerup', () => (this.movement.right = false));
    }

    getMovement(): { up: boolean; down: boolean; left: boolean; right: boolean } {
        return this.movement;
    }
}