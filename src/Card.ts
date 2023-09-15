import Phaser from 'phaser';
import { GameSettings } from './gameSettings.ts';

export default class Card extends Phaser.GameObjects.Plane {
  face: string;
  scene: Phaser.Scene;
  public x: number;
  public y: number;
  frontBackground: string;
  backTexture: string;
  frontTexture: string;

  constructor(
    face: string,
    scene: Phaser.Scene,
    x = 200,
    y = 200,
    frontBackground = 'front',
    backTexture = 'back'
  ) {
    super(scene, x, y, backTexture);
    this.face = face;
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.frontBackground = frontBackground;
    this.backTexture = backTexture;
    this.frontTexture = this.createFrontTextureKey();
    this.setName(this.face);
    this.setInteractive;
    this.setTexture(this.frontTexture);
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
    const newKey = key.toString() + '_' + Math.round(Math.random() * 1000);
    rt.saveTexture(newKey);
    return newKey;
  }
}
