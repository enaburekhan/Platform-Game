import Phaser from '../lib/phaser';
import GameOverScene from '../scenes/gameOverScene';

test('game over scene is a function', () => {
  expect(typeof GameOverScene).toBe('function');
});

test('game scene is a subclass of scene', () => {
  expect(GameOverScene.prototype instanceof Phaser.Scene).toBe(true);
});