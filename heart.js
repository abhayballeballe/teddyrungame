class Heart extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.setVelocityX(-150); // Heart speed
        this.body.setAllowGravity(false);
         this.setScale(0.04); //make hearts smaller
    }
    preUpdate (time, delta)
    {
        super.preUpdate(time, delta);

        if (this.x < -50)
        {
            this.destroy();
        }
    }
}