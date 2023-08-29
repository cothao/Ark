export default class Raptor {
    constructor(scene, x , y, collisions, _player) {
      this.scene = scene;
      this.isOverlapped = false;
      this.isAlive = true;
      this.health = 10;
      this.tamePercentage = 0;
      this.tamed = false
      this.player = _player
      this.dino = scene.physics.add.sprite(x, y, 'raptor')
      this.dinoVision = scene.add.circle(
    this.dino.body.position.x,
    this.dino.body.position.y,
    200
  );

  this.dino.setSize(70, 30);
  this.dino.setOffset(30, 30);

  scene.physics.add.collider(this.dino, collisions);
  
}

    preload() {
    }

    create() {
      

    }

    update() {
    this.dinoVision.destroy()
    this.dinoVision = this.scene.add.circle(
    this.dino.body.position.x,
    this.dino.body.position.y,
    200
  );
  if (this.dino.body.velocity.x > 0) {
    this.dino.flipX = false
    this.dino.anims.play('raptorRun', true)
  } else {
    this.dino.flipX = true
    this.dino.anims.play('raptorRun', true)
  }
  if (this.dino.body.position.x < this.player.player.body.position.x && !this.isOverlapped) {
        this.dino.setVelocityX(120)
      } else if (this.dino.body.position.x > this.player.player.body.position.x && !this.isOverlapped) {
        this.dino.setVelocityX(-120)
      } else {
        this.dino.setVelocityX(0)
        if (this.tamed) {
          this.dino.anims.play('raptorIdle', true)
        } else {
          this.dino.anims.play('raptorBite', true)
        }
      }
      if (this.scene.physics.overlap(this.dino, this.player.player)) {
        this.isOverlapped = true
      } else {
        this.isOverlapped = false
      }
      if (this.health <= 0) {
        this.isAlive = false
      }
    }
}
