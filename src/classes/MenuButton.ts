/*
* This is the program that open menu
*
* @author Zilin
* @version 1.0
* @since 2025-01-09
*/
import Phaser from "phaser";

export default class MenuButton extends Phaser.GameObjects.Image {
  constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
    super(scene, x, y, texture);
    this.setInteractive();

    this.on("pointerdown", () => {
      this.showMenu(scene);
    });
  }

  showMenu(scene: Phaser.Scene) {
    // Pause game
    scene.scene.pause();

    // Show select menu
    scene.add.image(585, 1266, "select");

    // Add restart button
    const restartButton = scene.add.text(500, 1100, "Restart", { fontSize: "32px", color: "#fff" }).setInteractive();
    restartButton.on("pointerdown", () => {
      scene.scene.restart();
    });

    // Add back button
    const backButton = scene.add.text(500, 1200, "Back", { fontSize: "32px", color: "#fff" }).setInteractive();
    backButton.on("pointerdown", () => {
      scene.scene.start("MainMenu"); // Replace with your main menu scene
    });
  }
}
