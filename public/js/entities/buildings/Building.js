define(['entities/Entity'], function(Entity){
	var Building = Entity.extend({
		init: function(){
			this.gui = Handlebars.compile(this.gui);
		},

		constructor: function(dim, position, faces){
			this.object = new THREE.Mesh(
				new THREE.CubeGeometry(dim[0], dim[1], dim[2], 1, 1, 1),
				new THREE.MeshFaceMaterial(faces)
			);

			this.object.position.set(position.x || 0, position.y || 0, position.z || 0);

			this.cache.material = this.object.material.clone();
		},

		name: 'building',
		type: 'building',
		cache: {},
		gui: '[[gui]]',

		paint: function(){
			return this.gui();
		},

		select: function(){
			this.object.material = new THREE.MeshBasicMaterial({
				color: 0x3366ff
			});

			return this;
		},

		deselect: function(){
			this.object.material = this.cache.material;

			return this;
		}
	});

	return Building;
});
