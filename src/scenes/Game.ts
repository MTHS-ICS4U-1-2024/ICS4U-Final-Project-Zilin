/*
 * Main game program
 *
 * @author Zilin
 * @version 1.0
 * @since 2024-12-13
 */

import { Scene, GameObjects, Physics } from 'phaser';
import { DPad } from '../classes/DPad';

export class Game extends Scene
{
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    msg_text : Phaser.GameObjects.Text;
    player: Physics.Arcade.Sprite;
    cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    pits: GameObjects.Group;
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

    createButtons(screenWidth: number, screenHeight: number) {
        const bottomHalfStart = screenHeight / 2;

        // Create Up Button
        this.add.image(screenWidth / 2, bottomHalfStart + 75, 'upButton')
            .setInteractive()
            .on('pointerdown', () => (this.movement.up = true))
            .on('pointerup', () => (this.movement.up = false));

        // Create Down Button
        this.add.image(screenWidth / 2, bottomHalfStart + 225, 'downButton')
            .setInteractive()
            .on('pointerdown', () => (this.movement.down = true))
            .on('pointerup', () => (this.movement.down = false));

        // Create Left Button
        this.add.image(screenWidth / 2 - 150, bottomHalfStart + 150, 'leftButton')
            .setInteractive()
            .on('pointerdown', () => (this.movement.left = true))
            .on('pointerup', () => (this.movement.left = false));

        // Create Right Button
        this.add.image(screenWidth / 2 + 150, bottomHalfStart + 150, 'rightButton')
            .setInteractive()
            .on('pointerdown', () => (this.movement.right = true))
            .on('pointerup', () => (this.movement.right = false));

        // Create Menu Button
         this.add.image(screenWidth - 100, bottomHalfStart + 150, 'menuButton')
            .setInteractive()
            .on('pointerdown', () => this.openMenu());
    }

    openMenu() {
        this.add.rectangle(512, 384, 300, 200, 0x222222).setAlpha(0.9);
        this.add.text(450, 350, 'Restart', { fontSize: '16px', color: '#ffffff' })
            .setInteractive()
            .on('pointerdown', () => this.scene.restart());

        this.add.text(450, 400, 'Credits', { fontSize: '16px', color: '#ffffff' })
            .setInteractive()
            .on('pointerdown', () => this.scene.start('Credits'));

        this.add.text(450, 450, 'Main Menu', { fontSize: '16px', color: '#ffffff' })
            .setInteractive()
            .on('pointerdown', () => this.scene.start('MainMenu'));
    }


    update() {
        if (this.cursors.left.isDown) this.player.setVelocityX(-200);
        else if (this.cursors.right.isDown) this.player.setVelocityX(200);
        else this.player.setVelocityX(0);

        if (this.cursors.up.isDown) this.player.setVelocityY(-200);
        else if (this.cursors.down.isDown) this.player.setVelocityY(200);
        else this.player.setVelocityY(0);

        // Get movement from DPad
        const movement = this.dPad.getMovement();

        // Apply movement to player
        if (movement.up) this.player.setVelocityY(-200);
        else if (movement.down) this.player.setVelocityY(200);
        else this.player.setVelocityY(0);

        if (movement.left) this.player.setVelocityX(-200);
        else if (movement.right) this.player.setVelocityX(200);
        else this.player.setVelocityX(0);
    }
}
