var textures = [
            ["texture/CmatTexture/0.1.jpg", "texture/CmatTexture/0.2.jpg", "texture/CmatTexture/3.2.jpg", "texture/ThayVatLieu/thayvl_sofa001_3.png"],
            ["texture/CmatTexture/1.1.jpg", "texture/CmatTexture/1.2.jpg", "texture/CmatTexture/1.3.jpg", "texture/ThayVatLieu/thayvl_sofa001_3.png"],

            ["texture/ThayVatLieu/thayvl_sofa001_4.png", "texture/ThayVatLieu/thayvl_sofa001_1.png", "texture/ThayVatLieu/thayvl_sofa001_2.png", "texture/ThayVatLieu/thayvl_sofa001_3.png"],
            ["texture/CmatTexture/3.1.jpg", "texture/CmatTexture/3.2.jpg", "texture/CmatTexture/3.2.jpg", "texture/ThayVatLieu/thayvl_sofa001_3.png"],

            ["texture/CmatTexture/4.1.jpg", "texture/CmatTexture/4.2.jpg", "texture/CmatTexture/4.3.jpg", "texture/ThayVatLieu/thayvl_sofa001_3.png"],
            ["texture/ThayVatLieu/thayvl_sofa001_4.png", "texture/ThayVatLieu/thayvl_sofa001_1.png", "texture/ThayVatLieu/thayvl_sofa001_2.png", "texture/ThayVatLieu/thayvl_sofa001_3.png"],
            ["texture/CmatTexture/6.0.jpg", "texture/CmatTexture/6.1.jpg", "texture/CmatTexture/6.2.jpg", "texture/ThayVatLieu/thayvl_sofa001_3.png"],
        ];
var infos = [
            ["ARMCHAIR", "60 x 94 x 34 cm"],
            ["TABLE", "274 x 95 x 83 cm"],
            ["TABLE", "274 x 95 x 83 cm"],
            ["LOUNGE SEAT", "100 x 94 x 97 cm"],
            ["TV SHELF", "100 x 94 x 97 cm"],
            ["LIGHT", "274 x 95 x 83 cm"],
            ["SOFA", "100 x 94 x 97 cm"]
        ];
var infoColors = [
            ["White Bull Leather", "Brown Leather", "Grey Fabric", "Dark Grey Cotton"],
            ["White Bull Leather", "Brown Leather", "Grey Fabric", "Dark Grey Cotton"],
            ["White Bull Leather", "Brown Leather", "Grey Fabric", "Dark Grey Cotton"],
            ["White Bull Leather", "Brown Leather", "Grey Fabric", "Dark Grey Cotton"],
            ["White Bull Leather", "Brown Leather", "Grey Fabric", "Dark Grey Cotton"],
            ["White Bull Leather", "Brown Leather", "Grey Fabric", "Dark Grey Cotton"],
            ["White Bull Leather", "Brown Leather", "Grey Fabric", "Dark Grey Cotton"],
        ];

var camera, scene, renderer, mouse, raycaster, mesh_c2, mesh_c3, mesh_c4, manager;
var cameraOrtho, sceneOrtho, controls, renderer2, bloomPass;

var mapC;
var isRotate = false;
var isCreatMat = false;
var group;
var frustumSize = 1000;
var isM1 = false,
    isM2 = false,
    isM3 = false,
    isM4 = false;
var selectedObjects = [];
var selectedOutLine = [];
var selectedMats = [];
var ObjectsInteractive = [];
var numberMaterial = 3;
var IdInteractive = -1;
var IdMaterial = -1;
var sofaL;
var groupObject, groupMat;

var hiddenMat = false;
var raycaster2, mouse2;
var isClickGUI = false;

//DI CHUYEN
var highCameraPlayer = 100;
var voxel;
var cubeGeometry = new THREE.BoxGeometry(50, 50, 50);
var cubeMaterial = new THREE.MeshLambertMaterial({
    color: 0x00ff80,
    overdraw: 0.5
});
var rollOverMesh, rollOverMaterial;

//outline   
var composer, renderPass, saoPass, copyPass, effectFXAA, outlinePass;

var nameFoor = "floor_San gach_SubMesh 0";

var cubeCamera2, materialENV;
var textEnv, textEnv2, textEnv3, textEnv4;
var MaterialFloor;
var reflectionCube;
var oldClickObject;
var isDown = false;
var timer;
var sofa1, sofa2, sofa3, sofa4;
var groupMat2 = [];
var groupMatOfSelt = [];
var groupInfo = [];
var indextGroupMat = -1;
var textMesh1;
var posRotateCame, posRotateCameY;
//CAMERA 
var STATE = {
    NONE: -1,
    ROTATE: 0
};

// Mouse buttons
this.mouseButtons = {
    ORBIT: THREE.MOUSE.LEFT,
    ZOOM: THREE.MOUSE.MIDDLE,
    PAN: THREE.MOUSE.RIGHT
};

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

var enabled = true,
    enableZoom = true,
    enableRotate = true;
//          
var zoomSpeed = 1.0,
    rotateSpeed = 1.0;
var autoRotate = false,
    autoRotateSpeed = 2.0;

var isMouseDown = false;
var isMoveAnimation = false;
var isAutoRotate = false;

var water;
var oldScaleMat = 1;
var radX = 0;
var radY = 0;
var radiousX;
var radiousZ;
var objectTT;
var arrayTextChange = [];

var loadTime;
var percent = 0;
var clickStart = false;

var fontLoaderInfo;



//VR CONTROLLER
var controller1, controller2;
var intersected = [];
var isTriggerUp;
var tempMatrix = new THREE.Matrix4();
var vrControls;
var PointStartCamera;
//user
var user;
var selectedObjects;
var isStartUser = false;

var withMat = 1; // kich thuoc Material
var hieghtMat;
// khi auto move vi tri va rotate deu thay doi

var enableInteraction = false;
var objects = [];
var enableMove = false;
var plane = new THREE.Plane();
var planeNormal = new THREE.Vector3();
var point = new THREE.Vector3();

var sizescale = 1;
init();
animate();

function init() {
    container = document.getElementById("main");
    var width = window.innerWidth;
    var height = window.innerHeight;
    

    camera = new THREE.PerspectiveCamera(60, width / height, 1, 10000);

    camera.position.y = 100;
    camera.position.z = 400;

    var aspect = container.clientWidth / window.innerHeight;
    cameraOrtho = new THREE.OrthographicCamera(frustumSize * aspect / -2, frustumSize * aspect / 2, frustumSize / 2, frustumSize / -2, 1, 2000);
    cameraOrtho.position.y = 400;

    cameraOrtho.position.x = 10;
    cameraOrtho.position.z = 200;


    scene = new THREE.Scene();

    sceneOrtho = new THREE.Scene();


    var textureLoader = new THREE.TextureLoader();

    var mapA = textureLoader.load("texture/sprite0.png", createHUDSprites);

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
    manager.onProgress = function (item, loaded, total) {
        var newPercent;
        progressBar.style.width = (loaded / total * 100) + '%';
        newPercent = loaded / total * 100;
        if (newPercent > percent) {
            percent += (newPercent - percent);
        }


    };

    user = new THREE.Group();

    user.position.set(0, highCameraPlayer, 0);
    scene.add(user);
    user.add(camera);

    scene.add(group);
    scene.add(groupObject);
    
    
    console.log(container.clientWidth);

    var directionalLight2 = new THREE.AmbientLight(0x000000, 0.2);
    directionalLight2.position.set(0, 0, 0);

    scene.add(directionalLight2);

    //load invirment

    var directionsEnv1 = ["texture/EnvMaps/Env0/env0_1.png", "texture/EnvMaps/Env0/env0_2.png", "texture/EnvMaps/Env0/env0_3.png", "texture/EnvMaps/Env0/env0_4.png", "texture/EnvMaps/Env0/env0_5.png", "texture/EnvMaps/Env0/env0_6.png"];


    var directionsEnv4 = ["texture/EnvMaps/Env3/env3_1.png", "texture/EnvMaps/Env3/env3_2.png", "texture/EnvMaps/Env3/env3_3.png", "texture/EnvMaps/Env3/env3_4.png", "texture/EnvMaps/Env3/env3_5.png", "texture/EnvMaps/Env3/env3_6.png"];


    textEnv = new THREE.CubeTextureLoader().load(directionsEnv1);

    /*textEnv3 = new THREE.CubeTextureLoader().load( directionsEnv4 );*/

    loadChangeMatOfSelf("models/demo4/cMat_base.json");

    loadThayVatLieu("models/demo4/cMat_change.json");

    renderer = new THREE.WebGLRenderer({
        precision: "mediump",
       /* canvas:canvas,*/
        devicePixelRatio: 1,
        antialias: true
    });

    
    renderer.setSize(container.clientWidth, window.innerHeight);
    renderer.autoClear = false; // To allow render overlay on top of sprited sphere
    renderer.vr.enabled = true;
    container.appendChild(renderer.domElement);
    /*document.body.appendChild( renderer.domElement );*/

    document.body.appendChild(WEBVR.createButton(renderer));
    //vr controllers

    controller1 = new THREE.ViveController(0);
    controller1.standingMatrix = renderer.vr.getStandingMatrix();
    controller1.addEventListener('triggerdown', onTriggerDown);
    controller1.addEventListener('triggerup', onTriggerUp);
    user.add(controller1);

    controller2 = new THREE.ViveController(1);
    controller2.standingMatrix = renderer.vr.getStandingMatrix();
    controller2.addEventListener('triggerdown', onTriggerDown);
    controller2.addEventListener('triggerup', onTriggerUp);
    user.add(controller2);

    var loaderVR = new THREE.OBJLoader();
    loaderVR.setPath('models/vive-controller/');
    loaderVR.load('vr_controller_vive_1_5.obj', function (object) {

        var loader = new THREE.TextureLoader();
        loader.setPath('models/vive-controller/');

        var controller = object.children[0];
        controller.material.map = loader.load('onepointfive_texture.png');
        controller.material.specularMap = loader.load('onepointfive_spec.png');

        controller1.add(object.clone());
        controller2.add(object.clone());

    });
    var geometry = new THREE.Geometry();
    geometry.vertices.push(new THREE.Vector3(0, 0, 0));
    geometry.vertices.push(new THREE.Vector3(0, 0, -1));

    var line = new THREE.Line(geometry);
    line.name = 'line';
    line.scale.z = 5;
    controller1.add(line.clone());
    controller2.add(line.clone());

    console.log('VR :', isFoundVR);
    /*user.scale.set(200,200,200); */

    if (isFoundVR == true) {
        highCameraPlayer = 180;
        camera.position.y = 0;
        camera.position.z = 0;
        user.add(camera);
        user.position.set(0, highCameraPlayer, 0);
        user.scale.set(200, 200, 200);

        user.add(groupMat);
        scene.add(groupInfo);
    } else {
        sceneOrtho.add(groupMat);
        sceneOrtho.add(groupInfo);
    }


    //postprocessing
    composer = new THREE.EffectComposer(renderer);
    renderPass = new THREE.RenderPass(scene, camera);
    composer.addPass(renderPass);

    effectFXAA = new THREE.ShaderPass(THREE.FXAAShader);
    effectFXAA.uniforms['resolution'].value.set(1 / container.clientWidth, 1 / window.innerHeight);
    effectFXAA.renderToScreen = true;


    outlinePass = new THREE.OutlinePass(new THREE.Vector2(container.clientWidth, window.innerHeight), scene, camera);
    composer.addPass(outlinePass);

    bloomPass = new THREE.UnrealBloomPass(new THREE.Vector2(container.clientWidth, window.innerHeight), 1.5, 0.4, 0.85); //1.0, 9, 0.5, 512);
    bloomPass.renderToScreen = true;
    bloomPass.strength = 0.8;
    composer.addPass(bloomPass);
    composer.addPass(effectFXAA);


    cubeCamera2 = new THREE.CubeCamera(1, 2000, 456);
    cubeCamera2.position.set(0, 0, 0);
    cubeCamera2.renderTarget.texture.minFilter = THREE.LinearMipMapLinearFilter;
    scene.add(cubeCamera2);


    var directionalLight = new THREE.DirectionalLight(0xdddddd);
    directionalLight.position.set(0, 0, 1).normalize();
    scene.add(directionalLight);
    var spot1 = new THREE.SpotLight(0xffffff, 1);
    spot1.position.set(10, 20, 10);
    spot1.angle = 0.25;
    spot1.distance = 1024;
    spot1.penumbra = 0.75;

    scene.add(spot1);

    window.addEventListener('resize', onWindowResize, false);
    hiddenMaterial();

    creatSkyBox();


    //creat box move
    //ve hop
    rollOverMaterial = new THREE.MeshBasicMaterial({
        color: 0xff0000,
        opacity: 0.5,
        transparent: true
    });

    var loader = new THREE.OBJLoader();
    loader.load("models/footprint.obj", function (object) {

        rollOverMesh = object;
        scene.add(rollOverMesh);

        rollOverMesh.visible = false;

    });

    loadGltf();

    var waterGeometry = new THREE.PlaneBufferGeometry(20, 20);
    //WATER
    water = new THREE.Water(waterGeometry, {
        color: '#bbf9ee',
        scale: 3,
        flowDirection: new THREE.Vector2(2, 2),
    });
    water.rotation.x = Math.PI * -0.5;
    water.position.set(-150, -6, -1462);
    water.scale.set(100, 50, 10);
    groupObject.add(water);

    var fontloader = new THREE.FontLoader();

    fontloader.load('fonts/gentilis_bold.typeface.json', function (font) {
        fontLoaderInfo = font;
    });


    document.addEventListener('mousemove', onDocumentMouseMove, false);
    document.addEventListener('mouseup', onDocumentMouseUp, false);
    document.addEventListener('mousedown', onDocumentMouseDown, false);
    document.addEventListener('mousedown', onMouseDownControl, false);
    document.addEventListener('mousemove', onMouseMoveControl, false);
    document.addEventListener('mouseup', onMouseUp, false);

    document.addEventListener('touchstart', onDocumentMouseDown, false);
    document.addEventListener('touchmove', onDocumentMouseMove, false);
    document.addEventListener('touchend', onDocumentMouseUp, false);


    document.addEventListener('touchstart', onTouchStart, false);
    document.addEventListener('touchmove', onTouchMove, false);
    document.addEventListener('touchend', onTouchEnd, false);


}

function loadGltf() {
    var loader = new THREE.GLTFLoader();
    var url = 'models/item/plant/glTF/1.glb';
    loader.load(url, function (data) {
        var object = data.scene;
        object.scale.set(30, 30, 30);
        object.position.set(0, 70, 0);
        scene.add(object);
    });
}
//  load frame house
function loadHouseFromJson(linkJson) {
    var objectLoader = new THREE.ObjectLoader(manager);
    objectLoader.load(linkJson, function (obj) {
        var i = 0,
            j = 0;
        obj.traverse(function (child) {

            if (child instanceof THREE.Mesh) {
                var metalness = 0,
                    roughness = 1;
                var envMapText = textEnv;
                // vat lieu khung cua
                if (child.name.indexOf("arch_Cua kinh") != -1) {
                    metalness = 0.95, roughness = 0.08;
                }

                if (child.name === "arch_Tuong go_SubMesh 0" || child.name === "arch_Cua phong012_SubMesh 0" || child.name === "arch_Cua phong010_SubMesh 0" || child.name === "arch_Cua phong011_SubMesh 0" || child.name === "cMat_Da' ke TV 1_SubMesh 0" || child.name === "cMat_Sofa 1_SubMesh 0" || child.name === "cMat_Bench 1_SubMesh 1" || child.name === "cMat_Ban pk 1_SubMesh 2" || child.name === "fur_Ban001_SubMesh 1" || child.name === "fur_Ban_SubMesh 0") {
                    metalness = 0.3, roughness = 0.3;
                }
                if (child.name === "fur_Tab_SubMesh 0" || child.name === "cMat_Ban pk 1_SubMesh 1" || child.name === "fur_minimal deco1_SubMesh 0") {
                    metalness = 0, roughness = 0.4;
                }
                if (child.name === "fur_Bat_LOD001_SubMesh 0") {
                    metalness = 0, roughness = 0.03;
                }

                // vat lieu san nha
                if (child.name === "floor_San gach_SubMesh 0" || child.name === "floor_San gach beboi_SubMesh 0") {
                    metalness = 0.1, roughness = 0.15;
                }

                // vat lieu ghe da(leather)                    
                if (child.name === "cMat_Armchair 1_SubMesh 1" || child.name === "cMat_Bench 1_SubMesh 0") {
                    metalness = 0.2, roughness = 1;
                }

                if (child.name === "arch_Stair1_SubMesh 0") {
                    metalness = 0.2, roughness = 0.15;
                }
                if (child.name === "arch_Cua kinh 018_SubMesh 1" || child.name === "arch_Cua kinh 000_SubMesh 1") {
                    metalness = 0.9, roughness = 0.01;
                }
                // vat lieu inox   

                if (child.name === "cMat_Armchair 1_SubMesh 0" || child.name === "fur_Ban001_SubMesh 0" || child.name === "cMat_Den cay 1_SubMesh 0" || child.name === "fur_Ban_SubMesh 0" || child.name === "fur_TV 4K Bravia x900C_SubMesh 2" || child.name === "fur_Ban_SubMesh 1" || child.name === "arch_Cua phong010_SubMesh 1" || child.name === "arch_Tu quan ao_SubMesh 1" || child.name === "arch_Cua phong012_SubMesh 1") {
                    metalness = 0.8, roughness = 0.3;
                    envMapText = textEnv;
                }

                if (child.name.indexOf("arch_Den chum_SubMesh 3") != -1 || child.name.indexOf("arch_dowlight00") != -1 || child.name.indexOf("arch_dowlight doi 00") != -1) {
                    metalness = 0.8, roughness = 0.3;
                    envMapText = textEnv;

                }

                if (child.name === "cMat_Da' ke TV 1_SubMesh 0" || child.name === "arch_Stair1_SubMesh 0") {
                    envMapText = textEnv;
                }

                var material = new THREE.MeshStandardMaterial({
                    map: child.material.map,
                    metalness: metalness,
                    roughness: roughness,
                    color: child.material.color,
                    normalMap: child.material.normalMap,
                    lightMap: child.material.lightMap,
                    envMap: envMapText,
                    name: "" + i,
                    lightMapIntensity: 2.2,

                });
                //                        

                if (child.name === "cMat_Armchair 1_SubMesh 1") {

                    for (var k = 0; k < 2; k++) {
                        addNewMaterial(groupMat2[k], groupMat2[k].material.map, metalness, roughness, child.material.color, groupMat2[k].material.normalMap, child.material.lightMap, child.material.envMap, 4);

                    }
                }
                if (child.name === "cMat_Ban pk 1_SubMesh 2") {

                    for (var k = 2; k < 4; k++) {
                        var lightmapInt = 4;
                        if (k === 2) lightmapInt = 8;

                        addNewMaterial(groupMat2[k], groupMat2[k].material.map, metalness, roughness, child.material.color, groupMat2[k].material.normalMap, child.material.lightMap, child.material.envMap, lightmapInt);

                    }
                }
                if (child.name === "cMat_Ban pk 1_SubMesh 1") {

                    for (var k = 4; k < 6; k++) {

                        addNewMaterial(groupMat2[k], groupMat2[k].material.map, metalness, roughness, child.material.color, groupMat2[k].material.normalMap, child.material.lightMap, child.material.envMap, 4);
                    }
                }

                if (child.name === "cMat_Bench 1_SubMesh 0") {

                    for (var k = 6; k < 8; k++) {
                        var lightmapInt = 4;
                        if (k === 6) lightmapInt = 6;
                        addNewMaterial(groupMat2[k], groupMat2[k].material.map, metalness, roughness, child.material.color, groupMat2[k].material.normalMap, child.material.lightMap, child.material.envMap, lightmapInt);


                    }
                }

                if (child.name === "cMat_Da' ke TV 1_SubMesh 0") {

                    for (var k = 8; k < 10; k++) {
                        addNewMaterial(groupMat2[k], groupMat2[k].material.map, metalness, roughness, child.material.color, groupMat2[k].material.normalMap, child.material.lightMap, child.material.envMap, 4);

                    }
                }
                if (child.name === "dencay_mattrong_SubMesh 0") {

                    for (var k = 10; k < 12; k++) {
                        addNewMaterial(groupMat2[k], groupMat2[k].material.map, metalness, roughness, child.material.color, groupMat2[k].material.normalMap, child.material.lightMap, child.material.envMap, 2.2);

                    }
                }
                if (child.name === "cMat_Sofa 1_SubMesh 1") {

                    for (var k = 12; k < 14; k++) {
                        addNewMaterial(groupMat2[k], groupMat2[k].material.map, metalness, roughness, child.material.color, groupMat2[k].material.normalMap, child.material.lightMap, child.material.envMap, 4);
                    }
                }
                //                       
                i++;
                j++;


                if (child.name.indexOf("kinh") == -1 && child.name.indexOf("TV") == -1) {
                    child.material = material;
                }


            }

        });



        obj.position.set(0, 0, 0);
        obj.scale.set(200, 200, 200);
        var house = obj;
        groupObject.add(house);

    });
}

function addNewMaterial(Object, newMap, newMetalness, newRoughness, newColor, newNormalMap, newLightMap, newEnvMap, newLightMapInt) {
    var material = new THREE.MeshStandardMaterial({
        map: newMap,
        metalness: newMetalness,
        roughness: newRoughness,
        color: newColor,
        normalMap: newNormalMap,
        lightMap: newLightMap,
        envMap: newEnvMap,
        lightMapIntensity: newLightMapInt,

    });
    Object.material = material;
}

function loadThayVatLieu(linkJson) {
    var i = 0;
    var objectLoader = new THREE.ObjectLoader(manager);
    objectLoader.load(linkJson, function (obj) {
        obj.traverse(function (child) {

            if (child instanceof THREE.Mesh) {
                var metalness = 0.3,
                    roughness = 0.3;
                var envMapText = textEnv;

                // vat lieu inox               
                if (child.name === "cMat_Den cay 2_SubMesh 0" || child.name === "cMat_Den cay 3_SubMesh 0" || child.name === "cMat_Armchair 2_SubMesh 0" || child.name === "cMat_Armchair 3_SubMesh 0") {
                    metalness = 0.8, roughness = 0.3;
                    envMapText = reflectionCube;
                }



                if (child.name === "cMat_Da' ke TV 2_SubMesh 0" || child.name === "cMat_Da' ke TV 3_SubMesh 0") {
                    envMapText = textEnv;
                }
                var material = new THREE.MeshStandardMaterial({
                    map: child.material.map,
                    metalness: metalness,
                    roughness: roughness,
                    color: child.material.color,
                    normalMap: child.material.normalMap,
                    lightMap: child.material.lightMap,
                    /*   envMap: envMapText,*/
                    lightMapIntensity: 4,

                });
                child.material = material;
                i++;
                groupMat2.push(child);

            }

        });

        if (i == 14) {
            loadHouseFromJson("models/demo4/models.json");

            loadHouseFromJson("models/demo4/cMat_base.json");
        }
    });



}

function loadChangeMatOfSelf(linkJson) {
    var objectLoader = new THREE.ObjectLoader(manager);
    objectLoader.load(linkJson, function (obj) {

        obj.traverse(function (child) {

            if (child instanceof THREE.Mesh) {
                var metalness = 0,
                    roughness = 1;
                var envMapText = textEnv;
                if (child.name === "cMat_Da' ke TV 1_SubMesh 0" || child.name === "cMat_Sofa 1_SubMesh 0" || child.name === "cMat_Bench 1_SubMesh 1" || child.name === "cMat_Ban pk 1_SubMesh 2") {
                    metalness = 0.3, roughness = 0.3;
                }
                // vat lieu ghe da(leather)                    
                if (child.name === "cMat_Armchair 1_SubMesh 1" || child.name === "cMat_Bench 1_SubMesh 0") {
                    metalness = 0.2, roughness = 1;
                }

                // vat lieu inox               
                if (child.name === "cMat_Armchair 1_SubMesh 0" || child.name === "cMat_Den cay 1_SubMesh 0") {
                    metalness = 0.8, roughness = 0.3;
                    envMapText = reflectionCube;
                }



                if (child.name === "cMat_Da' ke TV 1_SubMesh 0") {
                    envMapText = textEnv;
                }
                var material = new THREE.MeshStandardMaterial({
                    map: child.material.map,
                    metalness: metalness,
                    roughness: roughness,
                    color: child.material.color,
                    normalMap: child.material.normalMap,
                    lightMap: child.material.lightMap,
                    /* envMap: envMapText,*/
                    lightMapIntensity: 2.2,

                });

                child.material = material;
                groupMatOfSelt.push(child);
            }

        });

    });

}

function creatPlaneNotMove(posX, posY, posZ, scaleX, scaleY, scaleZ) {
    var material = new THREE.MeshBasicMaterial({
        color: 0x948A6F,
        wireframe: true
    });
    //load plane not move 
    var geometry = new THREE.PlaneBufferGeometry(100, 100);
    geometry.rotateX(-Math.PI / 2);
    var ObjectNotMove = new THREE.Mesh(geometry, material);
    ObjectNotMove.position.set(posX, posY, posZ);
    ObjectNotMove.scale.set(scaleX, scaleY, scaleZ);
    ObjectNotMove.name = 'notplane';
    groupObject.add(ObjectNotMove);
}

function creatSkyBox() {
    var imagePrefix = "models/Skybox/";
    var directions = ["1", "2", "3", "4", "5", "6"];
    var imageSuffix = ".jpg";
    var skyGeometry = new THREE.CubeGeometry(10000, 10000, 10000);
    var textureLoader = new THREE.TextureLoader();
    var materialArray = [];
    for (var i = 0; i < 6; i++)
        materialArray.push(new THREE.MeshBasicMaterial({
            map: textureLoader.load(imagePrefix + directions[i] + imageSuffix),
            side: THREE.BackSide
        }));
    var skyMaterial = new THREE.MeshFaceMaterial(materialArray);
    var skyBox = new THREE.Mesh(skyGeometry, skyMaterial);
    skyBox.position.set(0, 0, 0);
    scene.add(skyBox);
}
//MOUSE DOWN 
function onDocumentMouseDown(event) {
   

    //                 event.preventDefault() ;
    isMouseDown = true;

    isDown = false;

    timer = setTimeout(function () {
        isDown = true;

    }, 250);

}
//MOUSE UP 

function onDocumentMouseUp(event) {
    enableInteraction == false;

    if (isDown === false) {


        var x, y;

        if (event.changedTouches) {

            x = event.changedTouches[0].pageX;
            y = event.changedTouches[0].pageY;
            //                        }

        } else {

            x = event.clientX;
            y = event.clientY;

        }
         console.log("size canvas ",container.clientWidth);
         console.log("size screen: ",window.innerWidth);

       var a = ((x*(window.innerWidth - container.clientWidth))/window.innerWidth );
        //                    console.log(x,y);
        mouse.x = ((x- (window.innerWidth - container.clientWidth)/1.5 - a)/ (container.clientWidth) )* 2 - 1;
        mouse.y = -(y / window.innerHeight) * 2 + 1;

        raycaster.setFromCamera(mouse, cameraOrtho);
        var intersects2 = raycaster.intersectObjects(groupMat.children, true);

        if (intersects2.length > 0) {

            if (IdInteractive > -1) {

                isClickGUI = true;
                var indextObject = 1;
                if (groupMat2[IdInteractive * 2 + intersects2[0].object.identity] !== undefined) {

                    selectedObjects[selectedObjects.length - 1].material = groupMat2[IdInteractive * 2 + intersects2[0].object.identity].material;

                    //IdInteractive*4 + intersects2[ 0 ].object.identity
                }
                if (intersects2[0].object.identity === 2) {
                    var index = IdInteractive;
                    if (IdInteractive === 0) {
                        index = 1
                    } else if (IdInteractive === 1) {
                        index = 6
                    } else if (IdInteractive === 3) {
                        index = 7
                    } else if (IdInteractive === 4) {
                        index = 2
                    } else if (IdInteractive === 6) {
                        index = 12
                    }


                    selectedObjects[selectedObjects.length - 1].material = groupMatOfSelt[index].material;
                }

            }
        } else {
            isClickGUI = false;
        }

        //chon vat lieu muon thay
        

        var a = ((x*(window.innerWidth - container.clientWidth))/window.innerWidth );
        
       
        //                    console.log(x,y);
        mouse2.x = ((x- (window.innerWidth - container.clientWidth)/1.5 - a)/ (container.clientWidth) )* 2 - 1;
        mouse2.y = -(y / window.innerHeight) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);

        var intersects = raycaster.intersectObjects(groupObject.children, true);

        if (intersects.length > 0 && !isClickGUI) {
//            console.log(intersects[0].object.name);

            IdInteractive = -1;
            var box = new THREE.Box3().setFromObject(intersects[0].object);
            var pos = new THREE.Mesh(cubeGeometry, cubeMaterial);
            pos.position.copy(intersects[0].object.parent.position);
            pos.position.x *= 200;
            pos.position.y *= 200;
            pos.position.z *= 200;

            //                    pos.position.z += 350;
            if (pos.position.y < 150) {
                pos.position.y = 50;
            }


            addSelectedObject(intersects[0].object);
            var nameObject = Number(intersects[0].object.material.name);

            if (intersects[0].object.name === "cMat_Armchair 1_SubMesh 1") {
                IdInteractive = 0;
                hiddenMat = true;
                pos.position.y = 150;
                pos.position.x += 250;
                if (camera.rotation.y > 0) {
                    posRotateCame = new THREE.Vector3(-0.416, 1.64, 0);
                } else {
                    posRotateCame = new THREE.Vector3(-0.416, -4.7, 0);
                }
            }

            if (intersects[0].object.name === "cMat_Ban pk 1_SubMesh 2") {
                IdInteractive = 1;
                hiddenMat = true;
                pos.position.y = 120;
                pos.position.x -= 300;
                if (camera.rotation.y > 0) {
                    posRotateCame = new THREE.Vector3(-0.1, 4.7, 0);
                } else {
                    posRotateCame = new THREE.Vector3(-0.26, -1.6, 0);
                }

            }
            if (intersects[0].object.name === "cMat_Bench 1_SubMesh 0") {
                IdInteractive = 3;
                hiddenMat = true;
                pos.position.y = 200;
                pos.position.x -= 300;
                if (camera.rotation.y > 0) {
                    posRotateCame = new THREE.Vector3(-0.19, 4.7, 0);
                } else {
                    posRotateCame = new THREE.Vector3(-0.35, -1.6, 0);
                }

            }
            if (intersects[0].object.name === "cMat_Da' ke TV 1_SubMesh 0") {
                IdInteractive = 4;
                hiddenMat = true;
                pos.position.y = 180;
                pos.position.z -= 1000;
                pos.position.x -= 100;
                if (camera.rotation.y > 0) {
                    posRotateCame = new THREE.Vector3(-0.19, 3, 0);
                } else {
                    posRotateCame = new THREE.Vector3(-0.19, -3, 0);
                }


            }
            if (intersects[0].object.name === "dencay_mattrong_SubMesh 0") {
                IdInteractive = 5;
                hiddenMat = true;
                pos.position.y = 400;
                pos.position.x -= 250;
                if (camera.rotation.y > 0) {
                    posRotateCame = new THREE.Vector3(-0.54, 4.6, 0);
                } else {
                    posRotateCame = new THREE.Vector3(-0.146, -1.6, 0);
                }


            }
            if (intersects[0].object.name === "cMat_Sofa 1_SubMesh 1") {
                IdInteractive = 6;
                hiddenMat = true;
                pos.position.y = 180;
                pos.position.z += 400;
                if (camera.rotation.y > 0) {
                    posRotateCame = new THREE.Vector3(-0.37, 0.02, 0)
                } else {
                    posRotateCame = new THREE.Vector3(-0.37, -0.014, 0)
                }



            }
            //KICH CHUOT LEN SAN THI DI CHUYEN        
            if (intersects[0].object.name === nameFoor || intersects[0].object.name === "floor_San gach beboi_SubMesh 0" ||
                intersects[0].object.name === "floor_carpet09-00_SubMesh 0") {
                if (enableMove == true) {
                    var intersect = intersects[0];
                    voxel = new THREE.Mesh(cubeGeometry, cubeMaterial);
                    voxel.position.copy(intersect.point).add(intersect.face.normal);
                    //                        console.log(camera.rotation);
                    
                    voxel.position.y = highCameraPlayer;

                    console.log("chan",voxel.position.x);
                    IdInteractive = -1
                    hiddenMat = false;
                    stopRotate();
                    //                           
                    MoveAnimation(camera.position, voxel.position, 1200);
                }

            }
            // kich vao vat thay doi vat lieu            
            if (IdInteractive > -1) { //&& intersects[0].object != oldClickObject
                oldClickObject = intersects[0].object;
                MoveAnimation(camera.position, pos.position, 1000);
                radiousX = camera.position.x + 400;
                radiousZ = camera.position.z + 400;

                RotateAnimation(camera.rotation, posRotateCame, 1000);
                //                            SmootFromAtoB(camera.rotation,posRotateCame,1000);
                for (var i = 0; i < numberMaterial; i++) {
                    setMaterial(groupMat.children[i], textures[IdInteractive][i]);
                    if (IdInteractive === 0) {
                        groupMat.children[0].material.color = new THREE.Color("#9E5F20");
                        groupMat.children[2].material.color = new THREE.Color("#89401B");
                    } else
                    if (IdInteractive === 3) {
                        groupMat.children[2].material.color = new THREE.Color("#F6F392");
                        groupMat.children[1].material.color = new THREE.Color("#E5FFCC");
                        groupMat.children[0].material.color = new THREE.Color("#F5BC9F")
                    } else groupMat.children[i].material.color = new THREE.Color("#ffffff");

                    groupInfo.remove(groupInfo.children[0]);
                    groupInfo.remove(groupInfo.children[1]);
                    groupInfo.remove(groupInfo.children[2]);
                }

                GetInfo(infos[IdInteractive][0], infoColors[IdInteractive][0], infos[IdInteractive][1]);
                updateGui();
            }
        } else {

        }
    } else {

    }

    clearTimeout(timer);

}
//CREAT GUI   
function createHUDSprites(texture) {

    CreateGUIMaterial();


}

function CreateGUIMaterial() {
    var width = container.clientWidth;
    var hieght = window.innerHeight / 2;
    var textureLoader = new THREE.TextureLoader();

    var widthItem = 80;

    //mat 1
    var geometry = new THREE.SphereGeometry(widthItem, widthItem, widthItem);


    textureLoader.load("texture/sprite0.png", function (texture) {

        var material1 = new THREE.MeshBasicMaterial({
            map: texture,
            color: "#ffffff",
            overdraw: 0.5,
        });
        hieghtMat = material1.map.image.width;
        mesh_c1 = new THREE.Mesh(geometry, material1);
        mesh_c1.name = "m1";
        mesh_c1.identity = 0;
        mesh_c1.position.set(-width / 4, hieghtMat, 1); // top left
        groupMat.add(mesh_c1);
    });
    //mat 2

    textureLoader.load("texture/sprite0.png", function (texture) {

        var material2 = new THREE.MeshBasicMaterial({
            map: texture,
            color: '#ffffff',
            overdraw: 0.5,
        });
        mesh_c2 = new THREE.Mesh(geometry, material2);
        mesh_c2.name = "m2";
        mesh_c2.identity = 1;
        mesh_c2.position.set(0, hieghtMat, 1); // top left
        groupMat.add(mesh_c2);
    });
    //mat3

    textureLoader.load("texture/sprite0.png", function (texture) {

        var material = new THREE.MeshBasicMaterial({
            map: texture,
            /*color : '#ffffff',
            overdraw: 0.5,*/
        });
        mesh_c3 = new THREE.Mesh(geometry, material);
        mesh_c3.name = "m3";
        mesh_c3.identity = 2;
        mesh_c3.position.set(width / 4, hieghtMat, 1); // top left
        groupMat.add(mesh_c3);
        updateGui();
    });




    isCreatMat = true;

}

function updateGui() {
    var width = container.clientWidth;
    var hieght = window.innerHeight;
    var widthItem = 80;
    var widthItemScale = 1;
    var updateHieghtMat = hieghtMat;
    if (width > 2048) {
        widthItemScale = 1;
    }
    if (width <= 2048 && width > 1024) {
        widthItemScale = 1;
    }
    if (width <= 1024 && width >= 800) {
        widthItemScale = 0.8;
    }
    if (width < 800 && width > 600) {
        widthItemScale = 0.6;
    }
    if (width <= 600) {
        widthItemScale = 0.55;
    }
    if (width <= 320) {
        widthItemScale = 0.45;
    }
    if (width <= 667 && hieght <= 375) {
        widthItemScale = 0.55;
    }


    //man hinh ipad pro
    if (width == 1024 && hieght == 768) {
        widthItemScale = 0.85;
    }
    //man hinh 6/7/8 plus quay doc


    if (hieght <= 600) {
        updateHieghtMat += 50;
    }
    if (hieght < 500 && hieght > 400) {
        updateHieghtMat *= 1.4;
    }
    if (hieght <= 400 && hieght > 320) {
        updateHieghtMat *= 1.5;
    }
    if (hieght <= 320) {
        updateHieghtMat *= 1.8;
    }

    widthItem *= widthItemScale;

    groupMat.children[0].scale.set(widthItemScale, widthItemScale, widthItemScale);
    groupMat.children[1].scale.set(widthItemScale, widthItemScale, widthItemScale);
    groupMat.children[2].scale.set(widthItemScale, widthItemScale, widthItemScale);

    groupMat.children[0].position.set(-width / 4, updateHieghtMat, 1);
    groupMat.children[1].position.set(0, updateHieghtMat, 1);
    groupMat.children[2].position.set(width / 4, updateHieghtMat, 1);

}

function CreatTextInfo(infoObject, infoColor, infoSize) {
    var width = window.innerWidth;
    var hight = window.innerHeight;

    var geometry1 = new THREE.TextGeometry(infoObject, {

        font: fontLoaderInfo,
        size: 50,
        height: 10,
        curveSegments: 2

    });

    var materials = [
                new THREE.MeshBasicMaterial({
            color: 0xffffff,
            overdraw: 0.5
        }),
            ];
    textMesh1 = new THREE.Mesh(geometry1, materials);
    textMesh1.position.set(-width / 2 - 10, hight - 100, 1);
    textMesh1.geometry.needsUpdate = true;
    groupInfo.add(textMesh1);

    var geometry2 = new THREE.TextGeometry(infoColor, {

        font: fontLoaderInfo,
        size: 20,
        height: 8,
        curveSegments: 2

    });

    var textMesh2 = new THREE.Mesh(geometry2, materials);
    textMesh2.position.set(-width / 2 - 10, hight - 130, 1);
    textMesh2.geometry.needsUpdate = true;
    groupInfo.add(textMesh2);

    var geometry3 = new THREE.TextGeometry(infoSize, {

        font: fontLoaderInfo,
        size: 15,
        height: 6,
        curveSegments: 2

    });

    var textMesh2 = new THREE.Mesh(geometry3, materials);
    textMesh2.position.set(-width / 2 - 10, hight - 150, 1);
    textMesh2.geometry.needsUpdate = true;
    groupInfo.add(textMesh2);


    /* updateHUDSprites();*/
}

function updateHUDSprites() {

    var width = window.innerWidth / 2;
    var height = window.innerHeight / 2;


}

//MOUSE MOVE            
function onDocumentMouseMove(event) {
    if (!isMoveAnimation) {

        raycaster.setFromCamera(mouse, camera);

        var intersects = raycaster.intersectObjects(groupObject.children, true);
        if (rollOverMesh !== undefined) {
            rollOverMesh.visible = false;

        }
        if (intersects.length > 0) {

            if (intersects[0].object.name === nameFoor || intersects[0].object.name === "floor_San gach beboi_SubMesh 0" ||
                intersects[0].object.name === "floor_carpet09-00_SubMesh 0") {
                var intersect = intersects[0];
                if (enableMove == false && rollOverMesh !== undefined) {
                    rollOverMesh.visible = false;
                } else {
                    rollOverMesh.visible = true;
                }


                rollOverMesh.position.copy(intersect.point).add(intersect.face.normal);;
                rollOverMesh.lookAt(camera.position.x, 0, camera.position.z);

            }
            if (intersects[0].object.name !== nameFoor && intersects[0].object.name !== "floor_San gach beboi_SubMesh 0" &&
                intersects[0].object.name !== "floor_carpet09-00_SubMesh 0") {
                if (rollOverMesh !== undefined) {
                    rollOverMesh.visible = false;

                }
            }
            if (intersects[0].object.name === "cMat_Armchair 1_SubMesh 1" || intersects[0].object.name === "cMat_Ban pk 1_SubMesh 2" ||
                intersects[0].object.name === "cMat_Bench 1_SubMesh 0" || intersects[0].object.name === "cMat_Da' ke TV 1_SubMesh 0" ||
                intersects[0].object.name === "cMat_Sofa 1_SubMesh 1") {
                var selectedOutLine = intersects[0].object;
                addSelectedObjectOutLine(selectedOutLine);
                outlinePass.selectedObjects = selectedOutLines;
            } else {
                outlinePass.selectedObjects = [];
            }
        }


        //raycast GUI            
        if (event.changedTouches) {

            x = event.changedTouches[0].pageX;
            y = event.changedTouches[0].pageY;

        } else {

            x = event.clientX;
            y = event.clientY;

        }
        console.log("mouse move ",container.clientWidth);
        var a = ((x*(window.innerWidth - container.clientWidth))/window.innerWidth );
        var sizeNavi =(window.innerWidth - container.clientWidth)/1.5;
       
        //                    console.log(x,y);
        mouse.x = ((x-a - sizeNavi) / (container.clientWidth) )* 2 - 1;
        
        console.log("mouse X ",mouse.x);
        mouse.y = -(y / window.innerHeight) * 2 + 1;

        checkIntersection();
    }

}

function addSelectedObjectOutLine(object) {

    selectedOutLines = [];
    selectedOutLines.push(object);

}

function addSelectedObject(object) {

    selectedObjects = [];
    selectedObjects.push(object);

}

function addSelectedMat(object) {

    selectedMats = [];
    selectedMats.push(object);

}

function checkIntersection() {

    raycaster.setFromCamera(mouse, cameraOrtho);

    var intersects2 = raycaster.intersectObjects(groupMat.children, true);

    isRotate = false;


    if (intersects2.length > 0) {
        rollOverMesh.visible = false;
        var selectedMatObject = intersects2[0].object;
        addSelectedMat(selectedMatObject);

        setupObjectScaleAnimation(intersects2[0].object,
            intersects2[0].object.scale, {
                /*x: 1.2,
                y: 1.2,
                z: 1.2*/
            },
            250, 0, TWEEN.Easing.Linear.None);
        isRotate = true;


    } else {

        isRotate = false;
    }



}

function setupObjectScaleAnimation(object, source, target, duration, delay, easing) {
    var l_delay = (delay !== undefined) ? delay : 0;
    var l_easing = (easing !== undefined) ? easing : TWEEN.Easing.Linear.None;

    new TWEEN.Tween(source)
        .to(target, duration)
        .delay(l_delay)
        .easing(l_easing)
        .onUpdate(function () {
            object.scale.copy(source);
        })
        .start();
}
//Thay Vat lieu material            
function setMaterial(object, texture, newNormal) {
    var textureLoader = new THREE.TextureLoader();
    var newTexturePath = textureLoader.load(texture);
    var newNormalPath = textureLoader.load(newNormal);
    object.traverse(function (child) {
        if (child instanceof THREE.Mesh) {
            child.material.map = newTexturePath;

        }
    });
}

//move smooth            
function MoveAnimation(source, target, delay) {
    isMoveAnimation = true;
    new TWEEN.Tween(source)
        .to(target, delay)
        .easing(TWEEN.Easing.Linear.None).start();
    setTimeout(function () {
        isMoveAnimation = false;
    }, delay);

}

function RotateAnimation(source, target, delay) {
    isMoveAnimation = true;

    new TWEEN.Tween(source)
        .to(target, delay)
        .easing(TWEEN.Easing.Linear.None).start();
    setTimeout(function () {
        isMoveAnimation = false;
    }, delay);

}
//           
// ROTATE CAMERA
function rotateCam(object, posRotate) {
    radX -= .01;
    radY -= .001;

    var x = camera.position.x;
    var z = camera.position.z;
    camera.rotation.set(posRotate.x, posRotate.y, posRotate.z);

};

function stopRotate() {
    if (controls != undefined && controls.enabled === true) {
        controls.enabled = false;
        controls.enableRotate = false;
    }
}

function onWindowResize() {

    var width = container.clientWidth;
    var height = window.innerHeight;

    updateGui();


    cameraOrtho.left = -width / 2;
    cameraOrtho.right = width / 2;
    cameraOrtho.top = height / 2;
    cameraOrtho.bottom = -height / 2;
    cameraOrtho.aspect = width / height;
    cameraOrtho.updateProjectionMatrix();

    camera.aspect = width / height;
    camera.updateProjectionMatrix();


    
    renderer.setSize(container.clientWidth, window.innerHeight);

}

function hiddenMaterial() {

    if (!hiddenMat) {
        if (document.getElementById("info") != undefined) {
            document.getElementById("info").style.opacity = 0;
            document.getElementById("info").style.transition = "opacity 1s linear";
        }
        groupMat.traverse(function (child) {
            child.visible = false;
            isAutoRotate = false;
            /* child.scale.set(oldScaleMat - 0.2, oldScaleMat - 0.2, oldScaleMat - 0.2);*/
        });
        groupInfo.traverse(function (child) {
            child.visible = false;
        });

    } else {
        if (document.getElementById("info") != undefined) {
            document.getElementById("info").style.opacity = 1;
        }
        groupMat.traverse(function (child) {
            child.visible = true;
            isAutoRotate = true;

            // child.scale.set(0,0,0);
        });
        groupInfo.traverse(function (child) {
            child.visible = true;
        });
        /*LoopScaleMat(oldScaleMat + 0.3, groupMat, 400);
         */
        var i = 0;

        function myLoop() {
            setTimeout(function () {
                //                                   LoopScaleMat(oldScaleMat - 0.1,groupMat,200);
                i++;
                if (i < 2) {
                    myLoop();
                }
            }, 200)

        }

        myLoop();
    }

}

function LoopScaleMat(newScale, objectGroup, timeDelay) {
    var i = 0;

    function myLoop() {
        setTimeout(function () {
            setupObjectScaleAnimation(objectGroup.children[i],
                objectGroup.children[i].scale, {
                    x: newScale,
                    y: newScale,
                    z: newScale
                },
                timeDelay, 0, TWEEN.Easing.Linear.None);
            i++;
            if (i < numberMaterial) {
                myLoop();
            }
        }, 200)

    }

    myLoop();
}
window.onload = function () {
    loadTime = window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart;

}

function onLoad2() {
    //                if(loadTime >= 0){
    var now = new Date().getTime();
    var page_load_time = now - performance.timing.navigationStart;

    //                }   

}
//EVENT CAMERA
function getAutoRotationAngle() {

    return 2 * Math.PI / 60 / 60 * autoRotateSpeed;

}

function getZoomScale() {

    return Math.pow(0.95, zoomSpeed);

}

function rotateLeft(angle) {

    camera.rotation.y += angle;

    if (Math.floor(camera.rotation.y) === 6) {
        camera.rotation.y /= 6;
    }
    if (Math.floor(camera.rotation.y) === -6) {
        camera.rotation.y /= 6;
    }
}

function rotateUp(angle) {
    var minCameraRotX = -1.2;
    var maxCameraRotX = 1.2;

    camera.rotation.order = 'YXZ';
    camera.rotation.x += angle;
    camera.rotation.x = Math.max(minCameraRotX, Math.min(maxCameraRotX, camera.rotation.x));

}

//MOUSE CONTROLL CAMERA
function handleMouseDownRotate(event) {

    rotateStart.set(event.clientX, event.clientY);

}

function handleMouseMoveRotate(event) {
    if (!isMoveAnimation) {


        var radious = 100;
        rotateEnd.set(event.clientX, event.clientY);
        rotateDelta.subVectors(rotateEnd, rotateStart);

        // rotating across whole screen goes 360 degrees around
        rotateLeft(2 * Math.PI * rotateDelta.x / renderer.domElement.clientWidth * rotateSpeed);

        // rotating up and down along whole screen attempts to go 360, but limited to 180
        rotateUp(2 * Math.PI * rotateDelta.y / renderer.domElement.clientHeight * rotateSpeed);

        rotateStart.copy(rotateEnd);


    }

}

function onMouseDownControl(event) {
    if (enabled === false) return;
    // event.preventDefault();
    switch (event.button) {
        case mouseButtons.ORBIT:
            if (enableRotate === false || enableInteraction === true) return;
            handleMouseDownRotate(event);
            state = STATE.ROTATE;

            break;

            if (state !== STATE.NONE) {}
    }
}

function onMouseMoveControl(event) {
    
    if (enabled === false || enableInteraction === true) return;
    event.preventDefault();
    switch (state) {
        case STATE.ROTATE:
            if (enableRotate === false || enableInteraction === true) return;
            if (isMouseDown) {
                handleMouseMoveRotate(event);
            }

            break;


    }
}

function onMouseUp(event) {

    if (enabled === false) return;

    isMouseDown = false;

    state = STATE.NONE;

}

//TOUCH CONTROLL CAMERA
function handleTouchStartRotate(event) {

    rotateStart.set(event.touches[0].pageX, event.touches[0].pageY);

}

function handleTouchMoveRotate(event) {

    //console.log( 'handleTouchMoveRotate' );

    rotateEnd.set(event.touches[0].pageX, event.touches[0].pageY);
    rotateDelta.subVectors(rotateEnd, rotateStart);

    // rotating across whole screen goes 360 degrees around
    rotateLeft(2 * Math.PI * rotateDelta.x / renderer.domElement.clientWidth * rotateSpeed);

    // rotating up and down along whole screen attempts to go 360, but limited to 180
    rotateUp(2 * Math.PI * rotateDelta.y / renderer.domElement.clientHeight * rotateSpeed);

    rotateStart.copy(rotateEnd);


}

function handleTouchEnd(event) {

    //console.log( 'handleTouchEnd' );

}

function onTouchStart(event) {

    if (enabled === false) return;

    switch (event.touches.length) {

        case 1: // one-fingered touch: rotate

            if (enableRotate === false) return;

            handleTouchStartRotate(event);

            state = STATE.TOUCH_ROTATE;

            break;

        default:

            state = STATE.NONE;

    }

    if (state !== STATE.NONE) {


    }

}

function onTouchMove(event) {

    if (enabled === false) return;

    event.preventDefault();
    event.stopPropagation();

    switch (event.touches.length) {

        case 1: // one-fingered touch: rotate

            if (enableRotate === false) return;
            if (state !== STATE.TOUCH_ROTATE) return; // is this needed?...

            handleTouchMoveRotate(event);

            break;

        default:

            state = STATE.NONE;

    }

}

function onTouchEnd(event) {

    if (enabled === false) return;

    handleTouchEnd(event);

    state = STATE.NONE;

}

function onTriggerDown(event) {

    var controller = event.target;
    isTriggerUp = false;
    if (isStartUser == false) {
        isStartUser = true;
        PointStartCamera = new THREE.Vector3(camera.position.x, camera.position.y, camera.position.z);
    }



}

function AddVectorFrom(A, B) {
    var pointDiv = new THREE.Vector3();
    pointDiv.x = A.x + B.x;
    pointDiv.y = A.y + B.y;
    pointDiv.z = A.z + B.z;
    return pointDiv;
}

function subVectorFrom(A, B) {
    var pointDiv = new THREE.Vector3();
    pointDiv.x = A.x - B.x;
    pointDiv.y = A.y - B.y;
    pointDiv.z = A.z - B.z;
    return pointDiv;
}

function divVectorFrom(A, numPoint) {
    var pointDiv = new THREE.Vector3();
    pointDiv.x = A.x / numPoint;
    pointDiv.y = A.y / numPoint;
    pointDiv.z = A.z / numPoint;
    return pointDiv;

}

function onTriggerUp(event) {

    var controller = event.target;
    isTriggerUp = true;
    getIntersections(controller);
    rollOverMesh.visible = false;

}

function getIntersections(controller) {

    tempMatrix.identity().extractRotation(controller.matrixWorld);

    raycaster.ray.origin.setFromMatrixPosition(controller.matrixWorld);
    raycaster.ray.direction.set(0, 0, -1).applyMatrix4(tempMatrix);

    var line = controller.getObjectByName('line');

    //ray cast vao material    
    var intersectVR = raycaster.intersectObjects(groupMat.children, true);
    if (intersectVR.length > 0) {
        addSelectedMat(intersectVR[0].object);
        if (IdInteractive > -1) {

            isClickGUI = true;
            var indextObject = 1;
            if (groupMat2[IdInteractive * 2 + intersectVR[0].object.identity] !== undefined) {

                selectedObjects[selectedObjects.length - 1].material = groupMat2[IdInteractive * 2 + intersectVR[0].object.identity].material;

                //IdInteractive*4 + intersects2[ 0 ].object.identity
            }
            if (intersectVR[0].object.identity === 2) {
                var index = IdInteractive;
                if (IdInteractive === 0) {
                    index = 1
                } else if (IdInteractive === 1) {
                    index = 6
                } else if (IdInteractive === 3) {
                    index = 7
                } else if (IdInteractive === 4) {
                    index = 2
                } else if (IdInteractive === 6) {
                    index = 12
                }


                selectedObjects[selectedObjects.length - 1].material = groupMatOfSelt[index].material;
            }

        }
    } else {
        isClickGUI = false;
    }

    //ray cast vao object Cmat
    var intersects = raycaster.intersectObjects(groupObject.children, true);
    if (intersects.length > 0 && !isClickGUI) {


        //teleport tren san        
        if (intersects[0].object.name === nameFoor || intersects[0].object.name === "floor_San gach beboi_SubMesh 0" ||
            intersects[0].object.name === "floor_carpet09-00_SubMesh 0") {
            hiddenMat = false;
            rollOverMesh.visible = true;

            rollOverMesh.position.set(intersects[0].point.x, -0.01, intersects[0].point.z);
            rollOverMesh.lookAt(user.position.x, 0, user.position.z);

            if (isTriggerUp) {

                var PosTeleport = subVectorFrom(intersects[0].point, camera.position);
                user.position.set(PosTeleport.x, highCameraPlayer, PosTeleport.z);

                rollOverMesh.visible = false;
            }
        }


        if (isTriggerUp) {

            var box = new THREE.Box3().setFromObject(intersects[0].object);
            var pos = new THREE.Mesh(cubeGeometry, cubeMaterial);
            pos.position.copy(intersects[0].object.parent.position);
            pos.position.x *= 200;
            pos.position.y *= 200;
            pos.position.z *= 200;

            //                    pos.position.z += 350;
            if (pos.position.y < 150) {
                pos.position.y = 50;
            }
            var nameObject = Number(intersects[0].object.material.name);

            if (intersects[0].object.name === "cMat_Armchair 1_SubMesh 1") {
                IdInteractive = 0;
                hiddenMat = true;
                pos.position.y = 150;
                pos.position.x += 450;
                if (camera.rotation.y > 0) {
                    posRotateCame = new THREE.Vector3(-0.416, 1.64, 0);
                } else {
                    posRotateCame = new THREE.Vector3(-0.416, -4.7, 0);
                }
                groupMat.rotation.set(0, 80, 0);
                groupMat.position.set(-1, 0, 0);

            }
            if (intersects[0].object.name === "cMat_Ban pk 1_SubMesh 2") {
                IdInteractive = 1;
                hiddenMat = true;
                pos.position.y = 120;
                pos.position.x -= 300;
                if (camera.rotation.y > 0) {
                    posRotateCame = new THREE.Vector3(-0.1, 4.7, 0);
                } else {
                    posRotateCame = new THREE.Vector3(-0.26, -1.6, 0);
                }

                groupMat.rotation.set(0, 80, 0);
                groupMat.position.set(3.5, 0, 0);
            }
            if (intersects[0].object.name === "cMat_Bench 1_SubMesh 0") {
                IdInteractive = 3;
                hiddenMat = true;
                pos.position.y = 200;
                pos.position.x -= 300;
                if (camera.rotation.y > 0) {
                    posRotateCame = new THREE.Vector3(-0.19, 4.7, 0);
                } else {
                    posRotateCame = new THREE.Vector3(-0.35, -1.6, 0);
                }

                groupMat.rotation.set(0, 80, 0);
                groupMat.position.set(3.5, 0, 0);
            }
            if (intersects[0].object.name === "cMat_Da' ke TV 1_SubMesh 0") {
                IdInteractive = 4;
                hiddenMat = true;
                pos.position.y = 180;
                pos.position.z -= 1000;
                pos.position.x -= 100;
                if (camera.rotation.y > 0) {
                    posRotateCame = new THREE.Vector3(-0.19, 3, 0);
                } else {
                    posRotateCame = new THREE.Vector3(-0.19, -3, 0);
                }

                groupMat.position.set(0, 0, 0);
                groupMat.rotation.set(0, 0, 0);

            }
            if (intersects[0].object.name === "dencay_mattrong_SubMesh 0") {
                IdInteractive = 5;
                hiddenMat = true;
                pos.position.y = 400;
                pos.position.x -= 250;
                if (camera.rotation.y > 0) {
                    posRotateCame = new THREE.Vector3(-0.54, 4.6, 0);
                } else {
                    posRotateCame = new THREE.Vector3(-0.146, -1.6, 0);
                }


            }
            if (intersects[0].object.name === "cMat_Sofa 1_SubMesh 1") {
                IdInteractive = 6;
                hiddenMat = true;
                pos.position.y = 180;
                pos.position.z += 400;
                if (camera.rotation.y > 0) {
                    posRotateCame = new THREE.Vector3(-0.37, 0.02, 0)
                } else {
                    posRotateCame = new THREE.Vector3(-0.37, -0.014, 0)
                }
                groupMat.position.set(0, 0, -3);
                groupMat.rotation.set(0, 0, 0);

            }
            // kich vao vat thay doi vat lieu            
            if (IdInteractive > -1) { //&& intersects[0].object != oldClickObject


                oldClickObject = intersects[0].object;

                user.position.set(pos.position.x, highCameraPlayer, pos.position.z);
                /* user.rotation.set(posRotateCame.x,posRotateCame.y,posRotateCame.z);*/

                radiousX = camera.position.x + 400;
                radiousZ = camera.position.z + 400;




                for (var i = 0; i < numberMaterial; i++) {
                    setMaterial(groupMat.children[i], textures[IdInteractive][i]);
                    if (IdInteractive === 0) {
                        groupMat.children[0].material.color = new THREE.Color("#9E5F20");
                        groupMat.children[2].material.color = new THREE.Color("#89401B");
                    } else
                    if (IdInteractive === 3) {
                        groupMat.children[2].material.color = new THREE.Color("#F6F392");
                        groupMat.children[1].material.color = new THREE.Color("#E5FFCC");
                        groupMat.children[0].material.color = new THREE.Color("#F5BC9F")
                    } else groupMat.children[i].material.color = new THREE.Color("#ffffff");

                    groupInfo.remove(groupInfo.children[0]);
                    groupInfo.remove(groupInfo.children[1]);
                    groupInfo.remove(groupInfo.children[2]);
                }

                CreatTextInfo(infos[IdInteractive][0], infoColors[IdInteractive][0], infos[IdInteractive][1]);

            }

            addSelectedObject(intersects[0].object);

        }





    }
}

function rayCastOutline(controller) {
    tempMatrix.identity().extractRotation(controller.matrixWorld);

    raycaster.ray.origin.setFromMatrixPosition(controller.matrixWorld);
    raycaster.ray.direction.set(0, 0, -1).applyMatrix4(tempMatrix);
    //ray cast vao object Cmat
    var intersects = raycaster.intersectObjects(groupObject.children, true);
    if (intersects.length > 0) {

        if (intersects[0].object.name === "cMat_Armchair 1_SubMesh 1" || intersects[0].object.name === "cMat_Ban pk 1_SubMesh 2" ||
            intersects[0].object.name === "cMat_Bench 1_SubMesh 0" || intersects[0].object.name === "cMat_Da' ke TV 1_SubMesh 0" ||
            intersects[0].object.name === "cMat_Sofa 1_SubMesh 1") {

            var selectedOutLine = intersects[0].object;
            addSelectedObjectOutLine(selectedOutLine);
            outlinePass.selectedObjects = selectedOutLines;
        } else {
            /*outlinePass.selectedObjects = [];*/
        }

    }
}
//animate and render            

function animate() {

    requestAnimationFrame(animate);
    render();

}

function render() {

 
    TWEEN.update();
    renderer.clear();
    renderer.render(scene, camera);

    /* controller1.update();
     controller2.update();*/

    if (isTriggerUp === false) {
        getIntersections(controller1);
    }




    if (isFoundVR == false) {
        //composer.render();
        renderer.antialias = true;
        renderer.clearDepth();
        renderer.render(sceneOrtho, cameraOrtho);
    }
    //                console.log('Page load time is '+ loadTime);
    if (isCreatMat) {
        hiddenMaterial();
    }
    if (isAutoRotate) {
        //                    rotateCam(selectedObjects[0]);
    }
    if (!isRotate) {
        for (var i = 0; i < sceneOrtho.children.length; i++) {

        }

    }
    if (isRotate) {
        selectedMats[0].rotation.y += 0.02;
    }


}

function loadingProgress() {
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
        groupObject.add(obj);
    })
}