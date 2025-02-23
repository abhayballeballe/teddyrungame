let startText;
let restartButton;
let gameOverText;
let motivationalMessages;
let obstacleTimer;
let heartTimer;

function createStartButton(scene) {
    startText = scene.add.text(game.config.width/2, game.config.height/2, 'Tap to Start', { fontSize: '32px', fill: '#fff' });
    startText.setOrigin(0.5);
    startText.setInteractive();
}

function createScoreText(scene) {
    scoreText = scene.add.text(16, 16, 'Love Score: 0', { fontSize: '32px', fill: '#fff' });
}

function createDistanceText(scene) {
    distanceText = scene.add.text(16, 50, 'Distance: 0 m', { fontSize: '32px', fill: '#fff' });
}

function createMotivationalMessages(scene) {
    motivationalMessages = [
        "Woow Princess you are great!",
        "Keep it up my girl u doing so great!",
        "You're awesome, keep going!",
        "You are so cute!"
    ];
}

function updateMotivationalMessages() {
    if (Math.floor(distance) % 10 === 0 && Math.floor(distance) > 0) {
         let message = motivationalMessages[Math.floor(distance / 10) % motivationalMessages.length];
          displayPopupMessage(message);
    }
}

function displayGameOver(scene) {
     gameOverText = scene.add.text(game.config.width/2, game.config.height/2 - 50, 'Aww, I still love you', { fontSize: '32px', fill: '#fff' });
      gameOverText.setOrigin(0.5);

     restartButton = scene.add.text(game.config.width/2, game.config.height/2 + 50, 'Restart', { fontSize: '32px', fill: '#fff' });
     restartButton.setOrigin(0.5);
     restartButton.setInteractive();
     restartButton.on('pointerdown', () => restartGame(scene));
}

function displayPopupMessage(message) {
        const popupText = game.scene.scenes[0].add.text(game.config.width / 2, game.config.height / 2, message, {
        font: '24px Arial',
        fill: '#ffffff',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        padding: { x: 20, y: 10 },
        align: 'center'
    });

    popupText.setOrigin(0.5);

    // Display popup for a few seconds
    game.scene.scenes[0].time.delayedCall(3000, () => { //calls a function after a specific amount of time in millisecond
        popupText.destroy();
    });
}
function hideStartButton(scene){
    startText.setVisible(false);
}

function showStartButton(scene){
    startText.setVisible(true);
}

function hideGameOver(scene){
    restartButton.setVisible(false);
    gameOverText.setVisible(false);
}