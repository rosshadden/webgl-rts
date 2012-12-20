define(['./Building'], function(Building){
	var CommandCenter = Building.extend({
		init: function(){
			this.super.init.call(this);
		},

		constructor: function(position){
			this.super.constructor.call(this, [100, 100, 50], position, 0x663333);
		},

		name: 'command center',

		gui: '<h1>Command Center</h1><p>Without this... wtf are you doing here?</p>'
	});

	return CommandCenter;
});
