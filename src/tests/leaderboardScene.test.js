/* eslint-disable import/no-extraneous-dependencies */
import Phaser from 'phaser';
/* eslint-enable import/no-extraneous-dependencies */
import LeaderBoardScene from '../scenes/leaderboardScene';

test('leaderboard scene is a function', () => {
  expect(typeof LeaderBoardScene).toBe('function');
});

test('leaderboard scene is a subclass of scene', () => {
  expect(LeaderBoardScene.prototype instanceof Phaser.Scene).toBe(true);
});