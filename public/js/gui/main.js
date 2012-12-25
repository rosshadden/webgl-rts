define(['text!./head.html', 'text!./body.html'], function(headHTML, bodyHTML){
	var head = Handlebars.compile(headHTML),
		body = Handlebars.compile(bodyHTML);
	var $gui = $('#gui'),
		$head = $gui.children('header'),
		$body = $gui.children('section');

	var current, $currentItem;

	var gui = {
		render: function(data){
			current = data;
			$body.html(body(data));
		},

		updateMoney: function(money){
			$head.html(head({
				money: money
			}));
			return this;
		},

		build: function(){
			$currentItem
			.addClass('building');
			return this;
		},

		clear: function(){
			current = null;
			$body.html('');
		}
	};

	$body.on('click', '.item', function(){
		$currentItem = $(this);
		$(gui).trigger('request', {
			from: current.id,
			for: $(this).attr('data-index')
		});
	});

	return gui;
});
