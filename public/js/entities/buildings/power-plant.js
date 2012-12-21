define(['./Building'], function(Building){
	var CommandCenter = Building.extend({
		init: function(){
			this.super.init.call(this);
		},

		constructor: function(position){
			var materials = [
				new THREE.MeshBasicMaterial({ color: 0x339933 }),
				new THREE.MeshBasicMaterial({ color: 0x339933 }),
				new THREE.MeshBasicMaterial({ color: 0x339933 }),
				new THREE.MeshBasicMaterial({ color: 0x339933 }),
				new THREE.MeshBasicMaterial({ color: 0x336633 }),
				new THREE.MeshBasicMaterial({ color: 0x000000 })
			];

			CommandCenter.super.constructor.call(this, [50, 50, 200], position, materials);
		},

		name: 'Power Plant'
	});

	return CommandCenter;
});
