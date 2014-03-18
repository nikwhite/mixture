
/**
 * @constructor ToggleGroup - manages groups of toggles which are dependent on each other's state
 * @param options implements toggles, mutuallyExclusive, toggleGroupId, toggleSelector, atLeastOneActive
 */
function ToggleGroup(options) {
	
	if (!options.toggles.length) return;
	
	// ToggleGroup emits events, specifically 'toggle'
	mix( EventEmitter ).into( this );
	
	//options
	var mutuallyExclusive = options.mutuallyExclusive;
	var atLeastOneActive = options.atLeastOneActive || true;
	var $root = $('#' + options.toggleGroupId);
	var toggles = options.toggles;
	
	// state
	var active = false;
	
	// local alias for emitting events
	var emit = this.emitEvent.bind(this); 
	
	function toggleHandler(event) {
		event.preventDefault();
		
		var $target = $(this);
		var currentToggle = findToggle($target);
		var currentActive = active;
		
		if ( mutuallyExclusive ) {
			
			// if its not already active, activate it
			if ( !currentToggle.isActive() ) {
				
				// always unset the current active
				unsetActive(currentActive);
				
				// set new active
				setActive(currentToggle);
			
			// if its already active and we don't need at least one active, deactivate
			} else if ( !atLeastOneActive ) {
				unsetActive(currentActive);
			}
			
		// not mutually exclusive...
		} else {
			
			// if its not already active, activate
			if ( !currentToggle.isActive() ){
				setActive(currentToggle);
				
			// otherwise deactivate it since its already active
			} else {
				unsetActive(currentToggle);
			}
		}
	}
	
	
	/**
	 * toggles a Toggle to active state
     * @param {Toggle} toggle
	 */
	function setActive(toggle) {
		
		toggle && toggle.toggle(true);
		
		if (mutuallyExclusive){
			active = toggle;
		}
		
		emit('toggle', [toggle]);
	}
	
	
	/**
	 * toggles a Toggle to inactive state
     * @param {Toggle} toggle
	 */
	function unsetActive(toggle) {
		
		toggle && toggle.toggle(false);
		
		if (mutuallyExclusive){
			active = undefined;
		}
		
		toggle && emit('toggle', [toggle]);
	}
	
	// Find the toggle control based on its toggle-id attribute
	function findToggle($target) {
		var targetID = $target.attr('toggle-id');
		var ret;
		toggles.forEach( function (toggle){
			if ( targetID == toggle.getToggleId() ) {
				ret = toggle;
			}
		});
		return ret;
	}
	
	// Initialization
	$root.on('click', options.toggleSelector, toggleHandler);
	
	// if its mutually exclusive then we need to track which one is active
	if ( mutuallyExclusive ) {
		toggles.forEach(function(toggle){
			if ( toggle.isActive() ){
				active = toggle;
			}
		});
	}
}

