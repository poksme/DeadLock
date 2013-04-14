function Cube () {
// PROPERTIES
	var pvt = {
		x: 0,
		y: 0,
		z: 0
	};
	var angle = {
		x:0,
		y:0,
		z:0
	};
	var position = {
		x: config.screenWidth / 2,
		y: config.screenHeight / 2,
		z: config.screenHeight * config.scaleMultiplier //0.77
	};
	position.z = 3.4//1.8;
	var size = 60;
	var dimensions = [
		{x: size, y: size, z:-size},
		{x: size, y: size, z: size},
		{x: size, y:-size, z:-size},
		{x: size, y:-size, z: size},
		{x:-size, y: size, z:-size},
		{x:-size, y: size, z: size},
		{x:-size, y:-size, z:-size},
		{x:-size, y:-size, z: size}
	];
	var faces = [
		[2, 3, 7, 6],
		[0, 1, 5, 4],
		[0, 1, 3, 2],
		[4, 5, 7, 6],
		[0, 2, 6, 4],
		[1, 5, 7, 3]
	];
	var offsets = [];
//
// METHODS
	// INPUTS
		this.MoveLeft = function (dist) {
			position.x -= dist;
		};
		this.MoveUp = function (dist) {
			position.y -= dist;
		};
		this.MoveRight = function (dist) {
			position.x += dist;
		};
		this.MoveDown = function (dist) {
			position.y += dist;
		};
		this.ScaleUp = function (zoom) {
			position.z /= zoom;
		};
		this.ScaleDown = function (zoom) {
			position.z *= zoom;
		};
		this.TurnX = function (deg) {
			angle.x += deg;
		};
		this.TurnY = function (deg) {
			angle.y += deg
		};
		this.TurnZ = function (deg) {
			angle.z += deg
		};
		this.SetPosX = function (val) {
			position.x = val;
		}
	//
	// UPDATE
		var GetOffset = function (dim) {
			var XD = dim.x - pvt.x;
			var YD = dim.y - pvt.y;
			var ZD = dim.z - pvt.z;
			var ZX = XD * Math.cos(angle.z) - YD * Math.sin(angle.z) - XD;
			var ZY = XD * Math.sin(angle.z) + YD * Math.cos(angle.z) - YD;
			var YX = (XD + ZX) * Math.cos(angle.y) - ZD * Math.sin(angle.y) - (XD + ZX);
			var YZ = (XD + ZX) * Math.sin(angle.y) + ZD * Math.cos(angle.y) - ZD;
			var XY = (YD + ZY) * Math.cos(angle.x) - (ZD + YZ) * Math.sin(angle.x) - (YD + ZY);
			var XZ = (YD + ZY) * Math.sin(angle.x) + (ZD + YZ) * Math.cos(angle.x) - (ZD + YZ);
			return {
				x: YX + ZX,
				y: ZY + XY,
				z: XZ + YZ
			};
		};
		this.Update = function (timer) {
			for (var i = 0; i < dimensions.length; i++) {
				offsets[i] = GetOffset(dimensions[i]);
			}
		};
	//
	// DRAW
		var MoveTo = function (ctx, index) {
			ctx.moveTo(
				(dimensions[index].x + offsets[index].x) / position.z + position.x,
				(dimensions[index].y + offsets[index].y) / position.z + position.y
			);
		};
		var LineTo = function (ctx, index) {
			ctx.lineTo(
				(dimensions[index].x + offsets[index].x) / position.z + position.x,
				(dimensions[index].y + offsets[index].y) / position.z + position.y
			);
		};
		this.Draw = function (canvas) {
			var ctx = canvas.GetContext();
			ctx.beginPath();
			ctx.strokeStyle = '#FFF';
			ctx.lineWidth = 1;
			for (var i = 0; i < faces.length; i++) {
				for (var j = 0; j < faces[i].length; j++) {
					if (j === 0) {
						MoveTo(ctx, faces[i][j]);
					} else if (j + 1 === faces[i].length) {
						LineTo(ctx, faces[i][j]);
						LineTo(ctx, faces[i][0]);
					} else {
						LineTo(ctx, faces[i][j])
					}
				}
			}
			ctx.stroke();
		};
	//
//
}