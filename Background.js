function Background () {
// CONSTRUCTOR
	if (Background.prototype._singletonInstance) {
		return Background.prototype._singletonInstance;
	}
	Background.prototype._singletonInstance = this;
//
// PROPERTIES
	var _markers = [];
	for (var i = 0; i < config.markerNbr; i++) {
		_markers[i] = config.depthLimit / config.markerNbr * (i + 1);
	}
//
// METHODS
	this.Update = function (timer) {
		for (var i = 0; i < _markers.length; i++) {
			_markers[i] -= (config.speed * timer.GetElapsedTime()) ;
			while (_markers[i] <= 0) {
				_markers[i] += config.depthLimit;
			}
		}
	},
	this.Draw = function (canvas) {
		var ctx = canvas.GetContext();
		ctx.beginPath();
		ctx.strokeStyle = '#FFF';
		ctx.lineWidth = 1;
		ctx.moveTo(0, 0);
		ctx.lineTo(config.screenWidth, config.screenHeight);
		ctx.moveTo(0, config.screenHeight);
		ctx.lineTo(config.screenWidth, 0);
		ctx.stroke();
		for (var i = 0; i < _markers.length; i++) {
			var delta = config.depthLimit - _markers[i];
			var x = _markers[i] * (1 + delta / config.depthLimit) * 
					(config.screenWidth / 2) / config.depthLimit;
			var y = _markers[i] * (1 + delta / config.depthLimit) *
					(config.screenHeight / 2) / config.depthLimit;
			ctx.strokeRect(x, y, config.screenWidth - x * 2, config.screenHeight - y * 2);
		}
	}
//
}