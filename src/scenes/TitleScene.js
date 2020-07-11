import Phaser from "phaser";
import logo from "../assets/logo.jpg";

export default class TitleScene extends Phaser.Scene {
  
   constructor(){
       super('Title');
   }
   
   preload() {
    this.load.image("logo", logo);
  }
  
  create() {
    this.add.image(0, 0, 'logo').setOrigin(0, 0)
  }
}


