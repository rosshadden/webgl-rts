define(['./Entity', './buildings/main'], function(Entity, buildings){
	var entities = {};
	entities.Entity = Entity;
	entities.buildings = buildings;

	return entities;
});
