/* eslint-disable import/no-extraneous-dependencies */
import Phaser from 'phaser';
/* eslint-enable import/no-extraneous-dependencies */
import GameScene from '../scenes/gameScene';

test('game scene is a function', () => {
  expect(typeof GameScene).toBe('function');
});

test('game scene is a subclass of scene', () => {
  expect(GameScene.prototype instanceof Phaser.Scene).toBe(true);
});