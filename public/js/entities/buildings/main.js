define(['./Building', './CommandCenter', './Barracks'], function(Building, CommandCenter, Barracks){
	var buildings = (function(){
		var list = [];
		var set = [];

		var buildings = {
			types: {
				building: Building,
				cc: CommandCenter,
				barracks: Barracks
			},

			create: function(){
				var args = Array.prototype.slice.call(arguments);

				var type = 'building';
				if(typeof args[0] === 'string' && args[0] in buildings.types){
					type = args.splice(0, 1)[0];
				}

				var constructor = buildings.types[type];

				var building = constructor.create.apply(constructor, args);

				building.id = building.object.id;
				list.push(building);
				set[building.id] = building;

				return building;
			},

			get: function(id){
				return id in set && set[id];
			},

			getCollision: function(){
				return list.map(function(building, b){
					return building.object;
				});
			}
		};

		return buildings;
	})();

	return buildings;
});
