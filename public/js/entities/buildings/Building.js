define(['entities/Entity'], function(Entity){
	return function(game){
		var Building = Entity.extend({
			init: function(){
				this.gui = Handlebars.compile(this.gui);
			},

			constructor: function(dim, position, faces){
				this.object = new THREE.Mesh(
					new THREE.CubeGeometry(dim[0], dim[1], dim[2], 1, 1, 1),
					new THREE.MeshFaceMaterial(faces)
				);

				if(position){
					this.setPosition(position);
				}

				this.cache = {};
				this.cache.material = this.object.material.clone();
			},

			name: 'building',
			type: 'building',
			cache: null,

			build: function(item){
				game.build(this.items[item.for]);

				return this;
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
			},

			render: function(){
				return {
					id: this.id,
					name: this.name,
					items: this.items
				};
			}
		});

		return Building;
	};
});
