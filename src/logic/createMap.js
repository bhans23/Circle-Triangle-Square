import Phaser from "phaser";
import { config } from "process";

export default class createMap {
  constructor(config) {
    this.config = config;
    this.scene = config.scene;
    this.createMap();
  }

  createMap() {
    
    const board = this.scene.make.tilemap({ key: this.config.mapKey,tileWidth: 200, tileHeight:200 });
    //add tileset image
    const tilesPNG = board.addTilesetImage("tiles");
    // create our layers
    this.ground = board
      .createStaticLayer("ground", tilesPNG, 0, this.scene.gB.firstSq.y).setPipeline("Light2D");
      
    this.floor = board
      .createStaticLayer("floor", tilesPNG, 0, this.scene.gB.firstSq.y)
      .setPipeline("Light2D");

    this.vinesFloor = board
      .createStaticLayer("vines0", tilesPNG, 0, this.scene.gB.firstSq.y)
      .setPipeline("Light2D");

    this.vines = board
      .createStaticLayer("decor0", tilesPNG, 0, this.scene.gB.firstSq.y)
      .setPipeline("Light2D");
    this.wall = board
      .createStaticLayer("wall", tilesPNG, 0, this.scene.gB.firstSq.y )
      .setPipeline("Light2D");
    this.wall.setCollisionByExclusion([-1]);
   
    this.door = board
      .createStaticLayer("door", tilesPNG, 0, this.scene.gB.firstSq.y)
      .setDepth(2)
      .setPipeline("Light2D");
    this.door.setCollisionByExclusion([-1]);
    this.vines1 = board
      .createStaticLayer("vines1", tilesPNG, 0, this.scene.gB.firstSq.y)
      .setPipeline("Light2D");
    this.vines2 = board
      .createStaticLayer("vines2", tilesPNG, 0, this.scene.gB.firstSq.y)
      .setPipeline("Light2D");
    this.decor1 = board
      .createStaticLayer("decor1", tilesPNG, 0, this.scene.gB.firstSq.y)
      .setPipeline("Light2D");
    this.decor2 = board
      .createStaticLayer("deco2", tilesPNG, 0, this.scene.gB.firstSq.y)
      .setPipeline("Light2D");
    this.tree = board
      .createStaticLayer("tree", tilesPNG, 0, this.scene.gB.firstSq.y)
      .setDepth(5)
      .setPipeline("Light2D");
    this.tree2 = board
      .createStaticLayer("tree2", tilesPNG, 0, this.scene.gB.firstSq.y)
      .setDepth(5)
      .setPipeline("Light2D");
  }
}
