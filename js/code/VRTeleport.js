    var textures = [
                    ["texture/CmatTexture/0.1.jpg","texture/CmatTexture/0.2.jpg","texture/CmatTexture/3.2.jpg","texture/ThayVatLieu/thayvl_sofa001_3.png"],
                    ["texture/CmatTexture/1.1.jpg","texture/CmatTexture/1.2.jpg","texture/CmatTexture/1.3.jpg","texture/ThayVatLieu/thayvl_sofa001_3.png"],
                    
                    ["texture/ThayVatLieu/thayvl_sofa001_4.png","texture/ThayVatLieu/thayvl_sofa001_1.png","texture/ThayVatLieu/thayvl_sofa001_2.png","texture/ThayVatLieu/thayvl_sofa001_3.png"],
                    ["texture/CmatTexture/3.1.jpg","texture/CmatTexture/3.2.jpg","texture/CmatTexture/3.2.jpg","texture/ThayVatLieu/thayvl_sofa001_3.png"],
                    
                    ["texture/CmatTexture/4.1.jpg","texture/CmatTexture/4.2.jpg","texture/CmatTexture/4.3.jpg","texture/ThayVatLieu/thayvl_sofa001_3.png"],
                    ["texture/ThayVatLieu/thayvl_sofa001_4.png","texture/ThayVatLieu/thayvl_sofa001_1.png","texture/ThayVatLieu/thayvl_sofa001_2.png","texture/ThayVatLieu/thayvl_sofa001_3.png"],
                    ["texture/CmatTexture/6.0.jpg","texture/CmatTexture/6.1.jpg","texture/CmatTexture/6.2.jpg","texture/ThayVatLieu/thayvl_sofa001_3.png"],
                ];
            var infos = [
                ["ARMCHAIR","60 x 94 x 34 cm"],
                ["TABLE","274 x 95 x 83 cm"],
                ["TABLE","274 x 95 x 83 cm"],
                ["LOUNGE SEAT","100 x 94 x 97 cm"],
                ["TV SHELF","100 x 94 x 97 cm"],
                ["LIGHT","274 x 95 x 83 cm"],
                ["SOFA","100 x 94 x 97 cm"]
            ];
            var infoColors = [
                ["White Bull Leather","Brown Leather","Grey Fabric","Dark Grey Cotton"],
                ["White Bull Leather","Brown Leather","Grey Fabric","Dark Grey Cotton"],
                ["White Bull Leather","Brown Leather","Grey Fabric","Dark Grey Cotton"],
                ["White Bull Leather","Brown Leather","Grey Fabric","Dark Grey Cotton"],
                ["White Bull Leather","Brown Leather","Grey Fabric","Dark Grey Cotton"],
                ["White Bull Leather","Brown Leather","Grey Fabric","Dark Grey Cotton"],
                ["White Bull Leather","Brown Leather","Grey Fabric","Dark Grey Cotton"],
            ];

			var camera, scene, renderer,mouse,raycaster,mesh_c2,mesh_c3,mesh_c4, manager;
			var cameraOrtho, sceneOrtho,controls,renderer2,bloomPass;
            
			var mapC;
            var isRotate = false;
            var isCreatMat = false;
			var group;
            var frustumSize = 1000;
            var isM1 = false,isM2= false,isM3=false,isM4=false;
            var selectedObjects = [];var selectedOutLine = [];
            var selectedMats = [];
            var ObjectsInteractive = [];
            var numberMaterial = 3;
            var IdInteractive=-1;
            var IdMaterial=-1;
            var sofaL;
            var groupObject,groupMat;
            
            var hiddenMat = false;
            var raycaster2,mouse2;
            var isClickGUI = false;

//DI CHUYEN
            var highCameraPlayer = 0.8;
            var voxel;
            var cubeGeometry = new THREE.BoxGeometry( 50, 50, 50 );
			var cubeMaterial = new THREE.MeshLambertMaterial( { color: 0x00ff80, overdraw: 0.5 } );
             var rollOverMesh, rollOverMaterial;
  
//outline   
            var composer, renderPass, saoPass, copyPass, effectFXAA, outlinePass;
           
            var nameFoor = "floor_San gach_SubMesh 0";
            
            var cubeCamera2,materialENV;
            var textEnv,textEnv2,textEnv3,textEnv4; 
            var MaterialFloor;var reflectionCube;
            var oldClickObject;
            var isDown = false;
            var timer;
            var sofa1,sofa2,sofa3,sofa4;
            var groupMat2 = [];
            var groupMatOfSelt = [];
            var groupInfo = [];
            var indextGroupMat = -1;
            var textMesh1;
            var posRotateCame,posRotateCameY;
//CAMERA 
            var STATE = { NONE: - 1, ROTATE: 0};
            
            // Mouse buttons
        	this.mouseButtons = { ORBIT: THREE.MOUSE.LEFT, ZOOM: THREE.MOUSE.MIDDLE, PAN: THREE.MOUSE.RIGHT };

            var state = STATE.NONE;

            var EPS = 0.000005;

            // current position in spherical coordinates
            var spherical = new THREE.Spherical();
            var sphericalDelta = new THREE.Spherical();

            var scale = 1;
            var panOffset = new THREE.Vector3();
            var zoomChanged = false;

            var rotateStart = new THREE.Vector2();
            var rotateEnd = new THREE.Vector2();
            var rotateDelta = new THREE.Vector2();
            
            var enabled = true, enableZoom = true,enableRotate = true;
//          
            var zoomSpeed = 1.0, rotateSpeed = 1.0;
            var autoRotate = false, autoRotateSpeed = 2.0;

            var isMouseDown = false;
            var isMoveAnimation = false;
            var isAutoRotate = false;
            
            var water;
            var oldScaleMat = 1;
            var radX = 0;
             var radY = 0;
             var radiousX ;var radiousZ ;
            var objectTT;
            var arrayTextChange = [];
            
            var loadTime; var percent=0;
            var clickStart = false;
            var fontLoaderInfo;
            
//VR CONTROLLER
            var controller1, controller2;
            var intersected = [];
            var isTriggerUp ;
            var tempMatrix = new THREE.Matrix4();
             var vrControls;
             var PointStartCamera ;   
//user
            var user;
            var selectedObjects;
            var isStartUser = false;
// khi auto move vi tri va rotate deu thay doi
            loadingProgress();
            
            init();
			animate();
            
			function init() {
                
				var width = window.innerWidth;
				var height = window.innerHeight;
                var  container = document.getElementById( 'main' );
                    document.body.appendChild( container );
				camera = new THREE.PerspectiveCamera( 70, width / height, 0.1, 10000 );
				
                
                var aspect = window.innerWidth / window.innerHeight;
				cameraOrtho = new THREE.OrthographicCamera( frustumSize * aspect / - 2, frustumSize * aspect / 2, frustumSize / 2, frustumSize / - 2, 1, 2000 );
				cameraOrtho.position.y = 400;

				cameraOrtho.position.x = 10;
				cameraOrtho.position.z = 200;
                
                
				scene = new THREE.Scene();

				sceneOrtho = new THREE.Scene();

//User Player                
                user = new THREE.Group();
                user.position.set(0,highCameraPlayer,0);
				scene.add( user );
                user.add(camera);
                camera.position.set(0,0,0);
                camera.rotation.set(0,0,0);
                camera.quaternion.set(0,0,0);
                
				var textureLoader = new THREE.TextureLoader();

				var mapA = textureLoader.load( "texture/sprite0.png", createHUDSprites );

				group = new THREE.Group();
                groupObject = new THREE.Group();
                groupMat = new THREE.Group();
                groupInfo = new THREE.Group();
                
                raycaster = new THREE.Raycaster();
                raycaster2 = new THREE.Raycaster();
                
                     mouse = new THREE.Vector2();
                    mouse2 = new THREE.Vector2();
					
                var progress = document.createElement('div');
                var progressBar = document.createElement('div');

                progress.appendChild(progressBar);

                document.body.appendChild(progress);

               manager = new THREE.LoadingManager();
                manager.onProgress = function ( item, loaded, total ) {
                  var newPercent;
                  progressBar.style.width = (loaded / total * 100) + '%';
                    newPercent = loaded / total * 100;
                    if(newPercent > percent){
                        percent += (newPercent - percent);
                    }
                    
                    document.getElementById("percentLoader").innerHTML = "LOADING " + parseInt(percent) + " %";
                    if(percent === 100) document.getElementById("percentLoader").innerHTML= "ENTER THE SHOWROOM";
                 };

                
				scene.add( group );scene.add( groupObject );scene.add( groupMat );scene.add( groupInfo );
                

                 loadHouseFromJson("models/demo4/models.json");

                    loadCmatFromJson("models/demo4/cMat_base.json");
                    loadChangeMatOfSelf("models/demo4/cMat_base.json");
                    loadThayVatLieu("models/demo4/cMat_change.json");
                 
                 
                
                
				renderer = new THREE.WebGLRenderer({antialias: true});
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				renderer.autoClear = false; // To allow render overlay on top of sprited sphere

				renderer.vr.enabled = true;
                
				document.body.appendChild( renderer.domElement );
                document.body.appendChild( WEBVR.createButton( renderer ) );
//vr controllers

				controller1 = new THREE.ViveController( 0 );
                controller1.standingMatrix = renderer.vr.getStandingMatrix();
				controller1.addEventListener( 'triggerdown', onTriggerDown );
				controller1.addEventListener( 'triggerup', onTriggerUp );
				user.add( controller1 );

				controller2 = new THREE.ViveController( 1 );
                controller2.standingMatrix = renderer.vr.getStandingMatrix();
				controller2.addEventListener( 'triggerdown', onTriggerDown );
				controller2.addEventListener( 'triggerup', onTriggerUp );
				user.add( controller2 );

				var loaderVR = new THREE.OBJLoader();
				loaderVR.setPath( 'models/vive-controller/' );
				loaderVR.load( 'vr_controller_vive_1_5.obj', function ( object ) {

					var loader = new THREE.TextureLoader();
					loader.setPath( 'models/vive-controller/' );

					var controller = object.children[ 0 ];
					controller.material.map = loader.load( 'onepointfive_texture.png' );
					controller.material.specularMap = loader.load( 'onepointfive_spec.png' );

					controller1.add( object.clone() );
					controller2.add( object.clone() );

				} );
                
                var geometry = new THREE.Geometry();
				geometry.vertices.push( new THREE.Vector3( 0, 0, 0 ) );
				geometry.vertices.push( new THREE.Vector3( 0, 0, - 1 ) );
                
                var line = new THREE.Line( geometry );
				line.name = 'line';
				line.scale.z = 5;
				controller1.add( line.clone() );
				controller2.add( line.clone() );
                
  
				cubeCamera2 = new THREE.CubeCamera( 1, 2000, 456 );
                cubeCamera2.position.set(0,0,0);
				cubeCamera2.renderTarget.texture.minFilter = THREE.LinearMipMapLinearFilter;
				scene.add( cubeCamera2 );
                
                
//load invirment
                	
                    var directionsEnv1  = ["texture/EnvMaps/Env0/env0_1.png", "texture/EnvMaps/Env0/env0_2.png","texture/EnvMaps/Env0/env0_3.png", "texture/EnvMaps/Env0/env0_4.png","texture/EnvMaps/Env0/env0_5.png","texture/EnvMaps/Env0/env0_6.png"];

                
                    var directionsEnv4  = ["texture/EnvMaps/Env3/env3_1.png", "texture/EnvMaps/Env3/env3_2.png","texture/EnvMaps/Env3/env3_3.png", "texture/EnvMaps/Env3/env3_4.png","texture/EnvMaps/Env3/env3_5.png","texture/EnvMaps/Env3/env3_6.png"];
                
                     
                    textEnv = new THREE.CubeTextureLoader().load( directionsEnv1 );            
                
                   /* textEnv3 = new THREE.CubeTextureLoader().load( directionsEnv4 );*/
                
                             
				window.addEventListener( 'resize', onWindowResize, false );
              
                creatSkyBox();
                
                
                //creat box move
                //ve hop
                rollOverMaterial = new THREE.MeshBasicMaterial( { color: 0xff0000, opacity: 0.5, transparent: true } );
                 var loader = new THREE.OBJLoader( );
                    loader.load("models/footprint.obj", function ( object ) {

                        rollOverMesh = object;
                        rollOverMesh.scale.set(0.008,0.008,0.008);
                        rollOverMesh.position.set(0,0,0);
                        scene.add(rollOverMesh);
                    } ); 

                          
            var waterGeometry = new THREE.PlaneBufferGeometry( 2, 2 );
//WATER
			water = new THREE.Water( waterGeometry, {
				color: '#bbf9ee',
				scale: 3,
				flowDirection: new THREE.Vector2( 2, 2 ),
			} );
            water.rotation.x = Math.PI * - 0.5;
			
            
			groupObject.add( water );
                
               var fontloader = new THREE.FontLoader();
               
			    fontloader.load( 'fonts/gentilis_bold.typeface.json', function ( font ) {
                    fontLoaderInfo = font;
                });

			}

            function loadHouseFromJson(linkJson){
                var objectLoader = new THREE.ObjectLoader(manager);
				objectLoader.load(linkJson, function ( obj ) {
                    var i =0,j=0;
                    obj.traverse( function ( child ) {
                    
					if ( child instanceof THREE.Mesh ) {
                        var metalness = 0, roughness = 1;var envMapText = textEnv;
// vat lieu khung cua
                     if(child.name.indexOf("arch_Cua kinh") != -1){
                          metalness = 0.95, roughness = 0.08;
                     }   
                        
                    if(child.name === "arch_Tuong go_SubMesh 0"  || child.name === "arch_Cua phong012_SubMesh 0" || child.name === "arch_Cua phong010_SubMesh 0" || child.name === "arch_Cua phong011_SubMesh 0" || child.name === "cMat_Da' ke TV 1_SubMesh 0" || child.name === "cMat_Sofa 1_SubMesh 0" || child.name === "cMat_Bench 1_SubMesh 1" || child.name === "cMat_Ban pk 1_SubMesh 2" || child.name === "fur_Ban001_SubMesh 1" || child.name === "fur_Ban_SubMesh 0" ){
                        metalness = 0.3, roughness = 0.3;
                    }
                    if(child.name === "fur_Tab_SubMesh 0" || child.name === "cMat_Ban pk 1_SubMesh 1" || child.name === "fur_minimal deco1_SubMesh 0" ){
                        metalness = 0, roughness = 0.4;
                    }
                    if(child.name === "fur_Bat_LOD001_SubMesh 0" ){
                        metalness = 0, roughness = 0.03;
                    }
                        
// vat lieu san nha
                    if(child.name === "floor_San gach_SubMesh 0"  || child.name === "floor_San gach beboi_SubMesh 0" ){
                        metalness = 0.1, roughness = 0.15;
                    }
                        
// vat lieu ghe da(leather)                    
                    if(child.name === "cMat_Armchair 1_SubMesh 1"  || child.name === "cMat_Bench 1_SubMesh 0" ){
                        metalness = 0.2, roughness = 1;
                    }
                    
                    if(child.name === "arch_Stair1_SubMesh 0" ){
                        metalness = 0.2, roughness = 0.15;
                    }
                    if(child.name === "arch_Cua kinh 018_SubMesh 1"  || child.name === "arch_Cua kinh 000_SubMesh 1" ){
                        metalness = 0.9, roughness = 0.01;
                    }
// vat lieu inox   
                        
                        if(child.name === "cMat_Armchair 1_SubMesh 0" || child.name ==="fur_Ban001_SubMesh 0" || child.name === "cMat_Den cay 1_SubMesh 0" || child.name === "fur_Ban_SubMesh 0" || child.name === "fur_TV 4K Bravia x900C_SubMesh 2" || child.name === "fur_Ban_SubMesh 1" || child.name === "arch_Cua phong010_SubMesh 1" || child.name === "arch_Tu quan ao_SubMesh 1" || child.name === "arch_Cua phong012_SubMesh 1"){
                         metalness = 0.8, roughness = 0.3;
                        envMapText = textEnv;
                    }
                        
                        if(child.name.indexOf("arch_Den chum_SubMesh 3") != -1 || child.name.indexOf("arch_dowlight00") != -1 || child.name.indexOf("arch_dowlight doi 00") != -1){
                          metalness = 0.8, roughness = 0.3;
                          envMapText = textEnv;
                          
                     } 
                        
                    if(child.name === "cMat_Da' ke TV 1_SubMesh 0" || child.name === "arch_Stair1_SubMesh 0"){
                        envMapText = textEnv;
                    }
                        
                       var material = new THREE.MeshStandardMaterial({
                            map:child.material.map,
                            metalness : metalness,
                            roughness : roughness,
                            color : child.material.color,
                            normalMap : child.material.normalMap,
                            lightMap : child.material.lightMap,
                            envMap: envMapText,
                            name : "" + i,
                            lightMapIntensity :2.2,
                         
                        });                  
                       i++;j++;
  
                       
                    if(child.name.indexOf("kinh") == -1 && child.name.indexOf("TV") == -1){
                        child.material = material;
                    }
                       

					}

				} );
                    
                    
                    
                    obj.position.set(0,0,0);
                    
                    

                    var house = obj;
				 	groupObject.add( house );
                    
				} );
            }
             function loadCmatFromJson(linkJson){
                var objectLoader = new THREE.ObjectLoader(manager);
				objectLoader.load(linkJson, function ( obj ) {
                    var i =0,j=0;
                    obj.traverse( function ( child ) {
                    
					if ( child instanceof THREE.Mesh ) {
                        var metalness = 0, roughness = 1;var envMapText = textEnv;
// vat lieu khung cua
                     if(child.name.indexOf("arch_Cua kinh") != -1){
                          metalness = 0.95, roughness = 0.08;
                     }   
                        
                    if(child.name === "arch_Tuong go_SubMesh 0"  || child.name === "arch_Cua phong012_SubMesh 0" || child.name === "arch_Cua phong010_SubMesh 0" || child.name === "arch_Cua phong011_SubMesh 0" || child.name === "cMat_Da' ke TV 1_SubMesh 0" || child.name === "cMat_Sofa 1_SubMesh 0" || child.name === "cMat_Bench 1_SubMesh 1" || child.name === "cMat_Ban pk 1_SubMesh 2" || child.name === "fur_Ban001_SubMesh 1" || child.name === "fur_Ban_SubMesh 0" ){
                        metalness = 0.3, roughness = 0.3;
                    }
                    if(child.name === "fur_Tab_SubMesh 0" || child.name === "cMat_Ban pk 1_SubMesh 1" || child.name === "fur_minimal deco1_SubMesh 0" ){
                        metalness = 0, roughness = 0.4;
                    }
                    if(child.name === "fur_Bat_LOD001_SubMesh 0" ){
                        metalness = 0, roughness = 0.03;
                    }
                        
// vat lieu san nha
                    if(child.name === "floor_San gach_SubMesh 0"  || child.name === "floor_San gach beboi_SubMesh 0" ){
                        metalness = 0.1, roughness = 0.15;
                    }
                        
// vat lieu ghe da(leather)                    
                    if(child.name === "cMat_Armchair 1_SubMesh 1"  || child.name === "cMat_Bench 1_SubMesh 0" ){
                        metalness = 0.2, roughness = 1;
                    }
                    
                    if(child.name === "arch_Stair1_SubMesh 0" ){
                        metalness = 0.2, roughness = 0.15;
                    }
                    if(child.name === "arch_Cua kinh 018_SubMesh 1"  || child.name === "arch_Cua kinh 000_SubMesh 1" ){
                        metalness = 0.9, roughness = 0.01;
                    }
// vat lieu inox   
                        
                        if(child.name === "cMat_Armchair 1_SubMesh 0" || child.name ==="fur_Ban001_SubMesh 0" || child.name === "cMat_Den cay 1_SubMesh 0" || child.name === "fur_Ban_SubMesh 0" || child.name === "fur_TV 4K Bravia x900C_SubMesh 2" || child.name === "fur_Ban_SubMesh 1" || child.name === "arch_Cua phong010_SubMesh 1" || child.name === "arch_Tu quan ao_SubMesh 1" || child.name === "arch_Cua phong012_SubMesh 1"){
                         metalness = 0.8, roughness = 0.3;
                        envMapText = textEnv;
                    }
                        
                        if(child.name.indexOf("arch_Den chum_SubMesh 3") != -1 || child.name.indexOf("arch_dowlight00") != -1 || child.name.indexOf("arch_dowlight doi 00") != -1){
                          metalness = 0.8, roughness = 0.3;
                          envMapText = textEnv;
                          
                     } 
                        
                    if(child.name === "cMat_Da' ke TV 1_SubMesh 0" || child.name === "arch_Stair1_SubMesh 0"){
                        envMapText = textEnv;
                    }
                        
                       var material = new THREE.MeshStandardMaterial({
                            map:child.material.map,
                            metalness : metalness,
                            roughness : roughness,
                            color : child.material.color,
                            normalMap : child.material.normalMap,
                            lightMap : child.material.lightMap,
                            envMap: envMapText,
                            name : "" + i,
                            lightMapIntensity :2.2,
                         
                        });

                       i++;j++;
  
                       
                    if(child.name.indexOf("kinh") == -1 && child.name.indexOf("TV") == -1){
                        child.material = material;
                    }
                       

					}

				} );
                    
                    
                    
                    obj.position.set(0,0,0);
                    obj.scale.set(1,1.16,1);

                    var house = obj;
				 	groupObject.add( house );
                    
				} );
            }
            function addNewMaterial(Object,newMap,newMetalness,newRoughness,newColor,newNormalMap,newLightMap,newEnvMap,newLightMapInt){
                var material = new THREE.MeshStandardMaterial({
                            map: newMap,
                            metalness : newMetalness,
                            roughness : newRoughness,
                            color :     newColor,
                            normalMap : newNormalMap,
                            lightMap  : newLightMap,
                            envMap    : newEnvMap,
                            lightMapIntensity :newLightMapInt,
                         
                        });
                 Object.material = material;
            }
            function loadThayVatLieu(linkJson){                         
                var objectLoader = new THREE.ObjectLoader(manager);
				objectLoader.load(linkJson, function ( obj ) {
                    obj.traverse( function ( child ) {
                        
                    if ( child instanceof THREE.Mesh ) {
                        var metalness = 0.3, roughness = 0.3;var envMap = textEnv ;
                    
// vat lieu inox               
                        if(child.name === "cMat_Den cay 2_SubMesh 0" || child.name === "cMat_Den cay 3_SubMesh 0" || child.name === "cMat_Armchair 2_SubMesh 0" || child.name === "cMat_Armchair 3_SubMesh 0"){
                         metalness = 0.8, roughness = 0.3;
                        envMap = reflectionCube;
                    }
                        
                        
                        
                    if(child.name === "cMat_Da' ke TV 2_SubMesh 0" || child.name === "cMat_Da' ke TV 3_SubMesh 0" ){
                        envMap = textEnv;
                    }
                        var material = new THREE.MeshStandardMaterial({
                            map:child.material.map,
                            metalness : metalness,
                            roughness : roughness,
                            color : child.material.color,
                            normalMap : child.material.normalMap,
                            lightMap : child.material.lightMap,
                            envMap: envMap,
                            lightMapIntensity :4,
                         
                        });
                        child.material = material;
                        
                         groupMat2.push(child);
                         
                        }

                    });
                                      
                });

            }
            function loadChangeMatOfSelf(linkJson){
                var objectLoader = new THREE.ObjectLoader( manager);
				objectLoader.load(linkJson, function ( obj ) {
                    
                    obj.traverse( function ( child ) {
                        
                    if ( child instanceof THREE.Mesh ) {
                        var metalness = 0, roughness = 1;var envMap = textEnv ;
                    if( child.name === "cMat_Da' ke TV 1_SubMesh 0" || child.name === "cMat_Sofa 1_SubMesh 0" || child.name === "cMat_Bench 1_SubMesh 1" || child.name === "cMat_Ban pk 1_SubMesh 2"  ){
                        metalness = 0.3, roughness = 0.3;
                    }
// vat lieu ghe da(leather)                    
                    if(child.name === "cMat_Armchair 1_SubMesh 1"  || child.name === "cMat_Bench 1_SubMesh 0" ){
                        metalness = 0.2, roughness = 1;
                    }
                    
// vat lieu inox               
                        if(child.name === "cMat_Armchair 1_SubMesh 0" || child.name === "cMat_Den cay 1_SubMesh 0" ){
                         metalness = 0.8, roughness = 0.3;
                        envMap = reflectionCube;
                    }
                        
                        
                        
                    if(child.name === "cMat_Da' ke TV 1_SubMesh 0" ){
                        envMap = textEnv;
                    }
                        var material = new THREE.MeshStandardMaterial({
                            map:child.material.map,
                            metalness : metalness,
                            roughness : roughness,
                            color : child.material.color,
                            normalMap : child.material.normalMap,
                            lightMap : child.material.lightMap,
                            envMap: envMap,
                            lightMapIntensity :2.2,
                         
                        });
                        child.material = material;
                            groupMatOfSelt.push(child);
                     
                         
                        }

                    });
                                      
                });   
                console.log(groupMatOfSelt.length);
            }
            function creatPlaneNotMove(posX,posY,posZ,scaleX,scaleY,scaleZ){
                var material = new THREE.MeshBasicMaterial( { color: 0x948A6F, wireframe: true } );
                //load plane not move 
                var geometry = new THREE.PlaneBufferGeometry( 100, 100 );             
                geometry.rotateX( - Math.PI / 2 );
                var  ObjectNotMove = new THREE.Mesh( geometry, material );
                ObjectNotMove.position.set(posX,posY,posZ);
                ObjectNotMove.scale.set(scaleX,scaleY,scaleZ);
                ObjectNotMove.name = 'notplane';
                groupObject.add(ObjectNotMove);
            }            
            function creatSkyBox(){
                	var imagePrefix = "models/Skybox/";
                    var directions  = ["1", "2", "3", "4", "5", "6"];
                    var imageSuffix = ".jpg";
                    var skyGeometry = new THREE.CubeGeometry( 5000, 5000, 5000);	
                    var textureLoader = new THREE.TextureLoader(  );
                    var materialArray = [];
                    for (var i = 0; i < 6; i++)
                        materialArray.push( new THREE.MeshBasicMaterial({
                            map:  textureLoader.load( imagePrefix + directions[i] + imageSuffix ),
                            side: THREE.BackSide
                        }));
                    var skyMaterial = new THREE.MeshFaceMaterial( materialArray );
                    var skyBox = new THREE.Mesh( skyGeometry, skyMaterial );
                    skyBox.position.set(0,0,0);
                    scene.add( skyBox );
            }
            function onWindowResize() {

				var width = window.innerWidth;
				var height = window.innerHeight;

				camera.aspect = width / height;
				camera.updateProjectionMatrix();

				cameraOrtho.left = - width / 2;
				cameraOrtho.right = width / 2;
				cameraOrtho.top = height / 2;
				cameraOrtho.bottom = - height / 2;
				cameraOrtho.updateProjectionMatrix();
                
				renderer.setSize( window.innerWidth, window.innerHeight );

			}
//CREAT GUI   
			function createHUDSprites ( texture ) {

                CreateGUIMaterial();


			}
            function CreateGUIMaterial(){
                 var width = window.innerWidth ;
                 var hieght = window.innerHeight/2;
                 var textureLoader = new THREE.TextureLoader(  );
                 var hieghtMat;
                //mat 1
                var geometry = new THREE.SphereGeometry( 5, 5, 5 );
                
                        
                        textureLoader.load ("texture/sprite0.png", function (texture){
                            
                            var material1 = new THREE.MeshBasicMaterial({
                            map: texture,
                            color : "#ffffff",
                            overdraw: 0.5,
                        });
                            hieghtMat = material1.map.image.width;
                            mesh_c1 = new THREE.Mesh( geometry, material1 );
                            mesh_c1.name = "m1";
                            mesh_c1.identity = 0;
                            mesh_c1.position.set(-width/4 ,hieghtMat,1 ); // top left
                            groupMat.add(mesh_c1);
                        });
                //mat 2
               
                        textureLoader.load ("texture/sprite0.png", function (texture){
                            
                            var material2 = new THREE.MeshBasicMaterial({
                            map: texture,
                            color : '#ffffff',
                            overdraw: 0.5,
                        });
                            mesh_c2 = new THREE.Mesh( geometry, material2 );
                            mesh_c2.name = "m2";
                            mesh_c2.identity = 1;
                            mesh_c2.position.set( 0,hieghtMat,1 ); // top left
                            groupMat.add(mesh_c2);
                        });
                //mat3
                
                        textureLoader.load ("texture/sprite0.png", function (texture){
                            
                            var material = new THREE.MeshBasicMaterial({
                            map: texture,
                            /*color : '#ffffff',
                            overdraw: 0.5,*/
                        });
                            mesh_c3 = new THREE.Mesh( geometry, material );
                            mesh_c3.name = "m3";
                            mesh_c3.identity = 2;
                            mesh_c3.position.set( width/4 ,hieghtMat,1 ); // top left
                            groupMat.add(mesh_c3);
                        });

                
                
                
                isCreatMat = true;
                
            }
            function CreatTextInfo(infoObject,infoColor,infoSize){
                var width = window.innerWidth;
                var hight = window.innerHeight ;
                
               
			    
                var geometry1 = new THREE.TextGeometry(infoObject, {

					font: fontLoaderInfo,
					size: 50,
					height: 10,
					curveSegments: 2

				});
                
                var materials = [
					new THREE.MeshBasicMaterial( { color: 0xffffff, overdraw: 0.5 } ),
				];  
				textMesh1 = new THREE.Mesh( geometry1, materials );
                textMesh1.position.set(-width/2 - 10,hight -100,1);
                textMesh1.geometry.needsUpdate = true;   
                groupInfo.add(textMesh1);
                
                var geometry2 = new THREE.TextGeometry(infoColor, {

					font: fontLoaderInfo,
					size: 20,
					height: 8,
					curveSegments: 2

				});    
                 
                var textMesh2 = new THREE.Mesh( geometry2, materials );
                textMesh2.position.set(-width/2 - 10,hight -130,1);
                textMesh2.geometry.needsUpdate = true;   
                groupInfo.add(textMesh2);
                    
                var geometry3 = new THREE.TextGeometry(infoSize, {

					font: fontLoaderInfo,
					size: 15,
					height: 6,
					curveSegments: 2

				});    
                    
                var textMesh2 = new THREE.Mesh( geometry3, materials );
                textMesh2.position.set(-width/2 - 10,hight -150,1);
                textMesh2.geometry.needsUpdate = true;   
                groupInfo.add(textMesh2);
             
                    updateHUDSprites();
            }

//Controll vr
            function addSelectedObject( object ) {

					selectedObjects = [];
					selectedObjects.push( object );

            }
            function onTriggerDown( event ) {

				var controller = event.target;			
                isTriggerUp = false;
                if(isStartUser == false){
                    isStartUser = true;
                    PointStartCamera = new THREE.Vector3( camera.position.x, camera.position.y,  camera.position.z );
                }
                
                /*console.log(PointStartCamera);
                console.log(camera.position);*/
			}
            function AddVectorFrom(A,B){
                var pointDiv = new THREE.Vector3();
                    pointDiv.x = A.x + B.x;
                    pointDiv.y = A.y + B.y;
                    pointDiv.z = A.z + B.z;
                return pointDiv;
            }
            function subVectorFrom(A,B){
                var pointDiv = new THREE.Vector3();
                    pointDiv.x = A.x - B.x;
                    pointDiv.y = A.y - B.y;
                    pointDiv.z = A.z - B.z;
                return pointDiv;
            }
            function divVectorFrom(A,numPoint){
                var pointDiv = new THREE.Vector3();
                    pointDiv.x = A.x/numPoint;
                    pointDiv.y = A.y/numPoint;
                    pointDiv.z = A.z/numPoint;
                return pointDiv;
                
            } 
			function onTriggerUp( event ) {

				var controller = event.target;
                 isTriggerUp = true;
                getIntersections(controller);
                

			}

			function getIntersections( controller ) {

				tempMatrix.identity().extractRotation( controller.matrixWorld );

				raycaster.ray.origin.setFromMatrixPosition( controller.matrixWorld );
				raycaster.ray.direction.set( 0, 0, -1 ).applyMatrix4( tempMatrix );
                
                var line = controller.getObjectByName( 'line' );
              
                var intersects = raycaster.intersectObjects(groupObject.children, true);
                if(intersects.length >0){
                  
                    
                    //teleport tren san        
                    if(intersects[0].object.name === nameFoor || intersects[0].object.name === "floor_San gach beboi_SubMesh 0" 
                       || intersects[0].object.name === "floor_carpet09-00_SubMesh 0" ){
                        rollOverMesh.visible = true;
                        rollOverMesh.position.set( intersects[0].point.x,-0.01,intersects[0].point.z );
                        
                        if(isTriggerUp){
                            var PosTeleport = subVectorFrom(intersects[0].point,divVectorFrom(AddVectorFrom(PointStartCamera,camera.position),2));
                            
                             
                                   
                            user.position.set(PosTeleport.x,highCameraPlayer,PosTeleport.z);
                            rollOverMesh.visible = false;                                                                                                                                                                                                                                                                                     
                        }
                    }
                    /*line.scale.z = intersects[0].distance;*/
                }else{
                   /* line.scale.z = 50;*/
                }
                
				
			}
            
            function MoveAnimation(source, target, delay )
            {
                    
					new TWEEN.Tween( source )
                        .to( target, delay )
					.easing(TWEEN.Easing.Linear.None).start();
                    setTimeout(function(){
                        
                    },delay);
                  
            }
//animate and render            
            
			function animate() {

				requestAnimationFrame( animate );
				render();

			}

			function render() {
                
                controller1.update();
				controller2.update();
                
                if(isTriggerUp === false){
                    getIntersections(controller1);
                }
                
				renderer.clear();
				renderer.render( scene, camera );
                
                
                
                if(isAutoRotate){
//                    rotateCam(selectedObjects[0]);
                }
                if(!isRotate){
                    for(var i=0; i< sceneOrtho.children.length; i++){

                    }
                    
                }
                if(isRotate){
                    selectedMats[0].rotation.y += 0.02;
                }

			}
            function loadingProgress(){
                  var elem = document.getElementById("myBar");   
                  var width = 1;
                  var id = setInterval(frame, 10);
                  function frame() {
                    if (width >= 100) {
                      clearInterval(id);
                    } else {
                      width = percent;
                      elem.style.width = width + '%'; 
                    }
            }
            }
