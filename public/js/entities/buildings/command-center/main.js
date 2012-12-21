define(['../Building', 'text!./gui.html'], function(Building, html){
	var CommandCenter = Building.extend({
		init: function(){
			this.super.init.call(this);
		},

		constructor: function(position){
			var materials = [
				new THREE.MeshBasicMaterial({ color: 0xC4B24D }),
				new THREE.MeshBasicMaterial({ color: 0xC4B24D }),
				new THREE.MeshBasicMaterial({ color: 0xC4B24D }),
				new THREE.MeshBasicMaterial({ color: 0xC4B24D }),
				new THREE.MeshBasicMaterial({ color: 0x663333 }),
				new THREE.MeshBasicMaterial({ color: 0x000000 })
			];

			this.super.constructor.call(this, [100, 100, 50], position, materials);
		},

		name: 'command center',

		gui: html
	});

	return CommandCenter;
});
