
var Tabs = function (options) {
	if ( !options.tabId ) return;
	
	var rootId = options.tabId;
	var tabSelector = options.tabSelector || 'a';
	var mutuallyExclusive = options.mutuallyExclusive
	var $root = $('#' + rootId);
	var $tabs = $root.find(tabSelector);
	var toggles = [ ];
	
	
	
	// Initialization
	$tabs.each(function(){
		toggles.push( new Toggle({ toggleElement: this }) );
	});
	
	var group = new ToggleGroup({
		toggles: toggles,
		toggleGroupId: rootId,
		toggleSelector: tabSelector,
		mutuallyExclusive: mutuallyExclusive
	});
	
	group.on('toggle', function(data){
		//debugger;
	});
}
