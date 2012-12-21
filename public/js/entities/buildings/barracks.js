define(['./Building'], function(Building){
	var Barracks = Building.extend({
		init: function(){
			this.super.init.call(this);
		},

		constructor: function(position){
			var materials = [
				new THREE.MeshBasicMaterial({ color: 0x663399 }),
				new THREE.MeshBasicMaterial({ color: 0x663399 }),
				new THREE.MeshBasicMaterial({ color: 0x663399 }),
				new THREE.MeshBasicMaterial({ color: 0x663399 }),
				new THREE.MeshBasicMaterial({ color: 0x23328D }),
				new THREE.MeshBasicMaterial({ color: 0x000000 })
			];

			Barracks.super.constructor.call(this, [50, 100, 25], position, materials);
		},

		name: 'Barracks'
	});

	return Barracks;
});
