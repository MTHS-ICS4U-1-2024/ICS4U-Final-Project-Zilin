/*
* This is the menu button program
*
* @author Zilin
* @version 1.0
* @since 2024-12-13
*/

import { Scene } from 'phaser';

export class MenuButton {
    private scene: Scene;

    constructor(scene: Scene) {
        this.scene = scene;
        this.createMenuButton();
    }

    private createMenuButton() {
        // Add menu button
        this.scene.add.rectangle(950, 50, 100, 50, 0x6666ff)
            .setInteractive()
            .on('pointerdown', () => this.openMenu());

        this.scene.add.text(910, 40, 'Menu', { fontSize: '16px', color: '#ffffff' });
    }

    private openMenu() {
        // Create menu overlay
        this.scene.add.rectangle(512, 384, 300, 200, 0x222222).setAlpha(0.9);

        this.scene.add.text(450, 350, 'Restart', { fontSize: '16px', color: '#ffffff' })
            .setInteractive()
            .on('pointerdown', () => this.scene.scene.restart());

         this.scene.add.text(450, 400, 'Next Level', { fontSize: '16px', color: '#ffffff' })
            .setInteractive()
            .on('pointerdown', () => this.scene.scene.start('Level2'));

         this.scene.add.text(450, 450, 'Main Menu', { fontSize: '16px', color: '#ffffff' })
            .setInteractive()
            .on('pointerdown', () => this.scene.scene.start('MainMenu'));
    }
}