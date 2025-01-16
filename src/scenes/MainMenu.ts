import { Scene, GameObjects } from 'phaser';

export class MainMenu extends Scene
{
    background: GameObjects.Image;
    logo: GameObjects.Image;
    title: GameObjects.Text;

    constructor ()
    {
        super('MainMenu');
    }

    create ()
    {
        const gameWidth = this.scale.width;
        const gameHeight = this.scale.height;

        this.background = this.add.image(0 ,0, 'titleBackground')
        .setOrigin(0, 0)
        .setDisplaySize(gameWidth, gameHeight);

        this.logo = this.add.image(1170 / 2, 2532 / 3 - 100, 'logo');

        this.add.text(1170 / 2, 2532 / 2 + 100, 'start', {
            fontFamily: 'cursive', fontSize: 200, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5);

  
        // Alternatively, make the entire screen interactive
        this.input.on("pointerdown", () => {
            this.scene.start("GameOver");
        });
    }
}
