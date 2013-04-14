var background = new Background();
var cube = new Cube();
var font = new Font();


function Update (timer) {
	timer.Update();
	cube.TurnX(config.speed / 3 * timer.GetElapsedTime());
	cube.TurnY(config.speed / 3 * timer.GetElapsedTime());
	cube.TurnZ(config.speed / 3 * timer.GetElapsedTime());
	if (timer.GetSin() < 0) {
		cube.ScaleDown(1 + Math.abs(timer.GetSin() / 30)); // 50
	} else {
		cube.ScaleUp(1 + timer.GetSin() / 30);
	}
	cube.SetPosX(config.screenWidth / 2 + timer.GetSin() * 200);
	background.Update(timer);
	cube.Update(timer);
	font.Update(timer);
}

function Draw (canvas, timer) {
	canvas.ClearScreen();
	background.Draw(canvas);
	if (timer.GetLastSin() > timer.GetSin()) {
		font.Draw(canvas);
		cube.Draw(canvas);
	} else {
		cube.Draw(canvas);
		font.Draw(canvas);
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