var loadTime;
var percent = 0;
var clickStart = false;
var camera, scene, renderer,mouse,raycaster, manager;

/*groupObject chua doi tuong tuong tac vs raycaster*/

var groupObject,groupMat;

function init() {

    var width = window.innerWidth;
    var height = window.innerHeight;
    var container = document.getElementById('main');
    document.body.appendChild(container);

    camera = new THREE.PerspectiveCamera(60, width / height, 1, 10000);
    camera.position.z = 400;
    camera.position.y = 200;


    var aspect = window.innerWidth / window.innerHeight;
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


    scene.add(group);
    scene.add(groupObject);



    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.autoClear = false; // To allow render overlay on top of sprited sphere

    document.body.appendChild(renderer.domElement);



    window.addEventListener('resize', onWindowResize, false);
    hiddenMaterial();

    creatSkyBox();


    //footPrint
    rollOverMaterial = new THREE.MeshBasicMaterial({
        color: 0xff0000,
        opacity: 0.5,
        transparent: true
    });
    var loader = new THREE.OBJLoader();
    loader.load("models/footprint.obj", function (object) {

        rollOverMesh = object;
        scene.add(rollOverMesh);
    });


    var waterGeometry = new THREE.PlaneBufferGeometry(20, 20);
    //WATER
    var water = new THREE.Water(waterGeometry, {
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

}

function InitProgressBar() {
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

        document.getElementById("percentLoader").innerHTML = "LOADING " + parseInt(percent) + " %";
        if (percent === 100) document.getElementById("percentLoader").innerHTML = "ENTER THE SHOWROOM";
    };
}

function creatSkyBox() {
    var imagePrefix = "models/Skybox/";
    var directions = ["1", "2", "3", "4", "5", "6"];
    var imageSuffix = ".jpg";
    var skyGeometry = new THREE.CubeGeometry(5000, 5000, 5000);
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