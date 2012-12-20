define(['./Building'], function(Building){
	var Barracks = Building.extend({
		init: function(){
			this.super.init.call(this);
		},

		constructor: function(position){
			Barracks.super.constructor.call(this, [50, 100, 25], position, 0x663399);
		},

		name: 'barracks'
	});

	return Barracks;
});
