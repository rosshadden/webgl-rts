define(['text!./main.html'], function(html){
	var $gui = $('#main');
	var main = Handlebars.compile(html);

	var gui = {
		render: function(data){
			$gui.html(main(data));
		},

		clear: function(){
			$gui.html('');
		}
	};

	return gui;
});
