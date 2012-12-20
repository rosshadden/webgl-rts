require.config({
	packages: ['entities'],
	paths: {
		base: 'utilities/base'
	},
	deps: ['lib/three', 'lib/jquery'],
	callback: function(){
		require(['game']);
	}
});
