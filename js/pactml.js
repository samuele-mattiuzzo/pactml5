// Grid design:
// 0 : wall
// 2 : pill
// 3 : cherry
// 4 : house door
// 1 : black background

var gridReady = false;
var TO_GRAVITATE = false;

var canvas = document.getElementById('gamespace');
    if (canvas.getContext)
      var context = canvas.getContext('2d');

var grid = [

[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
[0, 4, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 4, 0],
[0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0],
[0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
[0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0],
[0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0],
[0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0],
[2, 2, 2, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 2, 2, 2],
[0, 0, 0, 0, 1, 0, 1, 0, 0, 3, 0, 0, 1, 0, 1, 0, 0, 0, 0],
[2, 2, 2, 2, 1, 1, 1, 0, 3, 3, 3, 0, 1, 1, 1, 2, 2, 2, 2],
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

// DRAW GAME GRID
var drawGrid = function() {

	var canvas = document.getElementById('gamespace');
    if (canvas.getContext)
      var context = canvas.getContext('2d');

    var blockSize = 7;
    var fill = ['0','0','0'];

	for(var i=0; i<22; i += 1){
		for(var j=0; j<19; j += 1){
			
			switch(grid[i][j]) {
				case 0:
					// wall
					fill = ['0','0','255'];
					break;

				case 9:
					// ghost house
					fill = ['255','255','255'];
					break;

				default:
					// background and not yet implemented squares
					fill = ['0','0','0'];
					break;
			}				

			context.fillStyle = 'rgb('+fill[0]+','+fill[1]+','+fill[2]+')';

			context.fillRect((j * blockSize) ,
                             (i * blockSize) ,
                             blockSize , blockSize );
		}
	}
};

// PACMAN DATA
var hero = {
	speed: 9, // PX / sec
	x: 1,
	y: 1
};


// DRAW PACMAN
var drawPac = function(x,y){
	
  	var blockSize = 7;
    var fill = ['0','255','0'];
    context.fillStyle = 'rgb('+fill[0]+','+fill[1]+','+fill[2]+')';

	context.fillRect(
		(x * blockSize) + 1,
        (y * blockSize) + 1,
        3.5, 3.5 );

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

	if (y+0.8 <= 21 && key == 40 )
		if (grid[Math.floor(y+0.8)][Math.floor(x+0.6)] != 0 &&
			grid[Math.floor(y+0.8)][Math.floor(x)] != 0)
			return true;

	if (x-0.3 >= 0 && key == 37 )
		if (grid[Math.floor(y+0.6)][Math.floor(x-0.3)] != 0 &&
			grid[Math.floor(y)][Math.floor(x-0.3)] != 0)
			return true;

	if (x+0.8 <= 18 && key == 39 )
		if (grid[Math.floor(y+0.6)][Math.floor(x+0.8)] != 0 &&
			grid[Math.floor(y)][Math.floor(x+0.8)] != 0)
			return true;
	return false

}

// UPDATE 
var update = function (modifier) {

	if (TO_GRAVITATE) {
		gravityFall(modifier);
	} else {

	if (82 in keysDown) { 
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
		
	}
	}
	drawPac(hero.x, hero.y);
};

var reset = function () {
	hero.x = 1;
	hero.y = 1;
};

// MAIN LOOP
var main = function(){
	var now = Date.now();
	var delta = now - then;
	
	
	drawGrid();
	update(delta / 1000);

	then = now;
}

var then = Date.now();
setInterval(main, 1);