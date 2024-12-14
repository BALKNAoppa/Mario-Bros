const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

// Canvasiin size
canvas.width = 1100;
canvas.height = 400;

// Playeriin model
const playerImage = new Image();
playerImage.src = 'assets/mario-assets/mario/small/mario-idle.png';

const goombaImage = new Image();
goombaImage.src = 'assets/mario-assets/goomba-l.png'; // Goomba model

// Objectuudiin model

const obstacleImage1 = new Image();
obstacleImage1.src = 'assets/mario-assets/pipe-s.png'; // Small Pipe

const obstacleImage2 = new Image();
obstacleImage2.src = 'assets/mario-assets/pipe-m.png'; // Medium pipe

const obstacleImage0 = new Image();
obstacleImage0.src = 'assets/mario-assets/brick.png'; // Brick

const obstacleImageL = new Image();
obstacleImageL.src = 'assets/mario-assets/luckybox.gif'; // Luckybox

// Player object
const player = {
  position: { x: 100, y: 100 },
  velocity: { x: 0, y: 0 },
  width: 30,
  height: 40,
  gravity: 0.2,
  jumpVelocity: -8,

  draw: function () { // img         x                y          width         height
    c.drawImage(playerImage, this.position.x, this.position.y, this.width, this.height);

    // Debug border
    c.strokeStyle = 'green';
    c.strokeRect(this.position.x, this.position.y, this.width, this.height);
  },

  update: function () {
    // Zuun baruun
    this.position.x += this.velocity.x;

    // Usreh
    this.position.y += this.velocity.y;

    // Gravity
    if (this.position.y + this.height < canvas.height) {
      this.velocity.y += this.gravity;
    } else {
      this.velocity.y = 0;
      this.position.y = canvas.height - this.height;
    }
  }
};

// Goomba object
const goomba = {
  position: { x: 800, y: 370 },
  velocity: { x: 0.4, y: 0 }, // goomba speed
  width: 30,
  height: 30,
  gravity: 0.2,

  draw: function () {
    c.drawImage(goombaImage, this.position.x, this.position.y, this.width, this.height);

    // Debug border
    c.strokeStyle = 'red';
    c.strokeRect(this.position.x, this.position.y, this.width, this.height);
  },

  update: function () {
    // zuun baruun
    this.position.x += this.velocity.x;

    // deeshee dooshoo
    this.position.y += this.velocity.y;

    // // Gravity effect
    // if (this.position.y + this.height < canvas.height) {
    //   this.velocity.y += this.gravity;
    // } else {
    //   this.velocity.y = 0;
    //   this.position.y = canvas.height - this.height;
    // }
  }
};


// Controller keys boolean check (default)
const keys = {
  w: { pressed: false },
  a: { pressed: false },
  d: { pressed: false }
};

function handleKeyDown(e) {
  switch (e.key) {
    case 'w':
      if (player.velocity.y === 0) player.velocity.y = player.jumpVelocity; // if player gazart hursn uyd usrene
      break;
    case 'a':
      keys.a.pressed = true;
      break;
    case 'd':
      keys.d.pressed = true;
      break;
  }
}

// Key up listener
function handleKeyUp(e) {
  switch (e.key) {
    case 'a':
      keys.a.pressed = false;
      break;
    case 'd':
      keys.d.pressed = false;
      break;
  }
}

function updatePlayerVelocity() {
  player.velocity.x = 0; // Player stop
  // Movement speed
  if (keys.a.pressed) player.velocity.x = -1;
  if (keys.d.pressed) player.velocity.x = 1;
}

// Clear the canvas
function clearCanvas() {
  c.fillStyle = '#5C94FC';
  c.fillRect(0, 0, canvas.width, canvas.height);
}

// Obstacles
const obstacles = [
  { position: { x: 600, y: 320 }, width: 80, height: 80, image: obstacleImage1 }, // Small pipe
  { position: { x: 850, y: 280 }, width: 80, height: 120, image: obstacleImage2 }, // Medium pipe
  { position: { x: 300, y: 250 }, width: 30, height: 30, image: obstacleImage0 }, // Brick
  { position: { x: 330, y: 250 }, width: 30, height: 30, image: obstacleImage0 }, // Brick
  { position: { x: 360, y: 250 }, width: 30, height: 30, image: obstacleImageL } // Luckybox
];

// Draw obstacles
function drawObstacles() {
  obstacles.forEach(obstacle => {
    c.drawImage(obstacle.image, obstacle.position.x, obstacle.position.y, obstacle.width, obstacle.height);
  });
}

// Collision Detection and Resolution by (CHATGPT)
function resolveCollisions() {
  obstacles.forEach(obstacle => {
    // Horizontal collisions (left and right)
    if (
      player.position.y + player.height > obstacle.position.y &&
      player.position.y < obstacle.position.y + obstacle.height
    ) {
      if (
        player.velocity.x > 0 && // Moving right
        player.position.x + player.width <= obstacle.position.x &&
        player.position.x + player.width + player.velocity.x >= obstacle.position.x
      ) {
        player.velocity.x = 0; // Stop moving right
        player.position.x = obstacle.position.x - player.width; // Snap to obstacle left
      }

      if (
        player.velocity.x < 0 && // Moving left
        player.position.x >= obstacle.position.x + obstacle.width &&
        player.position.x + player.velocity.x <= obstacle.position.x + obstacle.width
      ) {
        player.velocity.x = 0; // Stop moving left
        player.position.x = obstacle.position.x + obstacle.width; // Snap to obstacle right
      }
    }

    // Vertical collisions (top and bottom)
    if (
      player.position.x + player.width > obstacle.position.x &&
      player.position.x < obstacle.position.x + obstacle.width
    ) {
      if (
        player.velocity.y > 0 && // Falling
        player.position.y + player.height <= obstacle.position.y &&
        player.position.y + player.height + player.velocity.y >= obstacle.position.y
      ) {
        player.velocity.y = 0; // Stop falling
        player.position.y = obstacle.position.y - player.height; // Snap to obstacle top
      }

      if (
        player.velocity.y < 0 && // Jumping
        player.position.y >= obstacle.position.y + obstacle.height &&
        player.position.y + player.velocity.y <= obstacle.position.y + obstacle.height
      ) {
        player.velocity.y = 0; // Stop upward movement
        player.position.y = obstacle.position.y + obstacle.height; // Snap below obstacle
      }
    }
  });
}

// Collision Detection for Goomba
function resolveGoombaCollisions() {
  obstacles.forEach(obstacle => {
    // Check goomba right side
    if (
      goomba.position.y + goomba.height > obstacle.position.y &&
      goomba.position.y < obstacle.position.y + obstacle.height
    ) {
      if (
        goomba.velocity.x > 0 && // Move right
        goomba.position.x + goomba.width <= obstacle.position.x &&
        goomba.position.x + goomba.width + goomba.velocity.x >= obstacle.position.x
      ) {
        goomba.velocity.x = -0.4; // Hursen uyd butsah (reverse)
      }

      // Check goomba left side
      if (
        goomba.velocity.x < 0 && // Move left
        goomba.position.x >= obstacle.position.x + obstacle.width &&
        goomba.position.x + goomba.velocity.x <= obstacle.position.x + obstacle.width
      ) {
        goomba.velocity.x = 0.4; // Hursen uyd butsah (reverse)
      }
    }
  });
}


// frame by frame window updater
function animate() {
  window.requestAnimationFrame(animate);
  clearCanvas(); // Canvas arilgana
  drawObstacles(); // Obj gargana
  updatePlayerVelocity(); // Player horizontal movement
  resolveCollisions(); // Handle collisions
  resolveGoombaCollisions(); // Goomba colission
  player.update(); // Player update
  player.draw(); // Create player
  goomba.draw() // Create goomba
  goomba.update() // Goomba update
}

// Event listener
addEventListener('keydown', handleKeyDown);
addEventListener('keyup', handleKeyUp);

animate();
