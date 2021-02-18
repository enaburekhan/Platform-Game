import Phaser from 'phaser';
import Star from '../lib/stars';
import Mountain from '../lib/mountain';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('game');
  }

  init() {
    this.score = 0;
  }

  preload ()
  {
      this.load.image('sky', 'assets/sky.png');
      this.load.image('ground', 'assets/platform.png');
      this.load.image('star', 'assets/star.png');
      this.load.audio('jump', 'assets/sfx/Preview.ogg');
      this.load.image('mountains', 'assets/mountain.png');
      this.load.spritesheet('dude', 
          'assets/dude.png',
          { frameWidth: 32, frameHeight: 48 }
      );
  }

  create() {
    this.add.image(400, 300, 'sky').setScrollFactor(0, 1);
    this.stars = this.physics.add.group({ classType: Star });
    this.mountain = this.physics.add.group({ classType: Mountain });
    // platforms
    this.platforms = this.physics.add.staticGroup();
    this.platforms.create(100, this.scale.height + 150, 'ground').setScale(0.5).refreshBody();
    this.platforms.create(400, this.scale.height, 'ground').setScale(0.5).refreshBody();
    this.platforms.create(800, this.scale.height - 150, 'ground').setScale(0.5).refreshBody();
    // setup stars and mountain initially
    this.platforms.children.iterate(platform => {
      this.addStarAbove(platform);
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
    this.physics.add.collider(this.platforms, this.stars);
    this.physics.add.collider(this.platforms, this.mountain);
    this.physics.add.overlap(
      this.player,
      this.stars,
      this.collectStar,
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
    // recycle platforms
    this.platforms.children.iterate(platform => {
      const { scrollX } = this.cameras.main;
      if (platform.x <= scrollX - 100) {
        platform.x = scrollX + 900;
        platform.refreshBody();
        this.addStarAbove(platform);
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

  // add a star above a platform
  addStarAbove(sprite) {
    const y = sprite.y - sprite.displayHeight;
    const star = this.stars.get(Phaser.Math.Between(sprite.x - 60, sprite.x), y, 'star');
    star.setActive(true);
    star.setVisible(true);
    this.add.existing(star);
    star.body.setSize(star.width, star.height);
    this.physics.world.enable(star);
    return star;
  }

  // collect star and increase score
  collectStar(_player, star) {
    this.stars.killAndHide(star);
    this.physics.world.disableBody(star.body);
    this.score += 10;
    this.scoreText.text = `Score: ${this.score}`;
  }

  // add a mountain above a platform
  addMountainAbove(sprite) {
    const y = sprite.y - sprite.displayHeight;
    const mountain = this.mountain.get(Phaser.Math.Between(sprite.x + 10, sprite.x + 60), y, 'mountains');
    mountain.setActive(true);
    mountain.setVisible(true);
    this.add.existing(mountain);
    mountain.body.setSize(mountain.width, mountain.height);
    this.physics.world.enable(mountain);
    return mountain;
  }

  
}