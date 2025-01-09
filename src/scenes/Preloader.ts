import { Scene } from 'phaser';

export class Preloader extends Scene
{
    constructor ()
    {
        super('Preloader');
    }

    init ()
    {
        //  We loaded this image in our Boot Scene, so we can display it here
        this.add.image(512, 384, 'background');

        //  A simple progress bar. This is the outline of the bar.
        this.add.rectangle(512, 384, 468, 32).setStrokeStyle(1, 0xffffff);

        //  This is the progress bar itself. It will increase in size from the left based on the % of progress.
        const bar = this.add.rectangle(512-230, 384, 4, 28, 0xffffff);

        //  Use the 'progress' event emitted by the LoaderPlugin to update the loading bar
        this.load.on('progress', (progress: number) => {

            //  Update the progress bar (our bar is 464px wide, so 100% = 464px)
            bar.width = 4 + (460 * progress);

        });
    }

    preload ()
    {
        //  Load the assets for the game - Replace with your own assets
        this.load.setPath('assets');

        this.load.image('logo', 'subtitle.png');
        this.load.image('rock', 'rock.png');
        this.load.image('wall', 'wall.png');
        this.load.image('left', 'left.png');
        this.load.image('right', 'right.png');
        this.load.image('up', 'up.png');
        this.load.image('down', 'down.png');
        this.load.image('menuButton', 'menuButton.png');
        this.load.image('start', 'start.png');
        this.load.image('yellowKey', 'YellowKey.png');
        this.load.image('yellowKeyDoor', 'YellowKeyDoor.png');
        this.load.image('player', 'character.png');
        this.load.image('purplePortal', 'purplePortal.png');
        this.load.image('redPortal', 'redPortal.png');
        this.load.image('floor', 'floorTwo.png')
        this.load.image('titleBackground', 'titleBackground.png')
    }

    create ()
    {
        //  When all the assets have loaded, it's often worth creating global objects here that the rest of the game can use.
        //  For example, you can define global animations here, so we can use them in other scenes.

        //  Move to the MainMenu. You could also swap this for a Scene Transition, such as a camera fade.
        this.scene.start('MainMenu');
    }
}
