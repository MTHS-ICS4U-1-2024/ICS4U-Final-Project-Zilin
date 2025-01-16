/*
* This is the program that open menu
*
* @author Zilin
* @version 1.0
* @since 2025-01-09
*/
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
    const menuBackground = scene.add.rectangle(585, 1266, 400, 600, 0x000000, 0.7);

    // Add a title
    const title = scene.add.text(485, 1050, "Pause Menu", {
      fontSize: "40px",
      color: "#fff",
      fontStyle: "bold",
    });

    const backButton = scene.add.text(500, 1250, "Main Menu", {
      fontSize: "32px",
      color: "#fff",
      backgroundColor: "#666",
      padding: { x: 10, y: 5 },
    }).setInteractive();
  
    const restartButton = scene.add.text(500, 1150, "Restart", {
      fontSize: "32px",
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