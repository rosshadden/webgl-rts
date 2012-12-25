define([
	'lib/keyboard',
	'entities',
	'gui/main'
], function(keyboard, entities, gui){
	var dimensions = {
		width: 1920,
		height: 1080
	};

	var viewport = {
		width: window.innerWidth,
		height: window.innerHeight
	};

	var mouse = {
		position: {
			x: 0,
			y: 0
		},
		cache: {}
	};

	var scene, camera, projector, renderer;
	var game = (function(){
		var game = {};

		game.$canvas = null;

		game.init = function(){
			scene = new THREE.Scene();

			//	LIGHTS.
			var light = new THREE.PointLight(0xffffff);
			light.position.set(0, 0, 200);

			//	CAMERA.
			camera = new THREE.PerspectiveCamera(75, viewport.width / viewport.height, 0.1, 20000);
			camera.position.set(0, 0, 8e2);

			projector = new THREE.Projector();

			//	ACTION.
			renderer = new THREE.WebGLRenderer();
			renderer.setSize(viewport.width, viewport.height);
			document.body.appendChild(renderer.domElement);
			this.$canvas = $(renderer.domElement);


			var ground = new THREE.Mesh(
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

			var commandCenter = entities.buildings.create('command-center', {
				x: 200,
				y: 200
			});

			scene.add(skyBox);
			scene.add(light);
			scene.add(ground);
			scene.add(commandCenter.object);
		};

		game.build = function(item){
			var game = this;

			var entity;
			if(item.type === 'structure'){
				entity = entities.buildings.create(item.name);
			}else if(item.type === 'unit'){

			}

			game.$canvas.on('click.spawn', function(event){
				if(event.which === 1){
					game.spawn(entity, {
						x: event.clientX,
						y: event.clientY
					});

					game.$canvas.unbind('click.spawn');
				}
			});

			return game;
		};

		game.spawn = function(entity, position){
			entity.setPosition(position);
			scene.add(entity.object);

			return this;
		};

		return game;
	})();

	entities = entities(game);
	window.entities = entities;

	game.init();

	var selection = (function(){
		var current = [];
		var cache = {};

		var selection = {};
		selection.select = function(entity){
			var id = entity.object.id;

			selection.clear();

			current.push(id);
			cache[id] = entities.buildings.get(id).select();
			gui.render(cache[id].render());

			return selection;
		};

		selection.add = function(entity){
			var id = entity.object.id;

			if(!~current.indexOf(id)){
				cache[id] = entities.buildings.get(id);
				cache[id].select();
				current.push(id);
				gui.clear();
			}else{
				selection.clear(entity);
			}

			return selection;
		};

		selection.clear = function(entity){
			var id = entity && entity.object.id || -1;

			current = current.filter(function(index, i){
				if(id === -1 || index === id){
					entities.buildings.get(index).deselect();
					delete cache[index];
					return false;
				}
				return true;
			});
			gui.clear();

			return selection;
		};

		return selection;
	})();

	//	This belongs in controller.js once I move stuff around.
	$(gui).on('request', function(event, item){
		entities.buildings.get(item.from).build(item.for);
	});

	//	EVENTS.
	(function(){
		game.$canvas
		.on('click', function(event){
			event.preventDefault();

			var vector = new THREE.Vector3((event.clientX / viewport.width) * 2 - 1, -(event.clientY / viewport.height) * 2 + 1, 0.5);

			projector.unprojectVector(vector, camera);

			var ray = new THREE.Ray(camera.position, vector.subSelf(camera.position).normalize());

			var intersects = ray.intersectObjects(entities.buildings.getCollision());

			var action = (keyboard.isPressed('ctrl')) ? 'add' : 'select';
			if(intersects.length > 0){
				selection[action](intersects[0]);
			}else{
				selection.clear();
			}
		})
		.on('mousedown', function(event){
			event.preventDefault();

			var x = event.offsetX,
				y = event.offsetY;

			if(event.which === 1){
				game.$canvas.css('cursor', 'crosshair');
			}else if(event.which === 2){
				game.$canvas.css('cursor', 'all-scroll');
			}else if(event.which === 3){
				game.$canvas
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
			game.$canvas
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
		.on('mousemove', function(event){
			mouse.position.x = event.clientX;
			mouse.position.y = event.clientY;
		})
		.on('contextmenu', function(event){
			event.preventDefault();
		});

		$(window).on('resize', function(){
			viewport.width = window.innerWidth;
			viewport.height = window.innerHeight;
			renderer.setSize(viewport.width, viewport.height);
			camera.aspect = viewport.width / viewport.height;
			camera.updateProjectionMatrix();
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
			// camera.lookAt(scene.position);
			camera.lookAt({
				x: mouse.position.x - mouse.cache.x,
				y: -mouse.position.y + mouse.cache.y,
				z: 0
			});
		}else{
			mouse.cache.x = mouse.position.x;
			mouse.cache.y = mouse.position.y;
		}
	};

	return function render(){
		requestAnimationFrame(render);
		update();
		renderer.render(scene, camera);
	};
});
