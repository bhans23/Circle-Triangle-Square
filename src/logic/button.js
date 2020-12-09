import Phaser from 'phaser'

export default class button {
  constructor(config){
    
    this.scene = config.scene;
    this.depth = config.depth;
    this.scale = config.scale;
    this.x = config.x;
    this.y = config.y;
    this.bType = config.bType
    this.function = config.function
    this.alpha = config.alpha
    this.button()
   console.log(this.alpha)
  }

  button(){
      
    this.box = this.scene.add
    .sprite(this.x, this.y, "button")
    .setDepth(this.depth)
    .setScale(this.scale)
    .setOrigin(.5)
    .setAlpha(this.alpha)
    ;

    this.arrow = this.scene.add
    .sprite(this.x, this.y, this.bType)
    .setDepth(this.depth + 1)
    .setScale(this.scale - .1)
    .setOrigin(.5);
    this.box.setInteractive()

    this.box.on("pointerdown", () => this.function()
    )

  }





}