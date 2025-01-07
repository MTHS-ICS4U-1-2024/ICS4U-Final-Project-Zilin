/*
* This is the main program
*
* @author Zilin
* @version 1.0
* @since 2024-12-13
*/
import { HelloWorld } from './scenes/HelloWorld';
import { Boot } from './scenes/Boot';

import { Game, Types } from "phaser";

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config: Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 2096,
    height: 900,
    parent: 'game-container',
    backgroundColor: '#00ff00',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [
        HelloWorld,
        Boot
    ]
};

export default new Game(config);