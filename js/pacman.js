// Directions
var DIRECTIONS = {left:1, up:2, right:3, bottom:4};

// The pacman virtual grid
function Grid(config) {
  
  "use strict";
  
  if(config === null) { config = {}; }
  
  // Width
  var width = config.width;
  if(width === null || typeof width !== "number") { width = 19; }

  // Height
  var height = config.height;
  if(height === null || typeof height !== "number") { height = 22; }
  
  // The step scale
  var scale = config.scale;
  if(scale === null || typeof scale !== "number") { scale = 27; }
  
  // Init the canvas id
  var canvasId = config.canvas;
  if(canvasId === null) { canvasId = "canvas"; }
  
  // Init the canvas object
  var canvas = document.getElementById(canvasId);
  if(canvas !== null) {
    canvas.setAttribute("width", width*scale);
    canvas.setAttribute("height", height*scale);
  }
  
  // Public functions
  return {
    width: function() { return width; },
    height: function() { return height; },
    scale: function() { return scale; },
    
    // Drawing the pacman
    drawImage: function(img, x, y) {
      
      var canvas = document.getElementById(canvasId);
      if(canvas === null || !canvas.getContext) {
        return;
      }
      
      var ctx = canvas.getContext('2d');
      ctx.clearRect(0,0,width*scale,height*scale);
      ctx.drawImage(img,x,y);
    },

    drawBack: function(){
      var canvas = document.getElementById(canvasId);
      if(canvas === null || !canvas.getContext) {
        return;
        console.log('NULL CANVAS');
      }
      
      var ctx = canvas.getContext('2d');
      var back = new Image();
      back.onload = function() { ctx.drawImage(back, 0, 0); console.log(back);  };
      back.src = 'imgs/packground.png';
      console.log(back);
    },

    //background-image: url('../imgs/packground.png');
    rotate: function(){
        var canvas = document.getElementById(canvasId);
        if(canvas === null || !canvas.getContext) {
            return;
        }

        var ctx = canvas.getContext('2d');
        ctx.translate(canvas.width - 1, 0);
        ctx.rotate(Math.PI / 2);
        ctx.clearRect(0,0,width*scale,height*scale);
        var back = new Image();
        back.onload = function() { ctx.drawImage(back, 0, 0);  };
        back.src = 'imgs/packground.png';
    }
  }
  };

// The pacman prototype
function Pacman(config) {
  
  "use strict";
  
  if(config === null) { config = {}; }
  
  var x = config.x; if(x === null || typeof x !== "number" || x < 1) { x = 1; }
  var y = config.y; if(y === null || typeof y !== "number" || y < 1) { y = 1; }
  
  var direction = DIRECTIONS.right;
  
  // Init the grid
  var grid = config.grid;
  if(grid === null) { grid = new Grid(19, 22); }
  
  // Pacman image
  var img = new Image();
  img.src = config.image; if(img.src === null) { img.src = "imgs/pacman-right.gif"; }
  
  // Is pacman moving now
  var moving = false;
  
  // Internal function used to animate the pacman's movement
  var animateMove = function(currentX, currentY, dir, steps) {
    
    // Find the movement direction
    var step = 0;
    if(dir === DIRECTIONS.left || dir === DIRECTIONS.up) {
      step = -1;
    } else {
      step = 1;
    }
    
    // Calculate new position and draw
    var i = 0;
    var interval = null;
    
    var newX = (currentX-1)*grid.scale();
    var newY = (currentY-1)*grid.scale();
    
    var moveSize = 5;
    
    var draw = function() {
      
      if(dir === DIRECTIONS.left || dir === DIRECTIONS.right) {
        newX = newX+(step*grid.scale()/moveSize);
      } else {
        newY = newY+(step*grid.scale()/moveSize);
      }
      
      grid.drawImage(img, newX, newY);
      
      i = i+1;
      if(i === steps*moveSize && interval !== null) {
        clearInterval(interval);
        moving=false;
      }
    };
    
    // Animer
    moving=true;
    interval=setInterval(draw, 5);
    
  };
  
  // Internal function to change direction
  var changeDirection = function(dir) {
    if(typeof dir !== "number" || dir < 1 || dir > 4) {
      return false;
    }
    
    direction = dir;
    
    // Change image
    switch(direction) {
      case DIRECTIONS.up:
        img.src = "imgs/pacman-up.gif";
      break;
      case DIRECTIONS.right:
        img.src = "imgs/pacman-right.gif";
      break;
      case DIRECTIONS.bottom:
        img.src = "imgs/pacman-bottom.gif";
      break;
      case DIRECTIONS.left:
        img.src = "imgs/pacman-left.gif";
      break;
    }
    
    return true;
  };
  
  // Internal function used to move the pacman
  var move = function(dir, steps) {
    
    // If pacman is moving or can't change direction
    if(moving || !changeDirection(dir)) {
      return;
    }
    
    // Check impossible moves
    if( (x===1 && dir===DIRECTIONS.left) || (x===grid.width() && dir===DIRECTIONS.right) ||
      (y===1 && dir===DIRECTIONS.up) || (y===grid.height() && dir===DIRECTIONS.bottom)) {
      return;
    }
    
    // Check direction and steps sign
    var realSteps = steps;
    if(dir === DIRECTIONS.left || dir === DIRECTIONS.up) {
      realSteps = realSteps * (-1); 
    }
    
    // Check new position
    if(dir === DIRECTIONS.right && x+realSteps >= grid.width()) { realSteps = grid.width()-x; }
    if(dir === DIRECTIONS.left && x+realSteps <= 0) { realSteps = -x+1; }
    if(dir === DIRECTIONS.bottom && y+realSteps >= grid.height()) { realSteps = grid.height()-y; }
    if(dir === DIRECTIONS.up && y+realSteps <= 0) {realSteps = -y+1; }
    
    // Absolute value of real steps
    var absRealSteps = realSteps;
    if(absRealSteps < 0) { absRealSteps = absRealSteps*(-1); }
    
    // Animate the pacman
    animateMove(x, y, dir, absRealSteps, grid);
    
    // Update position 
   if(dir === DIRECTIONS.left || dir === DIRECTIONS.right) {
      x = realSteps+x;
    } else {
      y = realSteps+y;
    }
  };
  
  // Public accessors and functions
  return {
    
    // Get horizontal 
    x: function() {
      return x;
    },
    
    // Get vertical position
    y: function() {
      return y;
    },
    
    // Get direction
    direction: function() {
      return direction; 
    },
    
    // Move the pacman
    move: function(dir, steps) {
      move(dir, steps);
    },
    
    // Move left
    moveLeft: function() {
      move(DIRECTIONS.left, 1);
    },
    
    // Move left
    moveRight: function() {
      move(DIRECTIONS.right, 1);
    },
    
    // Move left
    moveUp: function() {
      move(DIRECTIONS.up, 1);
    },
    
    // Move left
    moveBottom: function() {
      move(DIRECTIONS.bottom, 1);
    },
    
    // Set image
    setImage: function(uri) {
      img.src = uri;
    }
  };
}


var grid = new Grid({width:19, height:22, canvas:"gamespace"});
var pacman = new Pacman({grid:grid, image:'imgs/pacman-left.gif'});

grid.drawBack();
console.log(grid);
