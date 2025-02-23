class Obstacle extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.setVelocityX(-150); // Obstacle speed
        this.body.setAllowGravity(false); // No gravity

         this.setScale(0.05); //make obstacle smaller
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