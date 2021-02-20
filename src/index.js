/* eslint-disable import/no-extraneous-dependencies */
import Phaser from 'phaser';
/* eslint-enable import/no-extraneous-dependencies */
import IntroScene from './scenes/introScene';
import GameScene from './scenes/gameScene';
import GameOverScene from './scenes/gameOverScene';
import LeaderBoardScene from './scenes/leaderboardScene';

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {
        y: 300,
      },
    },
  },

  scene: [
    IntroScene,
    GameScene,
    GameOverScene,
    LeaderBoardScene,
  ],

  parent: '#container',
  dom: {
    createContainer: true,
  },

  autoCenter: true,
};


export default new Phaser.Game(config);