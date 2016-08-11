function loadjs() {
this.init = function () {
    anl = new supportjs();
    anl.count = 2;
    // mainImg = anl.getTextures("main");
    // anl.getTextures("dirt");

    mouse = {
        on: false , 
        x: 0, 
        y: 0 , 
        moveX: 0 , 
        moveY: 0 , 
        clicked: false , 
        speed: 0.002 , 
        rx: 0 , 
        ry: 0
    };
    control = {
        eyesight: 100,
        mapQuality: 2,
        mapBuild: 4,
        mapQualityMitlply: 4,
        mapSize: 4,
        isImage:true,
        sunSpeed:100,
        speed:10,
        checkSpeed:10,
        sunCheckSpeed:25,
        graxity:40,
    };
    
    scene = 0;
    camera = 0;
    
    mouse.img = anl.getImages("mouse");
    canvas = document.getElementById("screen");
    canvas2 = document.getElementById("screen2");
    context2 = canvas2.getContext('2d');
    //context2.webkitImageSmoothingEnabled = false;
    //context2.imageSmoothingEnabled = false;
    cavW = canvas.width = canvas2.width = screen.width;
    cavH = canvas.height = canvas2.height = screen.height;
    renderer = new THREE.WebGLRenderer({ canvas: canvas });
    projector = new THREE.Projector();
    raycaster = new THREE.Raycaster();
    
    mouselock = new mouselockjs("show");
    
    gui = new dat.GUI();
    stats = new Stats();
    document.getElementById("show").hidden = false;
    document.getElementById("show").appendChild( stats.dom );

    cycles = new Array();
    
    map = new Object;
    // map.seed = 94.62766911830352;
    map.seed = Math.random() * 100;
    map.data = anl.generateHeight(control.eyesight*2,control.eyesight*2,255);

    players = new Array();
    players[0] = new anl.people();

    window.setTimeout(this.next,1000);
}
this.next = function () {
    doRender();
    context2.imageSmoothingEnabled = false;
    context2.drawImage(mouse.img,0,0,16,16,cavW/2-16,cavH/2-16,32,32);
    windows = new windowsjs();
    windows.game();
}
this.init();
}