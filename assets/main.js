const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

// Set canvas size
canvas.width = 1024;
canvas.height = 576;

// Player object
const player = {
  position: { x: 100, y: 100 },
  velocity: { x: 0, y: 0 },
  width: 100,
  height: 100,
  gravity: 1,
  sides: { bottom: 100 + 100 },

  draw: function() {
    c.fillStyle = 'grey';
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
  },

  update: function() {
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    this.sides.bottom = this.position.y + this.height;

    // Handle gravity only if the player is not colliding with the ground (brick or canvas floor)
    if (this.sides.bottom + this.velocity.y < canvas.height) {
      this.velocity.y += this.gravity; // Apply gravity
    } else {
      this.velocity.y = 0; // Stop downward velocity if at the bottom of the canvas
    }

    // Check for collision with bricks after updating the position
    brick.checkCollision();
  }
};

// Brick object
const brick = {
  position: { x: 400, y: 400 },
  width: 50,
  height: 200,

  draw: function() {
    c.fillStyle = 'red';
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
  },

  // Collision check with the player
  checkCollision: function() {
    // Bottom collision (falling)
    if (
      player.position.x + player.width > this.position.x &&
      player.position.x < this.position.x + this.width &&
      player.position.y + player.height > this.position.y &&
      player.position.y + player.height <= this.position.y + player.velocity.y // Only consider the bottom when falling
    ) {
      // Stop downward velocity (collision with top of brick)
      if (player.velocity.y > 0) {
        player.velocity.y = 0;
        player.position.y = this.position.y - player.height; // Place player on top of brick
      }
    }

    // Top collision (jumping)
    if (
      player.position.x + player.width > this.position.x &&
      player.position.x < this.position.x + this.width &&
      player.position.y < this.position.y + this.height &&
      player.position.y + player.height > this.position.y
    ) {
      // Stop upward movement (collision with bottom of brick)
      if (player.velocity.y < 0) {
        player.position.y = this.position.y + this.height; // Place player below the brick
        player.velocity.y = 0; // Stop upward movement
      }
    }

    // Left collision
    if (
      player.position.y + player.height > this.position.y &&
      player.position.y < this.position.y + this.height &&
      player.position.x < this.position.x + this.width &&
      player.position.x + player.width > this.position.x &&
      player.velocity.x < 0 // Moving left
    ) {
      // Prevent player from passing through the left side of the brick
      player.position.x = this.position.x + this.width; // Place player to the right of the brick
      player.velocity.x = 0; // Stop horizontal movement
    }

    // Right collision
    if (
      player.position.y + player.height > this.position.y &&
      player.position.y < this.position.y + this.height &&
      player.position.x + player.width > this.position.x &&
      player.position.x < this.position.x + this.width &&
      player.velocity.x > 0 // Moving right
    ) {
      // Prevent player from passing through the right side of the brick
      player.position.x = this.position.x - player.width; // Place player to the left of the brick
      player.velocity.x = 0; // Stop horizontal movement
    }
  }
};

// Key event handling
const keys = {
  w: { pressed: false },
  a: { pressed: false },
  d: { pressed: false }
};

function handleKeyDown(e) {
  switch (e.key) {
    case 'w':
      if (player.velocity.y === 0) player.velocity.y = -20; // Jump
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
  // Reset player horizontal velocity (idle)
  player.velocity.x = 0;

  // Check key presses and update horizontal velocity
  if (keys.d.pressed) {
    player.velocity.x = 5; // Move right
  } else if (keys.a.pressed) {
    player.velocity.x = -5; // Move left
  }
}

function clearCanvas() {
  c.fillStyle = 'white';
  c.fillRect(0, 0, canvas.width, canvas.height); // Clear the canvas
}

function animate() {
  window.requestAnimationFrame(animate); // Call animate recursively

  clearCanvas(); // Clear the canvas every frame

  updatePlayerVelocity(); // Update player horizontal movement

  player.draw(); // Draw the player
  player.update(); // Update player state (gravity, position)
  
  brick.draw(); // Draw the brick
  brick.checkCollision(); // Check for collision with the brick
}

// Initialize game
addEventListener('keydown', handleKeyDown);
addEventListener('keyup', handleKeyUp);

animate(); // Start animation
