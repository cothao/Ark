export default class Player {
    constructor(scene, x, y, collision, objects, dinos) {
        this.scene = scene
        this.keys = scene.input.keyboard.createCursorKeys();
        this.currentWeapon = 'Fists'
        this.hasAttacked = false
        this.health = 100
        this.damage = 10
        this.inventory = []
        this.tames = []
        this.dinos = dinos
        this.level = 1
        this.xp = 0
        this.isAlive = true
        this.player = scene.physics.add.sprite(x, y, 'player')
        this.player.setOffset(0, -2);
        this.player.setSize(15, 0);
        this.keyW = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keyA = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyS = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keyD = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.keyE = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        this.keyQ = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        this.keyF = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        this.shift = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);
        this.enter = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        this.hitbox = scene.add.rectangle(
    this.player.body.position.x,
    this.player.body.position.y,
    10,
    30,
    0x6666ff
  );
        scene.physics.add.collider(this.player, collision)
    }

    update() {
  this.hitbox.destroy();
  this.hitbox.isFilled = false;
  // MOVEMENT

  if (this.keyW.isDown && this.player.body.touching.down) {
    this.player.setVelocityY(-150)
  } else if (this.keyD.isDown) {
    if (this.shift.isDown) {
        this.player.setVelocityX(150)
        this.player.anims.play('playerRun', true)
    } else {
        this.player.setVelocityX(100)
        this.player.anims.play('playerWalk', true)
    }
  } else if (this.keyA.isDown) {
    if (this.shift.isDown) {
        this.player.setVelocityX(-150)
        this.player.anims.play('playerRun', true)
    } else {
        this.player.setVelocityX(-100)
        this.player.anims.play('playerWalk', true)
    }
  } else {
      if (!this.isAttacking) {
          this.player.anims.play('playerIdle', true)
        }
        this.player.setVelocityX(0)
  }
  // END OF MOVEMENT

  // ATTACKING
  if (this.isAttacking) {
    if (this.currentWeapon === 'Fists') {
        this.player.anims.play('playerPunch', true)
        if (this.player.anims.currentFrame.isLast) {
            this.isAttacking = false
        }
    } else if (this.currentWeapon === 'Club') {
        this.player.anims.play('club', true)
    }
    if (this.player.anims.currentFrame.index > 3) {
      if (!this.player.flipX) {
        this.hitbox = this.scene.add.rectangle(
          this.player.body.position.x + 18,
          this.player.body.position.y + 25,
          12,
          30,
          0x6666ff
        );
        this.scene.physics.add.existing(this.hitbox, true);
        for (let dino of this.dinos) {
            if (
                this.scene.physics.overlap(this.hitbox, dino.dino)
            ) {
                console.log(this.scene.physics.world.collide(this.player, this.dinos[0]))
                this.isAttacking = false
                dino.health -= this.damage
            }
        }
  } else if (this.player.flipX) {
    this.hitbox = this.scene.add.rectangle(
          this.player.body.position.x - 3,
          this.player.body.position.y + 25,
          12,
          30,
          0x6666ff
        );
        this.scene.physics.add.existing(this.hitbox, true);
        for (let dino of this.dinos) {
            if (
                this.scene.physics.overlap(this.hitbox, dino.dino)
            ) {
                console.log(this.scene.physics.world.collide(this.player, this.dinos[0]))
                this.isAttacking = false
                dino.health -= this.damage
            }
        }
  }
}
}

  // END OF ATTACKING

  // LISTENERS
window.addEventListener('mousemove', (e) => {
    if (e.clientX < 400) {
        this.player.flipX=true
    } else {
        this.player.flipX = false
    }
})
window.addEventListener("click", () => {
    this.isAttacking = true;
});
  // END OF LISTENERS
    
  }

}
