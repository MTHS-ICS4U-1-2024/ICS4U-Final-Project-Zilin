/*
 * Main game program
 *
 * @author Zilin
 * @version 1.0
 * @since 2024-12-13
 */

import { Scene } from 'phaser';
import { DPad } from '../classes/DPad';

export class Game extends Scene
{
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    msg_text : Phaser.GameObjects.Text;
    player: Phaser.Physics.Arcade.Sprite;
    cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    pits: Phaser.GameObjects.Group;
    dPad: DPad;
    movement: { up: boolean; down: boolean; left: boolean; right: boolean };

    constructor ()
    {
        super('Game');
    }

    create ()
    {
        this.camera = this.cameras.main;
        this.camera.setBackgroundColor(0x00ff00);

        this.background = this.add.image(0, 0, 'floor');
        this.background.setDisplaySize(1170, (2232 / 3) * 2); // Covers the top half

        this.msg_text = this.add.text(512, 384, '', {
            fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        });

        this.msg_text.setOrigin(0.5);

        // Add maze walls (example tileset or sprites)
        const walls = this.physics.add.staticGroup();
        walls.create(200, 200, 'wall').setScale(2).refreshBody();

        // Add pits
        this.pits = this.add.group();
        this.pits.add(this.add.rectangle(300, 300, 50, 50, 0xff0000)); // Red pits

        // Add player
        this.player = this.physics.add.sprite(100, 100, 'player');
        this.player.setCollideWorldBounds(true);

        // Add collisions with walls
        this.physics.add.collider(this.player, walls);

        // Check for pit collisions
        this.physics.add.overlap(this.player, this.pits, () => {
            console.log('Player fell into a pit!');
            this.scene.restart(); // Restart the level
        });
    }
}
