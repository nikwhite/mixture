
var Tabs = function (options) {
	if ( !options.tabId ) return;
	
	//options
	var rootId = options.tabId;
	var tabSelector = options.tabSelector || 'a';
	var panelSelector = options.panelSelector || '.contentpanel';
	var mutuallyExclusive = options.mutuallyExclusive
	
	// elements
	var $root = $('#' + rootId);
	var $tabs = $root.find(tabSelector);
	var $panels = $root.find(panelSelector);
	
	// interfaces
	var toggles = [ ];
	var panels = [ ];
	
	
	function onTabSelect(toggle) {
		if (!toggle) return;
		var index = toggles.indexOf(toggle);
		if ( toggle.isActive() ){
			panels[index].toggle(true);
		} else {
			panels[index].toggle(false);
		}
	}
	
	// Initialization
	$tabs.each( function(){
		toggles.push( new Toggle({ toggleElement: this }) );
	});
	
	$panels.each( function(){
		panels.push( new Toggle({ toggleElement: this }) );
	});
	
	if ( $panels.length !== $tabs.length ) {
		console.warn('Tabs should be created with the same amount of tabs as content panels. Tabs: %d, Panels: %d', $tabs.length, $panels.length)
	}
	
	var group = new ToggleGroup({
		toggles: toggles,
		toggleGroupId: rootId,
		toggleSelector: tabSelector,
		mutuallyExclusive: mutuallyExclusive
	});
	
	group.on('toggle', onTabSelect);
}
