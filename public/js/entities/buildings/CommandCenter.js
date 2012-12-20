define(['./Building'], function(Building){
	var CommandCenter = Building.extend({
		constructor: function(position){
			CommandCenter.super.constructor.call(this, [100, 100, 50], position, 0x663333);
		},

		name: 'command center'
	});

	return CommandCenter;
});
