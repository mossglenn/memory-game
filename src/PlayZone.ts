import { Layout } from './Types.ts';

export default class PlayZone extends Phaser.GameObjects.Zone {
  scene: Phaser.Scene;
  width: number;
  height: number;
  layout: Layout;
  colZones: Phaser.GameObjects.Zone[];
  rowZones: Phaser.GameObjects.Zone[];

  constructor({
    scene,
    layout,
    width,
    height
  }: {
    scene: Phaser.Scene;
    layout: Layout;
    width: number;
    height: number;
  }) {
    super(scene, (width + 10) / 2, (height + 10) / 2, width, height);
    this.scene = scene;
    this.width = width;
    this.height = height;
    this.layout = layout;
    this.colZones = this.alignCols(
      this.createZonesArray(layout.cols, width / layout.cols, height)
    );
    this.rowZones = this.alignRows(
      this.createZonesArray(layout.rows, width, height / layout.rows)
    );
    this.addTempGrid();
  }

  createAlignmentZone(width: number, height: number) {
    return this.scene.add
      .rectangle(0, 0, width, height)
      .setStrokeStyle(1, 0x000000);
  }

  createZonesArray(num: number, width: number, height: number) {
    const zones: Phaser.GameObjects.Zone[] = [];
    const keys = [...Array(num).keys()];
    keys.map((key) => {
      zones[key] = this.createAlignmentZone(width, height).setName(
        key.toString()
      );
    });
    return zones;
  }

  alignCols(zones: Phaser.GameObjects.Zone[], playZone = this) {
    zones.forEach((zone, index) => {
      Phaser.Display.Align.In.LeftCenter(zone, playZone);
      const xShift = (playZone.width / playZone.layout.cols) * index;
      zone.setX(zone.x + xShift);
    });
    return zones;
  }

  alignRows(zones: Phaser.GameObjects.Zone[], playZone = this) {
    zones.forEach((zone, index) => {
      Phaser.Display.Align.In.TopCenter(zone, playZone);
      const yShift = (playZone.height / playZone.layout.rows) * index;
      zone.setY(zone.y + yShift);
    });
    return zones;
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
