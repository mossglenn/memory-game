export default class PlayZone extends Phaser.GameObjects.Zone {
  scene: Phaser.Scene;
  width: number;
  height: number;
  cols: number;
  rows: number;
  colZones: Phaser.GameObjects.Zone[];
  rowZones: Phaser.GameObjects.Zone[];

  constructor({
    scene,
    layout,
    width,
    height
  }: {
    scene: Phaser.Scene;
    layout: { cards: number; cols: number; rows: number };
    width: number;
    height: number;
  }) {
    super(scene, (width + 10) / 2, (height + 10) / 2, width, height);
    this.scene = scene;
    this.width = width;
    this.height = height;
    this.cols = layout.cols;
    this.rows = layout.rows;
    this.addTempGrid();
    this.colZones = this.createColZones();
    //this.createZones(this.colZones);
  }

  createColZones(num: number = this.cols) {
    const zones: Phaser.GameObjects.Zone[] = [];
    const keys = [...Array(num).keys()];
    keys.map((key) => {
      zones[key] = this.scene.add.rectangle(
        0,
        0,
        this.width / this.cols,
        this.height,
        0x000000
      );
    });
    this.alignCols(zones);
    return zones;
  }

  addTempGrid() {
    this.scene.add.grid(
      (this.width + 10) / 2,
      (this.height + 10) / 2,
      this.width,
      this.height,
      this.width / this.cols,
      this.height / this.rows,
      0x333333,
      0.3
    );
  }

  makeAlignmentRow(playZone: PlayZone = this) {
    const newRow = this.scene.add.rectangle(
      0,
      0,
      this.width,
      this.height / this.rows,
      0x000000
    );
    Phaser.Display.Align.In.TopCenter(newRow, playZone);
    return newRow;
  }
  alignCols(zones: Phaser.GameObjects.Zone[], playZone = this) {
    zones.forEach((zone, index) => {
      Phaser.Display.Align.In.LeftCenter(zone, playZone);
      const xShift = (playZone.width / playZone.cols) * index;
      zone.setX(zone.x + xShift);
    });
  }
}
