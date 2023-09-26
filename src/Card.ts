import Phaser from 'phaser';
import GameSettings from './gameSettings';

let cardCount = 0;

export default class Card extends Phaser.GameObjects.Plane {
  id: number;

  face: string;

  scene: Phaser.Scene;

  public x: number;

  public y: number;

  frontBackground: string;

  backTexture: string;

  frontTexture: string;

  direction: 'faceDown' | 'faceUp';

  constructor(
    face: string,
    scene: Phaser.Scene,
    x = -2000,
    y = 0,
    frontBackground = 'front',
    backTexture = 'back'
  ) {
    super(scene, x, y, backTexture);
    cardCount += 1;
    this.id = cardCount;
    this.face = face;
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.direction = 'faceDown';
    this.frontBackground = frontBackground;
    this.backTexture = backTexture;
    this.frontTexture = this.createFrontTextureKey();
    this.setName(this.face);
    this.setInteractive();
    // this.setTexture(this.frontTexture);
    scene.add.existing(this);
  }

  createFrontTextureKey(
    scene = this.scene,
    x = 0,
    y = -2000,
    width = GameSettings.card.width,
    height = GameSettings.card.height,
    key = this.face,
    frontBackground = this.frontBackground
  ) {
    const rt = scene.add.renderTexture(x, y, width, height);
    rt.draw(frontBackground);
    const scaledImage = scene.add.image(0, -2000, key).setScale(0.8);
    rt.draw(
      scaledImage,
      GameSettings.card.width / 2,
      GameSettings.card.height / 2
    );
    const newKey = `${key.toString()}_${Math.round(Math.random() * 1000)}`;
    rt.saveTexture(newKey);
    return newKey;
  }

  flip() {
    if (this.direction === 'faceDown') {
      this.setTexture(this.frontTexture);
      this.direction = 'faceUp';
    } else {
      this.setTexture(this.backTexture);
      this.direction = 'faceDown';
    }
  }
}
