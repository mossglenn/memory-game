import Card from '../Card.ts';
import PlayZone from '../PlayZone.ts';
import { GameSettings } from '../gameSettings.ts';
import { Layout } from '../Types.ts';

export default class PlayScene extends Phaser.Scene {
  faces: string[] = GameSettings.deck.faces;
  deck: Card[];
  layout: Layout = this.findLayout(this.faces.length);
  playZone: PlayZone;

  constructor() {
    super('play');
  }

  create() {
    const playZoneConfig = {
      scene: this,
      x: 10,
      y: 10,
      layout: this.layout,
      width: 750,
      height: 750
    };
    this.playZone = new PlayZone(playZoneConfig);
    this.add.existing(this.playZone);
    this.deck = this.buildDeck(this.layout.cards, this.faces, this);

    const shuffledDeck = this.shuffleDeck(this.deck);
    console.log(this.deck);
    console.log(shuffledDeck);
  }

  deal(deck: Card[], dealPoints: Phaser.Geom.Point[]): string {
    if (deck.length > dealPoints.length) {
      console.log('To many cards, not enough dealPoints');
      return 'error';
    }
    deck.map((card, index) => {
      const dealPoint = dealPoints[index];
      card.setPosition(dealPoint.x, dealPoint.y);
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
}
