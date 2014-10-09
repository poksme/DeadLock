function Font() {
// CONSTRUCTOR
	if (Font.prototype._singletonInstance) {
		return Font.prototype._singletonInstance;
	}
	Font.prototype._singletonInstance = this;
//
// PROPERTIES
	var blockWidth;
	var leftPadding = 0;
	var topPadding = 0;
	var msg = "0x0x0x";
	var characters = {
		'0': [
		"XXXX ",
		"X   X",
		"X   X",
		"XXXX ",
		"X X  ",
		"X  X ",
		"X   X"
		],
		'x':[
		"     ",
		"     ",
		"X   X",
		" X X ",
		"  X  ",
		" X X ",
		"X   X"
		],
		'D': [
		"XXXX ",
		"X   X",
		"X   X",
		"X   X",
		"X   X",
		"X   X",
		"XXXX "
		],
		'E': [
		"XXXXX",
		"X    ",
		"X    ",
		"XXX  ",
		"X    ",
		"X    ",
		"XXXXX"
		],
		'A': [
		" XXX ",
		"X   X",
		"X   X",
		"X   X",
		"XXXXX",
		"X   X",
		"X   X"
		],
		'1': [
		"  X  ",
		" XX  ",
		"  X  ",
		"  X  ",
		"  X  ",
		"  X  ",
		"  X  ",
		],
		'C': [
		" XXX ",
		"X   X",
		"X    ",
		"X    ",
		"X    ",
		"X   X",
		" XXX "
		],
	};
//
	this.ReInit = function () {
		blockWidth = Math.min(config.screenWidth, config.screenHeight) * 0.006; // 5
	}
	this.ReInit();
// METHODS
	this.Update = function (timer) {
		blockWidth += timer.GetSin() / 400;
		leftPadding = config.screenWidth / 2 - ((msg.length * 6 + timer.GetSin()) * blockWidth - blockWidth) / 2;
		topPadding = config.screenHeight / 2 - (7 + timer.GetCos()) * blockWidth / 2;
	};
	this.Draw = function (canvas) {
		var ctx = canvas.GetContext();
		ctx.beginPath();
		ctx.strokeStyle = '#DEAD';
		ctx.lineWidth = blockWidth + 1;
		ctx.lineJoin = 'miter';
		ctx.fillStyle = '#000';
		for (var i = 0; i < msg.length; i++) {
			for (var j = 0; j < characters[msg[i]].length; j++) {
				for (var k = 0; k < characters[msg[i]][j].length; k++) {
					if (characters[msg[i]][j][k] === 'X') {
						ctx.moveTo(leftPadding + (i * 6 * blockWidth) + k * blockWidth, topPadding + j * blockWidth);
						ctx.lineTo(leftPadding + (i * 6 * blockWidth) + k * blockWidth + blockWidth, topPadding + j * blockWidth);
						ctx.lineTo(leftPadding + (i * 6 * blockWidth) + k * blockWidth + blockWidth, topPadding + j * blockWidth + blockWidth);
						ctx.lineTo(leftPadding + (i * 6 * blockWidth) + k * blockWidth, topPadding + j * blockWidth + blockWidth);
						ctx.lineTo(leftPadding + (i * 6 * blockWidth) + k * blockWidth, topPadding + j * blockWidth);
					}
				}
			}
		}
		ctx.stroke();
		ctx.fill();
	};
//
};
