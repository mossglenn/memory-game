import { Layout } from './Types.ts';
import { GameSettings } from './gameSettings.ts';

export default class PlayZone extends Phaser.GameObjects.Zone {
  scene: Phaser.Scene;
  x: number;
  y: number;
  width: number;
  height: number;
  layout: Layout;
  private cardTotal: { width: number; height: number };
  cardZone: Phaser.GameObjects.Zone;
  dealPoints: Phaser.Geom.Point[];
  // dealPoints: Phaser.Geom.Point[];

  constructor({
    scene,
    x,
    y,
    width,
    height,
    layout
  }: {
    scene: Phaser.Scene;
    x: number;
    y: number;
    layout: Layout;
    width: number;
    height: number;
  }) {
    super(scene, x, y, width, height);
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.layout = layout;
    this.cardTotal = {
      width: GameSettings.card.width + GameSettings.card.margin.x,
      height: GameSettings.card.height + GameSettings.card.margin.y
    };
    this.cardZone = this.createCardZone();
    this.dealPoints = this.collectDealPoints(this.createAllRows());
  }

  createCardZone(): Phaser.GameObjects.Zone {
    const width = this.cardTotal.width * this.layout.cols;
    const height = this.cardTotal.height * this.layout.rows;
    if (width > this.width) {
      console.log('cardZone is wider than playZone');
    }
    if (height > this.height) {
      console.log('cardZone is taller than playZone');
    }
    const cardZone = this.scene.add.zone(0, 0, width, height);
    Phaser.Display.Align.In.Center(cardZone, this);
    return cardZone;
  }

  createNewPoint(
    point: Phaser.Geom.Point,
    xShift: number,
    yShift: number
  ): Phaser.Geom.Point {
    return Phaser.Geom.Point.Clone(point).setTo(
      point.x + xShift,
      point.y + yShift
    );
  }

  createRowPoints(rowY: number, cols: number): Phaser.Geom.Point[] {
    const firstX = this.cardZone.getTopLeft().x! - this.cardTotal.width / 2;
    const firstPoint = new Phaser.Geom.Point(firstX, rowY);
    const rowPoints = [firstPoint];
    const keys = [...Array(cols - 1).keys()];
    keys.map((key) => {
      rowPoints.push(
        this.createNewPoint(
          firstPoint,
          firstPoint.x + this.cardTotal.width * (key + 1),
          rowY
        )
      );
    });
    return rowPoints;
  }

  collectDealPoints(rows: Phaser.Geom.Point[][]) {
    const dealPoints: Phaser.Geom.Point[] = [];
    rows.map((row) => {
      dealPoints.push(...row);
    });
    return dealPoints;
  }

  createAllRows(): Phaser.Geom.Point[][] {
    const firstRowY = this.cardZone.getTopLeft().y! - this.cardTotal.height / 2;
    const rows: Phaser.Geom.Point[][] = [];
    const rowKeys = [...Array(this.layout.rows).keys()];
    rowKeys.map((key) => {
      rows.push(
        this.createRowPoints(
          firstRowY - this.cardTotal.height * key,
          this.layout.cols
        )
      );
    });
    return rows;
  }

  addTempGrid() {
    this.scene.add.grid(
      (this.width + 10) / 2,
      (this.height + 10) / 2,
      this.width,
      this.height,
      this.width / this.layout.cols,
      this.height / this.layout.rows,
      0x333333,
      0.3
    );
  }
}
