import Phaser from 'phaser';
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
        y: 300    
      },
      debug: false    
    }    
  },
  
  scene: [
          IntroScene,
          GameScene, 
          GameOverScene, 
          LeaderBoardScene
        ],
  
  parent: '#container',
  dom: {
    createContainer: true,
  },
  
  autoCenter: true,
}


export default new Phaser.Game(config); 