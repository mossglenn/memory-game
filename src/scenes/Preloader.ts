import { CardKey } from '../AssetKeys';

export default class Preloader extends Phaser.Scene {
  constructor() {
    super('preloader');
  }

  preload(): void {
    // card front/back size: 128 x 173 px

    this.load.image('back', 'assets/images/cards/back.png');
    this.load.image('front', 'assets/images/cards/front.png');
    this.load.image(CardKey.ONE, 'assets/images/cards/card1.png');
    this.load.image(CardKey.TWO, 'assets/images/cards/card2.png');
    this.load.image(CardKey.THREE, 'assets/images/cards/card3.png');
    this.load.image(CardKey.FOUR, 'assets/images/cards/card4.png');

    // load static assets from url
    this.load.image(
      'sky',
      'https://labs.phaser.io/assets/skies/gradient25.png'
    );
  }

  create(): void {
    this.scene.start('play');
  }
}
