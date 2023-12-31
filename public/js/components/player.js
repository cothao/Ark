export default class Player {
    constructor(scene, x, y, collision, objects, dinos, items) {
        this.scene = scene
        this.keys = scene.input.keyboard.createCursorKeys();
        this.currentWeapon = 'Fists'
        this.hasAttacked = false
        this.initialHealth = 100
        this.currentHealth = this.initialHealth
        this.damage = 10
        this.items = items
        this.inventory = []
        this.currentInventoryTab = 'inventory'
        this.tames = []
        this.objects = objects
        this.dinos = dinos
        this.level = 1
        this.xp = 0
        this.isAlive = true
        this.player = scene.physics.add.sprite(x, y, 'player')
        this.objectHitText = ''
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
        this.tab = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TAB);
        this.hitbox = scene.add.rectangle(
    this.player.body.position.x,
    this.player.body.position.y,
    10,
    30,
    0x6666ff
  );
        scene.physics.add.collider(this.player, collision)
        console.log(document.body)
        window.addEventListener('click', (e) => {
            let itm = this.items.find(item => {
                return item.item_name === e.target.parentElement.id
            })
            console.dir(itm)
        })
        window.addEventListener('dblclick', (e) => {
            if (this.currentInventoryTab === 'craft') {
                let itm = this.items.find(item => {
                    return item.item_name === e.target.parentElement.id
                })
                let requirements = this.inventory.find(item => {
                    return item.name === itm.resources
                })
                if (+requirements.amount >= +itm.requirements) {
                    requirements.amount -= +itm.requirements
                    console.log('crafting...')
                    setTimeout(() => {
                        console.log('crafted!')
                        this.inventory.push(itm)
                    },2000)
                }
            } else if (this.currentInventoryTab === 'inventory') {
                let itm = this.items.find(item => {
                    return item.item_name === e.target.parentElement.classList[1]
                })
                console.log(itm)
                this.currentWeapon = itm.item_name
                console.log(this)
            }
        })
        document.querySelector('#craftButton').addEventListener('click', () => {
            this.currentInventoryTab = 'craft'
            document.querySelector('#inventory-actual').innerHTML = ''
            this.items.forEach((item, index) => {
                if (item.craftable) {
                    document.querySelector('#inventory-actual').insertAdjacentHTML('afterbegin', 
                    `<div class = 'item-box' id = ${item.item_name} style = 'border: 1px solid grey; width: 40px; height: 40px; margin: 10px'>
                        <img style = 'object-fit: contain; width: 40px; height: 40px;' src = '${item.img}'>
                        </div>`
                        )
                }
            })
        })
        document.querySelector('#inventoryButton').addEventListener('click', () => {
            this.currentInventoryTab = 'inventory'
            document.querySelector('#inventory-actual').innerHTML = ''
            this.inventory.forEach((item, index) => {
                console.log(item)
                document.querySelector('#inventory-actual').insertAdjacentHTML('afterbegin', 
                `<div class = 'item-box ${item.item_name}' id = item${index} style = 'border: 1px solid grey; width: 40px; height: 40px; margin: 10px'>
                    <img style = 'object-fit: contain; width: 40px; height: 40px;' src = '${item.img}'>
                    </div>`
                    )
            })
        })
        window.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            document.querySelector('#inventory').classList.toggle('hidden')
            document.querySelector('#inventory-actual').innerHTML = ''
            this.inventory.forEach((item, index) => {
                console.log(item)
                document.querySelector('#inventory-actual').insertAdjacentHTML('afterbegin', 
                `<div id = 'item${index}' style = 'border: 1px solid grey; width: 40px; height: 40px; margin: 10px'>
                    <img style = 'object-fit: contain; width: 40px; height: 40px;' src = '${item.img}'>
                    </div>`
                    )
            })
        }
    })
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
    } else if (this.currentWeapon === 'club') {
        this.player.anims.play('club', true)
        if (this.player.anims.currentFrame.isLast) {
            this.isAttacking = false
        }
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
        //DINOS
        for (let dino of this.dinos) {
            if (
                this.scene.physics.overlap(this.hitbox, dino.dino)
            ) {
                console.log(this.scene.physics.world.collide(this.player, this.dinos[0]))
                this.isAttacking = false
                dino.currentHealth -= this.damage
            }
        }
        //OBJECTS
        for (let object of this.objects) {
            if (
                this.scene.physics.overlap(this.hitbox, object.objectType)
            ) {
                console.log(this.scene.physics.world.collide(this.player, this.dinos[0]))
                this.isAttacking = false
                object.health -= this.damage
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
                this.isAttacking = false
                dino.currentHealth -= this.damage
            }
        }
        for (let object of this.objects) {
            if (
                this.scene.physics.overlap(this.hitbox, object.objectType)
            ) {
                this.isAttacking = false
                object.health -= this.damage
                if (!this.inventory.find(item => {
                        return item.name === object.dropType.name
                    })) {
                        this.inventory.push(object.dropType)
                        
                    console.log(this.inventory)
                    } else {
                        object.amount = Math.floor(Math.random() * 6)
                        this.inventory.find(item => {
                        return item.name === object.dropType.name
                    }).amount += object.amount
                    
        this.objectHitText = this.scene.add.text(
        this.player.body.position.x,
        this.player.body.position.y,
        `Harvested ${object.amount} ${object.dropType.name}`,
        { fontsize: 10, color: "white" })
        setTimeout(() => {
            this.objectHitText.destroy()
        }, 1000)
                    }
            }
        }
  }
}
}

  // END OF ATTACKING

  //TAMING
      for (let dino of this.dinos) {
            if (
                this.scene.physics.overlap(this.player, dino.dino)
            ) {
                if (!dino.isAlive) {
                    if (this.keyE.isDown) {
                        dino.currentHealth = dino.initialHealth * 0.20
                        dino.tamed = true
                        this.tames.push(dino)
                        console.log(this.tames)
                    }
                }
        }
    }
    
  // END OF TAMING

  // INVENTORY
    if (this.currentInventoryTab === 'inventory') {

this.inventory.forEach((item, index) => {
        if (item.amount <= 0) {
            this.inventory.splice(index, 1)
        }
    })
}
  // END OF INVENTORY

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
