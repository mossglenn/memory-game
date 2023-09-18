import { Layout } from './Types.ts';

export default class PlayZone extends Phaser.GameObjects.Zone {
  scene: Phaser.Scene;
  width: number;
  height: number;
  layout: Layout;
  zoneGroup: Phaser.GameObjects.Group;

  constructor({
    scene,
    width,
    height,
    layout
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
    this.zoneGroup = this.scene.add.group();
    this.populateZoneGroup(
      this.scene,
      this.zoneGroup,
      this.layout,
      this.width / this.layout.cols,
      this.height / this.layout.rows
    );
    //this.addTempGrid();
  }

  populateZoneGroup(
    scene: Phaser.Scene,
    group: Phaser.GameObjects.Group,
    layout: Layout,
    width: number,
    height: number
  ) {
    const keys = [...Array(layout.rows).keys()];
    keys.map((key, index) => {
      this.createRowOfZones(scene, group, index, layout.cols, width, height);
    });
  }

  createRowOfZones(
    scene: Phaser.Scene,
    group: Phaser.GameObjects.Group,
    row: number,
    num: number,
    width: number,
    height: number
  ) {
    const leftEdge = this.getLeftCenter().x!;
    const topEdge = this.getTopCenter().y!;
    const keys = [...Array(num)];
    keys.map((key, index) => {
      group.add(
        scene.add
          .zone(
            leftEdge + width / 2 + width * index,
            topEdge + height / 2 + height * row,
            width,
            height
          )
          .setName((index + num * row).toString())
      );
    });
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
