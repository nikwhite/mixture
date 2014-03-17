
/**
 * @param options implements mutuallyExclusive, toggleGroupId, toggleSelector
 */
function ToggleGroup(options) {
	
	mix( EventEmitter ).into( this );
	
	var mutuallyExclusive = options.mutuallyExclusive;
	var atLeastOneActive = options.atLeastOneActive || true;
	var active = false;
	var $root = $('#' + options.toggleGroupId);
	var toggles = options.toggles;
	var emit = this.emit.bind(this); // local alias for emitting events
	
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
				
			// otherwise close it since its already active
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
		
		emit('toggle', toggle);
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
		
		emit('toggle', toggle);
	}
	
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
	
	if ( mutuallyExclusive ) {
		toggles.forEach(function(toggle){
			if ( toggle.isActive() ){
				active = toggle;
			}
		});
	}
}

