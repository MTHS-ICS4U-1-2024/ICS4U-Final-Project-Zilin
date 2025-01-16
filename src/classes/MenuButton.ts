/*
* This is the program that open menu
*
* @author Zilin
* @version 1.0
* @since 2025-01-09
*/
import Phaser from "phaser";

export default class MenuButton extends Phaser.GameObjects.Image {
  menuShown: boolean;

  constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
    super(scene, x, y, texture);
    this.menuShown = false;

    // Add to scene and set interactive
    scene.add.existing(this);
    this.setInteractive();

    // Show menu on click
    this.on("pointerdown", () => {
      if (!this.menuShown) {
        this.showMenu(scene);
      }
    });
  }

  showMenu(scene: Phaser.Scene) {
    this.menuShown = true;

    // Pause the current scene
    scene.scene.pause();

    // Create a semi-transparent background
    const menuBackground = scene.add.image(1170 / 2, 2532 / 2, 'select')
    .setDisplaySize(700, 2100);

    // Add a title
    const title = scene.add.text(485, 800, "Pause Menu", {
      fontSize: "160px",
      color: "#fff",
      fontStyle: "bold",
    });

    const backButton = scene.add.text(500, 1000, "Main Menu", {
      fontSize: "120px",
      color: "#fff",
      backgroundColor: "#666",
      padding: { x: 10, y: 5 },
    }).setInteractive();
  
    const restartButton = scene.add.text(500, 1500, "Restart", {
      fontSize: "120px",
      color: "#fff",
      backgroundColor: "#666",
      padding: { x: 10, y: 5 },
    }).setInteractive();
  
    restartButton.on("pointerdown", () => {
      this.closeMenu(scene, [menuBackground, title, restartButton, backButton]);
      scene.scene.restart();
    });
  
    backButton.on("pointerdown", () => {
      this.closeMenu(scene, [menuBackground, title, restartButton, backButton]);
      scene.scene.start("MainMenu");
    });
  }

  closeMenu(scene: Phaser.Scene, menuElements: Phaser.GameObjects.GameObject[]) {
    // Remove menu elements
    menuElements.forEach(element => element.destroy());

    // Resume the scene
    scene.scene.resume();

    this.menuShown = false;
  }
}