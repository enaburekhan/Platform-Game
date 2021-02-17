import Phaser from 'phaser';
import IntroScene from './scenes/introScene';
import GameScene from './scenes/gameScene';
import GameOverScene from './scenes/gameOverScene';
import LeaderBoardScene from './scenes/leaderboardScene';

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: [introScene, gameScene, gameOverScene, leaderboardScene],
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {
        y: 200    
      },
      debug: true    
    }    
  }     
}


export default new Phaser.Game(config); 