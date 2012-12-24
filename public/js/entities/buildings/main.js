define([
	'./Building',
	'./command-center',
	'./power-plant',
	'./barracks'
], function(Building, CommandCenter, PowerPlant, Barracks){
	return function(game){
		Building = Building(game);
		CommandCenter = CommandCenter(game);
		PowerPlant = PowerPlant(game);
		Barracks = Barracks(game);

		var buildings = (function(){
			var list = [];
			var set = {};

			var buildings = {
				types: {
					building: Building,
					'command-center': CommandCenter,
					'power-plant': PowerPlant,
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
					if(typeof id === 'undefined'){
						return set;
					}
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
	};
});
