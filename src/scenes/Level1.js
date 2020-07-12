import {Scene} from 'phaser';
import L1Logo from '../assets/level1.png';


export default class Level1 extends Scene {
    constructor() {
        super('level1')
    }

    preload() {
        this.load.image('L1Logo', L1Logo);
    }

    create() {
        this.add.image(0,0,'L1Logo').setOrigin(0,0);
    }
}