var keyboard = KeyboardJS;

var dimensions = {
	width: 800,
	height: 600
};

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, dimensions.width / dimensions.height, 0.1, 1000);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(dimensions.width, dimensions.height);
document.body.appendChild(renderer.domElement);

camera.position.set(0, 0, 500);

var map = new THREE.Mesh(
	new THREE.CubeGeometry(dimensions.width, dimensions.height, 0),
	new THREE.MeshBasicMaterial({
		color: 0x0000ff
	})
);

scene.add(map);

var update = function(){
	if(keyboard.isPressed('a')){
		camera.position.x -= 2;
	}
	if(keyboard.isPressed('d')){
		camera.position.x += 2;
	}
	if(keyboard.isPressed('w')){
		camera.position.y += 2;
	}
	if(keyboard.isPressed('s')){
		camera.position.y -= 2;
	}
};

(function render() {
	requestAnimationFrame(render);

	update();

	renderer.render(scene, camera);
})();
