define(['./Building'], function(Building){
	var CommandCenter = Building.extend({
		init: function(){
			this.super.init.call(this);
		},

		constructor: function(position){
			this.super.constructor.call(this, [100, 100, 50], position, 0x663333);
		},

		name: 'command center',

		gui: 'cc'
	});

	return CommandCenter;
});
