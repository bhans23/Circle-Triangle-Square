import Phaser from "phaser";

export default class tree {
  constructor(config) {
    this.scene = config.scene;
    this.pos = config.pos;
    this.speed = config.speed;
    this.angle = config.angle;
    this.depth = config.depth;
    this.ropeTree();
  }

  update() {
    let randomizer = Math.random() * (this.speed - 0) + 0;
    this.count += randomizer;

    let points = this.rope.points;

    for (let i = 0; i < points.length; i++) {
      points[i].y = Math.sin(i * 0.5 + this.count) * 3;
    }

    this.rope.setDirty();
  }

  ropeTree() {
    this.count = 0;
    this.rope = this.scene.add
      .rope(this.pos.x, this.pos.y, "tree", null, 7)
      .setDepth(this.depth)
      .setAngle(this.angle)
      
  }
}
