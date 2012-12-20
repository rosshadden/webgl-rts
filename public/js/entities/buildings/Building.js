define(['entities/Entity'], function(Entity){
	var Building = Entity.extend({
		constructor: function(dim, color){
			this.object = new THREE.Mesh(
				new THREE.CubeGeometry(dim[0], dim[1], dim[2]),
				new THREE.MeshBasicMaterial({
					color: color
				})
			);
		}
	});

	return Building;
});
