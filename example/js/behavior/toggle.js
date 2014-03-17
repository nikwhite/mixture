
var TOGGLEID = 0;

/**
 * @constructor Toggle - Any element which can toggle between 2 states is a toggle
 * @param {Object} options implements toggleElement, activeClass
 */
var Toggle = function (options) {
	
	// private members
	var $element = $(options.toggleElement);
	var activeClass = options.activeClass || 'active';
	var active = $element.hasClass(activeClass);
	var id = TOGGLEID++;
	
	// public api
	this.toggle = function (bool) {
		if (bool) {
			$element.addClass(activeClass);
		} else {
			$element.removeClass(activeClass);
		}
		active = bool;
	}
	this.isActive = function () {
		return active;
	}
	this.getToggleId = function () {
		return id;
	}
	
	// init
	this.toggle( this.isActive() );
	
	$element.attr('toggle-id', id);
	
}
