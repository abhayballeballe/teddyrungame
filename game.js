let game; // Global game object
window.onload = function() {
    let config = {
        type: Phaser.AUTO,  // Automatically chooses WebGL or Canvas
        width: 800,      // Adjust to your desired game width
        height: 600,     // Adjust to your desired game height
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 300 },
                debug: false
            }
        },
        scene: {
            preload: preload,
            create: create,
            update: update
        }
    };

    game = new Phaser.Game(config);
};

let teddy;
let obstacles;
let hearts;
let score = 0;
let distance = 0;
let scoreText;
let distanceText;
let gameOver = false;
let gameStart = false;
let startButton;

function preload () {
    this.load.image('teddy', 'assets/teddy.jpg');
    this.load.image('nazar', 'assets/nazar.jpg');
    this.load.image('heart', 'assets/heart.jpg');
    // Preload other assets
}

function create () {

    // Create UI elements (Start button, score, distance)
    createStartButton(this);
    createScoreText(this);
    createDistanceText(this);
    createMotivationalMessages(this);

    // Create Teddy and other game elements only after the game starts
    this.input.on('pointerdown', () => { //detects click of mouse or touch of screen
        if (!gameStart) {
            startGame(this); // Start the game if it hasn't started
        } else if (!gameOver) {
            jump(); // call the jump function.
        }

    });

    obstacles = this.physics.add.group();
    hearts = this.physics.add.group();


     this.physics.add.overlap(teddy, hearts, collectHeart, null, this);  //Added heart collect collision

     //Collision logic
     this.physics.add.collider(teddy, obstacles, hitObstacle, null, this);  //Added obstacle collision
}
function startGame(scene) {
    gameStart = true;
    hideStartButton(scene);

    // Create Teddy character
    teddy = new Teddy(scene, 100, 450, 'teddy'); // adjust position later

    // Start generating Obstacles and Hearts
    startGeneratingObstacles(scene);
    startGeneratingHearts(scene);
}

function update () {
    if (!gameStart) return;
    if (gameOver) return;

    distance += 0.01;
    distanceText.setText('Distance: ' + Math.floor(distance) + ' m');
    updateMotivationalMessages();
}

function jump() {
    teddy.jump();
}

function hitObstacle(teddy, obstacle) {
     this.physics.pause(); // Pause physics
     teddy.die();

    gameOver = true;
    displayGameOver(this);

}

function collectHeart(teddy, heart) {
     heart.disableBody(true, true);
     score += 5;
     scoreText.setText('Love Score: ' + score);
}

function startGeneratingObstacles(scene){
    obstacleTimer = scene.time.addEvent({
        delay: 2000,
        callback: () => {
            if (!gameOver && gameStart) {
                let obstacleY = 450;  // Define obstacle position
                let obstacle = new Obstacle(scene, 800, obstacleY, 'nazar');
                obstacles.add(obstacle);
            }

        },
        callbackScope: scene,
        loop: true,
    });
}

function startGeneratingHearts(scene){
    heartTimer = scene.time.addEvent({
        delay: 1000,
        callback: () => {
            if (!gameOver && gameStart) {
                let heartY = Phaser.Math.Between(200, 400);  // Heart position
                let heart = new Heart(scene, 800, heartY, 'heart');
                hearts.add(heart);
            }

        },
        callbackScope: scene,
        loop: true,
    });
}

function restartGame(scene) {
    gameOver = false;
    gameStart = false;
    score = 0;
    distance = 0;
    hideGameOver(scene);
    showStartButton(scene);

     obstacles.clear(true, true);  //Clear
     hearts.clear(true, true);  //Clear

    scoreText.setText('Love Score: ' + score);
    distanceText.setText('Distance: ' + Math.floor(distance) + ' m');

    stopGeneratingObstacles();
    stopGeneratingHearts();

}

function stopGeneratingObstacles(){
    obstacleTimer.remove(); //removes all event created
}

function stopGeneratingHearts(){
    heartTimer.remove();
}