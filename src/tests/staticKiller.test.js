/* eslint-disable import/no-extraneous-dependencies */
import Phaser from 'phaser';
/* eslint-enable import/no-extraneous-dependencies */
import StaticKiller from '../lib/staticKiller';

test('StaticKiller is a function', () => {
  expect(typeof StaticKiller).toBe('function');
});

test('staticKiller is a subclass of sprite', () => {
  expect(StaticKiller.prototype instanceof Phaser.Physics.Arcade.Sprite).toBe(true);
});

test('staticKiller has a constructor', () => {
  expect(StaticKiller.prototype.constructor).not.toBe(false);
});