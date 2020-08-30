import Phaser from "phaser";

export default class Pillar extends Phaser.Physics.Arcade.Sprite {
constructor(config) {
    super(config.scene, config.x, config.y, config.key)
    config.scene.add.existing(this);
    config.scene.physics.add.existing(this);
    this.selected = config.selected;
}


update(){
    this.spriteMoves();
}

spriteMoves() {
    this.distance = Phaser.Math.Distance.Between(
      this.x,
      this.y,
      this.selected.x,
      this.selected.y
    );
    // console.log(this.squareSelected.x)
    if (this.body.speed > 0) {
      //  4 is our distance tolerance, i.e. how close the source can get to the this.target
      //  before it is considered as being there. The faster it moves, the more tolerance is required.

      if (this.distance < 10) {
        this.body.reset(this.selected.x, this.selected.y);
      }
    }
    
  }



}
