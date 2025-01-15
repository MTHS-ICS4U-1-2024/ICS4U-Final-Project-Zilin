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
import Button from "../classes/Button"

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
    redPortal: Phaser.GameObjects.Image;

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
        const itemHeigh = 165
        const itemWidth = 165
        const xOfItem = (screenWidth / 7)
        const yOfItem = (screenHeight / 15)

        // Add background floor
        this.background = this.add.image(screenWidth / 2, screenHeight / 2, "floor")
        .setDisplaySize(1170, 2532);
        this.background = this.add.image(xOfItem, yOfItem * 5, "floor")
        .setDisplaySize(screenWidth * 2, screenHeight / 5 * 3);

        // add player
        this.player = this.physics.add.sprite(50, yOfItem, "player")
        .setDisplaySize(itemWidth, itemHeigh)
        .setCollideWorldBounds(true);

        // Ensure the physics body is properly configured
        if (this.player.body) {
            this.player.body.setSize(itemWidth, itemHeigh);
            this.player.body.setOffset(0, 0);
        }

        // Add walls
        const wall = this.physics.add.staticGroup();
        wall.create(xOfItem * 1 + 50, 50, "wall")
        .setDisplaySize(itemWidth, itemWidth).refreshBody();
        wall.create(xOfItem * 1 + 50, yOfItem * 1 + 50, "wall")
        .setDisplaySize(itemWidth, itemWidth).refreshBody();
        wall.create(xOfItem * 1 + 50, yOfItem * 3 + 50, "wall")
        .setDisplaySize(itemWidth, itemWidth).refreshBody();
        wall.create(xOfItem * 1 + 50, yOfItem * 4 + 50, "wall")
        .setDisplaySize(itemWidth, itemWidth).refreshBody();
        wall.create(xOfItem * 1 + 50, yOfItem * 5 + 50, "wall")
        .setDisplaySize(itemWidth, itemWidth).refreshBody();
        wall.create(xOfItem * 1 + 50, yOfItem * 6 + 50, "wall")
        .setDisplaySize(itemWidth, itemWidth).refreshBody();
        wall.create(xOfItem * 2 + 50, yOfItem * 6 + 50, "wall")
        .setDisplaySize(itemWidth, itemWidth).refreshBody();
        wall.create(xOfItem * 3 + 50, 50, "wall")
        .setDisplaySize(itemWidth, itemWidth).refreshBody();
        wall.create(xOfItem * 3 + 50, yOfItem * 1 + 50, "wall")
        .setDisplaySize(itemWidth, itemWidth).refreshBody();
        wall.create(xOfItem * 3 + 50, yOfItem * 2 + 50, "wall")
        .setDisplaySize(itemWidth, itemWidth).refreshBody();
        wall.create(xOfItem * 3 + 50, yOfItem * 3 + 50, "wall")
        .setDisplaySize(itemWidth, itemWidth).refreshBody();
        wall.create(xOfItem * 3 + 50, yOfItem * 4 + 50, "wall")
        .setDisplaySize(itemWidth, itemWidth).refreshBody();
        wall.create(xOfItem * 3 + 50, yOfItem * 6 + 50, "wall")
        .setDisplaySize(itemWidth, itemWidth).refreshBody();
        wall.create(xOfItem * 4 + 50, yOfItem * 6 + 50, "wall")
        .setDisplaySize(itemWidth, itemWidth).refreshBody();
        wall.create(xOfItem * 5 + 50, yOfItem * 0 + 50, "wall")
        .setDisplaySize(itemWidth, itemWidth).refreshBody();
        wall.create(xOfItem * 5 + 50, yOfItem * 2 + 50, "wall")
        .setDisplaySize(itemWidth, itemWidth).refreshBody();
        wall.create(xOfItem * 5 + 50, yOfItem * 5 + 50, "wall")
        .setDisplaySize(itemWidth, itemWidth).refreshBody();
        wall.create(xOfItem * 5 + 50, yOfItem * 6 + 50, "wall")
        .setDisplaySize(itemWidth, itemWidth).refreshBody();

        // Add collision between the player and the walls
        this.physics.add.collider(this.player, wall);

        // Add a rock
        const rock = new Rock(this, xOfItem * 2 + 50, yOfItem * 7 + 50, "rock");
        this.physics.add.collider(this.player, rock.sprite, () => {
          if (this.player && this.player.body) {
            rock.moveOpposite(this.player.body.velocity);
          }
        });

        // Add a purple portal
        this.purplePortal = this.add.image(50, 50, "purplePortal")
        .setDisplaySize(itemWidth, itemHeigh);

        // Add a box
        const box = new Box(this, 50, yOfItem * 3 + 50, "box");
        this.physics.add.collider(this.player, box.sprite, () => {
            box.push();
        });

        // Add arrow
        this.arrow = this.add.image(xOfItem * 6 + 50, yOfItem * 6 + 50, "arrow")
        .setDisplaySize(itemWidth, itemHeigh);

        // Add pits
        this.pits = this.add.group();
        this.pits.add(this.add.rectangle(300, 300, 50, 50, 0xff0000));

        // Add a key
        const key = new Key(this, xOfItem * 5 + 50, yOfItem + 50, "key");

        // Add the key door
        const keyDoor = this.physics.add.staticSprite(xOfItem * 6 + 50, yOfItem * 5 + 50, "keyDoor")
        .setDisplaySize(itemWidth, itemHeigh);

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
        new Stair(this, xOfItem + 50, yOfItem * 3 + 50, 'stair').setDisplaySize(165, 165);
        new Stair(this, xOfItem * 8 + 50, yOfItem * 6 + 50, 'stair').setDisplaySize(165, 165);

        // Add menu button
        // Create the menu button
        new MenuButton(this, 1100, 50, 'menuButton');
        this.add.existing(this.menuButton);

        // Create controls
        this.cursors = this.input!.keyboard!.createCursorKeys();
        if (this.input.keyboard) {
            this.cursors = this.input.keyboard.createCursorKeys();
        } else {
            console.error("Keyboard input is not available.");
        }

        // add red portal
        this.redPortal = this.add.image(xOfItem * 6 + 50, yOfItem * 7 + 50, "redPortal")
        .setDisplaySize(itemWidth, itemHeigh);

        // Enable physics on the red portal
        this.physics.add.existing(this.redPortal);

        // Add overlap detection between the player and the red portal
        this.physics.add.overlap(this.player, this.redPortal, () => {
            this.scene.start('GameOver'); // Transition to GameOver scene
        });

        // Add button
        new Button(this, 100, 2300, 'upButton', 'up', this.player);
        new Button(this, 100, 2500, 'downButton', 'down', this.player);
        new Button(this, 50, 2400, 'leftButton', 'left', this.player);
        new Button(this, 150, 2400, 'rightButton', 'right', this.player);

        // Add WASD controls
        Button.addWASDControls(this, this.cursors, this.player);

    }

    update() {
        // Player movement
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-165);
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(165);
        } else {
            this.player.setVelocityX(0);
        }

        if (this.cursors.up.isDown) {
            this.player.setVelocityY(-165);
        } else if (this.cursors.down.isDown) {
            this.player.setVelocityY(165);
        } else {
            this.player.setVelocityY(0);
        }
    }
}