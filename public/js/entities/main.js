define(['./Entity', './buildings/main'], function(Entity, buildings){
	return function(game){
		buildings = buildings(game);

		var entities = {};
		entities.Entity = Entity;
		entities.buildings = buildings;

		return entities;
	};
});
