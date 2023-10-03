import PlayZone from '../PlayZone';
import GameSettings from '../gameSettings';
import { Layout } from '../Types';
import Deck from '../Deck';
import Card from '../Card';

export default class PlayScene extends Phaser.Scene {
  deck: Deck = new Deck(this, []); // Card[];

  matchesAll = GameSettings.deck.faces.length;

  matchesFound = 0;

  matchingCards: Card[] = [];

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

    this.input.on(
      'pointerdown',
      (
        pointer: Phaser.Input.Pointer,
        currentlyOver: Phaser.GameObjects.GameObject[]
      ) => {
        if (this.matchesAll === this.matchesFound) {
          this.winGame();
        }

        if (this.cameras.main.zoom !== 1) {
          this.unZoom();
        } else if (
          pointer &&
          currentlyOver[0] !== undefined &&
          currentlyOver[0].type === 'Plane' &&
          this.matchingCards.length < 2
        ) {
          const selectedCard: Card = currentlyOver[0] as Card;
          if (selectedCard.direction === 'faceDown') {
            this.matchCard(selectedCard);
          }
        }
      }
    );
  }

  matchCard(selCard: Card) {
    selCard.flip();
    this.matchingCards.push(selCard);
    const cardsNum = this.matchingCards.length;
    if (cardsNum > 1) {
      const match = this.checkForMatch();
      if (match) {
        this.matchesFound += 1;
        this.cameras.main.zoomTo(3);
        this.cameras.main.pan(
          selCard.parentContainer.x,
          selCard.parentContainer.y
        );
        this.matchingCards[0].removeInteractive();
        this.matchingCards[1].removeInteractive();
        this.matchingCards = [];
      } else {
        console.log('that is not a match');
        this.matchingCards[0].setTint(0xff6666);
        this.matchingCards[1].setTint(0xff6666);

        setTimeout(() => {
          this.matchingCards[0].clearTint().flip();
          this.matchingCards[1].clearTint().flip();
          this.matchingCards = [];
        }, 1000);
      }
    }
  }

  checkForMatch() {
    console.log('checking for match');
    return this.matchingCards[0].face === this.matchingCards[1].face;
  }

  pauseAndFlipBack() {
    setTimeout(this.flipCards, 1000);
  }

  flipCards() {
    this.matchingCards[0].flip();
    this.matchingCards[1].flip();
    this.matchingCards = [];
  }

  unZoom() {
    this.matchingCards = [];
    this.cameras.main.zoomTo(1);
    this.cameras.main.pan(
      Number(this.game.config.width) / 2,
      Number(this.game.config.height) / 2
    );
  }

  winGame() {
    this.unZoom();
    console.log(`YOU WIN! You found ${this.matchesFound}`);
    this.add.text(100, 100, 'You WIN!', { fontSize: '64px', color: '#ff00ff' });
    this.add.image(350, 350, 'playagain');
  }
}
