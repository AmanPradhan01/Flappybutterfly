// script.js

const butterfly = document.getElementById('butterfly');
let butterflyTop = 250;
let gravity = 0.6;
let velocity = 0;
const gameContainer = document.getElementById('gameContainer');
let score = 0;
const scoreDisplay = document.getElementById('score');
let gameSpeed = 3; // Adjust game speed as needed
let obstacleHeightRange = [40, 300]; // Adjust obstacle height range

// Add event listener for space bar
document.addEventListener('keydown', function(event) {
    if (event.code === 'Space') {
        jump();
    }
});

function jump() {
    velocity = -8;
}

/*function createObstacle() {
    const obstacle = document.createElement('div');
    obstacle.classList.add('obstacle');
    
    // Randomly determine whether to place obstacle on top or bottom
    const obstaclePosition = Math.random() < 0.5 ? 'top' : 'bottom';
    
    if (obstaclePosition === 'top') {
        obstacle.style.top = '0';
    } else {
        obstacle.style.bottom = '0';
    }
    
    obstacle.style.left = '100%';
    obstacle.style.height = (Math.random() * (obstacleHeightRange[1] - obstacleHeightRange[0]) + obstacleHeightRange[0]) + 'px';
    
    gameContainer.appendChild(obstacle);
    let obstacleLeft = gameContainer.clientWidth;
    let obstacleInterval = setInterval(function() {
        if (obstacleLeft < -60) {
            clearInterval(obstacleInterval);
            obstacle.remove();
            score++;
            scoreDisplay.textContent = score;
        } else {
            obstacleLeft -= gameSpeed;
            obstacle.style.left = obstacleLeft + 'px';
            if (isCollision(butterfly, obstacle)) {
                clearInterval(obstacleInterval);
                gameOver();
            }
        }
    }, 20);
}
*/
function isCollision(butterfly, obstacle) {
    const butterflyRect = butterfly.getBoundingClientRect();
    const obstacleRect = obstacle.getBoundingClientRect();

    return !(
        butterflyRect.top > obstacleRect.bottom ||
        butterflyRect.bottom < obstacleRect.top ||
        butterflyRect.right < obstacleRect.left ||
        butterflyRect.left > obstacleRect.right
    );
}

function spawnInitialObstacles() {
    for (let i = 0; i < 5; i++) {
        createObstacle();
    }
}

// Add a variable to store the highest score
let highestScore = 0;

// Function to update the highest score
function updateHighestScore() {
    if (score > highestScore) {
        highestScore = score;
    }
}

let gameOverFlag = false;

function gameOver() {
    butterfly.style.display = 'block'; // Show the butterfly
    butterfly.style.animation = 'none'; // Stop the shake animation
    butterfly.style.backgroundImage = "url('img3.jpg')"; // Set background image to butterfly
    
    // Set game over flag to true
    gameOverFlag = true;

    // Update and display the highest score
    updateHighestScore();

    // Create and style the game over container
    const gameOverContainer = document.createElement('div');
    gameOverContainer.classList.add('gameOverContainer');
    gameOverContainer.textContent = 'Game Over! Your score: ' + score;

    // Create restart button
    const restartButton = document.createElement('button');
    restartButton.textContent = 'Restart Game';
    restartButton.classList.add('restartButton'); // Add class for styling
    restartButton.addEventListener('click', function() {
        location.reload();
    });

    // Append elements to game over container
    gameOverContainer.appendChild(document.createElement('br')); // Add line break
    gameOverContainer.appendChild(restartButton);

    // Append game over container to body
    document.body.appendChild(gameOverContainer);
}






function createObstacle() {
    if (gameOverFlag) {
        return; // Do not create obstacles if game is over
    }

    const obstacle = document.createElement('div');
    obstacle.classList.add('obstacle');

    // Randomly determine whether to place obstacle on top or bottom
    const obstaclePosition = Math.random() < 0.5 ? 'top' : 'bottom';

    if (obstaclePosition === 'top') {
        obstacle.style.top = '0';
    } else {
        obstacle.style.bottom = '0';
    }

    obstacle.style.left = '100%';
    obstacle.style.height = (Math.random() * (obstacleHeightRange[1] - obstacleHeightRange[0]) + obstacleHeightRange[0]) + 'px';

    gameContainer.appendChild(obstacle);
    let obstacleLeft = gameContainer.clientWidth;
    let obstacleInterval = setInterval(function() {
        if (obstacleLeft < -60 || gameOverFlag) {
            clearInterval(obstacleInterval);
            obstacle.remove();
        } else {
            obstacleLeft -= gameSpeed;
            obstacle.style.left = obstacleLeft + 'px';
            if (!gameOverFlag && obstacleLeft < butterfly.getBoundingClientRect().left && obstacleLeft > 0) {
                // If butterfly passes an obstacle, increase score
                score++;
                scoreDisplay.textContent = score;
            }
            if (isCollision(butterfly, obstacle)) {
                clearInterval(obstacleInterval);
                gameOver();
            }
        }
    }, 20);
}




function gameLoop() {
    velocity += gravity;
    butterflyTop += velocity;
    butterfly.style.top = butterflyTop + 'px';
    if (butterflyTop > gameContainer.clientHeight - butterfly.offsetHeight) {
        butterflyTop = gameContainer.clientHeight - butterfly.offsetHeight;
        butterfly.style.top = butterflyTop + 'px';
        velocity = 0;
    }
    requestAnimationFrame(gameLoop);
}

spawnInitialObstacles();
gameLoop();
setInterval(createObstacle, 2000);
