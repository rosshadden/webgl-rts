require.config({
	packages: ['entities', 'utilities'],
	deps: ['utilities/log', 'lib/three', 'lib/jquery', 'lib/handlebars'],
	callback: function(log){
		window.log = log;
		require(['game'], function(game){
			game();
		});
	}
});
