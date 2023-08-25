// import { Reverse } from "../../dist/bundle.js";
// import {Raptor} from "../../dist/bundle.js";
import Raptor from './components/raptor.js'

let hasFunctionBeenCalled = false;
let player,
  platforms,
  cursors,
  bg,
  raptor,
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
  item1;
let currentAnim = "PlayerNeutral";
let itemPosition = 0;

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
  //NOTE - TREE
  tree = this.physics.add.staticGroup({
    key: "tree1",
    setXY: { x: 600, y: 400 },
  });
  tree.health = 10;
  //NOTE - PLAYER AND RAPTOR
  player = this.physics.add.sprite(700, 400, "player");
  player.damage = 10;
  player.inventory = [];
  player.dinos = [];
  player.meat = 1;
  raptor = this.physics.add.sprite(1200, 400, "raptor");
  raptor.isOverlapped = false;
  raptor.isAlive = true;
  raptor.health = 10;
  raptor.tamePercentage = 0;

  player.setOffset(0, -2);
  player.setSize(15, 0);
  raptor.setSize(70, 30);
  raptor.setOffset(30, 30);
  this.physics.add.collider(player, platforms);
  this.physics.add.collider(raptor, platforms);
  this.physics.add.existing(platforms);
  this.cameras.main.startFollow(player, true, 1, 1, 0, 200);

  overlap = this.physics.add.overlap(player, raptor, () => {
    if (keyE.isDown && !raptor.isAlive) {
      console.log("hello world");
      meat--;
      raptor.tamePercentage += 100;
      if (raptor.tamePercentage >= 100) {
        player.dinos.push(raptor);
        raptor.health = 10;
        raptor.isAlive = true;
        raptor.tamed = true;
      }
    }
    if (raptor.body.overlapX < 0 && raptor.isAlive && !raptor.tamed) {
      raptor.anims.play("raptorBite", true);
      raptor.isOverlapped = true;
    }
    if (!raptor.isAlive) {
      tame = this.add.text(
        raptor.body.position.x,
        raptor.body.position.y,
        "[E] to feed meat.",
        { fontsize: 10, color: "white" }
      );
      // tame?.destroy();

      raptor.isOverlapped = true;
    }
  });
  punchHitbox = this.add.rectangle(
    player.body.position.x,
    player.body.position.y,
    10,
    30,
    0x6666ff
  );
  raptorVision = this.add.circle(
    raptor.body.position.x,
    raptor.body.position.y,
    300,
    0x0033ff
  );
  raptorVision.overlapTriggered = false;
  this.physics.add.existing(raptorVision, true);

  this.physics.add.overlap(raptorVision, player, () => {
    console.log("hey");
  });
  if (tree.health <= 0) {
    console.log("gain 5 wood");
    tree.clear(true, true);
  }
  console.log(player.body.position.x);
  window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") {
      let items = document.querySelector("#items").children;
      if (itemPosition < 5) {
        itemPosition++;
      } else {
        itemPosition = 1;
      }
      for (let i = 0; i < items.length; i++) {
        items[i].style.border = "";
        if (items[i].getAttribute("id") === `item${itemPosition}`) {
          items[i].style.border = "2px solid white";
        }
      }
    }
  });
  new Raptor(this, 600, 400, platforms)
  // console.log(this)
  // rap.draw()
  // raptorGuy
}

function update() {
  //ANCHOR - UPDATE

  punchHitbox.destroy();
  punchHitbox.isFilled = false;
  // console.log(raptor.body.velocity)
  cursors = this.input.keyboard.createCursorKeys();
  if (keyW?.isDown && player?.body?.touching?.down) {
    player?.setVelocityY(-150);
  }
  if (keyD?.isDown && !keyA?.isDown) {
    if (keyD?.isDown && shift?.isDown) {
      player.setVelocityX(150);
      if (!player.isAttacking) {
        if (currentAnim === "PlayerNeutral") {
          player.anims.play("playerRun", true);
        } else if (currentAnim === "club") {
          // player.anims.play("club", true);
        }
      }
    }
    if (keyD.isDown && !shift.isDown) {
      player.setVelocityX(100);
      if (!player.isAttacking) {
        player.anims.play("playerWalk", true);
      }
    }
  } else if (keyA.isDown) {
    if (keyA.isDown && shift.isDown) {
      player.setVelocityX(-150);
      if (!player.isAttacking) {
        player.anims.play("playerRun", true);
      }
    }
    if (keyA.isDown && !shift.isDown) {
      player.setVelocityX(-100);
      if (!player.isAttacking) {
        player.anims.play("playerWalk", true);
      }
    }
  } else {
    if (!player.isAttacking) {
      player.anims.play("playerIdle", true);
    }
    player.setVelocityX(0);
  }
  // Background Handles
  for (let i = 0; i < backgrounds.length; i++) {
    const bg = backgrounds[i];
    bg.sprite.tilePositionX = this.cameras.main.scrollX * bg.ratioX;
  }

  window.addEventListener("mousemove", (e) => {
    if (e.clientX < 400) {
      player.flipX = true;
    } else {
      player.flipX = false;
    }
  });
  window.addEventListener("click", (e) => {
    player.isAttacking = true;
  });
  if (player.isAttacking) {
    if (currentAnim === "PlayerNeutral") {
      player.anims.play("playerPunch", true);
    } else if (currentAnim === "club") {
      player.anims.play("club", true);
    }
    if (player.anims.currentFrame.index > 3) {
      if (!player.flipX) {
        punchHitbox = this.add.rectangle(
          player.body.position.x + 18,
          player.body.position.y + 25,
          12,
          30,
          0x6666ff
        );

        this.physics.add.existing(punchHitbox, true);
        this.physics.add.overlap(punchHitbox, [tree, raptor], () => {
          if (overlapTriggered) {
            // this.physics.world.removeCollider(
            //   this.physics.add.collider(raptor, punchHitbox)
            // ); // removes collider instantly so code only runs once
            // return;
          }
          overlapTriggered = true;
          // monster.health -= 10;
          if (this.physics.overlap(punchHitbox, raptor) && !raptor.tamed) {
            raptor.health -= player.damage;
          } else if (this.physics.overlap(punchHitbox, tree)) {
            tree.health -= player.damage;
          }
          punchHitbox.destroy();
          setTimeout(() => {
            raptor.clearTint();
          }, 200);
        });
      } else {
        punchHitbox = this.add.rectangle(
          player.body.position.x - 3,
          player.body.position.y + 25,
          12,
          30,
          0x6666ff
        );
        this.physics.add.existing(punchHitbox, true);
        this.physics.add.overlap(punchHitbox, [tree, raptor], () => {
          if (overlapTriggered) {
            //FIXME - Note to self, try and fix the collissions later so that you're not doing 100 attacks/sec
            // this.physics.world.removeCollider(
            //   this.physics.add.collider(raptor, punchHitbox)
            // ); // removes collider instantly so code only runs once
            // return;
          }
          overlapTriggered = true;

          // monster.health -= 10;
          if (this.physics.overlap(punchHitbox, raptor) && !raptor.tamed) {
            raptor.health -= player.damage;
          } else if (this.physics.overlap(punchHitbox, tree)) {
            tree.health -= player.damage;
          }
          punchHitbox.destroy();
          overlapTriggered = false;

          setTimeout(() => {}, 200);
        });
      }
    }
    setTimeout(() => {
      player.isAttacking = false;
    }, 500);
  }
  if (raptor.health <= 0) {
    raptor.isAlive = false;
  }
  raptorVision.destroy();
  raptorVision = this.add.circle(
    raptor.body.position.x,
    raptor.body.position.y,
    200
  );
  this.physics.add.existing(raptorVision, true);
  if (!raptorVision.overlapTriggered) {
    // raptor.anims.play("raptorIdle", true);
  }
  this.physics.add.overlap(raptorVision, player, () => {
    raptorVision.overlapTriggered = true;
    if (raptor.isAlive && !raptor.tamed) {
      if (raptor.body.position.x < player.body.position.x) {
        raptor.flipX = false;
      } else {
        raptor.flipX = true;
      }
      if (raptor.body.overlapX > 0) {
        raptor.isOverlapped = false;
      }
      this.physics.moveToObject(raptor, player, 100);
      if (
        (raptor.body.velocity.x < 0 || raptor.body.velocity.x > 0) &&
        !raptor.isOverlapped
      ) {
        raptor.anims.play("raptorRun", true);
      }
    } else if (!raptor.isAlive) {
      raptor.setVelocityX(0);
      if (raptor.anims.currentFrame.isLast) {
        raptor.anims.pause(raptor.anims.currentAnim.frames[5]);
      } else {
        raptor.anims.play("raptorFaint", true);
      }
    }
    if (raptor.isAlive && raptor.tamed) {
      this.physics.moveToObject(raptor, player, 100);
      if (raptor.body.velocity.x === 0) {
        // raptor.anims.play("raptorIdle", true);
      } else if (raptor.body.velocity.x < 0 || raptor.body.velocity.x > 0) {
        raptor.anims.play("raptorRun", true);
      }
    }
  });
  function callOnce() {
    hasFunctionBeenCalled = false;
  }
  if (tree.health <= 0 && !hasFunctionBeenCalled) {
    callOnce();
    let woodAmount = Math.floor(Math.random() * 10) + 1;
    if (
      !player.inventory.find((item) => {
        return item.id === 1;
      })
    ) {
      player.inventory.push(wood);
    }
    wood.amount += woodAmount;
    let addWood = this.add.text(
      player.body.position.x,
      player.body.position.y,
      `Added ${woodAmount} wood.`,
      {
        fontsize: 30,
      }
    );
    setTimeout(() => {
      addWood.destroy();
    }, 2000);
    tree.clear(true, true);
    hasFunctionBeenCalled = true;
  }
  if (keyQ.isDown) {
    if (player.inventory[0].amount >= club.requirement.wood) {
      player.inventory[0].amount -= club.requirement.wood;
      console.log("making club...");
      setTimeout(() => {
        let itemBar = document.querySelector("#items").children;
        player.inventory.push(club);

        for (let i = 0; i < itemBar.length; i++) {
          if (!itemBar[i].children[0].src) {
            itemBar[i].children[0].src = "./assets/UI/Wooden_Club.png";
            itemBar[i].currentItemId = 2;

            player.inventory.find((item) => {
              return item.id === 2;
            }).slot = i;
            break;
          }
        }
        console.log(player.inventory);
        // console.log(itemBar);
      }, 2000);
    } else {
      console.log("not enough wood");
    }
  }
  if (keyF.isDown) {
    let _item = player.inventory.find((item) => {
      return item.slot === itemPosition;
    });
    if (_item) {
      currentAnim = _item.anim;
    } else {
      currentAnim = "PlayerNeutral";
    }
  }
}

const game = new Phaser.Game(config);
