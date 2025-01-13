/*
* this is the program about the button
* that user click the button will control the character
* 
* @author Zilin
* @version 1.0
* @since 2025-01-09
*/
export default class Button extends Phaser.GameObjects.Image {
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, callback: Function) {
      super(scene, x, y, texture);
      this.setInteractive();
      this.on("pointerdown", callback);
      scene.add.existing(this);
    }
  }