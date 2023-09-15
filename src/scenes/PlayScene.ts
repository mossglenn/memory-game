export enum CardKey {
  BACK = 'back',
  FRONT = 'front',
  ONE = 'card1',
  TWO = 'card2',
  THREE = 'card3',
  FOUR = 'card4'
}

export default class PlayScene extends Phaser.Scene {
  images: Phaser.GameObjects.Image[] = [];
  planes: Phaser.GameObjects.Plane[] = [];

  constructor() {
    super('play');
  }

  preload(): void {
    //card front/back size: 128 x 173 px

    this.load.image('back', 'assets/images/cards/back.png');
    this.load.image('front', 'assets/images/cards/front.png');
    this.load.image(CardKey.ONE, 'assets/images/cards/card1.png');
    this.load.image(CardKey.TWO, 'assets/images/cards/card2.png');
    this.load.image(CardKey.THREE, 'assets/images/cards/card3.png');
    this.load.image(CardKey.FOUR, 'assets/images/cards/card4.png');
  }

  create() {
    this.images.push(this.add.image(0, 0, CardKey.ONE).setName('sheep'));
    this.images.push(this.add.image(0, 0, CardKey.TWO).setName('cow'));
    this.images.push(this.add.image(0, 0, CardKey.THREE).setName('mouse'));
    this.images.push(this.add.image(0, 0, CardKey.FOUR).setName('cat'));

    this.images.map((value) => {
      console.log('PRE-GA-> ' + JSON.stringify(value));
    });

    Phaser.Actions.GridAlign(this.images, {
      width: 2,
      height: 2,
      cellHeight: 200,
      cellWidth: 200,
      x: 100,
      y: 100
    });
    this.images.map((value) => {
      console.log('post-GA-> ' + JSON.stringify(value));
    });

    this.planes.push(
      this.add.plane(0, 0, CardKey.ONE).setSize(128, 173).setName('p-sheep'),
      this.add.plane(0, -2000, CardKey.TWO).setSize(128, 173).setName('p-cow'),
      this.add.plane(0, 0, CardKey.THREE).setSize(128, 173).setName('p-mouse'),
      this.add.plane(0, 0, CardKey.FOUR).setSize(128, 173).setName('p-cat')
    );

    this.planes.map((value) => {
      console.log('PRE-GA-> ' + JSON.stringify(value));
    });

    Phaser.Actions.GridAlign(this.planes, {
      width: 2,
      height: 2,
      cellHeight: 200,
      cellWidth: 200,
      x: 600,
      y: 300
    });

    this.planes.map((value) => {
      console.log('post-GA-> ' + JSON.stringify(value));
    });
    this.planes.map((value) => {
      value.setSize(128, 173);
    });
    this.planes.map((value) => {
      console.log('post-setSize-> ' + JSON.stringify(value));
    });
  }
}
