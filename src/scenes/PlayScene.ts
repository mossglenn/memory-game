import Card from '../Card.ts';
import PlayZone from '../PlayZone.ts';
import { GameSettings } from '../gameSettings.ts';
import { Layout } from '../Types.ts';

export default class PlayScene extends Phaser.Scene {
  faces: string[] = GameSettings.deck.faces;
  deck: Card[];
  layout: Layout = this.findLayout(this.faces.length);
  constructor() {
    super('play');
    this.deck = [];
  }

  create() {
    const playZoneSize =
      this.game.config.width > this.game.config.height
        ? Number(this.game.config.height) - GameSettings.table.playArea.margin.y
        : Number(this.game.config.width) - GameSettings.table.playArea.margin.x;
    const playZoneConfig = {
      scene: this,
      x: (playZoneSize + GameSettings.table.playArea.margin.x) / 2,
      y: (playZoneSize + GameSettings.table.playArea.margin.y) / 2,
      layout: this.layout,
      width:
        Number(this.game.config.height) - GameSettings.table.playArea.margin.y,
      height:
        Number(this.game.config.height) - GameSettings.table.playArea.margin.y
    };
    const playZone = new PlayZone(playZoneConfig);
    this.deck = this.buildDeck(this.layout.cards, this.faces, this);
    const shuffledDeck = this.shuffleDeck(this.deck);
    const dealt = this.deal(shuffledDeck, playZone.dealPoints);
    console.log(dealt);

    this.input.on('pointerdown', this.flipCard);
  }

  deal(deck: Card[], dealPoints: Phaser.Geom.Point[]): string {
    if (deck.length > dealPoints.length) {
      console.log('To many cards, not enough dealPoints');
      return 'error';
    }
    deck.map((card, index) => {
      const dealPoint = dealPoints[index];
      card.setToPoint(dealPoints[index]);
      //setPosition(dealPoint.x, dealPoint.y);
      // card.on('POINTER_DOWN', () => {
      //   console.log('pointer down!');
      // });
      // this.add
      //   .rectangle(
      //     dealPoint.x,
      //     dealPoint.y,
      //     GameSettings.card.width,
      //     GameSettings.card.height
      //   )
      // .setName(card.id.toString())
      // .setInteractive();
    });
    return 'success';
  }

  findLayout(facesSize: number): { cards: number; cols: number; rows: number } {
    const testLayout = GameSettings.deck.layout.find(
      ({ cards }): boolean => cards == facesSize * 2
    );
    return testLayout == undefined
      ? { cards: 4, cols: 2, rows: 2 }
      : testLayout;
  }

  buildDeck(num: number, faces: string[], scene: Phaser.Scene): Card[] {
    //randomly collect the num of faces
    const selectedFaces = [...faces]
      .sort(() => 0.5 - Math.random())
      .slice(0, num);
    const deckFaces = selectedFaces.concat([...selectedFaces]);
    const newDeck: Card[] = deckFaces.map((face): Card => {
      return new Card(face, scene);
    });
    console.log(newDeck);
    return newDeck;
  }

  shuffleDeck(deck: Card[]) {
    const shuffledDeck = [...deck].sort(() => 0.5 - Math.random());
    return shuffledDeck;
  }

  shuffle(deck: Card[]): Card[] {
    return deck
      .map((value): { card: Card; sort: number } => ({
        card: value,
        sort: Math.random()
      }))
      .sort((a, b): number => a.sort - b.sort)
      .map((value): Card => value.card);
  }

  flipCard(
    pointer: Phaser.Input.Pointer,
    currentlyOver: Phaser.GameObjects.GameObject[]
  ) {
    console.log(pointer);
    console.log(currentlyOver[0].name);
  }
}
