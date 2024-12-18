/*
 * Hellow world program
 *
 * @author Zilin
 * @version 1.0
 * @since 2024-12-13
 */

import { Scene, GameObjects } from 'phaser';

export class HelloWorld extends Scene {
    title: GameObjects.Text;
    background: GameObjects.Image;

    constructor() {
        super('HelloWorld');
    }

    create () {
        this.background = this.add.image(400, 20000, 'background');

        this.title = this.add.text(500, 500, 'Hello World!', {
            fontFamily: 'Georgia', fontSize: 100, color: '#ff0000',
            stroke: '#000fff', strokeThickness: 8, align: 'center'
        }).setOrigin(0.5);
    }

    preload () {
        this.load.text('Hello World!');
        this.load.image('background', 'assets/subtital.png');
    }
}