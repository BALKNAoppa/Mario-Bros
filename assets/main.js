// Audio Import
const backgroundMusic = new Audio();
backgroundMusic.src = 'assets/mario-assets/sfx/mario-theme.mp3'; // Mario Theme
const jumpSound = new Audio();
jumpSound.src = 'assets/mario-assets/sfx/mario-jump.mp3'; // Jump Sound
const coinSound = new Audio();
coinSound.src = 'assets/mario-assets/sfx/coin.wav'; // Coin Sound
const buffSound = new Audio();
buffSound.src = 'assets/mario-assets/sfx/mushroom-eat.wav'; // GameOver
const gameOverSound = new Audio();
gameOverSound.src = 'assets/mario-assets/sfx/death.mp3'; // GameOver
const goombaDeathsnd = new Audio();
goombaDeathsnd.src = 'assets/mario-assets/goombadie.mp3'; // GameOver

let snd = document.querySelector('#snd');

let sndOn = new Image();
sndOn.src = 'assets/mario-assets/snd-on.png'; // Sound on
let sndOff = new Image();
sndOff.src = 'assets/mario-assets/snd-off.png'; // Sound off

// Start screen
let gameStarted = false;
const startBtn = document.getElementById("start-btn");
const startScreen = document.getElementById("start-screen");


// Function to start the game
function startGame() {
  startScreen.style.display = "none";
  gameStarted = true;
  backgroundMusic.play().catch((error) => {

  });
  animate();
  startCountdown();
}
startBtn.addEventListener("click", () => {
  if (!gameStarted) {
    startGame();
  }
});
document.addEventListener("keydown", (event) => {
  if ((event.key === "Enter" || event.key === " ") && !gameStarted) {
    startGame();
  }
});
backgroundMusic.addEventListener('canplaythrough', () => {
  console.log('Background music is ready to play');
});




// Sound toggle button and logic
const soundToggleButton = document.getElementById('sound-toggle-btn');
let isSoundOn = true;
function toggleSound() {
  isSoundOn = !isSoundOn;
  if (isSoundOn) {
    backgroundMusic.play().catch((error) => {
      console.error("Background music play failed:", error);
    });
    backgroundMusic.volume = 0.8;
    jumpSound.volume = 0.4;
    coinSound.volume = 1;
    gameOverSound.volume = 0.8;
    soundToggleButton.textContent = 'SOUND ON';
  } else {
    backgroundMusic.pause();
    jumpSound.volume = 0;
    coinSound.volume = 0;
    gameOverSound.volume = 0;
    soundToggleButton.textContent = 'SOUND OFF';
  }
}
soundToggleButton.addEventListener('click', toggleSound);

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

// Canvasiin size
canvas.width = 1100;
canvas.height = 400;

// Welcome Sign
const welcomefield = new Image();
welcomefield.src = 'assets/mario-assets/test2.png'
//Test Lvl
const testlvl = new Image();
testlvl.src = 'assets/mario-assets/test-lvl.png';
// Playeriin model
const marioIdle = new Image();
marioIdle.src = 'assets/mario-assets/mario/small/mario-idle.png'; // Mario Idle
const marioRun1 = new Image();
marioRun1.src = 'assets/mario-assets/mario/small/mario-run1.png'; // Mario run 1
const marioRun2 = new Image();
marioRun2.src = 'assets/mario-assets/mario/small/mario-run2.png'; // Mario run 2
const marioRun3 = new Image();
marioRun3.src = 'assets/mario-assets/mario/small/mario-run3.png'; // Mario run 3
const marioJump = new Image();
marioJump.src = 'assets/mario-assets/mario/small/mario-jump.png'; // Mario run 4
const goombaImageL = new Image();
goombaImageL.src = 'assets/mario-assets/goomba-l.png'; // Goomba left
const goombaImageR = new Image();
goombaImageR.src = 'assets/mario-assets/goomba-r.png'; // Goomba right
const marioDeath = new Image();
marioDeath.src = 'assets/mario-assets/mario/small/mario-death.png'; // Goomba right

// Buffed Player
const marioIdleB = new Image();
marioIdleB.src = 'assets/mario-assets/mario/big/bmario-idle.png'; // Mario Idle BIG
const marioRun1B = new Image();
marioRun1B.src = 'assets/mario-assets/mario/big/bmario-run1.png'; // Mario run 1 BIG
const marioRun2B = new Image();
marioRun2B.src = 'assets/mario-assets/mario/big/bmario-run2.png'; // Mario run 2 BIG
const marioRun3B = new Image();
marioRun3B.src = 'assets/mario-assets/mario/big/bmario-run3.png'; // Mario run 3 BIG
const marioJumpB = new Image();
marioJumpB.src = 'assets/mario-assets/mario/big/bmario-jump.png'; // Mario run 4 BIG

// Objectuudiin model
const obstacleImage1 = new Image();
obstacleImage1.src = 'assets/mario-assets/pipe-s.png'; // Small Pipe
const obstacleImage2 = new Image();
obstacleImage2.src = 'assets/mario-assets/pipe-m.png'; // Medium pipe
const obstacleImage0 = new Image();
obstacleImage0.src = 'assets/mario-assets/brick.png'; // Brick
const obstacleImageL = new Image();
obstacleImageL.src = 'assets/mario-assets/luckybox/1.png'; // Luckybox default
const obstacleEmpty = new Image();
obstacleEmpty.src = 'assets/mario-assets/empty.png'; // Luckybox default
const itemBuff = new Image();
itemBuff.src = 'assets/mario-assets/buff-mushroom.png' // Buff mushroom

// Luckybox array
const luckyBoxImages = [
  'assets/mario-assets/luckybox/1.png',
  'assets/mario-assets/luckybox/2.png',
  'assets/mario-assets/luckybox/3.png',
  'assets/mario-assets/luckybox/4.png',
  'assets/mario-assets/luckybox/5.png'
];

// Welcome Sign
const title = {
  position: { x: 35, y: 25 },
  width: 250,
  height: 150,
  image: welcomefield,
  draw: function () {
    c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
  }
}

// Timer (Stat)
let timeRemaining = 400;
function formatTime(seconds) {
  const remainingSeconds = seconds;
  if (remainingSeconds < 10) {
  }
  return remainingSeconds;
}
function startCountdown() {
  const timerElement = document.getElementById('timer');
  const countdownInterval = setInterval(function () {
    timerElement.innerText = formatTime(timeRemaining);
    if (timeRemaining <= 0) {
      clearInterval(countdownInterval);
      timerElement.innerText = 'Time is up!';
    } else {
      timeRemaining--;
    }
  }, 1000);
}

// Additional details
 
let score = 0;

function drawCountdownTimer() {
  c.font = "20px 'Press Start 2P', cursive";
  c.fillStyle = 'white';
  c.textAlign = 'left';
  c.textBaseline = 'top';
  
  // Time label
  c.fillText('Time', 800, 15);
  c.fillText(formatTime(timeRemaining), 810, 45);
  
  // Score label
  c.fillText('Score', 600, 15);  
  c.fillText(score.toString().padStart(4, '0'), 615, 45); // Pad the score with leading zeros to 4 digits
  
  // Map label
  c.fillText('World', 410, 15);
  c.fillText('1-1', 430, 45);  
  
  // Developers text
  c.font = "15px 'Press Start 2P', cursive";
  c.fillText('Ariuka,', 40, 185);
  c.fillText('Babu,', 40, 210);
  c.fillText('Baagii,', 40, 235);
  c.fillText(' Amurlin', 150, 185);
  c.fillText('Odko', 165, 210);
  c.fillText('Battur', 165, 235);
}

 
 

// Game Over
let gameOver = false;

// Player object
const player = {
  position: { x: 100, y: 100 },
  velocity: { x: 0, y: 0 },
  width: 25,
  height: 25,
  gravity: 0.40,
  jumpVelocity: -10,
  ani: [marioRun1, marioRun2, marioRun3], // Mario running animation array
  marioIdle: marioIdle,
  frameIndex: 0,
  frameCounter: 0,
  dir: 'right', // Default right checking Left ! Right
  hitLuckyBox: false, // Checking player if hit lucky box
  isBuffed: false, // Buff State check
  draw: function () {
    c.save(); // Save the canvas state

    // Reverse player to left
    if (this.dir === 'left') {
      c.scale(-1, 1); // Flip
      c.drawImage(
        this.marioIdle,
        -this.position.x - this.width,
        this.position.y,
        this.width,
        this.height
      );
    } else if (gameOver) {
      c.drawImage(
        marioDeath,
        this.position.x,
        this.position.y,
        this.width,
        this.height
      );
    } else {
      c.drawImage(
        this.marioIdle,
        this.position.x,
        this.position.y,
        this.width,
        this.height
      );
    }
    c.restore(); // Restore the canvas state
  },

  update: function () {
    // Update position
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    if (gameOver) {
      this.velocity.y += this.gravity;
      return;
    }

    // Player gravity // Velocity = hurd // Gravity = undur
    if (this.position.y + this.height < canvas.height - 75) { // 75 Spacing from bottom ground canvas
      this.velocity.y += this.gravity;
    } else {
      this.velocity.y = 0;
      this.position.y = canvas.height - this.height - 75; // 75 Spacing from bottom ground canvas
    }

    // If player jump change idle img to Jumping img
    if (this.velocity.y < 0 || this.velocity.y > 0) {
      this.marioIdle = this.isBuffed ? marioJumpB : marioJump; // If buffed, use the big version
    } else if (this.velocity.x !== 0) {
      // If player running change idle img to Jumping img
      this.frameCounter++;
      if (this.frameCounter % 10 === 0) { // Zurag soligdoh hurd default 20 frame
        this.frameIndex = (this.frameIndex + 1) % this.ani.length;
        this.marioIdle = this.isBuffed ? [marioRun1B, marioRun2B, marioRun3B][this.frameIndex] : this.ani[this.frameIndex];
      }
    } else {
      this.marioIdle = this.isBuffed ? marioIdleB : marioIdle; // Yuch hiigeegu uyd butsd idle img
    }
  }
};


// Goomba object
const goomba = {
  position: { x: 650 },
  velocity: { x: 0.4, y: 0 }, // Goomba speed
  width: 26,
  height: 26,
  gravity: 0.2,
  goombaIdle: goombaImageL, // Goomba default img

  draw: function () { // Draw in canvas
    c.drawImage(this.goombaIdle, this.position.x, this.position.y, this.width, this.height);
  },
  update: function () { // Update in canvas
    // Zuun baruun hudulguun
    this.position.x += this.velocity.x;

    // deeshee dooshoo
    this.position.y += this.velocity.y;

    // Gravity
    if (this.position.y + this.height < canvas.height - 75) { // 75 Spacing from bottom ground canvas
      this.velocity.y += this.gravity;
    } else {
      this.velocity.y = 0;
      this.position.y = canvas.height - this.height - 75; // 75 Spacing from bottom ground canvas
    }
  },
  // Animation
  toggleImage: function () {
    if (this.goombaIdle === goombaImageL) { // Goomba idle
      this.goombaIdle = goombaImageR; // Idle iin utgiig right img bolgono
    } else {
      this.goombaIdle = goombaImageL; // Idle iin utgiig left img bolgono
    }
  }
};

// Goomba Sprite change left right with interval
setInterval(() => {
  goomba.toggleImage();
}, 300);


// ItemBuff object
const itembuff = {
  position: { x: 427, y: 190 },
  velocity: { x: 1.5, y: 0 }, // Buff Mushroom object
  width: 27,
  height: 0,
  maxHeight: 30, // Max grow height
  gravity: 0.2,
  goombaIdle: itemBuff, // Default
  visible: false, // Buff visibility

  draw: function () {
    c.drawImage(this.goombaIdle, this.position.x, this.position.y, this.width, this.height);
  },

  update: function () {
    // Zuun baruun hudulguun
    if (this.visible && this.height < this.maxHeight) {
      // Increase the height for growing animation
      this.height += 1;
    }
    if (this.visible == true && this.height === 30) {
      this.position.x += this.velocity.x;
      console.log(this.gravity)
      // deeshee dooshoo
      this.position.y += this.velocity.y;

      // Gravity
      if (this.position.y + this.height < canvas.height - 75) { // 75 Spacing from bottom ground canvas
        this.velocity.y += this.gravity;
      } else {
        this.velocity.y = 0;
        this.position.y = canvas.height - this.height - 75; // 75 Spacing from bottom ground canvas
      }
    }

  },
};


// Luckybox animate function
let luckyBoxIndex = 0;
function updateLuckyBoxImage() {
  luckyBoxIndex = (luckyBoxIndex + 1) % luckyBoxImages.length; // Array
  obstacleImageL.src = luckyBoxImages[luckyBoxIndex]; // Update the lucky box image
}
setInterval(updateLuckyBoxImage, 190);

const luckybox = {
  position: { x: 427, y: 224 },
  width: 27,
  height: 27,
  image: obstacleImageL, // Luckybox image
  draw: function () {
    c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
  }
};

// Obstacles
const obstacles = [
  { position: { x: 600, y: 275 }, width: 50, height: 50, image: obstacleImage1 }, // Small pipe
  { position: { x: 850, y: 245 }, width: 50, height: 80, image: obstacleImage2 }, // Medium pipe
  { position: { x: 400, y: 224 }, width: 27, height: 27, image: obstacleImage0, type: "brick" }, // Brick
  { position: { x: 454, y: 224 }, width: 27, height: 27, image: obstacleImage0, type: "brick" }, // Brick
  { position: { x: 427, y: 224 }, width: 27, height: 27, image: obstacleImageL, type: "luckyBox" } // Luckybox
];

// Draw obstacles
function drawObstacles() {
  obstacles.forEach(obstacle => {
    c.drawImage(obstacle.image, obstacle.position.x, obstacle.position.y, obstacle.width, obstacle.height);
  });
  luckybox.draw(); // Luckybox draw
  itembuff.draw(); // Draw the item buff
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
      // Check for bottom collision with lucky box
      if (
        player.velocity.y > 0 && // Falling
        player.position.y + player.height <= obstacle.position.y &&
        player.position.y + player.height + player.velocity.y >= obstacle.position.y
      ) {
        player.gravity = 0;
        player.velocity.y = 0; // Stop falling
        player.position.y = obstacle.position.y - player.height; // Snap to obstacle top
      }

      // Check for upward collision with the lucky box (jumping)
      if (
        player.velocity.y < 0 && // Jumping
        player.position.y >= obstacle.position.y + obstacle.height &&
        player.position.y + player.velocity.y <= obstacle.position.y + obstacle.height
      ) {
        player.velocity.y = 0; // Stop upward movement
        player.position.y = obstacle.position.y + obstacle.height; // Snap below obstacle
        // Player hits the lucky box from below
        if (obstacle.image === obstacleImageL) { // Check if it's the lucky box
          itembuff.visible = true; // Show the item buff
          luckybox.image = obstacleEmpty
        }
      }
    }
    if (
      player.position.x + player.width > itembuff.position.x &&
      player.position.x < itembuff.position.x + itembuff.width &&
      player.position.y + player.height > itembuff.position.y &&
      player.position.y < itembuff.position.y + itembuff.height
    ) {

      // Player buff check
      if (!player.isBuffed) {
        buffSound.play()
        score += 500
        player.isBuffed = true; // Set the player as buffed
        itembuff.visible = false;
        itembuff.height = 0;
        player.width = 32; // Increase the player size (for big Mario)
        player.height = 47; // Increase the player height (for big Mario)
        ani: [marioRun1B, marioRun2B, marioRun3B]; // Mario running animation array
        marioIdle: marioIdleB;
      }
    }
  });
}


// Controller keys boolean check (default)
const keys = {
  w: { pressed: false },
  a: { pressed: false },
  d: { pressed: false }
};

// Key down listener
function handleKeyDown(e) {
  switch (e.key) {
    case 'w':
      if (player.velocity.y === 0) { player.velocity.y = player.jumpVelocity; player.gravity = 0.40 }
      jumpSound.volume = 0.3;
      jumpSound.play()
      break;
    case 'a':
      keys.a.pressed = true;
      player.dir = 'left'; // Zuun
      break;
    case 'd':
      keys.d.pressed = true;
      player.dir = 'right'; // Baruun
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
  player.velocity.x = 0; // Stop movement by default
  if (keys.a.pressed) { player.velocity.x = -2.5; player.gravity = 0.40; } // Move left
  if (keys.d.pressed) { player.velocity.x = 2.5; player.gravity = 0.40; } // Move right
}

// Clear the canvas
function clearCanvas() {
  c.drawImage(testlvl, 0, 0, canvas.width, canvas.height);

}

// Collision Detection for Goomba (CHATGPT)
function resolveGoombaCollisions() {
  obstacles.forEach(obstacle => {
    // Horizontal collisions (left and right)
    if (
      goomba.position.y + goomba.height > obstacle.position.y &&
      goomba.position.y < obstacle.position.y + obstacle.height
    ) {
      if (
        goomba.velocity.x > 0 && // Move right
        goomba.position.x + goomba.width <= obstacle.position.x &&
        goomba.position.x + goomba.width + goomba.velocity.x >= obstacle.position.x
      ) {
        goomba.velocity.x = -0.4; // Reverse direction when colliding from the right
      }

      if (
        goomba.velocity.x < 0 && // Move left
        goomba.position.x >= obstacle.position.x + obstacle.width &&
        goomba.position.x + goomba.velocity.x <= obstacle.position.x + obstacle.width
      ) {
        goomba.velocity.x = 0.4; // Reverse direction when colliding from the left
      }
    }

    // Vertical collisions (top and bottom)
    if (
      goomba.position.x + goomba.width > obstacle.position.x &&
      goomba.position.x < obstacle.position.x + obstacle.width
    ) {
      // Check for bottom collision (falling)
      if (
        goomba.velocity.y > 0 && // Falling
        goomba.position.y + goomba.height <= obstacle.position.y &&
        goomba.position.y + goomba.height + goomba.velocity.y >= obstacle.position.y
      ) {
        goomba.velocity.y = 0; // Stop falling
        goomba.position.y = obstacle.position.y - goomba.height; // Snap to the top of the obstacle
      }

      // Check for top collision (going up)
      if (
        goomba.velocity.y < 0 && // Moving up
        goomba.position.y >= obstacle.position.y + obstacle.height &&
        goomba.position.y + goomba.velocity.y <= obstacle.position.y + obstacle.height
      ) {
        goomba.velocity.y = 0; // Stop upward movement
        goomba.position.y = obstacle.position.y + obstacle.height; // Snap below the obstacle
      }
    }
  });
}


// Collision Detection for itembuff (CHATGPT)
function itembuffCollisions() {
  obstacles.forEach(obstacle => {
    // Horizontal collisions (left and right)
    if (
      itembuff.position.y + itembuff.height > obstacle.position.y &&
      itembuff.position.y < obstacle.position.y + obstacle.height
    ) {
      if (
        itembuff.velocity.x > 0 && // Move right
        itembuff.position.x + itembuff.width <= obstacle.position.x &&
        itembuff.position.x + itembuff.width + itembuff.velocity.x >= obstacle.position.x
      ) {
        itembuff.velocity.x = -1.5; // Reverse direction when colliding from the right
      }

      if (
        itembuff.velocity.x < 0 && // Move left
        itembuff.position.x >= obstacle.position.x + obstacle.width &&
        itembuff.position.x + itembuff.velocity.x <= obstacle.position.x + obstacle.width
      ) {
        itembuff.velocity.x = 1.5; // Reverse direction when colliding from the left
      }
    }

    // Vertical collisions (top and bottom)
    if (
      itembuff.position.x + itembuff.width > obstacle.position.x &&
      itembuff.position.x < obstacle.position.x + obstacle.width
    ) {
      // Check for bottom collision (falling)
      if (
        itembuff.velocity.y > 0 && // Falling
        itembuff.position.y + itembuff.height <= obstacle.position.y &&
        itembuff.position.y + itembuff.height + itembuff.velocity.y >= obstacle.position.y
      ) {
        itembuff.velocity.y = 0; // Stop falling
        itembuff.position.y = obstacle.position.y - itembuff.height; // Snap to the top of the obstacle
      }

      // Check for top collision (going up)
      if (
        itembuff.velocity.y < 0 && // Moving up
        itembuff.position.y >= obstacle.position.y + obstacle.height &&
        itembuff.position.y + itembuff.velocity.y <= obstacle.position.y + obstacle.height
      ) {
        itembuff.velocity.y = 0; // Stop upward movement
        itembuff.position.y = obstacle.position.y + obstacle.height; // Snap below the obstacle
      }
    }
  });
}

// Clear the canvas
function clearCanvas() {
  // Canvas цэвэрлэх
  c.clearRect(0, 0, canvas.width, canvas.height);
 
  // **Арын дэвсгэрийг бүтнээр нь зурах**
  c.drawImage(testlvl, 0, 0, canvas.width, canvas.height);
 
  // **Crop хийсэн хэсгийг зурах**
  const sx = 0;
  const sy = 0;
  const sw = 40;
  const sh = 100;
 
  const dx = 950;
  const dy = canvas.height - 80;
  const dw = 50;
  const dh = 100;
 
  // Crop хийсэн хэсгийг зурах
  c.drawImage(testlvl, sx, sy, sw, sh, dx, dy, dw, dh);
 
// image: Ашиглах зураг (зургийн объект).
// sx, sy: Эх зургийн хаанаас эхэлж crop хийх координат.
// sw, sh: Crop хийх өргөн (width) ба өндөр (height).
// dx, dy: Canvas дээр зурах байрлалын координат.
// dw, dh: Canvas дээр зурах өргөн ба өндөр.

}

const gaps = [
  { x: 950, y: canvas.height - 75, width: 30, height: 75 }
];
 
function checkGapCollision() {
  gaps.forEach(gap => {
    if (player.position.y + player.height >= gap.y && player.position.x + player.width >= gap.x && player.position.x <= gap.x + gap.width) {
      gameOver = true;
      gameOverSound.play();
      backgroundMusic.volume = 0; // Background music zogsoono
      // Delay the reload by 4 seconds (4000 milliseconds)
      setTimeout(() => {
        location.reload();
      }, 2800); // 4000 ms = 4 seconds
    }
  });
}

function checkCollision() {
  if (
    player.position.y + player.height > goomba.position.y &&
    player.position.y < goomba.position.y + goomba.height &&
    player.position.x + player.width > goomba.position.x &&
    player.position.x < goomba.position.x + goomba.width
  ) {
    if (player.position.y + player.height <= goomba.position.y + 10) {
      handleGoombaDeath();
      player.velocity.y = player.jumpVelocity;
    } else {
      handleGameOver();
    }
  }

  function handleGoombaDeath() {
    //goomba.dead = true;
    goomba.velocity.x = 0; // Goomba hudulguungui bolno
    // Goomba alga bolno
    goomba.width = 0;
    goomba.height = 0;
    console.log('Goomba died');
    goombaDeathsnd.play();
    goombaDeathsnd.volume = 1;
    score += 1000
  }

  function handleGameOver() {
    gameOver = true;
    gameOverSound.play();
    backgroundMusic.volume = 0; // Background music zogsoono
    console.log('Game Over');

    // Delay game restart by 3 seconds
    setTimeout(() => {
      restartGame();
    }, 4000); // 3000 milliseconds = 3 seconds
  }
}

function restartGame() {
  location.reload()
}



// frame by frame window updater
function animate() {
  window.requestAnimationFrame(animate);
  clearCanvas(); // Canvas arilgana
  drawObstacles(); // Obj gargana
  updatePlayerVelocity(); // Player horizontal movement
  resolveCollisions(); // Handle collisions
  resolveGoombaCollisions(); // Goomba colission
  itembuffCollisions(); // Check collision with buff item
  checkCollision();
  checkGapCollision();
  player.update(); // Player update
  player.draw(); // Create player
  goomba.draw(); // Create goomba
  goomba.update(); // Goomba update
  itembuff.update(); // Update item buff growing animation
  title.draw(); // Title Sign draw
  drawCountdownTimer(); // Countdown draw
}

// Event listener
addEventListener('keydown', handleKeyDown);
addEventListener('keyup', handleKeyUp);