        var container, stats;
        var camera, controls, scene, renderer;
        var objects = [];
        var group = new THREE.Group();

        init();
        animate();

        function init() {

            container = document.getElementById("main");
           /* container = document.createElement('div');*/
            document.body.appendChild(container);

            camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 10000);
            camera.position.z = 100;
            camera.position.y = 100;

/*            controls = new THREE.TrackballControls(camera);
            controls.rotateSpeed = 1.0;
            controls.zoomSpeed = 1.2;
            controls.panSpeed = 0.8;
            controls.noZoom = false;
            controls.noPan = false;
            controls.staticMoving = true;
            controls.dynamicDampingFactor = 0.3;*/

            scene = new THREE.Scene();
            scene.background = new THREE.Color(0xf0f0f0);

            scene.add(new THREE.AmbientLight(0x505050));
            scene.add(group);

            var light = new THREE.SpotLight(0xffffff, 1.5);
            light.position.set(0, 500, 2000);
            light.castShadow = true;

            light.shadow = new THREE.LightShadow(new THREE.PerspectiveCamera(50, 1, 200, 10000));
            light.shadow.bias = -0.00022;

            light.shadow.mapSize.width = 2048;
            light.shadow.mapSize.height = 2048;

            scene.add(light);
/*            var geometry = new THREE.BoxGeometry( 40, 40, 40 );

				for ( var i = 0; i < 200; i ++ ) {

					var object = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial( { color: Math.random() * 0xffffff } ) );

					object.position.x = Math.random() * 1000 - 500;
					object.position.y = Math.random() * 600 - 300;
					object.position.z = Math.random() * 800 - 400;

					object.rotation.x = Math.random() * 2 * Math.PI;
					object.rotation.y = Math.random() * 2 * Math.PI;
					object.rotation.z = Math.random() * 2 * Math.PI;

					object.scale.x = Math.random() * 2 + 1;
					object.scale.y = Math.random() * 2 + 1;
					object.scale.z = Math.random() * 2 + 1;

					object.castShadow = true;
					object.receiveShadow = true;

					scene.add( object );

					group.add( object );

				}*/
        
            loadGltf();
            loadObj();
            loadJson();
            /*loadJsonModel();*/
            renderer = new THREE.WebGLRenderer({
                antialias: true
            });
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setSize(window.innerWidth, window.innerHeight);

            /*renderer.shadowMap.enabled = true;
            renderer.shadowMap.type = THREE.PCFShadowMap;*/

            container.appendChild(renderer.domElement);

            var dragControls = new THREE.DragControls(group, camera, renderer.domElement);
            dragControls.addEventListener('dragstart', function(event) {
               // controls.enabled = false;
            });
            dragControls.addEventListener('dragend', function(event) {
                //controls.enabled = true;
            });


           // window.addEventListener('resize', onWindowResize, false);

        }

        function loadGltf() {
            var loader = new THREE.GLTFLoader();
            var url = 'models/item/plant/glTF/6.glb';
            loader.load(url, function(data) {
                var object = data.scene;
                object.position.set(0,10,0);
                group.add(object);
            });
        }
        function loadObj(){
            var loader = new THREE.OBJLoader();
            loader.load("models/sofaL.obj",function (obj){
                group.add(obj);
            })
        }
        function loadJson(){
            var loader = new THREE.ObjectLoader();
            loader.load("models/demo4/models.json",function(obj){
                obj.scale.set(100,100,100);
                obj.position.set(0,-10,0);
                scene.add(obj);
            })
        }
         function loadJsonModel(){
            var loader = new THREE.ObjectLoader();
            loader.load("models/demo4/cMat_base.json",function(obj){

                obj.position.set(0,-10,0);
                group.add(obj);
            })
        }
        function addItemInScence(link) {
        var objectLoader = new THREE.ObjectLoader();
        objectLoader.load(link, function (obj) {
            /*var textureLoader = new THREE.TextureLoader();
            var map = textureLoader.load("texture/Achille/achille_armchair_yellow.jpg");

            obj.traverse( function ( child ) {

                if ( child instanceof THREE.Mesh ) {

                    child.material.map = map;

                }

            } );*/
            obj.scale.set(200, 200, 200);
            objects.push(obj);
            group.add(obj);
        })
    }
        
        function onWindowResize() {

            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();

            renderer.setSize(window.innerWidth, window.innerHeight);

        }

        //

        function animate() {

            requestAnimationFrame(animate);

            render();

        }

        function render() {

           // controls.update();

            renderer.render(scene, camera);

        }