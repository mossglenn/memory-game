import { CardKey } from '../../AssetKeys.ts';
import Card from '../../Card.ts';
import { GameSettings } from '../../gameSettings.ts';

export default class PlayScene extends Phaser.Scene {
  cards: Card[] = [];

  tests: Phaser.GameObjects.Image[] = [];

  planes: Phaser.GameObjects.Plane[] = [];

  constructor() {
    super('play');
  }

  create() {
    this.tests.push(this.add.image(0, -2000, CardKey.ONE));
    this.tests.push(this.add.image(0, -2000, CardKey.TWO));
    this.tests.push(this.add.image(0, -2000, CardKey.THREE));
    this.tests.push(this.add.image(0, -2000, CardKey.FOUR));

    Phaser.Actions.GridAlign(this.tests, {
      width: 2,
      height: 2,
      cellHeight: 300,
      cellWidth: 300,
      x: 100,
      y: 100
    });

    this.planes.push(this.add.plane(0, -2000, CardKey.ONE));
    this.planes.push(this.add.plane(0, -2000, CardKey.TWO));
    this.planes.push(this.add.plane(0, -2000, CardKey.THREE));
    this.planes.push(this.add.plane(0, -2000, CardKey.FOUR));

    Phaser.Actions.GridAlign(this.planes, {
      width: 2,
      height: 2,
      cellHeight: 300,
      cellWidth: 300,
      x: 100,
      y: 100
    });

    this.cards.push(new Card(CardKey.FOUR, this, 800, 100));
    this.cards.push(new Card(CardKey.THREE, this, 800, 300));
    this.cards.push(new Card(CardKey.TWO, this, 800, 500));
    this.cards.push(new Card(CardKey.ONE, this, 800, 700));
    console.log(JSON.stringify(this.cards[1]));

    console.log(Object.hasOwn(this.cards[0], 'x'));
    console.log(Object.hasOwn(this.cards[0], 'y'));

    Phaser.Actions.GridAlign(this.cards, {
      width: 2,
      height: 2,
      cellHeight: 300,
      cellWidth: 300,
      x: 100,
      y: 100
    });

    console.log(JSON.stringify(this.cards[0]));
    console.log(JSON.stringify(this.tests[0]));
    console.log(JSON.stringify(this.planes[0]));

    // Phaser.Actions.GridAlign(this.cards, {
    //     width: 2,
    //     height: 2,
    //     cellHeight: 300,
    //     cellWidth:300,
    //     x: 100,
    //     y: 100

    // })

    PhaserGUIAction(this);
  }
}
