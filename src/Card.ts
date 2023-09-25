import Phaser from 'phaser';
import { GameSettings } from './gameSettings.ts';
import { CardState } from './Types.ts';

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
  cardState: CardState;
  hitBox: Phaser.GameObjects.Rectangle;

  constructor(
    face: string,
    scene: Phaser.Scene,
    x = -2000,
    y = 0,
    frontBackground = 'front',
    backTexture = 'back'
  ) {
    super(scene, x, y, backTexture);
    this.id = cardCount++;
    this.face = face;
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.frontBackground = frontBackground;
    this.backTexture = backTexture;
    this.frontTexture = this.createFrontTextureKey();
    this.setName(this.id + '-' + this.face);
    this.setInteractive;
    this.cardState = CardState.FACE_DOWN;
    this.setTexture(this.frontTexture);
    this.hitBox = scene.add
      .rectangle(
        this.x,
        this.y,
        GameSettings.card.width,
        GameSettings.card.height
      )
      .setName(this.id.toString())
      .setDepth(0)
      .setInteractive();
    scene.add.existing(this);
  }

  setToPoint(point: Phaser.Geom.Point) {
    this.x = point.x;
    this.y = point.y;
    this.hitBox.x = point.x;
    this.hitBox.y = point.y;
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

  showFace() {
    this.cardState = CardState.FACE_UP;
    this.setTexture(this.frontTexture);
  }
  showBack() {
    this.cardState = CardState.FACE_DOWN;
    this.setTexture(this.backTexture);
  }

  toggleCardState() {
    if (this.cardState == CardState.FLIPPING) {
      console.log("can't toggle card state while it is flipping");
      return;
    }
    return this.cardState == CardState.FACE_DOWN
      ? CardState.FACE_UP
      : CardState.FACE_DOWN;
  }

  flip(to?: CardState) {
    const direction = to ?? this.toggleCardState();
    switch (direction) {
      case CardState.FACE_DOWN:
        this.showBack();
        break;
      case CardState.FACE_UP:
        this.showFace();
        break;
      default:
        console.log('something went wrong telling a card to flip');
        break;
    }
  }
}
