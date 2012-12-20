define([
	'lib/keyboard',
	'entities'
], function(keyboard, entities){
	window.entities = entities;

	var dimensions = {
		width: window.innerWidth,
		height: window.innerHeight
	};

	var mouse = {
		position: {
			x: 0,
			y: 0,
			z: 0
		}
	};

	var scene, camera, projector, renderer;
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
				color: 0x003300
			})
		);

		var skyBox = new THREE.Mesh(
			new THREE.CubeGeometry(10000, 10000, 10000),
			new THREE.MeshBasicMaterial({
				color: 0xff0000
			})
		);
		skyBox.flipSided = true;
		scene.fog = new THREE.FogExp2(0x000000, 1e-4);

		var commandCenter = entities.buildings.create([100, 100, 50], 0x663333);
		commandCenter.object.position.set(200, 200, 0);
		commandCenter.object.data = {
			name: 'Command Center',
			type: 'building',
			cache: {}
		};

		var barracks = entities.buildings.create([50, 100, 25], 0x663399);
		barracks.object.position.set(100, 100, 0);
		barracks.object.data = {
			name: 'Barracks',
			type: 'building',
			cache: {}
		};

		scene.add(skyBox);
		scene.add(light);
		scene.add(floor);
		scene.add(commandCenter.object);
		scene.add(barracks.object);
	})();

	var selection = (function(){
		var current = [];
		var cache = {};

		var selection = {};
		selection.select = function(entity){
			var id = entity.object.id;

			if(!~current.indexOf(id)){
				selection.clear();
			}

			cache[id] = entity.object.material.color.getHex();
			entity.object.material.color.setHex(0x3366ff);
			current.push(id);

			return selection;
		};

		selection.add = function(entity){
			var id = entity.object.id;

			if(!(id in cache)){
				cache[id] = entity.object.material.color.getHex();
				entity.object.material.color.setHex(0x3366ff);
				current.push(id);
			}else{
				selection.clear(entity);
			}

			return selection;
		};

		selection.clear = function(entity){
			var id = entity && entity.object.id || -1;

			current = current.filter(function(index, i){
				if(id === -1 || index === id){
					entities.buildings.get(index).object.material.color.setHex(cache[index]);
					delete cache[index];
					return false;
				}
				return true;
			});

			return selection;
		};

		return selection;
	})();

	//	EVENTS.
	(function(){
		var $canvas = $('canvas');
		$canvas
		.on('click', function(event){
			event.preventDefault();

			var vector = new THREE.Vector3((event.clientX / dimensions.width) * 2 - 1, -(event.clientY / dimensions.height) * 2 + 1, 0.5);
			projector.unprojectVector(vector, camera);

			var ray = new THREE.Ray(camera.position, vector.subSelf(camera.position).normalize());

			var intersects = ray.intersectObjects(entities.buildings.getCollision());

			var action = (keyboard.isPressed('ctrl')) ? 'add' : 'select';
			if(intersects.length > 0){
				selection[action](intersects[0]);
				$('#main').text(intersects[0].object.data.name);
			}else{
				selection.clear();
				$('#main').text('');
			}
		})
		.on('mousedown', function(event){
			event.preventDefault();

			var x = event.offsetX,
				y = event.offsetY;

			if(event.which === 1){
				$canvas.css('cursor', 'crosshair');
			}else if(event.which === 2){
				$canvas.css('cursor', 'all-scroll');
			}else if(event.which === 3){
				$canvas
				.css('cursor', 'move')
				.on('mousemove.drag', function(event){
					camera.position.x += (x - event.offsetX) / 2;
					camera.position.y -= (y - event.offsetY) / 2;
					x = event.offsetX;
					y = event.offsetY;
				});
			}
		})
		.on('mouseup', function(event){
			$canvas
			.css('cursor', 'auto')
			.unbind('mousemove.drag');
		})
		.on('mousewheel', function(event){
			var Δ = event.originalEvent.wheelDeltaY;

			var position = camera.position.z - Δ / 2;
			if(1e2 < position && position < 1e3){
				camera.position.z = position;
			}
		})
		.on('contextmenu', function(event){
			event.preventDefault();
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
			camera.lookAt({});
		}
		if(keyboard.isPressed('e')){
			camera.lookAt(scene.position);
		}
	};

	return function render(){
		requestAnimationFrame(render);
		update();
		renderer.render(scene, camera);
	};
});
