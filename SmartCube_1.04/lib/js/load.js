function loadjs() {
this.init = function () {
    window.anl = new supportjs();
    anl.count = 2;
    window.setInterval("anl.craftChecker.checkEach()",10);
    window.setInterval("anl.thingChecker.checkEach()",10);
    // mainImg = anl.getTextures("main");
    // anl.getTextures("dirt");

    window.mouse = {
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
    // if (confirm("Custom Settings ?")) {
    //     window.control = {
    //     eyesight: 100,
    //     isImage: confirm("Use Images ?"),
    //     mapSize: parseInt(prompt("Please Enter Map Size","100")),
    //     mapQuality: 2,
    //     mapBuild: parseInt(prompt("Please Enter Map Quality","4")),
    //     mapQualityMitlply: 4,
    //     mapAbruptness: parseInt(prompt("Please Enter Map Abruptness","4")),
    //     sunSpeed: parseInt(prompt("Please Enter Time Speed","100")),
    //     speed: 10,
    //     checkSpeed: 16,
    //     sunCheckSpeed: 25,
    //     gravity: parseInt(prompt("Please Enter Gravity","10")) * 4,
    // };
    // } else {
    //     window.control = {
    //     eyesight: 100,
    //     mapSize: 100,
    //     mapQuality: 2,
    //     mapBuild: 4,
    //     mapQualityMitlply: 4,
    //     mapAbruptness: 4,
    //     isImage: true,
    //     sunSpeed: 100,
    //     speed: 16,
    //     checkSpeed: 8,
    //     sunCheckSpeed: 25,
    //     gravity: 40,
    // };
    // }
    // window.map = new Object;
    // if (confirm("Custom Map Seed ?")) {
    //     let seed = prompt("Please A 16-digit Number :","");
    //     map.seed = parseInt(seed)/Math.pow(10,(seed.length - 2));
    // } else {
    //     map.seed = Math.random() * 100;
    // }
    // // map.seed = 94.62766911830352;

    window.scene = 0;
    window.camera = 0;
    
    mouse.img = anl.getImages("mouse");
    window.canvas = document.getElementById("screen");
    window.canvas2 = document.getElementById("screen2");
    window.context2 = canvas2.getContext('2d');
    //context2.webkitImageSmoothingEnabled = false;
    //context2.imageSmoothingEnabled = false;
    window.cavW = canvas.width = canvas2.width = screen.width;
    window.cavH = canvas.height = canvas2.height = screen.height;
    window.renderer = new THREE.WebGLRenderer({ canvas: canvas });
    window.projector = new THREE.Projector();
    window.raycaster = new THREE.Raycaster();
    
    window.mouselock = new mouselockjs("show");

    window.stats = new Stats();
    document.getElementById("show").hidden = false;
    document.getElementById("show").appendChild( stats.dom );

    cycles = new Array();

    window.players = new Array();
    players[0] = new anl.people();

    window.setTimeout(this.next,1000);
}
this.next = function () {
    doRender();
    context2.imageSmoothingEnabled = false;
    context2.drawImage(mouse.img,0,0,16,16,cavW/2-16,cavH/2-16,32,32);
    map.data = anl.generateHeight(control.mapSize*2,control.mapSize*2,255);
    windows = new windowsjs();
    windows.game();
}
this.init();
}
// swal({
//             text: 'Use custom settings ?',
//             type: 'question',
//             showCancelButton: true,
// }).then(function(e) {
//     if(e === true){
//         swal({
//                     title: 'Ready',
//                     text: 'Start Game ?',
//                     type: 'success',
//                     showCancelButton: true,
//         }).then(function(e) {
//             if(e === true){
//                 window.setTimeout("loadjs()",1000);
//             }
//         });
//     }
// });
// alert(eval(document.getElementById("eyesight").innerText).toString);