import { CardKey } from '../AssetKeys.ts';
import Card from '../Card.ts';
import PlayZone from '../PlayZone.ts';
import { GameSettings } from '../gameSettings.ts';

export default class PlayScene extends Phaser.Scene {
  faces: string[] = GameSettings.deck.faces;
  deck: Card[] = [];
  layout: { cards: number; cols: number; rows: number } = {
    cards: -1,
    cols: -1,
    rows: -1
  };

  constructor() {
    super('play');
  }

  create() {
    this.deck = this.buildDeck(this.faces, this);
    // this.deck.map((card, index) => {
    //   console.log(index + ' ' + card.name);
    // });
    this.layout = this.findLayout(this.deck.length);
    // console.log(this.layout);

    const playZoneSettings = {
      scene: this,
      layout: this.layout,
      width: GameSettings.table.playArea.width,
      height: GameSettings.table.playArea.height
    };
    const playZone = new PlayZone(playZoneSettings);
  }

  findLayout(deckSize: number): { cards: number; cols: number; rows: number } {
    const testLayout = GameSettings.deck.layout.find(
      ({ cards }) => cards == deckSize
    );
    return testLayout == undefined
      ? { cards: 4, cols: 2, rows: 2 }
      : testLayout;
  }

  createCard(face: string, scene: Phaser.Scene): Card {
    const newCard = new Card(face, scene, 0, -2000);
    console.log(newCard.name + ' >> ' + newCard.frontTexture);
    return newCard;
  }

  buildDeck(faces: string[], scene: Phaser.Scene): Card[] {
    const deckFaces = faces.concat(faces);
    console.log(deckFaces);
    const newDeck: Card[] = deckFaces.map((face) => {
      return this.createCard(face, scene);
    });
    this.shuffle(newDeck);
    return newDeck;
  }

  shuffle(deck: Card[]) {
    return deck
      .map((value) => ({ card: value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map((value) => value.card);
  }
}
