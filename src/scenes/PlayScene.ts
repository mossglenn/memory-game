import Card from '../Card.ts';
import PlayZone from '../PlayZone.ts';
import { GameSettings } from '../gameSettings.ts';
import { Layout } from '../Types.ts';

export default class PlayScene extends Phaser.Scene {
  faces: string[] = GameSettings.deck.faces;
  deck: Card[] = [];
  layout: Layout = this.findLayout(this.faces.length);

  constructor() {
    super('play');
  }

  create() {
    const playZoneSettings = {
      scene: this,
      layout: this.layout,
      width: GameSettings.table.playArea.width,
      height: GameSettings.table.playArea.height
    };
    const playZone: PlayZone = new PlayZone(playZoneSettings);
    playZone.zoneGroup.getChildren().map((zone) => {
      Phaser.Display.Align.In.Center(this.add.text(0, 0, zone.name), zone);
    });

    this.faces.map((face, index) => {
      Phaser.Display.Align.In.Center(
        this.add.sprite(0, 0, face),
        playZone.zoneGroup.getMatching('name', index.toString()).shift()
      );
    });

    this.deck = this.buildDeck(this.faces, this);
    console.log(this.deck);
    const delt = this.deal(this.deck, playZone.zoneGroup);
  }

  deal(deck: Card[], zoneGroup: Phaser.GameObjects.Group): string {
    if (deck.length > zoneGroup.getLength()) {
      console.log('To many cards, not enough zones');
      return 'error';
    }
    deck.map((card, index) => {
      const zone: Phaser.GameObjects.Zone = zoneGroup
        .getMatching('name', index.toString())
        .shift();
      Phaser.Display.Align.In.Center(card, zone);
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

  buildDeck(faces: string[], scene: Phaser.Scene): Card[] {
    const deckFaces = faces.concat(faces);
    const newDeck: Card[] = deckFaces.map((face): Card => {
      return new Card(face, scene);
    });
    //this.shuffle(newDeck);
    return newDeck;
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
