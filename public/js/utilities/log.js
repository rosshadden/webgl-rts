define(function(){
	'use strict';

	var history = [],

	log = function(){
		var args = Array.prototype.slice.call(arguments);

		if(args.length > 0){
			history.push(args);

			if(window.console){
				window.console.log.apply(window.console, args);
			}
		}

		return methods;
	},

	clear = function(){
		history = [];

		return methods;
	},

	getHistory = function(){
		return history.slice();
	},

	methods = {
		log:	log,
		clear:	clear,
		history:getHistory
	};

	return log;
});
