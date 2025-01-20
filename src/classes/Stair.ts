/*
* This is the stair program
*
* @author Zilin
* @version 1.0
* @since 2025-01-13
*/

import Phaser from 'phaser';

export default class Stair extends Phaser.Physics.Arcade.Sprite {
  constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
    super(scene, x, y, texture);

    // Set the size of the stair
    this.setDisplaySize(165, 165);

    // Add the sprite to the scene and physics world
    scene.add.existing(this);
    scene.physics.add.existing(this, false); // False to disable collision box if necessary
  }

  teleport(player: Phaser.Physics.Arcade.Sprite, targetStair: Stair) {
    // Overlap detection, triggers only once
    this.scene.physics.add.overlap(player, this, () => {
      // Set the position of the character to the target stair's position
      player.setPosition(targetStair.x, targetStair.y);
    }, undefined, this);  // 'undefined' for the callback argument type.
    console.log('I am going down the stairs');
    console.log('I walked out');
  }
}