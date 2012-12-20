define(function(){
	return function(Entity){
		var ID = -1;

		var Building = Entity.extend({
			set: [],

			constructor: function(dim, color){
				this.id = ++ID;

				this.object = new THREE.Mesh(
					new THREE.CubeGeometry(dim[0], dim[1], dim[2]),
					new THREE.MeshBasicMaterial({
						color: color
					})
				);

				this.object.id = this.id;
			}
		});

		return Building;
	};
});
