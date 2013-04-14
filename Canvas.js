function Canvas () {
// CONSTRUCTOR
	if (Canvas.prototype._singletonInstance) {
		return Canvas.prototype._singletonInstance;
	}
	Canvas.prototype._singletonInstance = this;
//
// PROPERTIES
	var _element = $('#canvas');
	_element.css({
		'margin-left': ('-' + (config.screenWidth / 2) + 'px'),
		'margin-top': ('-' + (config.screenHeight / 2) + 'px')
	});
	_element.attr('width', config.screenWidth + 'px');
	_element.attr('height', config.screenHeight + 'px');
	var _context = _element[0].getContext("2d");
	var _imgdata = _context.getImageData(0, 0, config.screenWidth, config.screenHeight);
//
// METHODS
	this.ClearScreen = function () {
		_context.clearRect(0, 0, config.screenWidth, config.screenHeight);
	}

	this.GetContext = function () {
		return _context;
	}
//
}