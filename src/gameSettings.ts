export const GameSettings = {
  card: {
    width: 128,
    height: 173,
    margin: { x: 10, y: 10 } //shared between all four sides e.g. leftMargin = x/2
  },
  deck: {
    layout: [
      { cards: 6, cols: 3, rows: 2 },
      { cards: 8, cols: 4, rows: 2 },
      { cards: 10, cols: 4, rows: 3 },
      { cards: 12, cols: 4, rows: 3 },
      { cards: 14, cols: 5, rows: 3 },
      { cards: 16, cols: 4, rows: 4 }
    ],
    faces: ['card1', 'card2', 'card3', 'card4', 'card5', 'card6']
  },
  table: {
    playArea: {
      width: 768,
      height: 768,
      margin: { x: 20, y: 20 }
    }
  }
};
