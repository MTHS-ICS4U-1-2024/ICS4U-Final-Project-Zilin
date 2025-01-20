import { Scene, GameObjects } from 'phaser';

export class GameOver extends Scene
{
    background: GameObjects.Image;
    gameover_text : GameObjects.Text;

    constructor ()
    {
        super('GameOver');
    }

    create ()
    {
        const gameWidth = this.scale.width;
        const gameHeight = this.scale.height;

        this.background = this.add.image(0, 0, 'titleBackground')
        .setOrigin(0, 0)
        .setDisplaySize(gameWidth, gameHeight);

        this.gameover_text = this.add.text(512, 300, 'Thanks.', {
            fontFamily: 'cursive', fontSize: 180, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        });
        this.gameover_text.setOrigin(0.5);

        this.gameover_text = this.add.text(512, 700, 'for you', {
            fontFamily: 'cursive', fontSize: 180, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        });
        this.gameover_text.setOrigin(0.5);

        this.gameover_text = this.add.text(512, 1100, 'playing.', {
            fontFamily: 'cursive', fontSize: 180, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        });
        this.gameover_text.setOrigin(0.5);

        this.input.once('pointerdown', () => {

            this.scene.start('MainMenu');

        });
    }
}
