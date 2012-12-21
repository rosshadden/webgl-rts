define(['../Building', 'text!./gui.html'], function(Building, html){
	var CommandCenter = Building.extend({
		init: function(){
			this.super.init.call(this);
		},

		constructor: function(position){
			this.super.constructor.call(this, [100, 100, 50], position, 0x663333);
		},

		name: 'command center',

		gui: html
	});

	return CommandCenter;
});
