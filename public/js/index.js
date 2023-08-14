
let player, platforms, cursors,bg,raptor,overlap, keyW, keyS, keyA, keyD;
let backgrounds = []

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
  
  this?.load?.spritesheet("raptor", "/assets/enemies/spritesheets/1x/raptor-idle.png", {
    frameWidth: 128,
    frameHeight: 64,
    frames: 2,
  });
  this?.load?.spritesheet("raptorRun", "/assets/enemies/spritesheets/1x/raptor-run.png", {
    frameWidth: 128,
    frameHeight: 64,
    frames: 6,
  });
  this?.load?.spritesheet("raptorBite", "/assets/enemies/spritesheets/1x/raptor-bite.png", {
    frameWidth: 128,
    frameHeight: 64,
    frames: 10,
  });
  // this.load.image("background", "/assets/background/Layer_0005_5.png");
  // this.load.image("background", "/assets/background/Layer_0005_5.png");
}

function create() {
  keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
  keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
  keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
  keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
let {width,height} = game.config

  // bg = this.add.image(0, 0, "background").setOrigin(0, 0).setScrollFactor(0);
  // bg.displayWidth = this.sys.canvas.width; // sets the width and height of the image to the width and height of the canvas
  // bg.displayHeight = this.sys.canvas.height;
  
  // backgrounds.push(
  //   {
  //     ratioX: 0.1,
  //   sprite: this.add
  //     .tileSprite(0, 0, width,height, "background2")
  //     .setOrigin(0, 0)
  //     .setScrollFactor(0, 0).setScale(1, 1)
  //   }
  //     )
  // backgrounds.push(
  //   {
  //     ratioX: 1,
  //     sprite: this.add
  //   .tileSprite(0, -1600, this.sys.canvas.width, this.sys.canvas.height, "background6")
  //   .setOrigin(0, 0)
  //   .setScrollFactor(0, 0).setScale(2.5, 3.5)
  //   }
  //   )
    backgrounds.push(
      {
        ratioX: 1.2,
        sprite: this.add
      .tileSprite(0, -1700, this.sys.canvas.width, this.sys.canvas.height, "background4")
      .setOrigin(0, 0)
      .setScrollFactor(0, 0).setScale(2.5, 3.7)
      }
      )
      // backgrounds.push(
      //   {
      //     ratioX: 1.2,
      //     sprite: this.add
      //   .tileSprite(0, -1600, this.sys.canvas.width, this.sys.canvas.height, "background7")
      //   .setOrigin(0, 0)
      //   .setScrollFactor(0, 0).setScale(2.5, 3.5)
      //   }
      //   )
  this.anims.create({
    key: "playerIdle",
    frames: this.anims.generateFrameNumbers("player", { start: 0, end: 5 }),
    frameRate: 10,
    repeat: -1,
  });
  this.anims.create({
    key: "playerWalk",
    frames: this.anims.generateFrameNumbers("player", { start: 0, end: 32 }),
    frameRate: 10,
    repeat: -1,
  });
  this.anims.create({
    key: "playerAttack",
    frames: this.anims.generateFrameNumbers("player", { start:109, end: 116 }),
    frameRate: 10,
    repeat: -1,
  });
  this.anims.create({
    key: "raptorIdle",
    frames: this.anims.generateFrameNumbers("raptor", { start: 0, end: 1 }),
    frameRate: 10,
    repeat: -1,
  });
  this.anims.create({
    key: "raptorRun",
    frames: this.anims.generateFrameNumbers("raptorRun", { start: 0, end: 5 }),
    frameRate: 10,
    repeat: -1,
  });
  this.anims.create({
    key: "raptorBite",
    frames: this.anims.generateFrameNumbers("raptorBite", { start: 0, end: 9 }),
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
  raptor = this.physics.add.sprite(100, 0, 'raptor')
  raptor.isOverlapped = false
  player.setOffset(0, -6);
  this.physics.add.collider(player, platforms);
  this.physics.add.collider(raptor, platforms);
  this.physics.add.existing(platforms);
  this.cameras.main.startFollow(player, true, 1, 1, 0, 200);
  
  overlap = this.physics.add.overlap(player, raptor, () => {
    if (raptor.body.overlapX < 0) {
      raptor.anims.play('raptorBite', true)
      raptor.isOverlapped = true
    }
  })
}

function update() {
  if (raptor.body.position.x < player.body.position.x) {
    raptor.flipX = false
  } else {
    raptor.flipX = true
  }
  if (raptor.body.overlapX > 0) {
    raptor.isOverlapped = false
  }
  // console.log(raptor.body.velocity)
  cursors = this.input.keyboard.createCursorKeys();
  if (keyD.isDown && !keyA.isDown) {
    player.setVelocityX(100);
    player.anims.play('playerWalk', false)
  } else if (keyA.isDown) {
    player.setVelocityX(-100)
    player.anims.play('playerWalk', false)

  } else {
    if (!player.isAttacking){

      player.anims.play("playerIdle", true);
    }
    player.setVelocityX(0)
  }
  // Background Handles
  for (let i = 0; i < backgrounds.length; i++) {
    const bg = backgrounds[i]
    bg.sprite.tilePositionX = this.cameras.main.scrollX * bg.ratioX
  }
  this.physics.moveToObject(raptor, player, 100);
  if ((raptor.body.velocity.x < 0 || raptor.body.velocity.x > 0) && !raptor.isOverlapped) {
    raptor.anims.play('raptorRun', true)
  } else {
    // raptor.anims.play('raptorIdle', true)
  }
  window.addEventListener('mousemove', (e)=> {
    if (e.clientX < 400) {
      player.flipX = true
    } else {
      player.flipX = false
    }
  })
  window.addEventListener('click', (e)=> {
    console.log('helo world')
    player.isAttacking = true
    player.anims.play('playerAttack', false)
  })
}

const game = new Phaser.Game(config);

function raptorBody() {

}