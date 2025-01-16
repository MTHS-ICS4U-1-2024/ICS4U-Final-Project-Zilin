/*
* This is the stair program
*
* @author Zilin
* @version 1.0
* @since 2025-01-13
*/

export default class Stair extends Phaser.Physics.Arcade.Sprite {
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
      super(scene, x, y, texture);
      scene.add.existing(this);
      scene.physics.add.existing(this);
      this.setDisplaySize(165, 165);
    }
  
    teleport(character: Phaser.Physics.Arcade.Sprite, targetStair: Stair) {
      this.scene.physics.add.overlap(character, this, () => {
        character.setPosition(targetStair.x, targetStair.y);
      });
    }
  }