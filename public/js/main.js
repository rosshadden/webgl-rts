var keyboard = KeyboardJS;

var dimensions = {
	width: window.innerWidth,
	height: window.innerHeight
};

var scene, camera, projector, renderer;
var buildings = [];
var init = (function(){
	scene = new THREE.Scene();

	//	LIGHTS.
	var light = new THREE.PointLight(0xffffff);
	light.position.set(0, 0, 200);

	//	CAMERA.
	camera = new THREE.PerspectiveCamera(75, dimensions.width / dimensions.height, 0.1, 20000);
	camera.position.set(0, 0, 400);

	projector = new THREE.Projector();

	//	ACTION.
	renderer = new THREE.WebGLRenderer();
	renderer.setSize(dimensions.width, dimensions.height);
	document.body.appendChild(renderer.domElement);


	var floor = new THREE.Mesh(
		new THREE.PlaneGeometry(dimensions.width, dimensions.height, 1, 1),
		new THREE.MeshBasicMaterial({
			color: 0x336633
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
		new THREE.CubeGeometry(100, 100, 50),
		new THREE.MeshBasicMaterial({
			color: 0x663333
		})
	);
	commandCenter.position.set(200, 200, 0);
	commandCenter.data = {
		name: 'Command Center',
		cache: {}
	};

	var barracks = new THREE.Mesh(
		new THREE.CubeGeometry(50, 100, 25),
		new THREE.MeshBasicMaterial({
			color: 0x663399
		})
	);
	barracks.position.set(100, 100, 0);
	barracks.data = {
		name: 'Barracks',
		cache: {}
	};

	scene.add(skyBox);
	scene.add(light);
	scene.add(floor);
	scene.add(commandCenter);
	scene.add(barracks);

	buildings.push(commandCenter);
	buildings.push(barracks);
})();

var selection = (function(){
	var current = [];

	var clear = function(object){
		var clear = function(object){
			if(object.data.cache.materialColor){
				object.material.color.setHex(object.data.cache.materialColor);
			}
		};

		if(object){
			// clear(object);
		}else{
			buildings.forEach(clear);
		}
	};

	var select = function(object){
		selected = object;
	};

	return {
		current: current,
		select: select,
		clear: clear
	};
})();

var selected = null;

//	EVENTS.
(function(){
	var $canvas = $('canvas');
	$canvas
	.on('click', function(event){
		event.preventDefault();

		var vector = new THREE.Vector3((event.clientX / dimensions.width) * 2 - 1, -(event.clientY / dimensions.height) * 2 + 1, 0.5);
		projector.unprojectVector(vector, camera);

		var ray = new THREE.Ray(camera.position, vector.subSelf(camera.position).normalize());

		var intersects = ray.intersectObjects(buildings);

		if(intersects.length > 0){
			if(intersects[0] !== selected){
				selection.clear(selected);
			}

			if(intersects[0].object.material.color.getHex() !== 0x3366ff){
				intersects[0].object.data.cache.materialColor = intersects[0].object.material.color.getHex();
				selection.select(intersects[0]);
			}
			intersects[0].object.material.color.setHex(0x3366ff);
			$('#main').text(intersects[0].object.data.name);
		}else{
			selection.clear();
			$('#main').text('');
		}
	})
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
