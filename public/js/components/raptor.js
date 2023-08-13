class Raptor {
    constructor() {
        this?.load?.spritesheet("raptor", "/assets/enemies/spritesheets/1x/raptor-idle.png", {
            frameWidth: 124,
            frameHeight: 64,
            frames: 2,
          });
    }
        
    draw() {
        this?.load?.spritesheet("raptor", "/assets/enemies/spritesheets/1x/raptor-idle.png", {
            frameWidth: 124,
            frameHeight: 64,
            frames: 2,
          });
        this?.anims?.create({
            key: "raptorIdle",
            frames: this?.anims?.generateFrameNumbers("raptor", { start: 0, end: 2 }),
            frameRate: 10,
            repeat: -1,
          });
          this?.physics?.add?.sprite(100,0,'raptor')
    }
    update() {

    }
}

export let raptor = new Raptor()