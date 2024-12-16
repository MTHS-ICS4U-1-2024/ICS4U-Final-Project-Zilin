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
        this.background = this.add.image(512, 384, 'background');

        this.title = this.add.text(512, 460, 'Hello World!', {
            fontFamily: 'Arial Black', fontSize: 40, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8, align: 'center'
        }).setOrigin(0.5);
    }

    preload () {
        this.load.text('Hello World!');
    }
}