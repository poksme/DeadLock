function Timer () {
// CONSTRUCTOR
	if (Timer.prototype._singletonInstance) {
		return Timer.prototype._singletonInstance;
	}
	Timer.prototype._singletonInstance = this;
//
// PROPERTIES
	var _totalElapsedTime = 0;
	var _now = null;
	var _elapsedTime = null;
	var _lastUpdate = Date.now();
	var _sin = 0;
	var _lastSin = 0;
	var _cos = 0;		
//
// METHODS
	this.Update = function () {
		_now = Date.now();
		_elapsedTime = (_now - _lastUpdate);
		_totalElapsedTime += _elapsedTime;
		_lastUpdate = _now;
		_lastSin = _sin;
		_sin = Math.sin(_totalElapsedTime / 400);
		_cos = Math.cos(_totalElapsedTime / 400);		
	}

	this.GetElapsedTime = function () {
		return _elapsedTime;
	}
	this.GetCos = function () {
		return _cos;
	}
	this.GetSin = function () {
		return _sin;
	}
	this.GetLastSin = function () {
		return _lastSin;
	}
	// this.GetTotalElapsedTime = function () {
	// 	return _totalElapsedTime;
	// }
//
}