export default {
  type: Phaser.AUTO,
  physics: {
    default: "arcade",
    // arcade: { debug: true }
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 1200,
    height: 2136,
  },
  audio: {
    disableWebAudio: true
}
};
