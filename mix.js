/**
 * nanoMix
 */
(function(){
	
	function mix ( mixin ) {
		
		var _mixin = mixin || null;
		var _inheritable = null;
		var _state = {};
		
		function applyMixin( context ){
			
			if ( typeof _mixin !== 'function' ) return false;
			
			mixinInstance = new _mixin(_state);
			
			return Object.create(mixinInstance);
			
		}
		
		return {
			
			/**
			 * Inject state information to a priviledged trait/mixin
 			 * @param {Object} state Key/value pairs 
			 */
			'using' : function using( state ) {
				
				_state = state;
				
				return this;
			},
			
			/**
			 * Inherit an object's methods and properties 
			 * @param {Object} object Inheritable object reference 
			 */
			'inherit': function inherit( object ){
				
				_inheritable = object;
				
				return this;
			},
			
			/**
			 * Apply mixin and state to a reference object
			 * @param {Object} context
			 * @return {Object} context with mixins and state applied
			 */
			'into': function into( context ) {
				
				return applyMixin( context );
			},
			
			/**
			 * Make a mixin using the prototype of the object passed to inherit()
			 * and state info passed to using()
			 * @param {Object} mixinToMake
			 */
			'make': function make( mixinToMake ) {
				
				_mixin = mixinTomake;
				
				var newObject = _inheritable ? Object.create(_inheritable) : {};
				
				return applyMixin( newObject );
			
			}
		};
	}
	
	window.mix = mix;
	return mix;
})();