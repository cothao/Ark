export default class Raptor {
    constructor(scene, x , y, collisions, _player) {
      this.scene = scene;
      this.isOverlapped = false;
      this.isAlive = true;
      this.isAttacking = false
      this.initialHealth = 20;
      this.currentHealth = this.initialHealth
      this.tamePercentage = 0;
      this.tamed = false
      this.dino = scene.physics.add.sprite(x, y, 'raptor')
      this.tameText = scene.add.text(
        this.dino.body.position.x,
        this.dino.body.position.y,
        "[E] to feed meat.",
        { fontsize: 10, color: "white" })
      this.player = _player
      this.dinoVision = scene.add.circle(
    this.dino.body.position.x,
    this.dino.body.position.y,
    200
  );
        this.dinoDetection = scene.physics.add.existing(this.dinoVision, true)
        this.playerDetected = false
  this.dino.setSize(70, 30);
  this.dino.setOffset(30, 30);

  scene.physics.add.collider(this.dino, collisions);
  
}

    preload() {
    }

    create() {
      

    }

    update() {
      this.tameText.destroy()
    this.dinoVision.destroy()
    this.dinoVision = this.scene.add.circle(
    this.dino.body.position.x,
    this.dino.body.position.y,
    200
  );
  this.dinoDetection = this.scene.physics.add.existing(this.dinoVision, true)

  if (this.dino.body.velocity.x > 0 && this.isAlive) {
    this.dino.anims.play('raptorRun', true)
  } else if (this.dino.body.velocity < 0 && this.isAlive) {
    this.dino.anims.play('raptorRun', true)
  } else {
    if (!this.isAttacking && this.isAlive) {
      this.dino.anims.play('raptorIdle', true)
    }
  }
  if (this.dino.body.position.x < this.player.player.body.position.x && !this.isOverlapped && this.isAlive && this.playerDetected) {
    this.dino.flipX = false

        this.dino.setVelocityX(120)
      } else if (this.dino.body.position.x > this.player.player.body.position.x && !this.isOverlapped && this.isAlive && this.playerDetected) {
      this.dino.flipX = true

        this.dino.setVelocityX(-120)
      } else {
        this.dino.setVelocityX(0)
        if (this.tamed && this.isAlive) {
          this.dino.anims.play('raptorIdle', true)
        } else if (!this.tamed && this.isAlive && this.isAttacking) {
          this.dino.anims.play('raptorBite', true)
        }
      }
      if (this.scene.physics.overlap(this.dino, this.player.player)) {
        this.isOverlapped = true
        if (!this.tamed) {
          this.isAttacking = true
        }
      } else {
        this.isOverlapped = false
        this.isAttacking = false
      }
      if (this.currentHealth <= 0) {
        this.isAlive = false
      } else {
        this.isAlive = true
      }
      if (!this.isAlive) {
        if (this.dino.anims.currentFrame.isLast) {
        this.dino.anims.pause(this.dino.anims.currentAnim.frames[5]);
      } else {
        this.dino.anims.play("raptorFaint", true);
      }
      }
      if (this.isOverlapped && !this.isAlive && !this.tamed) {
        this.tameText = this.scene.add.text(
        this.dino.body.position.x,
        this.dino.body.position.y,
        "[E] to feed meat.",
        { fontsize: 10, color: "white" })
      } else {
        this.tameText.destroy()
      }

      if (this.scene.physics.overlap(this.dinoDetection, this.player.player)) {
        this.playerDetected = true
      } else {
        this.playerDetected = false
      }
    }
}
