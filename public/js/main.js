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

	var skyBox = new THREE.Mesh(
		new THREE.CubeGeometry(10000, 10000, 10000),
		new THREE.MeshBasicMaterial({
			color: 0xff0000
		})
	);
	skyBox.flipSided = true;
	scene.fog = new THREE.FogExp2(0x00ff00, 0.00025);

	var commandCenter = new THREE.Mesh(
		new THREE.CubeGeometry(50, 50, 25),
		new THREE.MeshBasicMaterial({
			color: 0x006600
		})
	);
	commandCenter.position.set(200, 200, 0);

	var jsonLoader = new THREE.JSONLoader();
	jsonLoader.load('models/android.js', function(geometry) {
		var material = new THREE.MeshBasicMaterial({
			color: 0x336699
		});
		var android = new THREE.Mesh(geometry, material);
		android.scale.set(10, 10, 10);
		android.rotation.set(Math.PI / 2, 0, 0);

		scene.add(android);
	});

	scene.add(skyBox);
	scene.add(light);
	scene.add(floor);
	scene.add(commandCenter);
})();

//	EVENTS.
(function(){
	var $canvas = $('canvas');
	$canvas
	.on('mousedown', function(event){
		var x = event.offsetX,
			y = event.offsetY;

		$canvas.on('mousemove', function(event){
			camera.position.x += (x - event.offsetX) / 2;
			camera.position.y -= (y - event.offsetY) / 2;
			x = event.offsetX;
			y = event.offsetY;
		});
	})
	.on('mouseup', function(){
		$canvas.unbind('mousemove');
	})
	.on('mousewheel', function(event){
		var Δ = event.originalEvent.wheelDeltaY;

		if(camera.position.z - Δ / 2 > 100){
			camera.position.z -= Δ / 2;
		}else{
			camera.position.z = 100;
		}
	});
})();

var update = function(){
	var modifier = 1;

	if(keyboard.isPressed('shift')){
		modifier = 10;
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
	if(keyboard.isPressed('q')){
		camera.lookAt(0, 0, 0);
	}
	if(keyboard.isPressed('e')){
		camera.lookAt(scene.position);
	}
};

(function render(){
	requestAnimationFrame(render);
	update();
	renderer.render(scene, camera);
})();
