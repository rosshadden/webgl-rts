define(['./Base'], function(Base){
	var Entity = Base.extend({
		setPosition: function(position){
			this.object.position.set(position.x || 0, position.y || 0, position.z || 0);
			return this;
		}
	});

	return Entity;
});
