function Background () {
// CONSTRUCTOR
	if (Background.prototype._singletonInstance) {
		return Background.prototype._singletonInstance;
	}
	Background.prototype._singletonInstance = this;
//
// PROPERTIES
	var _count = 0;
	var _markers = [];
	for (var i = 0; i < config.markerNbr; i++) {
		_markers[i] = {
			depth:config.depthLimit / config.markerNbr * (i + 1), 
			gray: 'none'
		};
	}
	var _directions = [
		{name:'up', out: false},
		{name:'down', out: false},
		{name:'left', out: false},
		{name:'right', out: false}
	];
//
// METHODS
	var IsADirection = function (str) {
		for (var i = 0; i < _directions.length; i++) {
			if (str === _directions[i].name)
				return true;
		}
		return false;
	}
	var GetRandDirection = function () {
		for (var i = 0; i < _directions.length; i++) {
			if (!_directions[i].out) {
				return (function () {
					var rand = Math.floor(Math.random() * _directions.length);
					while (_directions[rand].out) {
						rand = Math.floor(Math.random() * _directions.length);
					}
					_directions[rand].out = true;
					return _directions[rand].name
				})();
			}
		}
		for (var i = 0; i < _directions.length; i++) {
			_directions[i].out = false;
		}
		var rand = Math.floor(Math.random() * _directions.length);
		_directions[rand].out = true;
		return _directions[rand].name;
	}
	this.Update = function (timer) {
		for (var i = 0; i < _markers.length; i++) {
			_markers[i].depth -= (config.bgSpeed * timer.GetElapsedTime());
			if (_markers[i].depth <= 0) {
				while (_markers[i].depth <= 0) {
					_markers[i].depth += config.depthLimit;
				}
				_count++;
				if (_count % 2 === 0) {
					_markers[i].gray = GetRandDirection();
					// _markers[i].gray = _directions[Math.floor(Math.random() * _directions.length)].name;
				} else {
					if (IsADirection(_markers[i].gray))
						_markers[(i + 1) % _markers.length].gray = 'end' + _markers[i].gray;
					_markers[i].gray = 'none';
				}
			}
		}
	};

	var DrawForm = function (ctx, pointArr) {
		ctx.moveTo(pointArr[0].x, pointArr[0].y);
		for (var i = 0; i < pointArr.length; i++) {
			ctx.lineTo(pointArr[(i + 1) % pointArr.length].x, pointArr[(i + 1) % pointArr.length].y);
		}
	}
	var GetMarkerPosition = function(depth) {
		var delta = config.depthLimit - depth;
		return {
			x: depth * (1 + delta / config.depthLimit) * (config.screenWidth / 2) / config.depthLimit,
			y: depth * (1 + delta / config.depthLimit) * (config.screenHeight / 2) / config.depthLimit
		};
	}
	var drawPlat = {
		'left': function (ctx, fst, sec) {
			DrawForm(ctx, [
				{x: fst.x, y: fst.y},
				{x: sec.x, y: sec.y},
				{x: sec.x, y: config.screenHeight - sec.y},
				{x: fst.x, y: config.screenHeight - fst.y}
			]);
		},
		'endleft': function (ctx, fst, sec) {
			DrawForm(ctx, [
				{x: 0, y: 0},
				{x: fst.x, y: fst.y},
				{x: fst.x, y: config.screenHeight - fst.y},
				{x: 0, y: config.screenHeight}
			]);
		},
		'up': function (ctx, fst, sec) {
			DrawForm(ctx, [
				{x: fst.x, y: fst.y},
				{x: sec.x, y: sec.y},
				{x: config.screenWidth - sec.x, y : sec.y},
				{x: config.screenWidth - fst.x, y : fst.y},
			]);
		},
		'endup': function (ctx, fst, sec) {
			DrawForm(ctx, [
				{x: 0, y: 0},
				{x: config.screenWidth, y: 0},
				{x: config.screenWidth - fst.x, y: fst.y},
				{x: fst.x, y: fst.y}
			]);
		},
		'down': function (ctx, fst, sec) {
			DrawForm(ctx, [
				{x: fst.x, y: config.screenHeight - fst.y},
				{x: config.screenWidth - fst.x, y: config.screenHeight - fst.y },
				{x: config.screenWidth - sec.x, y: config.screenHeight - sec.y },
				{x: sec.x, y: config.screenHeight - sec.y }
			]);
		},
		'enddown': function (ctx, fst, sec) {
			DrawForm(ctx, [
				{x: 0, y: config.screenHeight},
				{x: config.screenWidth, y: config.screenHeight },
				{x: config.screenWidth - fst.x, y: config.screenHeight - fst.y},
				{x: fst.x, y: config.screenHeight - fst.y}
			]);
		},
		'right': function (ctx, fst, sec) {
			DrawForm(ctx, [
				{x:config.screenWidth - fst.x , y: fst.y },
				{x: config.screenWidth - fst.x, y: config.screenHeight - fst.y},
				{x: config.screenWidth - sec.x, y: config.screenHeight - sec.y },
				{x: config.screenWidth - sec.x, y: sec.y}
			]);
		},
		'endright': function (ctx, fst, sec) {
			DrawForm(ctx, [
				{x: config.screenWidth, y: 0},
				{x: config.screenWidth, y: config.screenHeight},
				{x: config.screenWidth - fst.x, y: config.screenHeight - fst.y},
				{x: config.screenWidth - fst.x, y: fst.y}
			]);
		},
	};
	this.Draw = function (canvas) {
		var ctx = canvas.GetContext();
		ctx.beginPath();
		ctx.lineWidth = 1;
		ctx.fillStyle = '#0F0F0F';
		var grd = ctx.createRadialGradient(config.screenWidth / 2, config.screenHeight / 2, 1, 
												 config.screenWidth / 2, config.screenHeight / 2, Math.max(config.screenWidth, config.screenHeight) / 2);
		grd.addColorStop(0, '#000');
		grd.addColorStop(1, '#3F3F3F');
		ctx.fillStyle = grd;
		for (var i = 0; i < _markers.length; i++) {
			if (_markers[i].gray !== 'none') {
				drawPlat[_markers[i].gray](ctx, GetMarkerPosition(_markers[i].depth), GetMarkerPosition(
					(_markers[i].depth < _markers[(i + 1) % _markers.length].depth) 
						? _markers[(i + 1) % _markers.length].depth 
						:  config.depthLimit
				));
				ctx.fill();
			}
		}
	}
//
}