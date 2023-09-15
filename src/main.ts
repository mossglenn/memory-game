import Phaser from 'phaser';
import PlayScene from './scenes/PlayScene.ts';

const config: Phaser.Types.Core.GameConfig = {
  parent: 'app',
  type: Phaser.AUTO,
  width: 1024,
  height: 768,
  backgroundColor: 'rgba(50,80,50,0)',

  scale: {
    mode: Phaser.Scale.ScaleModes.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 200 }
    }
  },

  scene: [PlayScene]
};

export default new Phaser.Game(config);
