require.config({
	packages: ['entities', 'utilities'],
	paths: {
		'text': 'lib/require.text'
	},
	deps: ['utilities/log', 'lib/three', 'lib/jquery', 'lib/handlebars'],
	callback: function(log){
		window.log = log;
		require(['game'], function(game){
			game();
		});
	}
});
