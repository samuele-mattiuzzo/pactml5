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
var interval = Math.floor((Math.random()*30)+15);
// record start time
var startTime = new Date();

var canvas = document.getElementById('gamespace');
if (canvas.getContext)
	var context = canvas.getContext('2d');

// DRAW PACMAN
var updatePac = function(){
		for(var i=0; i<grid.length; i++)
			for(var j=0; j<grid[0].length; j++)
				if (grid[i][j] == 10) {
					this.x = j;
					this.y = i;
					grid[i][j] = 1;
				}
	};

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
  	context.fillText("PLAYER: " + interval, canvas.width-130, 25);
  	context.fillText("SCORE: " + SCORE, canvas.width-130, 39);
  	context.fillText("LEVEL: " + LEVEL, canvas.width-130, 53);
  	context.fillText("PILLS: " + PILLS_LEFT + "/" + TOTAL_PILLS , canvas.width-130, 67);
  	context.fillText("LIVES: " + LIVES_LEFT + "/" + LIVES , canvas.width-130, 81);
}

// UPDATE 
var update = function (modifier) {
	var endTime = new Date();
	var timeDiff = (endTime - startTime)/1000;

	if (TO_GRAVITATE) {
		gravityFall(modifier);
	} else {

	if (82 in keysDown || (Math.round(timeDiff % 60) % interval == 0)) {

		interval = Math.floor((Math.random()*45)+15);
		var nxy = findValidPos();
		grid[nxy[1]][nxy[0]] = 10;
		grid = grid.rightRotation();
		context.clearRect ( 0 , 0 , canvas.width , canvas.height );
		drawGrid();
		updatePac();
		TO_GRAVITATE = true;
		startTime = new Date();

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

		else if (39 in keysDown && isValidMove(hero.x, hero.y, 39)) { //RIGHT
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
		startTime = new Date();
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