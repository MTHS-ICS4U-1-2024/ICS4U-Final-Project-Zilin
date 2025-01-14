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
    player!: Phaser.Physics.Arcade.Sprite;
    cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
    pits: Phaser.GameObjects.Group;
    menuButton: MenuButton;

    constructor ()
    {
        super('Game');
        this.input?.keyboard?.createCursorKeys() || null;
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
          if (this.player && this.player.body) {
            rock.moveOpposite(this.player.body.velocity);
          }
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

        // Add the key door
        const keyDoor = this.physics.add.staticSprite(600, 500, "keyDoor");

        // Set up collision between the player and the key
        this.physics.add.collider(this.player, key.sprite, () => {
            key.collect(() => {
            // Destroy the key door when the key is collected
            keyDoor.destroy();
            console.log("Key collected, door opened!");
            });
        });

        // Add collision for the keyDoor (optional, if the door blocks the player)
        this.physics.add.collider(this.player, keyDoor);

        // Add menu button
        this.menuButton = new MenuButton(this, 1100, 100);
        this.add.existing(this.menuButton);

        // Create controls
        this.cursors = this.input!.keyboard!.createCursorKeys();
        if (this.input.keyboard) {
            this.cursors = this.input.keyboard.createCursorKeys();
        } else {
            console.error("Keyboard input is not available.");
        }
    }

    update() {
        // Player movement
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-150);
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(150);
        } else {
            this.player.setVelocityX(0);
        }

        if (this.cursors.up.isDown) {
            this.player.setVelocityY(-150);
        } else if (this.cursors.down.isDown) {
            this.player.setVelocityY(150);
        } else {
            this.player.setVelocityY(0);
        }
    }
}
