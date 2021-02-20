/* eslint-disable import/no-extraneous-dependencies */
import Phaser from 'phaser';
/* eslint-enable import/no-extraneous-dependencies */

export default class IntroScene extends Phaser.Scene {
  constructor() {
    super('intro');
  }

  preload() {
    this.load.image('start', 'assets/play.png');
    this.load.image('logo', 'assets/dude_face.png');
    this.load.image('leaderboard', 'assets/live-score.png');
  }

  create() {
    // logo
    this.add.image(50, 80, 'logo').setScale(0.5);
    // intro
    this.add.text(this.scale.width * 0.5, 80, 'Platform Game', { fontSize: 70, color: '#1babab' }).setOrigin();
    // start button
    const startButton = this.add.image(this.scale.width * 0.5, this.scale.height * 0.5, 'start').setScale(0.6);
    startButton.setInteractive({ useHandCursor: true });
    startButton.on('pointerdown', () => {
      this.scene.start('game');
    });
    // leaderboard
    const leaderboardButton = this.add.image(this.scale.width * 0.5, this.scale.height * 0.5 + 100, 'leaderboard').setScale(0.4);
    leaderboardButton.setInteractive({ useHandCursor: true });
    leaderboardButton.on('pointerdown', () => {
      this.scene.start('leaderboard');
    });
    // credits
    this.add.text(this.scale.width * 0.3, this.scale.height - 100, 'Created by: Eric Enaburekhan', { fontSize: 22, color: '#1babab' });
  }
}