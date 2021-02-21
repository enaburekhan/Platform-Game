import Phaser from '../lib/phaser';
import LeaderBoardScene from '../scenes/leaderboardScene';

test('leaderboard scene is a function', () => {
  expect(typeof LeaderBoardScene).toBe('function');
});

test('leaderboard scene is a subclass of scene', () => {
  expect(LeaderBoardScene.prototype instanceof Phaser.Scene).toBe(true);
});