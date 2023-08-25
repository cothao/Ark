export default class Raptor {
    constructor(scene, x , y, platforms) {
      this.scene = scene;
      this.isOverlapped = false;
      this.isAlive = true;
      this.health = 10;
      this.tamePercentage = 0;
      
  scene.anims.create({
    key: "raptorIdle",
    frames: scene.anims.generateFrameNumbers("raptor", { start: 0, end: 1 }),
    frameRate: 10,
    repeat: -1,
  });
  scene.anims.create({
    key: "raptorRun",
    frames: scene.anims.generateFrameNumbers("raptorRun", {
      start: 0,
      end: 5,
    }),
    frameRate: 10,
    repeat: -1,
  });
  scene.anims.create({
    key: "raptorBite",
    frames: scene.anims.generateFrameNumbers("raptorBite", {
      start: 0,
      end: 9,
    }),
    frameRate: 10,
    repeat: -1,
  });
  scene.anims.create({
    key: "raptorFaint",
    frames: scene.anims.generateFrameNumbers("raptorFaint", {
      start: 0,
      end: 5,
    }),
    frameRate: 10,
    repeat: -1,
  });
    

    scene.physics.add.sprite(x, y, 'raptor')
    

    
    scene.physics.add.collider(this, platforms);
    }

    preload() {
    }

    create() {
      

    }
}



// export let raptorGuy = this.physics.add.sprite(600, 400, "raptor");