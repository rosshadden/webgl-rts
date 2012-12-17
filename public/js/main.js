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
			color: 0x9999ff
		})
	);
	skyBox.flipSided = true;
	scene.fog = new THREE.FogExp2(0x9999ff, 0.00025);

	scene.add(skyBox);
	scene.add(light);
	scene.add(floor);
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
