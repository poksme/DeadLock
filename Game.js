var background = new Background();
var cube = new Cube();
var cubeA = new CubeA();
var font = new Font();


function Update (timer) {
	timer.Update();
	cube.TurnX(config.speed / 3 * timer.GetElapsedTime());
	cube.TurnY(config.speed / 3 * timer.GetElapsedTime());
	cube.TurnZ(config.speed / 3 * timer.GetElapsedTime());
	if (timer.GetSin() < 0) {
		cube.ScaleDown(1 + Math.abs(timer.GetSin() / 50)); // 50
		cube.ThicknessDown(1 + Math.abs(timer.GetSin() / 50));
	} else {
		cube.ScaleUp(1 + timer.GetSin() / 50);
		cube.ThicknessUp(1 + Math.abs(timer.GetSin() / 50));
	}
	cube.SetPosX(config.screenWidth / 5 + timer.GetSin() * (Math.min(config.screenWidth, config.screenHeight) / 3.5))//200);
	cube.Update(timer);
	cubeA.TurnX(config.speed / 3 * timer.GetElapsedTime());
	cubeA.TurnY(config.speed / 3 * timer.GetElapsedTime());
	cubeA.TurnZ(config.speed / 1 * timer.GetElapsedTime());
	if (timer.GetSin() < 0) {
		cubeA.ScaleDown(1 + Math.abs(timer.GetSin() / 50)); // 50
		cubeA.ThicknessDown(1 + Math.abs(timer.GetSin() / 58));
	} else {
		cubeA.ScaleUp(1 + timer.GetSin() / 50);
		cubeA.ThicknessUp(18 + Math.abs(timer.GetSin() / 50));
	}
	cubeA.SetPosX(config.screenWidth / 6 + timer.GetSin() * (Math.min(config.screenWidth, config.screenHeight) / 3.5))//200);
	cubeA.Update(timer);
	background.Update(timer);
	font.Update(timer);
}

function Draw (canvas, timer) {
	canvas.ClearScreen();
	// background.Draw(canvas);
	if (timer.GetLastSin() > timer.GetSin()) {
		font.Draw(canvas);
		cube.Draw(canvas);
        cubeA.Draw(canvas);
	} else {
		cube.Draw(canvas);
        cubeA.Draw(canvas);
		font.Draw(canvas);
	}
}

$(document).ready(function () {
	var canvas = new Canvas();
	window.onresize = function () {
		config.screenWidth = window.innerWidth;
		config.screenHeight = window.innerHeight;
		canvas.ReInit();
		cube.ReInit();
		cubeA.ReInit();
		font.ReInit();
	}
	var timer = new Timer();
	setInterval(function () {
		Update(timer);
		Draw(canvas, timer);
	}, 1000 / config.fps);
});
