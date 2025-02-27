/*
 * Main game program
 *
 * @author Zilin
 * @version 1.0
 * @since 2024-12-13
 */

import { Scene } from 'phaser';
import Rock from "../classes/Rock";
import Box from "../classes/Box";
import Key from "../classes/Key";
import Stair from "../classes/Stair";

export class Game extends Scene
{
    private camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    msg_text : Phaser.GameObjects.Text;
    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
    private pits: Phaser.GameObjects.Group;
    private player!: Phaser.Physics.Arcade.Sprite;
    purplePortal: Phaser.GameObjects.Image;
    arrow: Phaser.GameObjects.Image;
    private redPortal: Phaser.GameObjects.Image;
    private wallGroup!: Phaser.Physics.Arcade.Group;
    private brokenWallGroup!: Phaser.Physics.Arcade.StaticGroup;

    constructor ()
    {
        super('Game');
        this.input?.keyboard?.createCursorKeys() || null;
    }

    create ()
    {
        console.log('Have fun');
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
        this.background = this.add.image(xOfItem, yOfItem * 5 - 100, "floor")
        .setDisplaySize(screenWidth * 2, screenHeight / 5 * 3);

        // add player
        this.player = this.physics.add.sprite(50, yOfItem, "player")
        .setDisplaySize(itemWidth, itemHeight)
        .setCollideWorldBounds(true)
        .setDepth(10);

        // Ensure the physics body is properly configured
        if (this.player.body) {
            this.player.body.setSize(itemWidth, itemHeight);
            this.player.body.setOffset(0, 0);
        }

        // Add walls
        const wall = this.physics.add.staticGroup();
        wall.create(xOfItem * 0 + 50, yOfItem * 8 + 50, "wall")
        .setDisplaySize(itemWidth, itemWidth).refreshBody().setDepth(20);
        wall.create(xOfItem * 1 + 50, 50, "wall")
        .setDisplaySize(itemWidth, itemWidth).refreshBody().setDepth(20);
        wall.create(xOfItem * 1 + 50, yOfItem * 1 + 50, "wall")
        .setDisplaySize(itemWidth, itemWidth).refreshBody().setDepth(20);
        wall.create(xOfItem * 1 + 50, yOfItem * 3 + 50, "wall")
        .setDisplaySize(itemWidth, itemWidth).refreshBody().setDepth(20);
        wall.create(xOfItem * 1 + 50, yOfItem * 4 + 50, "wall")
        .setDisplaySize(itemWidth, itemWidth).refreshBody().setDepth(20);
        wall.create(xOfItem * 1 + 50, yOfItem * 5 + 50, "wall")
        .setDisplaySize(itemWidth, itemWidth).refreshBody().setDepth(20);
        wall.create(xOfItem * 1 + 50, yOfItem * 6 + 50, "wall")
        .setDisplaySize(itemWidth, itemWidth).refreshBody().setDepth(20);
        wall.create(xOfItem * 1 + 50, yOfItem * 8 + 50, "wall")
        .setDisplaySize(itemWidth, itemWidth).refreshBody().setDepth(20);
        wall.create(xOfItem * 2 + 50, yOfItem * 6 + 50, "wall")
        .setDisplaySize(itemWidth, itemWidth).refreshBody().setDepth(20);
        wall.create(xOfItem * 2 + 50, yOfItem * 8 + 50, "wall")
        .setDisplaySize(itemWidth, itemWidth).refreshBody().setDepth(20);
        wall.create(xOfItem * 3 + 50, 50, "wall")
        .setDisplaySize(itemWidth, itemWidth).refreshBody().setDepth(20);
        wall.create(xOfItem * 3 + 50, yOfItem * 1 + 50, "wall")
        .setDisplaySize(itemWidth, itemWidth).refreshBody().setDepth(20);
        wall.create(xOfItem * 3 + 50, yOfItem * 2 + 50, "wall")
        .setDisplaySize(itemWidth, itemWidth).refreshBody().setDepth(20);
        wall.create(xOfItem * 3 + 50, yOfItem * 3 + 50, "wall")
        .setDisplaySize(itemWidth, itemWidth).refreshBody().setDepth(20);
        wall.create(xOfItem * 3 + 50, yOfItem * 4 + 50, "wall")
        .setDisplaySize(itemWidth, itemWidth).refreshBody().setDepth(20);
        wall.create(xOfItem * 3 + 50, yOfItem * 6 + 50, "wall")
        .setDisplaySize(itemWidth, itemWidth).refreshBody().setDepth(20);
        wall.create(xOfItem * 3 + 50, yOfItem * 8 + 50, "wall")
        .setDisplaySize(itemWidth, itemWidth).refreshBody().setDepth(20);
        wall.create(xOfItem * 4 + 50, yOfItem * 6 + 50, "wall")
        .setDisplaySize(itemWidth, itemWidth).refreshBody().setDepth(20);
        wall.create(xOfItem * 4 + 50, yOfItem * 8 + 50, "wall")
        .setDisplaySize(itemWidth, itemWidth).refreshBody().setDepth(20);
        wall.create(xOfItem * 5 + 50, yOfItem * 0 + 50, "wall")
        .setDisplaySize(itemWidth, itemWidth).refreshBody().setDepth(20);
        wall.create(xOfItem * 5 + 50, yOfItem * 2 + 50, "wall")
        .setDisplaySize(itemWidth, itemWidth).refreshBody().setDepth(20);
        wall.create(xOfItem * 5 + 50, yOfItem * 5 + 50, "wall")
        .setDisplaySize(itemWidth, itemWidth).refreshBody().setDepth(20);
        wall.create(xOfItem * 5 + 50, yOfItem * 6 + 50, "wall")
        .setDisplaySize(itemWidth, itemWidth).refreshBody().setDepth(20);
        wall.create(xOfItem * 5 + 50, yOfItem * 7 + 50, "wall")
        .setDisplaySize(itemWidth, itemWidth).refreshBody().setDepth(20);
        wall.create(xOfItem * 5 + 50, yOfItem * 8 + 50, "wall")
        .setDisplaySize(itemWidth, itemWidth).refreshBody().setDepth(20);
        wall.create(xOfItem * 6 + 50, yOfItem * 8 + 50, "wall")
        .setDisplaySize(itemWidth, itemWidth).refreshBody().setDepth(20);
        wall.create(xOfItem * 7 + 50, yOfItem * 8 + 50, "wall")
        .setDisplaySize(itemWidth, itemWidth).refreshBody().setDepth(20);

        // Add collision between the player and the walls
        this.physics.add.collider(this.player, wall);

        // Add a rock
        const rock = new Rock(this, 50, yOfItem * 3 + 50, "rock");
        this.physics.add.collider(this.player, rock.sprite, () => {
          if (this.player && this.player.body) {
            console.log('Maybe I can push this to destory the wall that looks almost broken.');
            rock.roll(this.player.body.velocity);
          }
        });

        // Create broken wall group
        this.brokenWallGroup = this.physics.add.staticGroup();
        this.brokenWallGroup.create(50, yOfItem * 7 + 50, "brokenWall")
        .setDisplaySize(165, 200).refreshBody().setDepth(20);

        // Add collision between player and broken wall
        this.physics.add.collider(this.player, this.brokenWallGroup);
        this.physics.add.collider(rock.sprite, this.wallGroup);

        // Destroy the rock and broken wall when they collide
        this.physics.add.overlap(rock.sprite, this.brokenWallGroup, (_, brokenWall) => {
            if (brokenWall instanceof Phaser.GameObjects.GameObject) {
                rock.handleCollisionsWithBrokenWall(brokenWall);
            }
        });        

        // Add a purple portal
        this.purplePortal = this.add.image(50, 50, "purplePortal")
        .setDisplaySize(itemWidth, itemHeight);
        console.log('This portal is what I am here for.');

        // Add a box
        const box = new Box(this, xOfItem * 6 + 50, yOfItem * 2 + 50, 'box');
        this.physics.add.collider(this.player, box.sprite, () => {
            if (this.player && this.player.body) {
                console.log('Maybe I can push this like the rock');
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
        .setDisplaySize(itemWidth, itemHeight).refreshBody().setImmovable(true);;
        this.pits.create(xOfItem + 50, yOfItem * 3 + 50, 'pit')
        .setDisplaySize(itemWidth, itemHeight).refreshBody().setImmovable(true);;
        this.pits.create(xOfItem * 5 + 50, yOfItem * 3 + 50, 'pit')
        .setDisplaySize(itemWidth, itemHeight).refreshBody().setImmovable(true);;
        this.pits.create(xOfItem * 5 + 50, yOfItem * 4 + 50, 'pit')
        .setDisplaySize(itemWidth, itemHeight).refreshBody().setImmovable(true);;
        this.pits.create(xOfItem * 6 + 50, yOfItem * 4 + 50, 'pit')
        .setDisplaySize(itemWidth, itemHeight).refreshBody().setImmovable(true);;

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
        const stair1 = new Stair(this, xOfItem * 2 + 50, 50, 'stair');
        stair1.setDisplaySize(165 * 2, 165 * 2).setDepth(5);
        stairs.add(stair1); 

        // Add the second stair with a different position and size
        const stair2 = new Stair(this, xOfItem * 4 + 50, yOfItem * 7 + 50, 'stair');
        stair2.setDisplaySize(165 * 2, 165 * 2).setDepth(5);
        stairs.add(stair2);

         this.physics.add.overlap(this.player, stairs, (_, stair) => {
            // Type assertion to ensure stair is a Stair instance
            if (stair instanceof Stair) {
                // Teleport the player to the other stair
                if (stair === stair2) {
                    console.log('Where does this flight of stairs lead');
                    stair2.teleport(this.player, stair1);
                }
            }
        });

        // Create controls
        this.cursors = this.input!.keyboard!.createCursorKeys();
        if (this.input.keyboard) {
            this.cursors = this.input.keyboard.createCursorKeys();

            // Initialize WASD keys
            this.input.keyboard.addKeys({
                W: Phaser.Input.Keyboard.KeyCodes.W,
                A: Phaser.Input.Keyboard.KeyCodes.A,
                S: Phaser.Input.Keyboard.KeyCodes.S,
                D: Phaser.Input.Keyboard.KeyCodes.D,
            });
        } else {
            console.error("Keyboard input is not available.");
        }

        const buttonSize = 400;
        const buttonAlpha = 20;
        const moveSpeed = 5000; // Max speed
        const deceleration = 8000; // Deceleration rate when button is released

        // Up Button
        const upButton = this.add.image(screenWidth / 2, 
            screenHeight - (buttonSize * 2) - buttonAlpha, "upButton")
            .setDisplaySize(buttonSize, buttonSize)
            .setInteractive()
            .setAlpha(buttonAlpha);

        upButton.on('pointerdown', () => {
            console.log('I should go up');
            this.player.setAccelerationY(-moveSpeed);  // Gradually move up
            this.player.setDragY(deceleration); 
        });
        upButton.on('pointerup', () => {
            this.player.setAccelerationY(0);  // Stop acceleration when released
        });
        upButton.on('pointerout', () => {
            this.player.setAccelerationY(0);  // Stop acceleration if pointer leaves
        });

        // Down Button
        const downButton = this.add.image(screenWidth / 2, 
            screenHeight - buttonSize, "downButton")
            .setDisplaySize(buttonSize, buttonSize)
            .setInteractive()
            .setAlpha(buttonAlpha);

        downButton.on('pointerdown', () => {
            console.log('I should go down');
            this.player.setAccelerationY(moveSpeed);  // Gradually move down
            this.player.setDragY(deceleration); 
        });
        downButton.on('pointerup', () => {
           this.player.setAccelerationY(0);  // Stop acceleration when released
        });
        downButton.on('pointerout', () => {
            this.player.setAccelerationY(0);  // Stop acceleration if pointer leaves
        });

        // Left Button
        const leftButton = this.add.image(screenWidth / 2 - buttonSize - buttonAlpha, 
            screenHeight - buttonSize * 1.5, "leftButton")
            .setDisplaySize(buttonSize, buttonSize)
            .setInteractive()
            .setAlpha(buttonAlpha);

        leftButton.on('pointerdown', () => {
            console.log('I should go left');
            this.player.setAccelerationX(-moveSpeed);  // Gradually move left
            this.player.setDragY(deceleration); 
        });
        leftButton.on('pointerup', () => {
            this.player.setAccelerationX(0);  // Stop acceleration when released
        });
        leftButton.on('pointerout', () => {
            this.player.setAccelerationX(0);  // Stop acceleration if pointer leaves
        });

        // Right Button
        const rightButton = this.add.image(screenWidth / 2 + buttonSize + buttonAlpha, 
            screenHeight - buttonSize * 1.5, "rightButton")
            .setDisplaySize(buttonSize, buttonSize)
            .setInteractive()
            .setAlpha(buttonAlpha);

        rightButton.on('pointerdown', () => {
            console.log('I should go right');
            this.player.setAccelerationX(moveSpeed);  // Gradually move right
            this.player.setDragY(deceleration); 
        });
        rightButton.on('pointerup', () => {
            this.player.setAccelerationX(0);  // Stop acceleration when released
        });
        rightButton.on('pointerout', () => {
            this.player.setAccelerationX(0);  // Stop acceleration if pointer leaves
        });


        // add red portal
        this.redPortal = this.add.image(xOfItem * 6 + 50, yOfItem * 7 + 50, "redPortal")
        .setDisplaySize(itemWidth, itemHeight).setDepth(20);

        // Enable physics on the red portal
        this.physics.add.existing(this.redPortal);

        // Add overlap detection between the player and the red portal
        this.physics.add.overlap(this.player, this.redPortal, () => {
            console.log('Yes, I did it.');
            this.scene.start('GameOver'); // Transition to GameOver scene
        });
    }

    update() {
    // Player movement
    let velocityX = 0;
    let velocityY = 0;

    // Arrow keys movement
    if (this.cursors.left.isDown) {
        velocityX = -165;
    } else if (this.cursors.right.isDown) {
        velocityX = 165;
    }

    if (this.cursors.up.isDown) {
        velocityY = -250;
    } else if (this.cursors.down.isDown) {
        velocityY = 250;
    }

    // WASD movement
    if (this.input.keyboard) {
        const keys = this.input.keyboard.addKeys({
            W: Phaser.Input.Keyboard.KeyCodes.W,
            A: Phaser.Input.Keyboard.KeyCodes.A,
            S: Phaser.Input.Keyboard.KeyCodes.S,
            D: Phaser.Input.Keyboard.KeyCodes.D,
        }) as Phaser.Types.Input.Keyboard.CursorKeys & {
            W: Phaser.Input.Keyboard.Key;
            A: Phaser.Input.Keyboard.Key;
            S: Phaser.Input.Keyboard.Key;
            D: Phaser.Input.Keyboard.Key;
        };

        if (keys.A.isDown) {
            velocityX = -165;
        } else if (keys.D.isDown) {
            velocityX = 165;
        }

        if (keys.W.isDown) {
            velocityY = -250;
        } else if (keys.S.isDown) {
            velocityY = 250;
        }
    }

    // Apply velocity to the player
    this.player.setVelocity(velocityX, velocityY);
    }
}