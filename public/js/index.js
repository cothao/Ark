// import { Reverse } from "../../dist/bundle.js";
// import {Raptor} from "../../dist/bundle.js";
import Raptor from './components/raptor.js'
import Player from './components/player.js'

let hasFunctionBeenCalled = false;
let player,
  platforms,
  cursors,
  bg,
  overlap,
  keyW,
  keyS,
  keyA,
  keyD,
  keyQ,
  keyE,
  keyF,
  shift,
  enter,
  punchHitbox,
  overlapTriggered,
  tame,
  meat,
  raptorVision,
  tree,
  item1
let currentAnim = "PlayerNeutral";
let itemPosition = 0;
let raptors = []
let counter = 0;
let start = false;
let backgrounds = [];
let club = {
  id: 2,
  dmg: 5,
  amount: 0,
  torpor: 5,
  requirement: {
    wood: 1,
  },
  anim: "club",
};
let wood = {
  id: 1,
  amount: 0,
};
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
      debug: true,
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
  this.load.image("startScreen", "/assets/UI/StartScreen.jpg");
  this.load.image("grass", "/assets/objects/grass.png");
  this.load.image("tree1", "/assets/objects/tree (5).png");
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
  this.load.spritesheet("player", "/assets/player/Player.png", {
    frameWidth: 40,
    frameHeight: 40,
    frames: 5,
  });
  this.load.spritesheet("playerWalk", "/assets/player/Player_Walk1.png", {
    frameWidth: 40,
    frameHeight: 40,
    frames: 8,
  });
  this.load.spritesheet("playerRun", "/assets/player/Player_Run1.png", {
    frameWidth: 40,
    frameHeight: 40,
    frames: 10,
  });
  this.load.spritesheet("playerPunch", "/assets/player/Player_Punch1.png", {
    frameWidth: 40,
    frameHeight: 40,
    frames: 5,
  });
  this.load.spritesheet("club", "/assets/player/Player_Attack_Mallet.png", {
    frameWidth: 40,
    frameHeight: 40,
    frames: 5,
  });

  this?.load?.spritesheet(
    "raptor",
    "/assets/enemies/spritesheets/1x/raptor-idle.png",
    {
      frameWidth: 128,
      frameHeight: 64,
      frames: 2,
    }
  );
  this?.load?.spritesheet(
    "raptorRun",
    "/assets/enemies/spritesheets/1x/raptor-run.png",
    {
      frameWidth: 128,
      frameHeight: 64,
      frames: 6,
    }
  );
  this?.load?.spritesheet(
    "raptorBite",
    "/assets/enemies/spritesheets/1x/raptor-bite.png",
    {
      frameWidth: 128,
      frameHeight: 64,
      frames: 10,
    }
  );
  this?.load?.spritesheet(
    "raptorFaint",
    "/assets/enemies/spritesheets/1x/raptor-dead.png",
    {
      frameWidth: 128,
      frameHeight: 64,
      frames: 10,
    }
  );
  // this.load.image("background", "/assets/background/Layer_0005_5.png");
  // this.load.image("background", "/assets/background/Layer_0005_5.png");
}

function create() {
  //ANCHOR - CREATE
  // let startingScreen = this.add
  //   .image(0, 0, "startScreen")
  //   .setOrigin(0, 0)
  //   .setScale(0.5, 0.5);
  // this.add.text(0, 0, "Press ENTER to start.", { fontsize: 30 });
  keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
  keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
  keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
  keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
  keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
  keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
  keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
  shift = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);
  enter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
  // startingScreen.destroy();
  let { width, height } = game.config;

  // bg = this.add.image(0, 0, "background").setOrigin(0, 0).setScrollFactor(0);
  // bg.displayWidth = this.sys.canvas.width; // sets the width and height of the image to the width and height of the canvas
  // bg.displayHeight = this.sys.canvas.height;

  backgrounds.push({
    ratioX: 1.2,
    sprite: this.add
      .tileSprite(
        0,
        -1700,
        this.sys.canvas.width,
        this.sys.canvas.height,
        "background12"
      )
      .setOrigin(0, 0)
      .setScrollFactor(0, 0)
      .setScale(2.5, 3.7),
  });
  backgrounds.push({
    ratioX: 1.2,
    sprite: this.add
      .tileSprite(
        0,
        -1700,
        this.sys.canvas.width,
        this.sys.canvas.height,
        "background11"
      )
      .setOrigin(0, 0)
      .setScrollFactor(0, 0)
      .setScale(2.5, 3.7),
  });
  backgrounds.push({
    ratioX: 1.2,
    sprite: this.add
      .tileSprite(
        0,
        -1700,
        this.sys.canvas.width,
        this.sys.canvas.height,
        "background10"
      )
      .setOrigin(0, 0)
      .setScrollFactor(0, 0)
      .setScale(2.5, 3.7),
  });
  backgrounds.push({
    ratioX: 1.2,
    sprite: this.add
      .tileSprite(
        0,
        -1700,
        this.sys.canvas.width,
        this.sys.canvas.height,
        "background9"
      )
      .setOrigin(0, 0)
      .setScrollFactor(0, 0)
      .setScale(2.5, 3.7),
  });
  backgrounds.push({
    ratioX: 1.2,
    sprite: this.add
      .tileSprite(
        0,
        -1700,
        this.sys.canvas.width,
        this.sys.canvas.height,
        "background8"
      )
      .setOrigin(0, 0)
      .setScrollFactor(0, 0)
      .setScale(2.5, 3.7),
  });
  backgrounds.push({
    ratioX: 1.2,
    sprite: this.add
      .tileSprite(
        0,
        -1700,
        this.sys.canvas.width,
        this.sys.canvas.height,
        "background7"
      )
      .setOrigin(0, 0)
      .setScrollFactor(0, 0)
      .setScale(2.5, 3.7),
  });
  backgrounds.push({
    ratioX: 1.0,
    sprite: this.add
      .tileSprite(
        0,
        -1700,
        this.sys.canvas.width,
        this.sys.canvas.height,
        "background6"
      )
      .setOrigin(0, 0)
      .setScrollFactor(0, 0)
      .setScale(2.5, 3.7),
  });
  backgrounds.push({
    ratioX: 0.7,
    sprite: this.add
      .tileSprite(
        0,
        -1700,
        this.sys.canvas.width,
        this.sys.canvas.height,
        "background5"
      )
      .setOrigin(0, 0)
      .setScrollFactor(0, 0)
      .setScale(2.5, 3.7),
  });
  backgrounds.push({
    ratioX: 1.2,
    sprite: this.add
      .tileSprite(
        0,
        -1700,
        this.sys.canvas.width,
        this.sys.canvas.height,
        "background4"
      )
      .setOrigin(0, 0)
      .setScrollFactor(0, 0)
      .setScale(2.5, 3.7),
  });
  backgrounds.push({
    ratioX: 1.2,
    sprite: this.add
      .tileSprite(
        0,
        -1700,
        this.sys.canvas.width,
        this.sys.canvas.height,
        "background3"
      )
      .setOrigin(0, 0)
      .setScrollFactor(0, 0)
      .setScale(2.5, 3.7),
  });
  backgrounds.push({
    ratioX: 0.7,
    sprite: this.add
      .tileSprite(
        0,
        -1700,
        this.sys.canvas.width,
        this.sys.canvas.height,
        "background2"
      )
      .setOrigin(0, 0)
      .setScrollFactor(0, 0)
      .setScale(2.5, 3.7),
  });
  backgrounds.push({
    ratioX: 0.7,
    sprite: this.add
      .tileSprite(
        0,
        -1700,
        this.sys.canvas.width,
        this.sys.canvas.height,
        "background"
      )
      .setOrigin(0, 0)
      .setScrollFactor(0, 0)
      .setScale(2.5, 3.7),
  });

  this.anims.create({
    key: "playerIdle",
    frames: this.anims.generateFrameNumbers("player", { start: 0, end: 4 }),
    frameRate: 10,
    repeat: -1,
  });
  this.anims.create({
    key: "playerWalk",
    frames: this.anims.generateFrameNumbers("playerWalk", {
      start: 0,
      end: 7,
    }),
    frameRate: 10,
    repeat: -1,
  });
  this.anims.create({
    key: "playerRun",
    frames: this.anims.generateFrameNumbers("playerRun", {
      start: 0,
      end: 9,
    }),
    frameRate: 10,
    repeat: -1,
  });
  this.anims.create({
    key: "playerPunch",
    frames: this.anims.generateFrameNumbers("playerPunch", {
      start: 0,
      end: 4,
    }),
    frameRate: 10,
    repeat: -1,
  });
  this.anims.create({
    key: "club",
    frames: this.anims.generateFrameNumbers("club", {
      start: 0,
      end: 4,
    }),
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
    frames: this.anims.generateFrameNumbers("raptorRun", {
      start: 0,
      end: 5,
    }),
    frameRate: 10,
    repeat: -1,
  });
  this.anims.create({
    key: "raptorBite",
    frames: this.anims.generateFrameNumbers("raptorBite", {
      start: 0,
      end: 9,
    }),
    frameRate: 10,
    repeat: -1,
  });
  this.anims.create({
    key: "raptorFaint",
    frames: this.anims.generateFrameNumbers("raptorFaint", {
      start: 0,
      end: 5,
    }),
    frameRate: 10,
    repeat: -1,
  });
  platforms = [];
  for (let i = 0; i < 20; i++) {
    platforms.push(
      this.physics.add
        .staticGroup({
          key: "grass",
          setXY: { x: 920 * i, y: 500 },
        })
        .scaleY(1.05)
    );
  }

  player = new Player(this, 700, 400, platforms, null, raptors)
  raptors.push(new Raptor(this, 600, 400, platforms, player))
  this.physics.add.existing(platforms);
  this.cameras.main.startFollow(player.player, true, 1, 1, 0, 200);
}

function update() {
  //ANCHOR - UPDATE
  raptors[0].update()
  player.update()
  // Background Handles
  for (let i = 0; i < backgrounds.length; i++) {
    const bg = backgrounds[i];
    bg.sprite.tilePositionX = this.cameras.main.scrollX * bg.ratioX;
  }
}

const game = new Phaser.Game(config);
