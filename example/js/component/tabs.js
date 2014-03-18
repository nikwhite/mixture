
var Tabs = function (options) {
	
	// Bail out when required options not supplied
	// Really, we should throw errors using a common error module
	if ( !options.tabId ) return; 
	
	// Private members -------------------------------------
	
	//options
	var rootId = options.tabId;
	var tabSelector = options.tabSelector || 'a';
	var panelSelector = options.panelSelector || '.contentpanel';
	var mutuallyExclusive = options.mutuallyExclusive;
	
	// elements
	var $root = $('#' + rootId);
	var $tabs = $root.find(tabSelector);
	var $panels = $root.find(panelSelector);
	
	// interfaces
	var tabs = [ ];
	var panels = [ ];
	
	// Initialization -------------------------------------
	
	// Tabs are toggles
	$tabs.each( function(){
		tabs.push( new Toggle({ toggleElement: this }) );
	});
	
	// Panels are just toggles in disguise
	$panels.each( function(){
		panels.push( new Toggle({ toggleElement: this }) );
	});
	
	// We should start including things like this... to be helpful for developers
	if ( $panels.length !== $tabs.length ) {
		console.warn('Tabs should be created with the same amount of tabs as content panels. Tabs: %d, Panels: %d', $tabs.length, $panels.length)
	}
	
	// Hook up the tabs as a toggle group
	mix( ToggleGroup ).using({
		toggles: tabs,
		toggleGroupId: rootId,
		toggleSelector: tabSelector,
		mutuallyExclusive: mutuallyExclusive
	}).into(this);
	
	// Toggle group is an event emitter, whenever a toggle happens, 
	// it passes the toggle control to the event listener
	this.addListener('toggle', function(toggle){
		// panel behavior depends on tab active state and mirrors it
		panels[ tabs.indexOf(toggle) ].toggle( toggle.isActive() );
	});
	debugger;
}
