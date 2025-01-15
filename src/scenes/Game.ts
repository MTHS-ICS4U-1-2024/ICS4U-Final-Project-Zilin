/*
 * Main game program
 * the ratio is 14 x 7
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
import Stair from "../classes/Stair";

export class Game extends Scene
{
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    msg_text : Phaser.GameObjects.Text;
    player!: Phaser.Physics.Arcade.Sprite;
    cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
    pits: Phaser.GameObjects.Group;
    menuButton: MenuButton;
    purplePortal: Phaser.GameObjects.Image;
    arrow: Phaser.GameObjects.Image;

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
        const itemHeigh = screenHeight / 15
        const itemWidth = screenWidth / 7
        const xOfItem = itemWidth
        const yOfItem = itemHeigh

        // Add background floor
        this.background = this.add.image(screenWidth / 2, screenHeight / 2, "floor")
        .setDisplaySize(1170, 2532);
        this.background = this.add.image(xOfItem * 4, yOfItem * 4, "floor")
        .setDisplaySize(screenWidth, itemHeigh * 8);

        // Initialize player
        this.player = this.physics.add.sprite(xOfItem, yOfItem * 2, "player")
        .setDisplaySize(itemWidth, itemHeigh);
        this.player.setCollideWorldBounds(true);

        // Add walls
        const wall = this.physics.add.staticGroup();
        wall.create(xOfItem * 2, yOfItem, "wall").setDisplaySize(itemWidth, itemWidth);
        wall.create(xOfItem * 2, yOfItem * 2, "wall").setDisplaySize(itemWidth, itemWidth);
        wall.create(xOfItem * 2, yOfItem * 4, "wall").setDisplaySize(itemWidth, itemWidth);
        wall.create(xOfItem * 2, yOfItem * 5, "wall").setDisplaySize(itemWidth, itemWidth);
        wall.create(xOfItem * 2, yOfItem * 6, "wall").setDisplaySize(itemWidth, itemWidth);
        wall.create(xOfItem * 2, yOfItem * 7, "wall").setDisplaySize(itemWidth, itemWidth);
        wall.create(xOfItem * 3, yOfItem * 8, "wall").setDisplaySize(itemWidth, itemWidth);
        wall.create(xOfItem * 4, yOfItem, "wall").setDisplaySize(itemWidth, itemWidth);
        wall.create(xOfItem * 4, yOfItem * 2, "wall").setDisplaySize(itemWidth, itemWidth);
        wall.create(xOfItem * 4, yOfItem * 3, "wall").setDisplaySize(itemWidth, itemWidth);
        wall.create(xOfItem * 4, yOfItem * 4, "wall").setDisplaySize(itemWidth, itemWidth);
        wall.create(xOfItem * 4, yOfItem * 5, "wall").setDisplaySize(itemWidth, itemWidth);
        wall.create(xOfItem * 4, yOfItem * 7, "wall").setDisplaySize(itemWidth, itemWidth);
        wall.create(xOfItem * 6, yOfItem, "wall").setDisplaySize(itemWidth, itemWidth);
        wall.create(xOfItem * 6, yOfItem * 3, "wall").setDisplaySize(itemWidth, itemWidth);
        wall.create(xOfItem * 6, yOfItem * 6, "wall").setDisplaySize(itemWidth, itemWidth);
        wall.create(xOfItem * 6, yOfItem * 7, "wall").setDisplaySize(itemWidth, itemWidth);

        // Add a rock
        const rock = new Rock(this, 200, 200);
        this.physics.add.collider(this.player, rock.sprite, () => {
          if (this.player && this.player.body) {
            rock.moveOpposite(this.player.body.velocity);
          }
        });

        // Add a purple portal
        this.purplePortal = this.add.image(xOfItem, yOfItem, "purplePortal")
        .setDisplaySize(itemWidth, itemHeigh);

        // Add a box
        const box = new Box(this, 400, 400);
        this.physics.add.collider(this.player, box.sprite, () => {
            box.push();
        });

        // Add arrow
        this.arrow = this.add.image(xOfItem * 7, yOfItem * 7, 'arrow')
        .setDisplaySize(itemWidth, itemHeigh);

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

        // Create stairs
        new Stair(this, xOfItem, yOfItem * 3);
        new Stair(this, xOfItem * 8, yOfItem * 6);

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
