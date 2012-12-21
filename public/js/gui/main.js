define(function(){
	var $gui = $('#main');

	var gui = {
		render: function(content){
			$gui.html(content);
		},

		clear: function(){
			$gui.html('');
		}
	};

	return gui;
});
