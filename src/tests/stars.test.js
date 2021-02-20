/* eslint-disable import/no-extraneous-dependencies */
import Phaser from 'phaser';
/* eslint-enable import/no-extraneous-dependencies */
import Star from '../lib/stars';

test('Star is a function', () => {
  expect(typeof Star).toBe('function');
});

test('Star is a subclass of sprite', () => {
  expect(Star.prototype instanceof Phaser.Physics.Arcade.Sprite).toBe(true);
});


test('Star has a constructor', () => {
  expect(Star.prototype.constructor).not.toBe(false);
});