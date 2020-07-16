import { Scene } from "phaser";


export default class Level1 extends Scene {
  constructor() {
    super("level1");
  }

  preload() {
   
    // load the tilemap
    this.load.tilemapTiledJSON('level1GameBoard','assets/level1.json')
    //load the sprite sheet
    this.load.spritesheet('tiles',"assets/tiles.png",{frameWidth: 200, frameHeight: 200});
  }

  create() {
    // this.add.image(400, 300, "level1Image", Level1Image);
    // //create the tilemap
    const board = this.make.tilemap({ key: 'level1GameBoard' });
    //add tileset image
    const tilePNG = this.board.addTilesetImage('tiles');
    // create our layers
    const backGroundLayer = this.board.createStaticLayer('background', tilesPNG,0,0);
  }
}
