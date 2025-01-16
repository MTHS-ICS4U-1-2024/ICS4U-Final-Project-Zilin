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

    // Check if keyboard input is available before adding the listener
    if (scene.input.keyboard) {
      scene.input.keyboard.on("keydown-ESC", () => {
        if (!this.menuShown) {
          this.showMenu(scene);
        }
      });
    } else {
      console.warn("Keyboard input is not available in this scene.");
    }
  }

  showMenu(scene: Phaser.Scene) {
    this.menuShown = true;

    // Pause the current scene
    scene.scene.pause();

    // Create a semi-transparent background
    const menuBackground = scene.add.image(1170 / 2, 2532 / 2, 'select')
    .setDisplaySize(1100, 2100);

    // Add a title
    const title = scene.add.text(200, 700, "Pause Menu", {
      fontSize: "120px",
      color: "#fff",
      fontStyle: "bold",
    });

    const backButton = scene.add.text(200, 900, "Main Menu", {
      fontSize: "100px",
      color: "#fff",
      backgroundColor: "#666",
      padding: { x: 10, y: 5 },
    }).setInteractive().setDepth(1);
  
    const restartButton = scene.add.text(200, 1100, "Restart", {
      fontSize: "100px",
      color: "#fff",
      backgroundColor: "#666",
      padding: { x: 10, y: 5 },
    }).setInteractive().setDepth(1);

    const cancelButton = scene.add.text(200, 1300, "Cancel", {
      fontSize: "100px",
      color: "#fff",
      backgroundColor: "#666",
      padding: { x: 10, y: 5 },
    }).setInteractive().setDepth(1);
    
    restartButton.on("pointerdown", () => {
      console.log("Restart button clicked");
      this.closeMenu(scene, [menuBackground, title, restartButton, backButton]);
      scene.scene.restart();
    });
  
    backButton.on("pointerdown", () => {
      console.log("Main Menu button clicked");
      this.closeMenu(scene, [menuBackground, title, restartButton, backButton]);
      scene.scene.start("MainMenu");
    });

    cancelButton.on("pointerdown", () => {
      console.log("Cancel button clicked");
      this.closeMenu(scene, [menuBackground, title, restartButton, backButton, cancelButton]);
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