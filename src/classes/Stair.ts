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
    scene.physics.add.existing(this, false); // false to disable collision box
  }

  teleport(character: Phaser.Physics.Arcade.Sprite, targetStair: Stair) {
    // When the character overlaps the stair, teleport them to the target stair
    this.scene.physics.add.overlap(character, this, () => {
      character.setPosition(targetStair.x, targetStair.y);
    });
  }
}
