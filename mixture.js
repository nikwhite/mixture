/**
 * Mixture object composition library
 */

module.exports = function mix( ) {
	
	var _slice = Array.prototype.slice;
	var _mixins = _slice.call(arguments);
	var _inheritable = null;
	var _state = {};
	
	/**
	 * Extend implementation nabbed from underscore.js 1.6.0
	 */
	function extend( obj ) {
		var sources = _slice.call(arguments, 1);
		sources.forEach( function(source) {
			if (source) {
				for (var prop in source) {
					obj[prop] = source[prop];
				}
			}
		});
		return obj;
	}
	
	return {
		
		/**
		 * Inject state information to a priviledged trait/mixin
		 * @param {Object} state Key/value pairs 
		 */
		'using' : function using( state ) {
			
			_state = state ;
			
			return this;
		},
		
		
		/**
		 * Apply mixin and state to a reference object
		 * @param {Object} context
		 * @return {Object} context with mixins and state applied
		 */
		'into': function into( context ) {
			
			var combined = {};
			
			_mixins.forEach(function(mixin){
				extend( combined, typeof mixin === 'function' ? new mixin(_state) : mixin );		
			});
			
			return extend( context, Object.create(combined) );
		}
		
	};
};
