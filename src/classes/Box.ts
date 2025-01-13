/*
* the is the box program
*
* @author Zilin
* @version 1.0
* @since 2025-01-13
*/

export default class Box extends Phaser.Physics.Arcade.Sprite {
    constructor(scene: Phaser.Scene, x: number, y: number) {
      super(scene, x, y, "box");
      scene.add.existing(this);
      scene.physics.add.existing(this);
    }
  
    destroyOnPit(pitGroup: Phaser.Physics.Arcade.Group) {
      this.scene.physics.add.overlap(this, pitGroup, (box: Box, pit: Phaser.GameObjects.Sprite) => {
        box.destroy();
        pit.destroy();
      });
    }
  }