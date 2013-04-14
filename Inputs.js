function Inputs() {
// CONSTRUCTOR
	if (Inputs.prototype._singletonInstance) {
		return Inputs.prototype._singletonInstance;
	}
	Inputs.prototype._singletonInstance = this;
//
// PROPERTIES
	var _keyPressed = {};
	// 38 up // 37 left // 39 right // 40 down
	var _keyEquiv = {
		'up': 38,
		'down': 40,
		'left':37,
		'right': 39,
		'[': 219,
		']': 221
	};
	$(document).keydown(function (e) {
		_keyPressed[e.keyCode] = true;
	});
	$(document).keyup(function (e) {
		delete _keyPressed[e.keyCode];
	});
//
// METHODS
	this.IsPressed = function (val) {
		return _keyPressed[_keyEquiv[val]];
	}
//
}