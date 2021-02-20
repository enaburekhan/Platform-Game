/* eslint-disable import/no-extraneous-dependencies */
import Phaser from 'phaser';
/* eslint-enable import/no-extraneous-dependencies */

export default class StaticKiller extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture) {
    super(scene, x, y, texture);

    this.setScale(0.3);
  }
}