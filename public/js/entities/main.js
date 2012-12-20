define(['base', './buildings/main'], function(Base, Building){
	return function(){
		var Entity = Base.extend({
		});

		Entity.Building = Building(Entity);
		Entity.test = 4;

		return Entity;
	};
});
