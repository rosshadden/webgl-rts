define(['entities/Entity'], function(Entity){
	var Building = Entity.extend({
		init: function(){
			this.gui = Handlebars.compile(this.gui);
		},

		constructor: function(dim, position, color){
			this.object = new THREE.Mesh(
				new THREE.CubeGeometry(dim[0], dim[1], dim[2]),
				new THREE.MeshBasicMaterial({
					color: color
				})
			);

			this.object.position.set(position.x || 0, position.y || 0, position.z || 0);
		},

		name: 'building',
		type: 'building',
		gui: 'building',

		paint: function(){
			return this.gui();
		}
	});

	return Building;
});
