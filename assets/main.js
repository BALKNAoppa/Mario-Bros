const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

// Game canvas size
canvas.width = 1100;
canvas.height = 400;

// Load player image
const playerImage = new Image();
playerImage.src = 'assets/mario-assets/mario/small/mario-idle.png'; // Player model

// Load obstacle images
const obstacleImage1 = new Image();
obstacleImage1.src = 'assets/mario-assets/pipe-s.png'; // Small Pipe

const obstacleImage2 = new Image();
obstacleImage2.src = 'assets/mario-assets/pipe-m.png'; // Medium pipe

// Player object
const player = {
  position: { x: 100, y: 100 },
  velocity: { x: 0, y: 0 },
  width: 30,
  height: 40,
  gravity: 0.2,
  jumpVelocity: -10,
  sides: { bottom: 100 + 100 },

  // Creating player on the canvas
  draw: function () {
    // Draw the image
    c.drawImage(playerImage, this.position.x, this.position.y, this.width, this.height);

    // Debug border player
    c.strokeStyle = 'red';
    c.lineWidth = 1;
    c.strokeRect(this.position.x, this.position.y, this.width, this.height);
  },

  // Updating variables frame by frame
  update: function () {
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    this.sides.bottom = this.position.y + this.height;

    // Gravity (player check if on the ground)
    if (this.sides.bottom + this.velocity.y < canvas.height) {
      this.velocity.y += this.gravity;
    } else {
      this.velocity.y = 0;
    }
  }
};

// Controller keys
const keys = {
  w: { pressed: false },
  a: { pressed: false },
  d: { pressed: false }
};

// Event listener for controller
function handleKeyDown(e) {
  switch (e.key) {
    case 'w':
      if (player.velocity.y === 0) player.velocity.y = player.jumpVelocity; // Jump with adjusted velocity
      break;
    case 'a':
      keys.a.pressed = true; // Move left
      break;
    case 'd':
      keys.d.pressed = true; // Move right
      break;
  }
}

function handleKeyUp(e) {
  switch (e.key) {
    case 'a':
      keys.a.pressed = false; // Stop moving left
      break;
    case 'd':
      keys.d.pressed = false; // Stop moving right
      break;
  }
}

function updatePlayerVelocity() {

  // Engiin uyiin hurd (idle)
  player.velocity.x = 0;

  // Controller davhar daragdahdhad garah bug prevent
  if (keys.d.pressed) {
    player.velocity.x = 1; // Move right
  } else if (keys.a.pressed) {
    player.velocity.x = -1; // Move left   
  }
}

//Canvas arilgana
function clearCanvas() {
  c.fillStyle = '#5C94FC';
  c.fillRect(0, 0, canvas.width, canvas.height); // Clear
}

// Obj
const obstacles = [
  { position: { x: 600, y: 320 }, width: 80, height: 80, image: obstacleImage1 },
  { position: { x: 850, y: 280 }, width: 80, height: 120, image: obstacleImage2 }
];

// Creating obj in canvas
function drawObstacles() {
  obstacles.forEach(obstacle => {
    // Draw the image for each obstacle
    c.drawImage(obstacle.image, obstacle.position.x, obstacle.position.y, obstacle.width, obstacle.height);
  });
}

// Player & obj 2 iin collission
function isColliding(player, obstacle) {
  return (
    player.position.x < obstacle.position.x + obstacle.width &&
    player.position.x + player.width > obstacle.position.x &&
    player.position.y < obstacle.position.y + obstacle.height &&
    player.position.y + player.height > obstacle.position.y
  );
}

// frame by frame window updater
function animate() {
  window.requestAnimationFrame(animate);
  clearCanvas(); // Canvas arilgana
  drawObstacles(); // Obj gargana
  updatePlayerVelocity(); // Player horizontal movement
  player.update(); // Player update

  // Player obj tei murguldsun esehiig shalgah
  obstacles.forEach(obstacle => {
    if (isColliding(player, obstacle)) {
      // Obj nevtrehees prevent hiih
      if (player.position.y + player.height <= obstacle.position.y + player.velocity.y) {
        player.velocity.y = 0; // Player obj-iin deer garah uyd
        player.position.y = obstacle.position.y - player.height;
      }

      // Zuun & baruun taliin colission
      else if (player.position.x + player.width > obstacle.position.x && player.position.x < obstacle.position.x + obstacle.width) {
        if (player.velocity.x > 0) { // Move right
          player.position.x = obstacle.position.x - player.width; // Left (playeriig zogsoono)
        } else if (player.velocity.x < 0) { // Moving left
          player.position.x = obstacle.position.x + obstacle.width; // Right (playeriig zogsoono)
        }
      }
    }
  });

  player.draw(); // Create player
}

// Event listener
addEventListener('keydown', handleKeyDown);
addEventListener('keyup', handleKeyUp);

animate();
