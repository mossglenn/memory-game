export const GameSettings = {
  card: {
    width: 128,
    height: 173
  },
  deck: {
    layout: [
      { cards: 8, cols: 4, rows: 2 },
      { cards: 10, cols: 4, rows: 3 },
      { cards: 12, cols: 4, rows: 3 },
      { cards: 14, cols: 4, rows: 4 },
      { cards: 16, cols: 4, rows: 4 }
    ],
    faces: ['card1', 'card2', 'card3', 'card4']
  },
  table: {
    playArea: { width: 768 - 20, height: 768 - 20 }
  }
};
