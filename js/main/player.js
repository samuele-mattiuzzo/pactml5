/**
 *
 * Pacman
 *
 */

function Player() {
	this.speed = 9; // pixel per second
	this.x = 1; this.y = 1;
	this.block_size = 7;
	this.yellow = ['255','238','0'];

	this.drawPac = function(ctx){
		ctx.fillStyle = 'rgb('+fill[0]+','+fill[1]+','+fill[2]+')';

		c.fillRect((this.x * this.block_size) + 1.5,
						(this.y * this.block_size) + 1.5,
						3.5 , 3.5 );
	};

	this.updatePos = function(x, y) {
		this.x = x;
		this.y = y;
	};

	this.updatePac = function(){
		for(var i=0; i<grid.length; i++)
			for(var j=0; j<grid[0].length; j++)
				if (grid[i][j] == 10) {
					this.x = j;
					this.y = i;
					grid[i][j] = 1;
				}
	};
}
