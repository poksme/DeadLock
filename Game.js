var inputs = new Inputs();
var background = new Background();
var cube = new Cube();
var letters = {
	blockWidth: 5,
	leftPadding: 0,
	topPadding: 0,
	msg: "0xDEAD10CC",
	font: {
		'0': [
		" XXX ",
		"X   X",
		"XX  X",
		"X X X",
		"X  XX",
		"X   X",
		" XXX "
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

	},
	Update: function (timer) {
		this.blockWidth += timer.GetSin() / 400;
		this.leftPadding = config.screenWidth / 2 - ((this.msg.length * 6 + timer.GetSin()) * this.blockWidth - this.blockWidth) / 2;
		this.topPadding = config.screenHeight / 2 - (7 + timer.GetCos()) * this.blockWidth / 2;
	},
	Draw: function (canvas) {
		var ctx = canvas.GetContext();
		ctx.beginPath();
		ctx.strokeStyle = '#FFF';
		ctx.lineWidth = this.blockWidth + 1;
		ctx.lineJoin = 'miter';
		ctx.fillStyle = '#000';
		for (var i = 0; i < this.msg.length; i++) {
			for (var j = 0; j < this.font[this.msg[i]].length; j++) {
				for (var k = 0; k < this.font[this.msg[i]][j].length; k++) {
					if (this.font[this.msg[i]][j][k] === 'X') {
						ctx.moveTo(this.leftPadding + (i * 6 * this.blockWidth) + k * this.blockWidth, this.topPadding + j * this.blockWidth);
						ctx.lineTo(this.leftPadding + (i * 6 * this.blockWidth) + k * this.blockWidth + this.blockWidth, this.topPadding + j * this.blockWidth);
						ctx.lineTo(this.leftPadding + (i * 6 * this.blockWidth) + k * this.blockWidth + this.blockWidth, this.topPadding + j * this.blockWidth + this.blockWidth);
						ctx.lineTo(this.leftPadding + (i * 6 * this.blockWidth) + k * this.blockWidth, this.topPadding + j * this.blockWidth + this.blockWidth);
						ctx.lineTo(this.leftPadding + (i * 6 * this.blockWidth) + k * this.blockWidth, this.topPadding + j * this.blockWidth);
					}
				}
			}
		}
		ctx.stroke();
		ctx.fill();
	}
};

function Update (timer) {
	timer.Update();
	// if (inputs.IsPressed('left')) {
	// 	cube.MoveLeft(config.mvmtSpeed * timer.GetElapsedTime());
	// } if (inputs.IsPressed('up')) {
	// 	cube.MoveUp(config.mvmtSpeed * timer.GetElapsedTime());
	// } if (inputs.IsPressed('right')) {
	// 	cube.MoveRight(config.mvmtSpeed * timer.GetElapsedTime());
	// } if (inputs.IsPressed('down')) {
	// 	cube.MoveDown(config.mvmtSpeed * timer.GetElapsedTime());
	// } if (inputs.IsPressed('[')) {
	// 	cube.ScaleDown(1 + 0.003 * timer.GetElapsedTime());
	// } if (inputs.IsPressed(']')) {
	// 	cube.ScaleUp(1 + 0.003 * timer.GetElapsedTime());
	// }
	cube.TurnX(config.speed / 3 * timer.GetElapsedTime());
	cube.TurnY(config.speed / 3 * timer.GetElapsedTime());
	cube.TurnZ(config.speed / 3 * timer.GetElapsedTime());
	if (timer.GetSin() < 0) {
		cube.ScaleDown(1 + Math.abs(timer.GetSin() / 30)); // 50
	} else {
		cube.ScaleUp(1 + timer.GetSin() / 30);
	}
	// if (timer.GetCos() > 0) {
		// console.log(timer.GetCos());
	cube.SetPosX(config.screenWidth / 2 + timer.GetSin() * 200);
	// } else {
		// cube.MoveLeft(Math.abs(timer.GetCos() * 10));
	// }
	background.Update(timer);
	cube.Update(timer);
	letters.Update(timer);
}

function Draw (canvas, timer) {
	canvas.ClearScreen();
	background.Draw(canvas);
	if (timer.GetLastSin() > timer.GetSin()) {
		letters.Draw(canvas);
		cube.Draw(canvas);
	} else {
		cube.Draw(canvas);
		letters.Draw(canvas);
	}
}

$(document).ready(function () {
	var canvas = new Canvas();
	var timer = new Timer();
	setInterval(function () {
		Update(timer);
		Draw(canvas, timer);
	}, 1000 / config.fps);
});