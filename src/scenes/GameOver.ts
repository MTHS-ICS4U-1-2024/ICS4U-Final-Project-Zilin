import { Scene } from 'phaser';

export class GameOver extends Scene
{
    background: Phaser.GameObjects.Image;
    gameover_text : Phaser.GameObjects.Text;

    constructor ()
    {
        super('GameOver');
    }

    create ()
    {
        this.background = this.add.image(0, 0, 'titleBackground')
        .setOrigin(0, 0)
        .setDisplayOrigin(1170, 2532);

        this.gameover_text = this.add.text(512, 300, 'Thanks.', {
            fontFamily: 'cursive', fontSize: 200, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        });
        this.gameover_text.setOrigin(0.5);

        this.gameover_text = this.add.text(512, 700, 'for you', {
            fontFamily: 'cursive', fontSize: 200, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        });
        this.gameover_text.setOrigin(0.5);

        this.gameover_text = this.add.text(512, 1100, 'palying.', {
            fontFamily: 'cursive', fontSize: 200, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        });
        this.gameover_text.setOrigin(0.5);

        this.input.once('pointerdown', () => {

            this.scene.start('MainMenu');

        });
    }
}
