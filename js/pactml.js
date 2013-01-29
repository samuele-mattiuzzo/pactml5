/* GLOBAL VARIABLES */

var gridReady = false;
var TO_GRAVITATE = false;

var LEVEL = 1;
var DIFFICULTY = 1;
var SCORE = 0;
var TOTAL_PILLS = 177;
var PILLS_LEFT = 0;
var LIVES = 3;
var LIVES_LEFT = LIVES;
var USER = 'Player';

var canvas = document.getElementById('gamespace');
if (canvas.getContext)
	var context = canvas.getContext('2d');


// Grid design:
// 0 : wall
// 2 : pill
// 3 : cherry
// 4 : house door
// 1 : black background
var grid = [

[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, -1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
[0, -1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 4, 0],
[0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0],
[0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
[0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0],
[0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0],
[0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0],
[2, 2, 2, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 2, 2, 2],
[0, 0, 0, 0, 1, 0, 1, 0, 0, 3, 0, 0, 1, 0, 1, 0, 0, 0, 0],
[2, 2, 2, 2, 1, 1, 1, 0, -1, -1, -1, 0, 1, 1, 1, 2, 2, 2, 2],
[0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0],
[2, 2, 2, 0, 1, 0, 1, 1, 1, 2, 1, 1, 1, 0, 1, 0, 2, 2, 2],
[0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0],
[0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
[0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0],
[0, 4, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 4, 0],
[0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0],
[0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0],
[0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0],
[0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

/* END GLOBAL VARIABLES */

var drawBlock = function(fill, i, j, blockSize){
	context.fillStyle = 'rgb('+fill[0]+','+fill[1]+','+fill[2]+')';
	context.fillRect((j * blockSize) ,
                     (i * blockSize) ,
                      blockSize , blockSize );
}

// DRAW GAME GRID
var drawGrid = function() {

    var blockSize = 7;
    var fill = ['0','0','0'];

	for(var i=0; i<grid.length; i += 1){
		for(var j=0; j<grid[0].length; j += 1){
			
			switch(grid[i][j]) {
				case 0:
					// wall
					drawBlock(['0','0','255'], i, j, blockSize);
					break;

				case 1:
					// pill
					drawBlock(['0','0','0'], i, j, blockSize);
					drawPill(j,i,['255','255','255']);
					break;

				case 4:
					// cherry
					drawBlock(['0','0','0'], i, j, blockSize);
					drawPill(j,i,['205','20','31']);
					break;

				case 3:
					// ghost house door
					drawBlock(['255','255','255'], i, j, blockSize);
					break;

				default:
					// background and not yet implemented squares
					drawBlock(['0','0','0'], i, j, blockSize);
					break;
			}				

			
		}
	}

};

// PACMAN DATA
var hero = {
	speed: 9, // PX / sec
	x: 1,
	y: 1
};

// DRAW PILL
var drawPill = function(x,y,fill){
	
  	var blockSize = 7;
    
	context.fillStyle = 'rgb('+fill[0]+','+fill[1]+','+fill[2]+')';
	context.fillRect(
		(x * blockSize) + 3.3,
        (y * blockSize) + 3.3,
        1.5, 1.5 );
	
}

// DRAW PACMAN
var drawPac = function(x,y){
	
  	var blockSize = 7;
    var fill = ['255','238','0'];
    context.fillStyle = 'rgb('+fill[0]+','+fill[1]+','+fill[2]+')';

	context.fillRect(
		(x * blockSize) + 1.5,
        (y * blockSize) + 1.5,
        3.5, 3.5 );

}

var updatePac = function(){
	for(var i=0; i<grid.length; i++)
		for(var j=0; j<grid[0].length; j++)
			if (grid[i][j] == 10) { 
				hero.x = j; 
				hero.y = i; 
				grid[i][j] = 1; 
			}
}

var checkEat = function(x,y) {
	if (grid[y][x] == 1 || grid[y][x] == 4) {
		SCORE += 2 * grid[y][x];
		grid[y][x] = -1;
		PILLS_LEFT += 1;
		context.clearRect ( 0 , 0 , canvas.width , canvas.height );
		drawGrid();

	}
}

var gravityFall = function(modifier) {
	if ( isValidMove(hero.x, hero.y, 40) ) {
		hero.y += (hero.speed/2 * modifier);
	} else {
		TO_GRAVITATE = false;
	}
}

// KEYBOARD HANDLERS
var keysDown = {};

addEventListener("keydown", function (e) {
		console.log(e.keyCode);
		keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);


var isValidMove = function(x,y,key){
	if (y-0.3 >= 0 && key == 38 )
		if (grid[Math.floor(y-0.3)][Math.floor(x+0.6)] != 0 &&
			grid[Math.floor(y-0.3)][Math.floor(x)] != 0)
			return true;

	if (y+0.8 <= grid.length-1 && key == 40 )
		if (grid[Math.floor(y+0.8)][Math.floor(x+0.6)] != 0 &&
			grid[Math.floor(y+0.8)][Math.floor(x)] != 0)
			return true;

	if (x-0.3 >= 0 && key == 37 )
		if (grid[Math.floor(y+0.6)][Math.floor(x-0.3)] != 0 &&
			grid[Math.floor(y)][Math.floor(x-0.3)] != 0)
			return true;

	if (x+0.8 <= grid[0].length-1 && key == 39 )
		if (grid[Math.floor(y+0.6)][Math.floor(x+0.8)] != 0 &&
			grid[Math.floor(y)][Math.floor(x+0.8)] != 0)
			return true;

	return false

}

var findValidPos = function(){
	var tx = Math.floor(hero.x);
	var ty = Math.floor(hero.y);

	if (grid[ty][tx] == 1)
		return [tx,ty];

	if (grid[ty+1][tx] == 1)
		return [tx,ty+1];

	if (grid[ty-1][tx] == 1)
		return [tx,ty-1];

	if (grid[ty][tx+1] == 1)
		return [tx+1,ty];

	if (grid[ty][tx-1] == 1)
		return [ty,tx-1];

	return [1,1];
}

var gui = function() {
	context.fillStyle = "yellow";
  	context.font = "12px BIT-FONT, sans-serif";
  	context.fillText("PLAYER: " + USER, canvas.width-130, 25);
  	context.fillText("SCORE: " + SCORE, canvas.width-130, 39);
  	context.fillText("LEVEL: " + LEVEL, canvas.width-130, 53);
  	context.fillText("PILLS: " + PILLS_LEFT + "/" + TOTAL_PILLS , canvas.width-130, 67);
  	context.fillText("LIVES: " + LIVES_LEFT + "/" + LIVES , canvas.width-130, 81);
}


// UPDATE 
var update = function (modifier) {

	if (TO_GRAVITATE) {
		gravityFall(modifier);
	} else {

	if (82 in keysDown) {
		var nxy = findValidPos();
		grid[nxy[1]][nxy[0]] = 10;
		grid = grid.rightRotation();
		context.clearRect ( 0 , 0 , canvas.width , canvas.height );
		drawGrid();
		updatePac();
		TO_GRAVITATE = true;
	}
	else{
		if (38 in keysDown && isValidMove(hero.x, hero.y, 38)) { // UP
			hero.y -= hero.speed * modifier;
		}
		
		else if (40 in keysDown && isValidMove(hero.x, hero.y, 40)) { // DOWN
				hero.y += hero.speed * modifier;
		}

		else if (37 in keysDown && isValidMove(hero.x, hero.y, 37)) { // LEFT
				hero.x -= hero.speed * modifier;
		}

		else if (39 in keysDown && isValidMove(hero.x, hero.y, 39)) { // RIGHT
				hero.x += hero.speed * modifier;
		}
		checkEat(Math.floor(hero.x), Math.floor(hero.y));
		
	}
	
	}
	
	drawPac(hero.x, hero.y);
	gui();
};

var reset = function () {
	hero.x = 1;
	hero.y = 1;
};


var START = false;

var newGameGui = function() {
	context.fillStyle = "yellow";
  	context.font = "16px BIT-FONT, sans-serif";
  	context.fillText("PACTML!!", canvas.width/2.8, 25);
  	context.fillText("Press N to start a new game", canvas.width/7, 45);
}

var gameOverGui = function() {
	context.fillStyle = "yellow";
  	context.font = "16px BIT-FONT, sans-serif";
  	context.fillText("GAME OVER", canvas.width/3, 25);
  	context.fillText("FINAL SCORE: " + SCORE, canvas.width/3.3, 51);
  	context.fillText("LEVEL: " + LEVEL, canvas.width/2.5, 67);
  	context.fillText("Press N to start a new game", canvas.width/6.5, 103);
}

// MAIN LOOP
var main = function(){
	var now = Date.now();
	var delta = now - then;
	
	if (78 in keysDown && !START){
		START = true;
		LIVES_LEFT = LIVES;
		context.clearRect ( 0 , 0 , canvas.width , canvas.height );
	} else if (81 in keysDown && START) {
		START = false;
		LIVES_LEFT = 0;
		context.clearRect ( 0 , 0 , canvas.width , canvas.height );
	}

	if (!START){
		if (LIVES_LEFT == 0)
			gameOverGui();
		else
			newGameGui();
	} else {
		drawGrid();
		update(delta / 1000);
	}
	

	then = now;
}

var then = Date.now();
setInterval(main, 1);