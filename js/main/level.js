/**
 *
 * The grid
 *
 * 0 : wall
 * 2 : pill
 * 3 : cherry
 * 4 : house door
 * 1 : black background
 * 9 : default (white) square
 *
 */

function Level() {

	this.block_size = 7;
	this.blue = ['0', '0', '255'];
	this.black = ['0', '0', '0'];
	this.white = ['255', '255', '255'];
	this.cherry = ['205','20','31'];

	this.grid = [
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 9, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
		[0, 9, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 4, 0],
		[0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0],
		[0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
		[0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0],
		[0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0],
		[0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0],
		[2, 2, 2, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 2, 2, 2],
		[0, 0, 0, 0, 1, 0, 1, 0, 0, 3, 0, 0, 1, 0, 1, 0, 0, 0, 0],
		[2, 2, 2, 2, 1, 1, 1, 0, 9, 9, 9, 0, 1, 1, 1, 2, 2, 2, 2],
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

	this.drawPill = function(ctx, x, y, fill){
		ctx.fillStyle = 'rgb('+fill[0]+','+fill[1]+','+fill[2]+')';
		ctx.fillRect((j * this.block_size) + 3.3 ,
                     (i * this.block_size) + 3.3 ,
                      1.5 , 1.5 );
	};

	this.drawBlock = function(ctx, fill, i, j){
		ctx.fillStyle = 'rgb('+fill[0]+','+fill[1]+','+fill[2]+')';
		ctx.fillRect((j * this.block_size) ,
                     (i * this.block_size) ,
                      this.block_size , this.block_size );
	};

	this.drawGrid = function(ctx) {

		for(var i=0; i<grid.length; i += 1){
			for(var j=0; j<grid[0].length; j += 1){
				switch(grid[i][j]) {
				case 0:
					// wall
					drawBlock(ctx, this.blue, i, j);
					break;

				case 1:
					// pill
					drawBlock(ctx, this.black, i, j);
					drawPill(ctx, j, i, this.white);
					break;

				case 4:
					// cherry
					drawBlock(ctx, this.black, i, j);
					drawPill(ctx, j, i, this.cherry);
					break;

				case 3:
					// ghost house door
					drawBlock(ctx, this.white, i, j);
					break;

				default:
					// background and not yet implemented squares
					drawBlock(ctx, this.black, i, j);
					break;
				}
			}
		}
	};
}
