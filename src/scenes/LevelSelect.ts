/*
* This is the level select program
*
* @author Zilin
* @version 1.0
* @since 2024-12-13
*/
import { Scene, GameObjects } from 'phaser'
import LoadLevelSelect from '../classes/LoadLevelSelect'

export class LevelSelect extends Scene {
  /**
   * Menu background
   */
  background: GameObjects.TileSprite

  /**
   * Level select background
   */
  selectBackground: GameObjects.Image

  /**
   * Return to main menu text button
   */
  returnText: GameObjects.Text

  /**
   * The level select text style
   */
  textStyle: GameObjects.TextStyle

  /**
   * Player image button
   */
  playerImage: GameObjects.Image

  /**
   * Player text
   */
  createdText: GameObjects.Text

  /**
   * The level select loader
   */
  levelSelectLoader: LoadLevelSelect

  /**
   * Loads the level select menu
   */
  constructor() {
    super('LevelSelect')
  }
  
  /**
   * Creates the level select menu
   */
  create() {
    // Create title images
    const SCREEN_X: number = 1800
    const SCREEN_Y: number = 1000
    this.background = this.add.tileSprite(0, 0, SCREEN_X, SCREEN_Y, 'titleBg')
    this.background.setOrigin(0, 0)
    this.selectBackground = this.add.image(SCREEN_X / 2, SCREEN_Y / 2, 'pauseBg')
      .setOrigin()
      .setScale(0.8)
      .setAlpha(0.9)
    this.returnText = this.add.text(SCREEN_X / 2, 50, 'Go Back', {
        fontFamily: 'Georgia', fontSize: 100, color: '#002eff',
        stroke: '#000fff', strokeThickness: 8, align: 'center'
    }).setOrigin()
    this.returnText.setInteractive(
      new Phaser.Geom.Rectangle(0, 0, this.returnText.width, this.returnText.height),
      Phaser.Geom.Rectangle.Contains
    )
    this.returnText.on('pointerdown', () => {
      this.scene.start('MainMenu')
    })
    const playerScale: number = 0.25
    this.playerImage = this.add.image(90, 163, 'playerImg').setScale(playerScale)
    this.playerImage.setInteractive(
      new Phaser.Geom.Rectangle(0, 0, this.playerImage.width, this.playerImage.height),
      Phaser.Geom.Rectangle.Contains
    )
    this.playerImage.on('pointerdown', () => {
      this.levelSelectLoader.regenerate(1, this.settings)
    })
    this.createdText = this.add.text(
      this.playerImage.x - 37, this.playerImage.y - 65, 'start', {
        fontFamily: 'Georgia', fontSize: 100, color: '#002eff',
        stroke: '#000fff', strokeThickness: 8, align: 'center'
    }
    ).setFontSize(50)

    // Load levels to select
    this.levelSelectLoader = new LoadLevelSelect(this, 1, this.textStyle, )
  }

  /**
   * Updates every milisecond, moves the menu background
   */
  update(): void {
    this.background.tilePositionX += 1 
  }
}