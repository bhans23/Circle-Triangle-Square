export default {
  type: Phaser.AUTO,
  physics: {
    default: "arcade",
    arcade: {
      debug: true,
      gravity: { y: 0 },
    },
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 1200,
    height: 1200,
  },
};
