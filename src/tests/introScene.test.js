/* eslint-disable import/no-extraneous-dependencies */
import Phaser from 'phaser';
/* eslint-enable import/no-extraneous-dependencies */
import IntroScene from '../scenes/introScene';

test('intro scene is a function', () => {
  expect(typeof IntroScene).toBe('function');
});

test('intro scene is a subclass of scene', () => {
  expect(IntroScene.prototype instanceof Phaser.Scene).toBe(true);
});