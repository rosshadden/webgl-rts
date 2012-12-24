define(['./Building'], function(Building){
	return function(game){
		Building = Building(game);

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

				CommandCenter.super.constructor.call(this, [100, 100, 50], position, materials);
			},

			name: 'Command Center',

			items: [{
				name: 'power-plant',
				type: 'structure'
			}, {
				name: 'mcv',
				type: 'unit'
			}]
		});

		return CommandCenter;
	};
});
