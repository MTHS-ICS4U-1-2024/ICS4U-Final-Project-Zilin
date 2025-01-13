/*
 * Main game program
 *
 * @author Zilin
 * @version 1.0
 * @since 2024-12-13
 */

import { Scene } from 'phaser';
import Rock from "../classes/Rock";
import MenuButton from "../classes/MenuButton";
import Box from "../classes/Box";
import Key from "../classes/Key";

export class Game extends Scene
{
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    msg_text : Phaser.GameObjects.Text;
    player: Phaser.Physics.Arcade.Sprite;
    cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    pits: Phaser.GameObjects.Group;
    menuButton: MenuButton;

    constructor ()
    {
        super('Game');
    }

    create ()
    {
        this.camera = this.cameras.main;
        this.camera.setBackgroundColor(0x00ff00);

        // Set screen size constants
        const screenWidth = 1170;
        const screenHeight = 2532;

        // Add background floor
        this.add.tileSprite(screenWidth / 2, screenHeight / 2, screenWidth, screenHeight, "floor");

        // Initialize player
        this.player = this.physics.add.sprite(100, 100, "character");
        this.player.setCollideWorldBounds(true);

        // Add walls
        const wall = this.physics.add.staticGroup();
        wall.create(300, 300, "wall");

        // Add a rock
        const rock = new Rock(this, 200, 200);
        this.physics.add.collider(this.player, rock.sprite, () => {
            rock.moveOpposite(this.player.body.velocity);
        });

        // Add a box
        const box = new Box(this, 400, 400);
        this.physics.add.collider(this.player, box.sprite, () => {
            box.push();
        });

        // Add pits
        this.pits = this.add.group();
        this.pits.add(this.add.rectangle(300, 300, 50, 50, 0xff0000)); // Red pits

        // Add a key
        const key = new Key(this, 500, 500);
        this.physics.add.collider(this.player, key.sprite, () => {
          key.collect(() => {
            // Open key door here
            
          });
        });


        // Check for pit collisions
        this.physics.add.overlap(this.player, this.pits, () => {
            console.log('Player fell into a pit!');
            this.scene.restart(); // Restart the level
        });

        this.input.once('pointerdown', () => {

            this.scene.start('MainMenu');
    
        });
    }
}
