require.config({
	packages: ['entities'],
	paths: {
		Base: 'utilities/Base'
	},
	deps: ['lib/three', 'lib/jquery'],
	callback: function(){
		require(['game']);
	}
});
