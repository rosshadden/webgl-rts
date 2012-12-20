define(['./Building'], function(Building){
	var buildings = (function(){
		var list = [];
		var set = [];

		var buildings = {
			Building: Building,

			create: function(){
				var building = Building.create.apply(Building, arguments);

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
