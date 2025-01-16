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
    redPortal: Phaser.GameObjects.Image;
    rock!: Rock;
    wallGroup!: Phaser.Physics.Arcade.Group;
    brokenWallGroup!: Phaser.Physics.Arcade.StaticGroup;

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
        const itemHeight = 165
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
        .setDisplaySize(itemWidth, itemHeight)
        .setCollideWorldBounds(true);

        // Ensure the physics body is properly configured
        if (this.player.body) {
            this.player.body.setSize(itemWidth, itemHeight);
            this.player.body.setOffset(0, 0);
        }

        // Add walls
        const wall = this.physics.add.staticGroup();
        wall.create(xOfItem * 0 + 50, yOfItem * 8 + 50, "wall")
        .setDisplaySize(itemWidth, itemWidth).refreshBody();
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
        wall.create(xOfItem * 1 + 50, yOfItem * 8 + 50, "wall")
        .setDisplaySize(itemWidth, itemWidth).refreshBody();
        wall.create(xOfItem * 2 + 50, yOfItem * 6 + 50, "wall")
        .setDisplaySize(itemWidth, itemWidth).refreshBody();
        wall.create(xOfItem * 2 + 50, yOfItem * 8 + 50, "wall")
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
        wall.create(xOfItem * 3 + 50, yOfItem * 8 + 50, "wall")
        .setDisplaySize(itemWidth, itemWidth).refreshBody();
        wall.create(xOfItem * 4 + 50, yOfItem * 6 + 50, "wall")
        .setDisplaySize(itemWidth, itemWidth).refreshBody();
        wall.create(xOfItem * 4 + 50, yOfItem * 8 + 50, "wall")
        .setDisplaySize(itemWidth, itemWidth).refreshBody();
        wall.create(xOfItem * 5 + 50, yOfItem * 0 + 50, "wall")
        .setDisplaySize(itemWidth, itemWidth).refreshBody();
        wall.create(xOfItem * 5 + 50, yOfItem * 2 + 50, "wall")
        .setDisplaySize(itemWidth, itemWidth).refreshBody();
        wall.create(xOfItem * 5 + 50, yOfItem * 5 + 50, "wall")
        .setDisplaySize(itemWidth, itemWidth).refreshBody();
        wall.create(xOfItem * 5 + 50, yOfItem * 6 + 50, "wall")
        .setDisplaySize(itemWidth, itemWidth).refreshBody();
        wall.create(xOfItem * 5 + 50, yOfItem * 7 + 50, "wall")
        .setDisplaySize(itemWidth, itemWidth).refreshBody();
        wall.create(xOfItem * 5 + 50, yOfItem * 8 + 50, "wall")
        .setDisplaySize(itemWidth, itemWidth).refreshBody();
        wall.create(xOfItem * 6 + 50, yOfItem * 8 + 50, "wall")
        .setDisplaySize(itemWidth, itemWidth).refreshBody();
        wall.create(xOfItem * 7 + 50, yOfItem * 8 + 50, "wall")
        .setDisplaySize(itemWidth, itemWidth).refreshBody();

        // Add collision between the player and the walls
        this.physics.add.collider(this.player, wall);

        // Add a rock
        const rock = new Rock(this, 50, yOfItem * 3 + 50, "rock");
        this.physics.add.collider(this.player, rock.sprite, () => {
          if (this.player && this.player.body) {
            rock.roll(this.player.body.velocity);
          }
        });

        // Create broken wall group
        this.brokenWallGroup = this.physics.add.staticGroup();
        this.brokenWallGroup.create(50, yOfItem * 7 + 50, "brokenWall")
        .setDisplaySize(165, 200).refreshBody();

        // Add collision between player and broken wall
        this.physics.add.collider(this.player, this.brokenWallGroup);

        // Add collision handling for the rock
        if (this.rock) {
            this.rock.handleCollisions(this, this.wallGroup, this.brokenWallGroup);
        } else {
            console.error('Rock is not defined');
        }
        

        // Add a purple portal
        this.purplePortal = this.add.image(50, 50, "purplePortal")
        .setDisplaySize(itemWidth, itemHeight);

        // Add a box
        const box = new Box(this, xOfItem * 6 + 50, yOfItem * 2 + 50, 'box');
        this.physics.add.collider(this.player, box.sprite, () => {
            if (this.player && this.player.body) {
                box.push(this.player.body.velocity);
            }
        });

        // Stop the box when it hits a wall
        this.physics.add.collider(box.sprite, this.wallGroup, () => {
            box.stop(); // Stop the box's movement upon hitting a wall
        });

        // Add pits
        this.pits = this.physics.add.group();
        this.pits.create(xOfItem + 50, yOfItem * 2 + 50, 'pit')
        .setDisplaySize(itemWidth, itemHeight).refreshBody();
        this.pits.create(xOfItem + 50, yOfItem * 3 + 50, 'pit')
        .setDisplaySize(itemWidth, itemHeight).refreshBody();
        this.pits.create(xOfItem * 5 + 50, yOfItem * 3 + 50, 'pit')
        .setDisplaySize(itemWidth, itemHeight).refreshBody();
        this.pits.create(xOfItem * 5 + 50, yOfItem * 4 + 50, 'pit')
        .setDisplaySize(itemWidth, itemHeight).refreshBody();
        this.pits.create(xOfItem * 6 + 50, yOfItem * 3 + 50, 'pit')
        .setDisplaySize(itemWidth, itemHeight).refreshBody();

        this.physics.add.collider(this.player, this.pits);

        // Destroy the box and pit when they collide
        this.physics.add.overlap(box.sprite, this.pits, (_, pit) => {
            if (pit instanceof Phaser.GameObjects.GameObject) {
                box.handleCollisionWithPit(pit);
            }
        });

        // Add arrow
        this.arrow = this.add.image(xOfItem * 6 + 50, yOfItem * 6 + 50, "arrow")
        .setDisplaySize(itemWidth, itemHeight);

        // Add a key
        const key = new Key(this, xOfItem * 5 + 50, yOfItem + 50, "key");

        // Add the key door
        const keyDoor = this.physics.add.staticSprite(xOfItem * 6 + 50, yOfItem * 5 + 50, "keyDoor")
        .setDisplaySize(itemWidth, itemHeight).refreshBody();

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

        // Assuming `xOfItem`, `yOfItem`, `itemWidth`, `itemHeight` are defined properly
        const stairs = this.physics.add.group({
            classType: Stair,
            runChildUpdate: true
        });

        // Add the first stair with proper position and size
        const stair1 = new Stair(this, xOfItem * 2 + 50, yOfItem + 50, 'stair');
        stair1.setDisplaySize(165, 165);
        stairs.add(stair1); 

        // Add the second stair with a different position and size
        const stair2 = new Stair(this, xOfItem * 4 + 50, yOfItem * 7 + 50, 'stair');
        stair2.setDisplaySize(165, 165);
        stairs.add(stair2);

        this.physics.add.overlap(this.player, stairs, (_, stair) => {
            // Type assertion to ensure stair is a Stair instance
            if (stair instanceof Stair) {
                // Teleport the player to the other stair
                if (stair === stair1) {
                    stair1.teleport(this.player, stair2);
                } else if (stair === stair2) {
                    stair2.teleport(this.player, stair1);
                }
            }
        });

        // Create the menu button
        this.menuButton = new MenuButton(this, 100, yOfItem * 10 - 50, 'menuButton')
        .setDisplaySize(itemWidth * 2, itemHeight * 2);
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
        .setDisplaySize(itemWidth, itemHeight);

        // Enable physics on the red portal
        this.physics.add.existing(this.redPortal);

        // Add overlap detection between the player and the red portal
        this.physics.add.overlap(this.player, this.redPortal, () => {
            this.scene.start('GameOver'); // Transition to GameOver scene
        });
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