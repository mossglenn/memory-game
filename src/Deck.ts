import Card from './Card';

export default class Deck {
  cards: Card[];

  scene: Phaser.Scene;

  constructor(scene: Phaser.Scene, cards: Card[]) {
    this.scene = scene;
    this.cards = cards;
  }

  static createCards(
    num: number,
    faces: string[],
    scene: Phaser.Scene
  ): Card[] {
    // randomly collect the num of faces
    const selectedFaces = [...faces]
      .sort(() => 0.5 - Math.random())
      .slice(0, num);
    const deckFaces = selectedFaces.concat([...selectedFaces]);
    return deckFaces.map((face): Card => new Card(face, scene));
  }

  shuffleDeck() {
    this.cards.sort(() => 0.5 - Math.random());
    // return [...deck.cards].sort(() => 0.5 - Math.random());
  }

  deal(dealPoints: Phaser.Geom.Point[]) {
    if (this.cards.length > dealPoints.length) {
      console.log('To many cards, not enough dealPoints');
    }
    return this.cards.map((card, index) => {
      const dealPoint = dealPoints[index];
      const cardContainer = this.scene.add.container(dealPoint.x, dealPoint.y);
      return cardContainer.add(card.setPosition(0, 0));
      // return card.setPosition(dealPoint.x, dealPoint.y);
    });
  }

  static shuffle(deck: Card[]): Card[] {
    return deck
      .map((value): { card: Card; sort: number } => ({
        card: value,
        sort: Math.random()
      }))
      .sort((a, b): number => a.sort - b.sort)
      .map((value): Card => value.card);
  }
}
