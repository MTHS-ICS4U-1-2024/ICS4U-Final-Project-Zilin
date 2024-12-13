/*
 * Hellow world program
 *
 * @author Zilin
 * @version 1.0
 * @since 2024-12-13
 */

import { Scene } from 'phaser'

export class HelloWorld extends Sence {
    constructor() {
        super('HelloWorld')
    }

    create () {
        this.title = this.add.text(512, 460, 'Hello World!', {
            fontFamily: 'Arial Black', fontSize: 40, color: '#ffffff',
            stroke: '#000000', storkeThickness: 8, align: 'center'
        }).setOrigin(0.5)
    }
