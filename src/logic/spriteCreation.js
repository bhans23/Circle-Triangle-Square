import Phaser from "phaser";

export default class spriteCreation extends Phaser.Physics.Arcade.Sprite {
  constructor(spriteValues) {
    super(spriteValues.scene, spriteValues.x, spriteValues.y, spriteValues.key);
    spriteValues.scene.add.existing(this);
    spriteValues.scene.physics.add.existing(this);
    this.spriteValues = spriteValues;
  }
  preload() {}

  create() {
    
  
     
  }

  update() {
    
  }


  
  select() {

  }

  deselect() {
    

  }
}



// class Shared {
//   onPointerDown(callback) {
//     this.on('pointerdown', () => callback(this));
//   }
// }
// circleTriangleSquareArray.forEach(item => item.onPointerDown(this.handlePointerDown)):



// class Level1 {
//   handlePointerDown(circleTriangleOrSquare) {
//     this.circleTriangleSquareArray.forEach(item => {
//       if (item === circleTriangleOrSquare) {
//         item.select();
//       } else {
//         item.deselect();
//       }
//     });
//   }
// }