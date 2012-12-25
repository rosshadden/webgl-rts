define(['text!./body.html'], function(html){
	var body = Handlebars.compile(html);
	var $gui = $('#gui'),
		$head = $gui.children('header'),
		$body = $gui.children('section');

	var current;
	var gui = {
		render: function(data){
			current = data;
			$body.html(body(data));
		},

		clear: function(){
			current = null;
			$body.html('');
		}
	};

	$body.on('click', '.item', function(){
		$(gui).trigger('request', {
			from: current.id,
			for: $(this).attr('data-index')
		});
	});

	return gui;
});
