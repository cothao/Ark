export default class Tree {
    constructor(scene, x, y, player, data) {
        this.scene = scene
        this.player = player
        this.health = 100
        this.name = 'tree'
        this.amount = Math.floor(Math.random() * 6)
        this.dropType = {
            name: 'wood',
            amount: this.amount,
            img: data.img
        }
        this.objectType = scene.physics.add.staticGroup({
    key: "palmTree",
    setXY: { x: x, y: y },
  });
    }

    update() {
        if (this.health <= 0) {
            this.objectType.clear(true, true)
        }
    }
}