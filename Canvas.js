function Canvas () {
// CONSTRUCTOR
	if (Canvas.prototype._singletonInstance) {
		return Canvas.prototype._singletonInstance;
	}
	Canvas.prototype._singletonInstance = this;
//
// PROPERTIES
	var _element = $('#canvas');
	var _context = null;
	var _imgdata = null;
	this.ReInit = function () {
		_element.css({
			'margin-left': ('-' + (config.screenWidth / 2) + 'px'),
			'margin-top': ('-' + (config.screenHeight / 2) + 'px')
		});
		_element.attr('width', config.screenWidth + 'px');
		_element.attr('height', config.screenHeight + 'px');
		_context = _element[0].getContext("2d");
		_imgdata = _context.getImageData(0, 0, config.screenWidth, config.screenHeight);
	}
	this.ReInit();
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