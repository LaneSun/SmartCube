function supportjs() {
    this.textureStorage = new Object;
    this.imageStorage = new Object;
    this.geometryStorage = {
        name: new Array(),
        data: new Object()
    };
    this.tLoader = new THREE.TextureLoader();
    this.iLoader = new THREE.ImageLoader();
    
    //
        // var matrix = new THREE.Matrix4();
        // var geometry = new THREE.Geometry();
        // var dummy = new THREE.Mesh();
        var pxGeometry = new THREE.PlaneGeometry( 1, 1 );
        // pxGeometry.faces[ 0 ].vertexColors = [ light, shadow, light ];
        // pxGeometry.faces[ 1 ].vertexColors = [ shadow, shadow, light ];
        // pxGeometry.faceVertexUvs[ 0 ][ 0 ][ 0 ].y = 0.5;
        // pxGeometry.faceVertexUvs[ 0 ][ 0 ][ 2 ].y = 0.5;
        // pxGeometry.faceVertexUvs[ 0 ][ 1 ][ 2 ].y = 0.5;
        pxGeometry.rotateY( Math.PI / 2 );
        pxGeometry.translate( -0.5, 0, 0 );
        var nxGeometry = new THREE.PlaneGeometry( 1, 1 );
        // nxGeometry.faces[ 0 ].vertexColors = [ light, shadow, light ];
        // nxGeometry.faces[ 1 ].vertexColors = [ shadow, shadow, light ];
        // nxGeometry.faceVertexUvs[ 0 ][ 0 ][ 0 ].y = 0.5;
        // nxGeometry.faceVertexUvs[ 0 ][ 0 ][ 2 ].y = 0.5;
        // nxGeometry.faceVertexUvs[ 0 ][ 1 ][ 2 ].y = 0.5;
        nxGeometry.rotateY( - Math.PI / 2 );
        nxGeometry.translate( - 0.5, 0, 0 );
        var pyGeometry = new THREE.PlaneGeometry( 1, 1 );
        // pyGeometry.faces[ 0 ].vertexColors = [ light, light, light ];
        // pyGeometry.faces[ 1 ].vertexColors = [ light, light, light ];
        // pyGeometry.faceVertexUvs[ 0 ][ 0 ][ 1 ].y = 0.5;
        // pyGeometry.faceVertexUvs[ 0 ][ 1 ][ 0 ].y = 0.5;
        // pyGeometry.faceVertexUvs[ 0 ][ 1 ][ 1 ].y = 0.5;
        pyGeometry.rotateX( - Math.PI / 2 );
        pyGeometry.translate( 0, -0.5, 0 );
        var nyGeometry = new THREE.PlaneGeometry( 1, 1 );
        // nyGeometry.faces[ 0 ].vertexColors = [ light, light, light ];
        // nyGeometry.faces[ 1 ].vertexColors = [ light, light, light ];
        // nyGeometry.faceVertexUvs[ 0 ][ 0 ][ 1 ].y = 0.5;
        // nyGeometry.faceVertexUvs[ 0 ][ 1 ][ 0 ].y = 0.5;
        // nyGeometry.faceVertexUvs[ 0 ][ 1 ][ 1 ].y = 0.5;
        nyGeometry.rotateX( Math.PI / 2 );
        // nyGeometry.rotateY( Math.PI / 2 );
        nyGeometry.translate( 0, -0.5, 0 );
        var pzGeometry = new THREE.PlaneGeometry( 1, 1 );
        // pzGeometry.faces[ 0 ].vertexColors = [ light, shadow, light ];
        // pzGeometry.faces[ 1 ].vertexColors = [ shadow, shadow, light ];
        // pzGeometry.faceVertexUvs[ 0 ][ 0 ][ 0 ].y = 0.5;
        // pzGeometry.faceVertexUvs[ 0 ][ 0 ][ 2 ].y = 0.5;
        // pzGeometry.faceVertexUvs[ 0 ][ 1 ][ 2 ].y = 0.5;
        pzGeometry.translate( 0, 0, -0.5 );
        var nzGeometry = new THREE.PlaneGeometry( 1, 1 );
        // nzGeometry.faces[ 0 ].vertexColors = [ light, shadow, light ];
        // nzGeometry.faces[ 1 ].vertexColors = [ shadow, shadow, light ];
        // nzGeometry.faceVertexUvs[ 0 ][ 0 ][ 0 ].y = 0.5;
        // nzGeometry.faceVertexUvs[ 0 ][ 0 ][ 2 ].y = 0.5;
        // nzGeometry.faceVertexUvs[ 0 ][ 1 ][ 2 ].y = 0.5;
        nzGeometry.rotateY( Math.PI );
        nzGeometry.translate( 0, 0, - 0.5 );

        var light = new THREE.Color( 0xffffff );
		var shadow = new THREE.Color( 0x505050 );
        
    this.getMaps = function (name) {
        if (this.textureStorage[name] !=undefined) {
            return this.textureStorage[name];
        } else {
            this.textureStorage[name] = this.tLoader.load( "../lib/img/" + name + ".png",function ( texture ) {
                texture.needUpdate = false
            });
            this.textureStorage[name].magFilter = THREE.NearestFilter;
            this.textureStorage[name].minFilter = THREE.NearestFilter;
            return this.textureStorage[name];
        }
    }
    this.getTextures = function (name) {
        if (control.isImage == false) {
            switch (name.split("_")[0]) {
                case "dirt":
                    return new THREE.MeshLambertMaterial({color:0x634822});
            
                default:
                    break;
            }
        } else {
            return new THREE.MeshLambertMaterial({map:this.getMaps(name)});
        }
    }
    this.getImages = function (name) {
        if (this.imageStorage[name] !=undefined) {
            return this.imageStorage[name];
        } else {
            this.imageStorage[name] = this.iLoader.load( "../lib/img/" + name + ".png");
            return this.imageStorage[name];
        }
    }
    this.cube = function (map,size,x,y,z) {
        var a = new THREE.CubeGeometry(size || 1,size || 1,size || 1);
        var b = this.getTextures(map);
        var c = new THREE.Mesh(a,b);
        c.position.x = x || 0;
        c.position.y = y || 0;
        c.position.z = z || 0;
        return c;
    }
    
    //
        // this.basicCube = function (map,size,x,y,z) {
        //     var a = new THREE.CubeGeometry(size || 1,size || 1,size || 1);
        //     var b = new THREE.MeshBasicMaterial({map:this.getTextures(map)});
        //     var c = new THREE.Mesh(a,b);
        //     c.position.x = x || 0;
        //     c.position.y = y || 0;
        //     c.position.z = z || 0;
        //     return c;
        // }
        // this.word = function (word,color,size,height,x,y,z) {
        //     var a = new THREE.TextGeometry(word, {size: size || 1, height: height || 1})
        //     var b = new THREE.MeshLambertMaterial({color:color || 0xffffff});
        //     var c = new THREE.Mesh(a,b);
        //     c.position.x = x || 0;
        //     c.position.y = y || 0;
        //     c.position.z = z || 0;
        //     return c;
        // }
    this.controlCamera = function () {
        var scope = this;

        camera.rotation.set( 0, 0, 0 );

        var pitchObject = new THREE.Object3D();
        pitchObject.add( camera );

        var yawObject = new THREE.Object3D();
        yawObject.position.y = 1;
        yawObject.add( pitchObject );

        var PI_2 = Math.PI / 2;

        this.rotate = function (mx,my) {
            yawObject.rotation.y -= mx * mouse.speed;
            pitchObject.rotation.x -= my * mouse.speed;
            pitchObject.rotation.x = Math.max( - PI_2, Math.min( PI_2, pitchObject.rotation.x ) );
            players[0].face = yawObject.rotation.y;
        }
        this.getObject = function () {

            return yawObject;

        };

        this.getDirection = function() {

            // assumes the camera itself is not rotated

            var direction = new THREE.Vector3( 0, 0, - 1 );
            var rotation = new THREE.Euler( 0, 0, 0, "YXZ" );

            return function( v ) {

                rotation.set( pitchObject.rotation.x, yawObject.rotation.y, 0 );

                v.copy( direction ).applyEuler( rotation );

                return v;

            };

        }();
    }
    this.generateHeight = function (width,height,deepth) {
        var rData = [];
        for (var z = 0; z < height; z++) {
            rData[z] = [width];
            for (var x = 0; x < width; x++) {
                rData[z][x] = [deepth];
                for (var y = 0; y < deepth; y++) {
                    rData[z][x][y] = {
                        name:undefined//名称
                    }
                }
            }
        }
        var data = [], perlin = new ImprovedNoise(),
        size = width * height, quality = control.mapQuality, z = Math.random() * 100;
        for ( var j = 0; j < control.mapBuild; j ++ ) {
            if ( j == 0 ) for ( var i = 0; i < size; i ++ ) data[ i ] = 0;
            for ( var i = 0; i < size; i ++ ) {
                var x = i % width, y = ( i / width ) | 0;
                data[ i ] += perlin.noise( x / quality, y / quality, z ) * quality;
                if ( data[ i ] / control.mapSize > deepth - 1) {
                    data[ i ] = ( deepth - 1 ) * control.mapSize;
                }
            }
            quality *= control.mapQualityMitlply;
        }
        var d = 0;
        for ( var i = 0; i < size; i ++ ) {
            var rx = i % width, rz = ( i / width ) | 0;
                d = data[ i ] / control.mapSize + 70;
                for (var y = 0; y < deepth; y++) {
                    if (d >= y) {
                        rData[rz][rx][y].name = "dirt";
                    } else {
                        rData[rz][rx][y].name = "air";
                    }
                }
        }
        return rData;
    }
    this.getType = function (name) {
        switch (name) {
            case "dirt":
                return "hard";
            case "air":
                return "soft";
        
            default:
                break;
        }
    }
    this.getScene = function () {
        var a = new THREE.Mesh();
        for (var i = 0; i < this.geometryStorage.name.length; i++) {
            var b = this.geometryStorage.data[this.geometryStorage.name[i]];
            var c = this.getTextures(this.geometryStorage.name[i]);
            a.add(new THREE.Mesh(b,c));
        }
        return a;
    }
    this.merge = function (geo,name,x,y,z) {
        if (this.geometryStorage.data[name] !=undefined) {
            geo.translate(x,y,z);
            this.geometryStorage.data[name].merge(geo);
            // this.geometryStorage.name[this.geometryStorage.name.length] = name;
        } else {
            this.geometryStorage.data[name] = new THREE.Geometry();
            geo.translate(x,y,z);
            this.geometryStorage.data[name].merge(geo);
            this.geometryStorage.name[this.geometryStorage.name.length] = name;
        }
    }
    this.addPlane = function (name,x,y,z,face) {
        switch (face) {
            case 0://UP
                var a = pyGeometry.clone();
                // var colors = a.faces[ 0 ].vertexColors;
                // colors[ 0 ] = b === 0 ? shadow : light;
                // colors[ 1 ] = c === 0 ? shadow : light;
                // colors[ 2 ] = a === 0 ? shadow : light;
                // var colors = py2Geometry.faces[ 1 ].vertexColors;
                // colors[ 0 ] = c === 0 ? shadow : light;
                // colors[ 1 ] = d === 0 ? shadow : light;
                // colors[ 2 ] = a === 0 ? shadow : light;
                // var colors = a.faces[ 0 ].vertexColors;
                // colors[ 0 ] = light;
                // colors[ 1 ] = shadow;
                // colors[ 2 ] = shadow;
                // var colors = a.faces[ 1 ].vertexColors;
                // colors[ 0 ] = shadow;
                // colors[ 1 ] = shadow;
                // colors[ 2 ] = light;
                // a.faces[ 0 ].vertexColors = [ shadow, shadow, shadow ];
                // a.faces[ 1 ].vertexColors = [ shadow, shadow, shadow ];
                // a.faceVertexUvs[ 0 ][ 0 ][ 1 ].y = 0.5;
				// a.faceVertexUvs[ 0 ][ 1 ][ 0 ].y = 0.5;
				// a.faceVertexUvs[ 0 ][ 1 ][ 1 ].y = 0.5;
                this.merge(a,name + "_py",x,y,z);
                break;
            case 5://DOWN
                var a = nyGeometry.clone();
                this.merge(a,name + "_ny",x,y,z);
                break;
            case 8://FORWARD
                var a = nzGeometry.clone();
                this.merge(a,name + "_nz",x,y,z);
                break;
            case 2://BACK
                var a = pzGeometry.clone();
                this.merge(a,name + "_pz",x,y,z);
                break;
            case 4://LEFT
                var a = nxGeometry.clone();
                this.merge(a,name + "_nx",x,y,z);
                break;
            case 6://RIGHT
                var a = pxGeometry.clone();
                this.merge(a,name + "_px",x,y,z);
                break;
            default:
                break;
        }
    }
    this.openDatabase = function (dbName) {
        var openRequest = localDatabase.indexedDB.open(dbName);
        openRequest.onerror = function(e) {
            console.log("Database error: " + e.target.errorCode);
        };
        openRequest.onsuccess = function(event) {

            localDatabase.db = openRequest.result;
        };
    }
    this.people = function () {
        this.name = "";
        this.speed = 2;
        this.rx = 0;
        this.ry = 0;
        this.rz = 0;
        this.face = 0;
        this.cycles = {
            W: new Array(),
            S: new Array(),
            A: new Array(),
            D: new Array(),
            Space: new Array(),
        };
        this.isWalking = {
            W: false,
            S: false,
            A: false,
            D: false,
            Space: false,
        };
        this.speedY = 0;
    }
    this.startWalkW = function (num) {
        if (players[num].isWalking.W == false) {
            players[num].isWalking.W = true;
            players[num].cycles[players[num].cycles.length] = window.setInterval(function () {
                if (Math.sin(players[num].face) > 0) {
                    if (anl.getType(map.data[0|(players[num].rz + 0.5)][0|(players[num].rx + 0.3)][0|(players[num].ry + 0.000001)].name) != "hard") {
                        controlCamera.getObject().position.x = players[num].rx -= 0.05 * Math.sin(players[num].face);
                    }
                } else if (Math.sin(players[num].face) < 0) {
                    if (anl.getType(map.data[0|(players[num].rz + 0.5)][0|(players[num].rx + 0.7)][0|(players[num].ry + 0.000001)].name) != "hard") {
                        controlCamera.getObject().position.x = players[num].rx -= 0.05 * Math.sin(players[num].face);
                    }
                }
                if (Math.cos(players[num].face) > 0) {
                    if (anl.getType(map.data[0|(players[num].rz + 0.3)][0|(players[num].rx + 0.5)][0|(players[num].ry + 0.000001)].name) != "hard") {
                        controlCamera.getObject().position.z = players[num].rz -= 0.05 * Math.cos(players[num].face);
                    }
                } else if (Math.cos(players[num].face) < 0) {
                    if (anl.getType(map.data[0|(players[num].rz + 0.7)][0|(players[num].rx + 0.5)][0|(players[num].ry + 0.000001)].name) != "hard") {
                        controlCamera.getObject().position.z = players[num].rz -= 0.05 * Math.cos(players[num].face);
                    }
                }
            },0|(10/players[num].speed));
        }
    }
    this.startWalkS = function (num) {
        if (players[num].isWalking.S == false) {
            players[num].isWalking.S = true;
            players[num].cycles[players[num].cycles.length] = window.setInterval(function () {
                if (Math.sin(players[num].face) < 0) {
                    if (anl.getType(map.data[0|(players[num].rz + 0.5)][0|(players[num].rx + 0.3)][0|(players[num].ry + 0.000001)].name) != "hard") {
                        controlCamera.getObject().position.x = players[num].rx += 0.05 * Math.sin(players[num].face);
                    }
                } else if (Math.sin(players[num].face) > 0) {
                    if (anl.getType(map.data[0|(players[num].rz + 0.5)][0|(players[num].rx + 0.7)][0|(players[num].ry + 0.000001)].name) != "hard") {
                        controlCamera.getObject().position.x = players[num].rx += 0.05 * Math.sin(players[num].face);
                    }
                }
                if (Math.cos(players[num].face) < 0) {
                    if (anl.getType(map.data[0|(players[num].rz + 0.3)][0|(players[num].rx + 0.5)][0|(players[num].ry + 0.000001)].name) != "hard") {
                        controlCamera.getObject().position.z = players[num].rz += 0.05 * Math.cos(players[num].face);
                    }
                } else if (Math.cos(players[num].face) > 0) {
                    if (anl.getType(map.data[0|(players[num].rz + 0.7)][0|(players[num].rx + 0.5)][0|(players[num].ry + 0.000001)].name) != "hard") {
                        controlCamera.getObject().position.z = players[num].rz += 0.05 * Math.cos(players[num].face);
                    }
                }
            },0|(10/players[num].speed));
        }
    }
    this.startWalkA = function (num) {
        if (players[num].isWalking.A == false) {
            players[num].isWalking.A = true;
            players[num].cycles[players[num].cycles.length] = window.setInterval(function () {
                if (Math.sin(players[num].face + Math.PI/2) > 0) {
                    if (anl.getType(map.data[0|(players[num].rz + 0.5)][0|(players[num].rx + 0.3)][0|(players[num].ry + 0.000001)].name) != "hard") {
                        controlCamera.getObject().position.x = players[num].rx -= 0.05 * Math.sin(players[num].face + Math.PI/2);
                    }
                } else if (Math.sin(players[num].face + Math.PI/2) < 0) {
                    if (anl.getType(map.data[0|(players[num].rz + 0.5)][0|(players[num].rx + 0.7)][0|(players[num].ry + 0.000001)].name) != "hard") {
                        controlCamera.getObject().position.x = players[num].rx -= 0.05 * Math.sin(players[num].face + Math.PI/2);
                    }
                }
                if (Math.cos(players[num].face + Math.PI/2) > 0) {
                    if (anl.getType(map.data[0|(players[num].rz + 0.3)][0|(players[num].rx + 0.5)][0|(players[num].ry + 0.000001)].name) != "hard") {
                        controlCamera.getObject().position.z = players[num].rz -= 0.05 * Math.cos(players[num].face + Math.PI/2);
                    }
                } else if (Math.cos(players[num].face + Math.PI/2) < 0) {
                    if (anl.getType(map.data[0|(players[num].rz + 0.7)][0|(players[num].rx + 0.5)][0|(players[num].ry + 0.000001)].name) != "hard") {
                        controlCamera.getObject().position.z = players[num].rz -= 0.05 * Math.cos(players[num].face + Math.PI/2);
                    }
                }
                // controlCamera.getObject().position.x = players[num].rx -= 0.05 * Math.sin(players[num].face + Math.PI/2);
                // controlCamera.getObject().position.z = players[num].rz -= 0.05 * Math.cos(players[num].face + Math.PI/2);
            },0|(10/players[num].speed));
        }
    }
    this.startWalkD = function (num) {
        if (players[num].isWalking.D == false) {
            players[num].isWalking.D = true;
            players[num].cycles[players[num].cycles.length] = window.setInterval(function () {
                if (Math.sin(players[num].face - Math.PI/2) > 0) {
                    if (anl.getType(map.data[0|(players[num].rz + 0.5)][0|(players[num].rx + 0.3)][0|(players[num].ry + 0.000001)].name) != "hard") {
                        controlCamera.getObject().position.x = players[num].rx -= 0.05 * Math.sin(players[num].face - Math.PI/2);
                    }
                } else if (Math.sin(players[num].face - Math.PI/2) < 0) {
                    if (anl.getType(map.data[0|(players[num].rz + 0.5)][0|(players[num].rx + 0.7)][0|(players[num].ry + 0.000001)].name) != "hard") {
                        controlCamera.getObject().position.x = players[num].rx -= 0.05 * Math.sin(players[num].face - Math.PI/2);
                    }
                }
                if (Math.cos(players[num].face - Math.PI/2) > 0) {
                    if (anl.getType(map.data[0|(players[num].rz + 0.3)][0|(players[num].rx + 0.5)][0|(players[num].ry + 0.000001)].name) != "hard") {
                        controlCamera.getObject().position.z = players[num].rz -= 0.05 * Math.cos(players[num].face - Math.PI/2);
                    }
                } else if (Math.cos(players[num].face - Math.PI/2) < 0) {
                    if (anl.getType(map.data[0|(players[num].rz + 0.7)][0|(players[num].rx + 0.5)][0|(players[num].ry + 0.000001)].name) != "hard") {
                        controlCamera.getObject().position.z = players[num].rz -= 0.05 * Math.cos(players[num].face - Math.PI/2);
                    }
                }
                // controlCamera.getObject().position.x = players[num].rx -= 0.05 * Math.sin(players[num].face - Math.PI/2);
                // controlCamera.getObject().position.z = players[num].rz -= 0.05 * Math.cos(players[num].face - Math.PI/2);
            },0|(10/players[num].speed));
        }
    }
    this.stopWalk = function (num,til) {
        for (var i = 0; i < players[num].cycles[til].length; i++) {
            window.clearInterval(players[num].cycles[til][i]);
        }
        players[num].cycles[til] = new Array();
        players[num].isWalking[til] = false;
    }
    this.checkPlayer = function (num) {
        if (0|(players[num].ry + players[num].speedY/20) < 0 || 0|(players[num].ry + 1) >= map.data[0|(players[num].rz + 0.5)][0|(players[num].rx + 0.5)].length) {
            //Player Has Died...
        } else {
            if (anl.getType(map.data[0|(players[num].rz + 0.5)][0|(players[num].rx + 0.5)][0|(players[num].ry -0.001 + players[num].speedY/20)].name) != "hard") {
                controlCamera.getObject().position.y = players[num].ry + 2;
                players[num].ry += players[num].speedY/20;
                if (players[num].speedY > -20) {
                    players[num].speedY -= 0.5;
                }
            } else {
                controlCamera.getObject().position.y = players[num].ry + 2;
                if (Math.abs(players[num].speedY) < 6) {
                    players[num].speedY = 0;
                } else {
                    players[num].speedY = -players[num].speedY/2;
                }
                // players[num].ry += players[num].speedY/20;
                players[num].ry = 0|(players[num].ry + 0.000001);
            }
        }
    }
    this.jump = function (num) {
        if (players[num].isWalking.Space == false) {
            players[num].isWalking.Space = true;
            players[num].cycles.Space[players[num].cycles.Space.length] = window.setInterval(function () {
                if (anl.getType(map.data[0|(players[num].rz + 0.5)][0|(players[num].rx + 0.5)][0|(players[num].ry + 2.6)].name) != "hard") {
                    if (anl.getType(map.data[0|(players[num].rz + 0.5)][0|(players[num].rx + 0.5)][0|(players[num].ry -0.1)].name) == "hard"){
                        players[num].speedY += 5;
                    }
                }
            },0|(10/players[num].speed));
        }
    }
}