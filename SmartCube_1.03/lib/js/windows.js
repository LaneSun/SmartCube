function windowsjs() {
    this.main = function () {
        //全局变量
            var cube = new Array();
            var point = 0;
            var m = 0;
            var sky = 0;
            var controlCamera = 0;
        //初始化
            this.init = function () {
            //场景与相机
                scene = new THREE.Scene();
                camera = new THREE.PerspectiveCamera(45, cavW/cavH , 1, 10000);
                            camera.position.x = 0;
                            camera.position.y = 0;
                            camera.position.z = 0;
                            camera.up.x = 0;
                            camera.up.y = 1;
                            camera.up.z = 0;
                            camera.lookAt({
                                x : 0,
                                y : 0,
                                z : 0
                            });
                controlCamera = new anl.controlCamera();
                controlCamera.getObject().position.x = 0;
                controlCamera.getObject().position.y = 0;
                controlCamera.getObject().position.z = 5;
            //光照
                var light = new THREE.DirectionalLight(0xffffff,1.0);
                light.position.set(0,0,7);
            //物体
                cube[0] = anl.cube("main");
            //天空球
                var textureLoader = new THREE.TextureLoader();
				var materials = [
					new THREE.MeshBasicMaterial( { map: textureLoader.load( '../lib/img/sky/evening/px.jpg' ) } ), // right
					new THREE.MeshBasicMaterial( { map: textureLoader.load( '../lib/img/sky/evening/nx.jpg' ) } ), // left
					new THREE.MeshBasicMaterial( { map: textureLoader.load( '../lib/img/sky/evening/py.jpg' ) } ), // top
					new THREE.MeshBasicMaterial( { map: textureLoader.load( '../lib/img/sky/evening/ny.jpg' ) } ), // bottom
					new THREE.MeshBasicMaterial( { map: textureLoader.load( '../lib/img/sky/evening/pz.jpg' ) } ), // back
					new THREE.MeshBasicMaterial( { map: textureLoader.load( '../lib/img/sky/evening/nz.jpg' ) } )  // front
				];
				sky = new THREE.Mesh( new THREE.BoxGeometry( control.eyesight + 100 , control.eyesight + 100 , control.eyesight + 100 , 7, 7, 7 ), new THREE.MultiMaterial( materials ) );
				sky.scale.x = - 1;
            //放置
                scene.add(controlCamera.getObject(),sky,light,cube[0]);
            //启动
                //循环
                    for (var i = 0; i < cycles.length; i++) {
                        window.clearInterval(cycles[i]);
                    }
                    cycles[cycles.length] = window.setInterval(this.cycle,25);
                //鼠标定义
                    anl.moveLogic = this.moveLogic;
                    anl.downLogicL = this.downLogicL;
                    anl.upLogic = this.upLogic;
                    mouse.on = true;
                    //mouselock.outControl();
        }
        this.moveLogic = function (mx,my) {
            controlCamera.rotate(mx,my);
            for (var i = 0; i < cube.length; i++) {
                cube[i].material.emissive.setHex( 0x000000 );
            }
            raycaster.setFromCamera( {x:0,y:0}, camera );
			var hits = raycaster.intersectObjects( cube );
            if (hits.length > 0) {
                hits[0].object.material.emissive.setHex( 0x333333 );
            }
        }
        this.downLogicL = function (mx,my) {
            raycaster.setFromCamera( {x:0,y:0}, camera );
			var hits = raycaster.intersectObjects( cube );
            if (hits.length > 0) {
                hits[0].object.material.emissive.setHex( 0x666666 );
                anl.moveLogic = undefined;
                anl.downLogicL = undefined;
                anl.upLogic = undefined;
                windows.game();
            }
        }
        this.upLogic = function (mx,my) {
            for (var i = 0; i < cube.length; i++) {
                cube[i].material.emissive.setHex( 0x000000 );
            }
            raycaster.setFromCamera( {x:0,y:0}, camera );
			var hits = raycaster.intersectObjects( cube );
            if (hits.length > 0) {
                hits[0].object.material.emissive.setHex( 0x333333 );
            }
        }
        this.cycle = function () {
            cube[0].rotation.x += 0.01;
            cube[0].rotation.y += 0.01;
        }
        this.init();
        }
    this.game = function () {
        //全局变量
            var cube = new Array();
            var point = 0;
            var m = 0;
            var sky = 0;
            controlCamera = 0;
            var directionalLight = new THREE.DirectionalLight( 0xffffff, 0 );
			var directionalLight1 = new THREE.DirectionalLight( 0xffffff, 0 );
            var directionalLight2 = new THREE.DirectionalLight( 0xffffff, 0 );
            var directionalLight3 = new THREE.DirectionalLight( 0xffffff, 0 );
            var directionalLight4 = new THREE.DirectionalLight( 0xffffff, 0 );
            var sun = new THREE.Mesh(new THREE.PlaneGeometry( 10, 10 ),new THREE.MeshBasicMaterial({map:anl.getMaps("environment/sun")}));
            var moon = new THREE.Mesh(new THREE.PlaneGeometry( 10, 10 ),new THREE.MeshBasicMaterial({map:anl.getMaps("environment/moon")}));
        //初始化
            this.init = function () {
            //场景与相机
                scene = new THREE.Scene();
                camera = new THREE.PerspectiveCamera(45, cavW/cavH , 0.1, 2*control.eyesight);
                            camera.position.x = 0;
                            camera.position.y = 0;
                            camera.position.z = 0;
                            camera.up.x = 0;
                            camera.up.y = 1;
                            camera.up.z = 0;
                            camera.lookAt({
                                x : 0,
                                y : 0,
                                z : 0
                            });
                controlCamera = new anl.controlCamera();
                controlCamera.getObject().position.x = players[0].rx = control.mapSize;
                controlCamera.getObject().position.y = (players[0].ry = 250) + 1;
                controlCamera.getObject().position.z = players[0].rz = control.mapSize;
            //光照
                // var light = new THREE.DirectionalLight(0xffffff,1.0);
                // light.position.set(2,5,-7);
                // var light = new THREE.AmbientLight( 0x555555 );
                // var ambientLight = new THREE.AmbientLight( 0xcccccc,0 );
                directionalLight.position.set( 0, -1, 0 ).normalize();
				directionalLight1.position.set( 1, 1, 0 ).normalize();
				directionalLight2.position.set( -1, 1, 0 ).normalize();
				directionalLight3.position.set( 0, 1, 1 ).normalize();
				directionalLight4.position.set( 0, 1, -1 ).normalize();
                sun.position.set( 0, -control.eyesight + 1, 0 );
                moon.position.set( 0, -control.eyesight +1, 0 );
                // gui.add( ambientLight, 'intensity', 0, 4 );
                // gui.add( directionalLight, 'intensity', 0, 4 );
            //物体
                box = 0;
                var geometry = new THREE.Geometry();
                var front = false , back = false;
                for (var z = 0; z < map.data.length; z++) {
                    front = false , back = false;
                    for (var x = 0; x < map.data[z].length; x++) {
                        front = false , back = false;
                        for (var y = 0; y < map.data[z][x].length; y++) {
                            front = back;
                            back = false;
                            if (anl.getType(map.data[z][x][y].name) == "hard") {
                                back = true;
                            }
                            if (front == true && back == false) {
                                if (y-1 >= 0) {
                                    anl.addPlane(map.data[z][x][y-1].name,x,y,z,0);//0 UP
                                }
                            } else if (front == false && back == true) {
                                anl.addPlane(map.data[z][x][y].name,x,y,z,5);//5 DOWN
                            }
                        }
                        if (anl.getType(map.data[z][x][map.data[z][x].length-1].name) == "hard") {
                            anl.addPlane(map.data[z][x][map.data[z][x].length-1].name,x,map.data[z][x].length,z,0);
                        }
                    }
                    front = false , back = false;
                    for (var y = 0; y < map.data[z][0].length; y++) {
                        front = false , back = false;
                        for (var x = 0; x < map.data[z].length; x++) {
                            front = back;
                            back = false;
                            if (anl.getType(map.data[z][x][y].name) == "hard") {
                                back = true;
                            }
                            if (front == true && back == false) {
                                if (x-1 >= 0) {
                                    anl.addPlane(map.data[z][x-1][y].name,x,y,z,6);
                                }
                            } else if (front == false && back == true) {
                                anl.addPlane(map.data[z][x][y].name,x,y,z,4);
                            }
                        }
                        if (anl.getType(map.data[z][map.data[z].length-1][y].name) == "hard") {
                            anl.addPlane(map.data[z][map.data[z].length-1][y].name,map.data[z].length,y,z,6);
                        }
                    }
                }
                front = false , back = false;
                for (var x = 0; x < map.data[0].length; x++) {
                    front = false , back = false;
                    for (var y = 0; y < map.data[0][0].length; y++) {
                        front = false , back = false;
                        for (var z = 0; z < map.data.length; z++) {
                            front = back;
                            back = false;
                            if (anl.getType(map.data[z][x][y].name) == "hard") {
                                back = true;
                            }
                            if (front == true && back == false) {
                                if (z-1 >= 0) {
                                    anl.addPlane(map.data[z-1][x][y].name,x,y,z,2);
                                }
                            } else if (front == false && back == true) {
                                anl.addPlane(map.data[z][x][y].name,x,y,z,8);
                            }
                        }
                        if (anl.getType(map.data[map.data.length-1][x][y].name) == "hard") {
                            anl.addPlane(map.data[map.data.length-1][x][y].name,x,y,map.data.length,2);
                        }
                    }
                }
                box = anl.getScene();
                gui.add(box.children[0].material,"refractionRatio",0,1).onChange( function() {
					for (var i = 1; i < box.children.length; i++) {
                        box.children[i].material.refractionRatio = box.children[0].material.refractionRatio;
                    }
				} );
            //天空球
                // scene.fog = new THREE.FogExp2( 0xffffff, 0.005 );
                var textureLoader = new THREE.TextureLoader();
				var material = new THREE.MeshBasicMaterial( { color: 0xccccff } );
				sky = new THREE.Mesh( new THREE.BoxGeometry( control.eyesight*2 , control.eyesight*2 , control.eyesight*2 , 7, 7, 7 ), material );
				sky.scale.x = - 1;
            //放置
                scene.add(controlCamera.getObject(),sky,directionalLight,directionalLight1,directionalLight2,directionalLight3,directionalLight4,box,sun,moon);
            //鼠标扫描
                raycaster.far = 5;
            //启动
                //循环
                    for (var i = 0; i < cycles.length; i++) {
                        window.clearInterval(cycles[i]);
                    }
                    cycles[cycles.length] = window.setInterval(this.cycle0,control.checkSpeed);
                    cycles[cycles.length] = window.setInterval(this.cycle1,control.sunCheckSpeed);
                    cycles[cycles.length] = window.setInterval(this.cycle2,control.sunSpeed);
                //鼠标定义
                    anl.moveLogic = this.moveLogic;
                    anl.downLogicL = this.downLogicL;
                    // anl.upLogic = this.upLogic;
                    mouse.on = true;
                    this.addHotKey();
                    //mouselock.outControl();
        }
        this.moveLogic = function (mx,my) {
            controlCamera.rotate(mx,my);
            // raycaster.setFromCamera( {x:0,y:0}, camera );
            // var hits = raycaster.intersectObjects( box.children );
            // if (hits.length > 0) {
            //     hits[0].face.vertexColors = [new THREE.Color( 0x000000 ), new THREE.Color( 0x505050 ), new THREE.Color( 0x505050 ) ];
            //     hits[0].object.geometry.groupsNeedUpdate = true;
            //     hits[0].object.geometry.colorsNeedUpdate = true;
            //     hits[0].object.geometry.elementsNeedUpdate = true;
            //     hits[0].object.material.update();
            // }
        }
        this.downLogicL = function (mx,my) {
            raycaster.setFromCamera( {x:0,y:0}, camera );
            var hits = raycaster.intersectObjects( box.children );
            if (hits.length > 0) {
                hits[0].face.color = new THREE.Color( 0xffaa00 );
            }
        }
        // this.upLogic = function (mx,my) {
        //     for (var i = 0; i < cube.length; i++) {
        //         cube[i].material.emissive.setHex( 0x000000 );
        //     }
        //     raycaster.setFromCamera( {x:0,y:0}, camera );
		// 	var hits = raycaster.intersectObjects( cube );
        //     if (hits.length > 0) {
        //         hits[0].object.material.emissive.setHex( 0x333333 );
        //     }
        // }
        this.cycle0 = function () {
            anl.checkPlayer(0);
        }
        this.cycle1 = function () {
            var a = map.time/1000*Math.PI;
            if (map.time <= 1000) {
                directionalLight.position.set( Math.cos(a),Math.sin(a), 0 ).normalize();
                directionalLight.intensity = Math.sin(a) * 0.2;
                directionalLight1.intensity = Math.sin(a)/2 + 0.1;
                directionalLight2.intensity = Math.sin(a)/2 + 0.1;
                directionalLight3.intensity = Math.sin(a)/2 + 0.1;
                directionalLight4.intensity = Math.sin(a)/2 + 0.1;
                sky.material.color.b = Math.sin(a) * 1 + 0.2;
                sky.material.color.g = Math.sin(a) * 0.8 + 0.1;
                sky.material.color.r = Math.sin(a) * 0.8 + 0.1;
                sun.position.set( players[0].rx + Math.cos(a)*(control.eyesight - 1), players[0].ry + Math.sin(a)*(control.eyesight - 1), players[0].rz );
                moon.position.set( players[0].rx - Math.cos(a)*(control.eyesight - 1), players[0].ry - Math.sin(a)*(control.eyesight - 1), players[0].rz );
                sun.lookAt({x:players[0].rx,y:players[0].ry,z:players[0].rz});
                moon.lookAt({x:players[0].rx,y:players[0].ry,z:players[0].rz});
            } else {
                directionalLight.position.set( 0,-1, 0 ).normalize();
                directionalLight.intensity = 0;
                directionalLight1.intensity = 0.1;
                directionalLight2.intensity = 0.1;
                directionalLight3.intensity = 0.1;
                directionalLight4.intensity = 0.1;
            }
            sun.position.set( players[0].rx + Math.cos(a)*(control.eyesight - 1), players[0].ry + Math.sin(a)*(control.eyesight - 1), players[0].rz );
            moon.position.set( players[0].rx - Math.cos(a)*(control.eyesight - 1), players[0].ry - Math.sin(a)*(control.eyesight - 1), players[0].rz );
            sun.lookAt({x:players[0].rx,y:players[0].ry,z:players[0].rz});
            moon.lookAt({x:players[0].rx,y:players[0].ry,z:players[0].rz});
            sky.position.set(players[0].rx,players[0].ry,players[0].rz);
        }
        this.cycle2 = function () {
            if (map.time < 2000) {
                map.time++;
            } else {
                map.time = 0;
            }
        }
        this.addHotKey = function () {
            document.addEventListener("keydown",function (e) {
                switch (e.key) {
                    case "w":
                        anl.startWalkW(0);
                        break;
                    case "s":
                        anl.startWalkS(0);
                        break;
                    case "a":
                        anl.startWalkA(0);
                        break;
                    case "d":
                        anl.startWalkD(0);
                        break;
                    case " ":
                        anl.jump(0);
                        break;
                    
                    default:
                        break;
                }
            },false)
            document.addEventListener("keyup",function (e) {
                switch (e.key) {
                    case "w":
                        anl.stopWalk(0,"W");
                        break;
                    case "s":
                        anl.stopWalk(0,"S");
                        break;
                    case "a":
                        anl.stopWalk(0,"A");
                        break;
                    case "d":
                        anl.stopWalk(0,"D");
                        break;
                    case " ":
                        anl.stopWalk(0,"Space");
                        break;
                    
                    default:
                        break;
                }
            },false)
        }
        this.init();
    }
}