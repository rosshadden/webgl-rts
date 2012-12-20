require.config({
	packages: ['entities', 'utilities'],
	deps: ['lib/three', 'lib/jquery'],
	callback: function(){
		require(['game'], function(game){
			game();
		});
	}
});
