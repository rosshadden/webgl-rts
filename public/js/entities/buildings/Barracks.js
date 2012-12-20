define(['./Building'], function(Building){
	var Barracks = Building.extend({
		init: function(){
			this.super.init.call(this);
		},

		constructor: function(position){
			Barracks.super.constructor.call(this, [50, 100, 25], position, 0x663399);
		},

		name: 'barracks',

		gui: '<h1>Barracks</h1><p>These things are the shit.</p>'
	});

	return Barracks;
});
