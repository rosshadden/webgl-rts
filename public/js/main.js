var keyboard = KeyboardJS;

var dimensions = {
	width: 800,
	height: 600
};

var scene, camera, renderer;
var init = (function(){
	scene = new THREE.Scene();

	//	LIGHTS.
	var light = new THREE.PointLight(0xffffff);
	light.position.set(0, 0, 200);

	//	CAMERA.
	camera = new THREE.PerspectiveCamera(75, dimensions.width / dimensions.height, 0.1, 20000);
	camera.position.set(0, 0, 400);

	//	ACTION.
	renderer = new THREE.WebGLRenderer();
	renderer.setSize(dimensions.width, dimensions.height);
	document.body.appendChild(renderer.domElement);


	var floor = new THREE.Mesh(
		new THREE.PlaneGeometry(dimensions.width, dimensions.height, 1, 1),
		new THREE.MeshBasicMaterial({
			color: 0x663333
		})
	);

	scene.add(light);
	scene.add(floor);
})();

//	EVENTS.
(function(){
	var $canvas = $('canvas');
	$canvas
	.on('mousedown', function(event){
		var x = event.offsetX,
			y = event.offsetY;

		$canvas.on('mousemove', function(event){
			camera.position.x += (x - event.offsetX);
			camera.position.y -= (y - event.offsetY);
			x = event.offsetX;
			y = event.offsetY;
		});
	})
	.on('mouseup', function(){
		$canvas.unbind('mousemove');
	});
})();

var update = function(){
	var modifier = 1;

	if(keyboard.isPressed('shift')){
		modifier = 5;
	}
	if(keyboard.isPressed('a')){
		camera.position.x -= modifier;
	}
	if(keyboard.isPressed('d')){
		camera.position.x += modifier;
	}
	if(keyboard.isPressed('w')){
		camera.position.y += modifier;
	}
	if(keyboard.isPressed('s')){
		camera.position.y -= modifier;
	}
};

(function render(){
	requestAnimationFrame(render);
	update();
	renderer.render(scene, camera);
})();
