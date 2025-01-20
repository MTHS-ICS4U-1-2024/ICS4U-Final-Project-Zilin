/*
 * Quest program
 *
 * @author Zilin
 * @version 1.0
 * @since 2024-01-17
 */
import { Scene, GameObjects } from 'phaser';


export class Quest extends Scene
{
    background: GameObjects.Image;
    logo: GameObjects.Image;
    title: GameObjects.Text;

    constructor ()
    {
        super('Quest');
    }

    create ()
    {
        const gameWidth = this.scale.width;
        const gameHeight = this.scale.height;

        this.background = this.add.image(0 ,0, 'titleBackground')
        .setOrigin(0, 0)
        .setDisplaySize(gameWidth, gameHeight);

        this.add.text(1170 / 2, 2532 / 2 - 1200, 
            'QUEST', {
            fontFamily: 'italic', fontSize: 200, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5);

        this.add.text(1170 / 2, 2532 / 2 - 900, 
            'Click the', {
            fontFamily: 'cursive', fontSize: 80, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5);

        this.add.text(1170 / 2, 2532 / 2 - 800, 
            'button/WASD/Arrow keyboard', {
            fontFamily: 'cursive', fontSize: 80, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5);


        this.add.text(1170 / 2, 2532 / 2 - 700, 
            ' to control the character!', {
            fontFamily: 'cursive', fontSize: 80, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5);

        this.add.text(1170 / 2, 2532 / 2 - 500, 
            'Try to go to the red portal', {
            fontFamily: 'cursive', fontSize: 80, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5);

        this.add.text(1170 / 2, 2532 / 2 - 400, 
            'from the purple portal!', {
            fontFamily: 'cursive', fontSize: 80, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5);

        this.add.text(1170 / 2, 2532 / 2 - 200, 
            'Rock can destory', {
            fontFamily: 'cursive', fontSize: 80, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5);

        this.add.text(1170 / 2, 2532 / 2 - 100, 
            'the broken wall.', {
            fontFamily: 'cursive', fontSize: 80, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5);

        this.add.text(1170 / 2, 2532 / 2 + 100, 
            'Box can destory the pits.', {
            fontFamily: 'cursive', fontSize: 80, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5);

        this.add.text(1170 / 2, 2532 / 2 + 300, 
            'Go to another place via stair.', {
            fontFamily: 'cursive', fontSize: 80, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5);

        this.add.text(1170 / 2, 2532 / 2 + 500, 
            'Get the key to open the door!', {
            fontFamily: 'cursive', fontSize: 80, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5);

        this.add.text(1170 / 2, 2532 / 2 + 700, 
            'Ps: you cannot', {
            fontFamily: 'serif', fontSize: 80, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5);

        this.add.text(1170 / 2, 2532 / 2 + 800, 
            'jump directly over pits', {
            fontFamily: 'serif', fontSize: 80, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5);

        this.add.text(1170 / 2, 2532 / 2 + 900, 
            'or pass through walls!', {
            fontFamily: 'serif', fontSize: 80, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5);

        this.add.text(1170 / 2, 2532 / 2 + 1100, 
            'START', {
            fontFamily: 'italic', fontSize: 200, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5);
  
        // Alternatively, make the entire screen interactive
        this.input.on("pointerdown", () => {
            this.scene.start("Game");
        });
    }
}
