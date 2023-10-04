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

  isFlipping = false;

  rota = { y: 180 };

  constructor(
    face: string,
    scene: Phaser.Scene,
    x = -2000,
    y = 0,
    frontBackground = 'front',
    backTexture = 'back'
  ) {
    super(scene, x, y, backTexture);
    this.modelRotation.y = Phaser.Math.DegToRad(0);
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
    this.direction = this.direction === 'faceDown' ? 'faceUp' : 'faceDown';
    this.scene.add.tween({
      targets: [this.rota],
      y: this.rota.y === 180 ? 0 : 180,
      ease: Phaser.Math.Easing.Expo.Out,
      duration: 500,
      onStart: () => {
        this.isFlipping = true;
        this.scene.tweens.chain({
          targets: this,
          ease: Phaser.Math.Easing.Expo.InOut,
          tweens: [
            {
              duration: 200,
              scale: 1.1
            },
            { duration: 300, scale: 1 }
          ]
        });
      },
      onUpdate: () => {
        // card.modelRotation.y = Phaser.Math.DegToRad(180) + Phaser.Math.DegToRad(rotation.y);
        this.modelRotation.y = Phaser.Math.DegToRad(this.rota.y);
        const cardRotation = Math.floor(
          Phaser.Math.RadToDeg(this.modelRotation.y)
        );
        if (
          (cardRotation >= 0 && cardRotation <= 90) ||
          (cardRotation >= 270 && cardRotation <= 359)
        ) {
          this.setTexture(this.frontTexture);
        } else {
          this.setTexture(this.backTexture);
        }
      },
      onComplete: () => {
        this.isFlipping = false;
        // if (callbackComplete) {
        //   callbackComplete();
        // }
      }
    });
  }
}
