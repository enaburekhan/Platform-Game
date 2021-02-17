import Phaser from 'phaser';

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: [],
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