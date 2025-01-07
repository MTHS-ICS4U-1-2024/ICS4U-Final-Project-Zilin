/*
 * This is Credits program
 * 
 * @author Zilin
 * @version 1.0
 * @since 2025-01-07
 */
import { Scene, GameObjects } from 'phaser';

export class Credits extends Scene {
  /**
   * The credits background
   */
  background: GameObjects.TileSprite;

  /**
   * The game logo
   */
  logo: GameObjects.Image;

  /**
   * The credits text
   */
  creditsText: GameObjects.Text;

  /**
   * The return to main menu text button
   */
  returnText: GameObjects.Text;

  /**
   * The credits text style
   */
  textStyle: GameObjects.TextStyle;

  /**
   * Loads the credits
   */
  constructor() {
    super('Credits');
  }

  /**
   * Creates the credits
   */
  create() {
    // Create title images
    const SCREEN_X = 1800
    const SCREEN_Y = 1000
    this.background = this.add.tileSprite(0, 0, SCREEN_X, SCREEN_Y, 'titleBg')
    this.background.setOrigin(0, 0)
    this.logo = this.add.image(SCREEN_X / 2, 100, 'logo').setScale(0.25)
    this.logo.setInteractive(
      new Phaser.Geom.Rectangle(0, 0, this.logo.width, this.logo.height),
      Phaser.Geom.Rectangle.Contains
    )
    this.logo.on('pointerdown', () => {
      this.scene.start('MainMenu')
    })
    this.creditsText = this.add.text(
      SCREEN_X / 2,
      SCREEN_Y / 2,
      'author for progamming: Zilin',
      {
        fontFamily: 'Georgia',
        fontSize: 70,
        color: '#002eff',
        stroke: '#00fbff',
        strokeThickness: 10,
        align: 'center'
      }
    ).setOrigin(0.5)
    this.returnText = this.add.text(
      (SCREEN_X / 4),
      (SCREEN_Y / 4),
      'Click the logo to return to the main menu.',
      {
        fontFamily: 'Georgia',
        fontSize: 70,
        color: '#002eff',
        stroke: '#00fbff',
        strokeThickness: 10,
        align: 'center'
      }
    )
      .setAlign('left')
      .setFontSize(30)
  }

  /**
   * Runs every milisecond, moves the menu background
   */
  update(): void {
    this.background.tilePositionX += 1 
  }
}