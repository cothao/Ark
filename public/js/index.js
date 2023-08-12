let player, platforms, cursors;

const config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: 800,
  height: 600,
  physics: {
    // adds physics to the game, default is the style and the object is its config
    default: "arcade",
    arcade: {
      gravity: { y: 300 },
      debug: false,
    },
    pixelArt: true,
    roundPixels: false,
  },
  scene: {
    preload: preload,
    create: create,
    update: update,
    // extend: {
    //         drawKeyboard: drawKeyboard
    //     }
  },
};

function preload() {
  this.load.image("background", "/assets/background/Layer_0000_9.png");
  this.load.image("background2", "/assets/background/Layer_0001_8.png");
  this.load.image("background3", "assets/background/Layer_0002_7.png");
  this.load.image("background4", "assets/background/Layer_0003_6.png");
  this.load.image("background5", "assets/background/Layer_0004_Lights.png");
  this.load.image("background6", "assets/background/Layer_0005_5.png");
  this.load.image("background7", "assets/background/Layer_0006_4.png");
  this.load.image("background8", "assets/background/Layer_0007_Lights.png");
  this.load.image("background9", "assets/background/Layer_0008_3.png");
  this.load.image("background10", "assets/background/Layer_0009_2.png");
  this.load.image("background11", "assets/background/Layer_0010_1.png");
  this.load.image("background12", "assets/background/Layer_0011_0.png");
  this.load.image("ground", "assets/objects/groundForest.png");
  this.load.spritesheet("player", "/assets/player/Player_Animation_Sheet.png", {
    frameWidth: 30,
    frameHeight: 48,
    frames: 120,
  });
  // this.load.image("background", "/assets/background/Layer_0005_5.png");
  // this.load.image("background", "/assets/background/Layer_0005_5.png");
}

function create() {
  this.add.image(0, -690, "background12").setOrigin(0, 0).setScale(1.5, 1.5);
  this.add.image(0, -690, "background").setOrigin(0, 0).setScale(1.5, 1.5);
  this.add.image(0, -690, "background2").setOrigin(0, 0).setScale(1.5, 1.5);
  this.add.image(0, -690, "background3").setOrigin(0, 0).setScale(1.5, 1.5);
  this.add.image(0, -690, "background4").setOrigin(0, 0).setScale(1.5, 1.5);
  this.add.image(0, -690, "background5").setOrigin(0, 0).setScale(1.5, 1.5);
  this.add.image(0, -690, "background6").setOrigin(0, 0).setScale(1.5, 1.5);
  this.add.image(0, -690, "background8").setOrigin(0, 0).setScale(1.5, 1.5);
  this.add.image(0, -690, "ground").setOrigin(0, 0).setScale(1.5, 1.5);
  // this.add.image(0, -690, "background7").setOrigin(0, 0).setScale(1.5, 1.5);
  // this.add.image(0, -690, "background9").setOrigin(0, 0).setScale(1.5, 1.5);
  // this.add.image(0, -690, "background10").setOrigin(0, 0).setScale(1.5, 1.5);
  // this.add.image(0, -690, "background11").setOrigin(0, 0).setScale(1.5, 1.5);
  this.anims.create({
    key: "playerIdle",
    frames: this.anims.generateFrameNumbers("player", { start: 0, end: 5 }),
    frameRate: 10,
    repeat: -1,
  });
  platforms = [];
  for (let i = 0; i < 20; i++) {
    platforms.push(
      this.physics.add.staticGroup({
        key: "ground",
        setXY: { x: 100 * i, y: 500 },
      })
    );
  }
  // console.log(platforms);
  player = this.physics.add.sprite(100, 0, "player");
  player.setOffset(0, -6);
  this.physics.add.collider(player, platforms);
  this.physics.add.existing(platforms);
  // this.cameras.main.startFollow(player, true, 1, 1, 0, 200);
  player.anims.play("playerIdle", false);
}

function update() {
  cursors = this.input.keyboard.createCursorKeys();
  if (cursors.right.isDown && !cursors.left.isDown) {
    player.setVelocityX(100);
  } else if (!cursors.right.isDown) {
    player.setVelocityX(0);
  }
  if (cursors.left.isDown && !cursors.right.isDown) {
    player.setVelocityX(-100);
  } else if (!cursors.left.isDown) {
    player.setVelocityX(0);
  }
}

const game = new Phaser.Game(config);
