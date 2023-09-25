export type Layout = { cards: number; cols: number; rows: number };

export enum CardState {
  FACE_DOWN = 'FACE_DOWN',
  FACE_UP = 'FACE_UP',
  FLIPPING = 'FLIPPING'
}
