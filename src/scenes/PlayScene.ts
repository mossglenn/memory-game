import PlayZone from '../PlayZone';
import GameSettings from '../gameSettings';
import { Layout } from '../Types';
import Deck from '../Deck';
import Card from '../Card';

export default class PlayScene extends Phaser.Scene {
  deck: Deck = new Deck(this, []); // Card[];

  constructor() {
    super('play');
  }

  create() {
    const { faces } = GameSettings.deck;

    const layout: Layout = PlayZone.findLayout(faces.length);

    const playZoneSize =
      this.game.config.width > this.game.config.height
        ? Number(this.game.config.height) - GameSettings.table.playArea.margin.y
        : Number(this.game.config.width) - GameSettings.table.playArea.margin.x;
    const playZoneConfig = {
      scene: this,
      x: (playZoneSize + GameSettings.table.playArea.margin.x) / 2,
      y: (playZoneSize + GameSettings.table.playArea.margin.y) / 2,
      layout,
      width:
        Number(this.game.config.height) - GameSettings.table.playArea.margin.y,
      height:
        Number(this.game.config.height) - GameSettings.table.playArea.margin.y
    };
    const playZone = new PlayZone(playZoneConfig);

    const deck = new Deck(this, Deck.createCards(layout.cards, faces, this));
    deck.shuffleDeck();
    const cardContainers = deck.deal(playZone.dealPoints);
    console.log(cardContainers);
    this.input.on(
      'pointerdown',
      (
        pointer: Phaser.Input.Pointer,
        currentlyOver: Phaser.GameObjects.GameObject[]
      ) => {
        if (
          pointer &&
          currentlyOver[0] !== undefined &&
          currentlyOver[0].type === 'Plane'
        ) {
          const selectedCard: Card = currentlyOver[0] as Card;
          selectedCard.flip();
        }
      }
    );
  }
}
