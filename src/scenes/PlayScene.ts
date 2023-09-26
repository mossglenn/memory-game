import PlayZone from '../PlayZone';
import GameSettings from '../gameSettings';
import { Layout } from '../Types';
import Deck from '../Deck';

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
    deck.deal(playZone.dealPoints);
  }
}
