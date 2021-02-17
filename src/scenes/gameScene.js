import Phaser from 'phaser';
import Stars from '../lib/stars';
import Mountain from '../lib/mountain';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('game');
  }

  init() {
    // this.score = 0;
  }

  preload ()
  {
      this.load.image('sky', 'assets/sky.png');
      this.load.image('ground', 'assets/platform.png');
      this.load.image('star', 'assets/star.png');
      this.load.image('mountain', 'assets/mountain.png');
      this.load.spritesheet('dude', 
          'assets/dude.png',
          { frameWidth: 32, frameHeight: 48 }
      );
  }

  create() {
    this.add.image(400, 300, 'sky').setScrollFactor(0, 1);
    this.coins = this.physics.add.group({ classType: Star });
    this.mountain = this.physics.add.group({ classType: Mountain });
    // platforms
    this.platforms = this.physics.add.staticGroup();
    this.platforms.create(100, this.scale.height + 150, 'ground').setScale(0.5).refreshBody();
    this.platforms.create(400, this.scale.height, 'ground').setScale(0.5).refreshBody();
    this.platforms.create(800, this.scale.height - 150, 'ground').setScale(0.5).refreshBody();
    // setup coins and mountain initially
    this.platforms.children.iterate(platform => {
      this.addCoinAbove(platform);
      this.addMountainAbove(platform);
    });
    // logic for player movement
    this.player = this.physics.add.sprite(100, 450, 'dude');
    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('dude', { start: 9, end: 11 }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('dude', { start: 6, end: 8 }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: 'turn',
      frames: [{ key: 'dude', frame: 0 }],
    });
    // physics interactions
    this.physics.add.collider(this.player, this.platforms);
    this.physics.add.collider(this.platforms, this.coins);
    this.physics.add.collider(this.platforms, this.mountain);
    this.physics.add.overlap(
      this.player,
      this.coins,
      this.collectCoin,
      undefined,
      this,
    );
    this.physics.add.overlap(this.player,
      this.mountain,
      () => {
        this.scene.start('game-over', { score: this.score });
      },
      undefined,
      this);
    this.cursors = this.input.keyboard.createCursorKeys();
    // camera motion
    this.cameras.main.startFollow(this.player);
    this.cameras.main.setDeadzone(0, this.scale.height * 1.5);
    // scores
    this.scoreText = this.add.text(10, 10, 'Score: 0',
      { color: '#000', fontSize: 24 })
      .setScrollFactor(0);
  }

  update() {
    // reuse platforms
    this.platforms.children.iterate(platform => {
      const { scrollX } = this.cameras.main;
      if (platform.x <= scrollX - 100) {
        platform.x = scrollX + 900;
        platform.refreshBody();
        this.addCoinAbove(platform);
        this.addMountainAbove(platform);
      }
    });
    // player motion and animations
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-160);

      this.player.anims.play('left', true);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(160);

      this.player.anims.play('right', true);
    } else {
      this.player.setVelocityX(0);

      this.player.anims.play('turn');
    }

    if (this.cursors.up.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-350);
    }

    if (this.player.y >= 800) {
      this.scene.start('game-over', { score: this.score });
    }
  }

  // add a coin above a platform
  addCoinAbove(sprite) {
    const y = sprite.y - sprite.displayHeight;
    const coin = this.coins.get(Phaser.Math.Between(sprite.x - 60, sprite.x), y, 'star');
    coin.setActive(true);
    coin.setVisible(true);
    this.add.existing(coin);
    coin.body.setSize(coin.width, coin.height);
    this.physics.world.enable(coin);
    return coin;
  }

  // collect coin and increase score
  collectCoin(_player, coin) {
    this.coins.killAndHide(coin);
    this.physics.world.disableBody(coin.body);
    this.score += 10;
    this.scoreText.text = `Score: ${this.score}`;
  }

  // add a coin above a platform
  addSpikesAbove(sprite) {
    const y = sprite.y - sprite.displayHeight;
    const spike = this.spikes.get(Phaser.Math.Between(sprite.x + 10, sprite.x + 60), y, 'spikes');
    spike.setActive(true);
    spike.setVisible(true);
    this.add.existing(spike);
    spike.body.setSize(spike.width, spike.height);
    this.physics.world.enable(spike);
    return spike;
  }

  
}