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

    const centerX = scene.scale.width / 2;
    const centerY = scene.scale.height / 2;

    // Pause the current scene
    scene.scene.pause();

    // Create a semi-transparent background
    const menuBackground = scene.add.image(centerX, centerY, "select")
    .setDisplaySize(1400, 2100).setDepth(0).setInteractive();

    // Add a title
    const title = scene.add.text(centerX - 300, centerY - 400, "Pause Menu", {
      fontSize: "120px",
      color: "#fff",
      fontStyle: "bold",
    }).setDepth(1);

    // Create buttons
    const backButton = scene.add.text(centerX - 300, centerY - 150, "Main Menu", {
      fontSize: "100px",
      color: "#fff",
      backgroundColor: "#666",
      padding: { x: 10, y: 5 },
    }).setInteractive().setDepth(1)
    .on("pointerdown", () => {
      console.log("Main Menu button clicked");
      scene.scene.start("MainMenu");
    });

    const restartButton = scene.add.text(centerX - 300, centerY, "Restart", {
      fontSize: "100px",
      color: "#fff",
      backgroundColor: "#666",
      padding: { x: 10, y: 5 },
    }).setInteractive().setDepth(1)
    .on("pointerdown", () => {
      console.log("Restart button clicked");
      scene.scene.restart();
    });;

    const cancelButton = scene.add.text(centerX - 300, centerY + 150, "Cancel", {
      fontSize: "100px",
      color: "#fff",
      backgroundColor: "#666",
      padding: { x: 10, y: 5 },
    }).setInteractive().setDepth(1)
    .on("pointerdown", () => {
      console.log("Cancel button clicked");
      console.log('Cancel clicked');
      menuBackground.destroy();
      backButton.destroy();
      restartButton.destroy();
      cancelButton.destroy();
      scene.scene.resume();
      this.menuShown = false;
    });


    // Button functionality
    restartButton

    backButton

    cancelButton
  }

  closeMenu(scene: Phaser.Scene, menuElements: Phaser.GameObjects.GameObject[]) {
    menuElements.forEach(element => element.destroy());
    scene.scene.resume();
    this.menuShown = false;
  }
}
