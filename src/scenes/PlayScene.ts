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

  create() {
    this.images.push(this.add.image(0, 0, CardKey.ONE));
    this.images.push(this.add.image(0, 0, CardKey.TWO));
    this.images.push(this.add.image(0, 0, CardKey.THREE));
    this.images.push(this.add.image(0, 0, CardKey.FOUR));

    Phaser.Actions.GridAlign(this.images, {
      width: 2,
      height: 2,
      cellHeight: 200,
      cellWidth: 200,
      x: 100,
      y: 100
    });

    this.planes.push(this.add.plane(0, 0, CardKey.ONE));
    this.planes.push(this.add.plane(0, 0, CardKey.TWO));
    this.planes.push(this.add.plane(0, 0, CardKey.THREE));
    this.planes.push(this.add.plane(0, 0, CardKey.FOUR));

    Phaser.Actions.GridAlign(this.planes, {
      width: 2,
      height: 2,
      cellHeight: 200,
      cellWidth: 200,
      x: 600,
      y: 300
    });

    console.log(JSON.stringify(this.images[0]));
    console.log(JSON.stringify(this.planes[0]));
  }
}
