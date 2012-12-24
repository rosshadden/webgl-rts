define(['text!./main.html'], function(html){
	var $gui = $('#main');
	var main = Handlebars.compile(html);

	var current;
	var gui = {
		render: function(data){
			current = data;
			$gui.html(main(data));
		},

		clear: function(){
			current = null;
			$gui.html('');
		}
	};

	$gui.on('click', '.item', function(){
		$(gui).trigger('request', {
			from: current.id,
			for: $(this).attr('data-index')
		});
	});

	return gui;
});
