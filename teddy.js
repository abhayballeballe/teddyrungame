class Teddy extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        scene.add.existing(this);
        scene.physics.add.existing(this); // Add physics to the sprite
        this.body.setCollideWorldBounds(true);
        this.isJumping = false;

         this.setScale(0.1); //make teddy smaller
    }
    jump() {
        if (!this.isJumping) {
            this.body.setVelocityY(-200); // Adjust jump height
            this.isJumping = true;
        }
    }

    update() {
        if (this.body.blocked.down) { // If Teddy is on the ground
            this.isJumping = false;
        }
    }

     die() {
        this.setTint(0xff0000); //Makes red
        this.anims.stop();
    }
}