define(['./Building'], function(Building){
	var buildings = (function(){
		var id = -1;
		var list = [];
		var collision = [];

		var buildings = {
			Building: Building,

			create: function(){
				var building = Building.create.apply(Building, arguments);

				building.id = ++id;
				building.object.id = building.id;
				list.push(building);
				collision.push(building.object);

				return building;
			}
		};

		return buildings;
	})();

	return buildings;
});
