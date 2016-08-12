function supportjs() {
    this.textureStorage = new Object;
    this.imageStorage = new Object;
    this.geometryStorage = {
        name: new Array(),
        data: new Object()
    };
    this.tLoader = new THREE.TextureLoader();
    this.iLoader = new THREE.ImageLoader();
    this.blocks = blocks;
    //
        // var matrix = new THREE.Matrix4();
        // var geometry = new THREE.Geometry();
        // var dummy = new THREE.Mesh();

        var light = new THREE.Color( 0xffffff );
		var shadow = new THREE.Color( 0x606060 );

        var pxGeometry = new THREE.PlaneGeometry( 1, 1 );
        pxGeometry.faces[ 0 ].vertexColors = [ light, light, light ];
        pxGeometry.faces[ 1 ].vertexColors = [ light, light, light ];
        // pxGeometry.faceVertexUvs[ 0 ][ 0 ][ 0 ].y = 1;
        // pxGeometry.faceVertexUvs[ 0 ][ 0 ][ 2 ].y = 1;
        // pxGeometry.faceVertexUvs[ 0 ][ 1 ][ 2 ].y = 1;
        pxGeometry.rotateY( Math.PI / 2 );
        pxGeometry.translate( -0.5, 0, 0 );
        var nxGeometry = new THREE.PlaneGeometry( 1, 1 );
        nxGeometry.faces[ 0 ].vertexColors = [ light, light, light ];
        nxGeometry.faces[ 1 ].vertexColors = [ light, light, light ];
        // nxGeometry.faceVertexUvs[ 0 ][ 0 ][ 0 ].y = 1;
        // nxGeometry.faceVertexUvs[ 0 ][ 0 ][ 2 ].y = 1;
        // nxGeometry.faceVertexUvs[ 0 ][ 1 ][ 2 ].y = 1;
        nxGeometry.rotateY( - Math.PI / 2 );
        nxGeometry.translate( - 0.5, 0, 0 );
        var pyGeometry = new THREE.PlaneGeometry( 1, 1 );
        pyGeometry.faces[ 0 ].vertexColors = [ light, light, light ];
        pyGeometry.faces[ 1 ].vertexColors = [ light, light, light ];
        // pyGeometry.faceVertexUvs[ 0 ][ 0 ][ 1 ].y = 1;
        // pyGeometry.faceVertexUvs[ 0 ][ 1 ][ 0 ].y = 1;
        // pyGeometry.faceVertexUvs[ 0 ][ 1 ][ 1 ].y = 1;
        pyGeometry.rotateX( - Math.PI / 2 );
        pyGeometry.translate( 0, -0.5, 0 );
        var nyGeometry = new THREE.PlaneGeometry( 1, 1 );
        nyGeometry.faces[ 0 ].vertexColors = [ light, light, light ];
        nyGeometry.faces[ 1 ].vertexColors = [ light, light, light ];
        // nyGeometry.faceVertexUvs[ 0 ][ 0 ][ 1 ].y = 1;
        // nyGeometry.faceVertexUvs[ 0 ][ 1 ][ 0 ].y = 1;
        // nyGeometry.faceVertexUvs[ 0 ][ 1 ][ 1 ].y = 1;
        nyGeometry.rotateX( Math.PI / 2 );
        // nyGeometry.rotateY( Math.PI / 2 );
        nyGeometry.translate( 0, -0.5, 0 );
        var pzGeometry = new THREE.PlaneGeometry( 1, 1 );
        pzGeometry.faces[ 0 ].vertexColors = [ light, light, light ];
        pzGeometry.faces[ 1 ].vertexColors = [ light, light, light ];
        // pzGeometry.faceVertexUvs[ 0 ][ 0 ][ 0 ].y = 1;
        // pzGeometry.faceVertexUvs[ 0 ][ 0 ][ 2 ].y = 1;
        // pzGeometry.faceVertexUvs[ 0 ][ 1 ][ 2 ].y = 1;
        pzGeometry.translate( 0, 0, -0.5 );
        var nzGeometry = new THREE.PlaneGeometry( 1, 1 );
        nzGeometry.faces[ 0 ].vertexColors = [ light, light, light ];
        nzGeometry.faces[ 1 ].vertexColors = [ light, light, light ];
        // nzGeometry.faceVertexUvs[ 0 ][ 0 ][ 0 ].y = 1;
        // nzGeometry.faceVertexUvs[ 0 ][ 0 ][ 2 ].y = 1;
        // nzGeometry.faceVertexUvs[ 0 ][ 1 ][ 2 ].y = 1;
        nzGeometry.rotateY( Math.PI );
        nzGeometry.translate( 0, 0, - 0.5 );
        
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
                    return new THREE.MeshLambertMaterial({color:anl.blocks[name.split("_")[0]].color,vertexColors: THREE.VertexColors});
                case "grass":
                    return new THREE.MeshLambertMaterial({color:anl.blocks[name.split("_")[0]].color,vertexColors: THREE.VertexColors});
                default:
                    break;
            }
        } else {
            switch (anl.blocks[name.split("_")[0]].suv) {
                case "same":
                    return new THREE.MeshLambertMaterial({map:anl.blocks[name.split("_")[0]].face(),vertexColors: THREE.VertexColors});
                case "half":
                    switch (name.split("_")[1]) {
                        case "py":
                            return new THREE.MeshLambertMaterial({map:anl.blocks[name.split("_")[0]].upFace(),vertexColors: THREE.VertexColors});
                        case "ny":
                            return new THREE.MeshLambertMaterial({map:anl.blocks[name.split("_")[0]].downFace(),vertexColors: THREE.VertexColors});
                        default:
                            return new THREE.MeshLambertMaterial({map:anl.blocks[name.split("_")[0]].sideFace(),vertexColors: THREE.VertexColors});
                    }
                default:
                    break;
            }
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
        size = width * height, quality = control.mapQuality, z = map.seed;
        for ( var j = 0; j < control.mapBuild; j ++ ) {
            if ( j == 0 ) for ( var i = 0; i < size; i ++ ) data[ i ] = 0;
            for ( var i = 0; i < size; i ++ ) {
                var x = i % width, y = ( i / width ) | 0;
                data[ i ] += perlin.noise( x / quality, y / quality, z ) * quality;
                if ( data[ i ] / control.mapAbruptness > deepth - 1) {
                    data[ i ] = ( deepth - 1 ) * control.mapAbruptness;
                }
            }
            quality *= control.mapQualityMitlply;
        }
        var d = 0;
        for ( var i = 0; i < size; i ++ ) {
            var rx = i % width, rz = ( i / width ) | 0;
                d = data[ i ] / control.mapAbruptness + 70;
                for (var y = 0; y < deepth; y++) {
                    if (d >= y) {
                        rData[rz][rx][y].name = "dirt";
                    } else {
                        rData[rz][rx][y].name = "air";
                    }
                }
        }
        for (var z = 0; z < rData.length; z++) {
            for (var x = 0; x < rData[z].length; x++) {
                for (var y = rData[z][x].length - 2; y >= 0; y--) {
                    try {
                        if (rData[z][x][y + 1].name == "air" && rData[z][x][y].name == "dirt") {
                            rData[z][x][y].name = "grass";
                        }
                    } catch (e) {
                        
                    }
                }
            }
        }
        return rData;
    }
    this.getType = function (name) {
        return blocks[name].type;
    }
    this.getScene = function () {
        var a = new THREE.Mesh();
        for (var i = 0; i < this.geometryStorage.name.length; i++) {
            var b = this.geometryStorage.data[this.geometryStorage.name[i]];
            b.groupsNeedUpdate = true;
            b.colorsNeedUpdate = true;
            b.elementsNeedUpdate = true;
            var c = this.getTextures(this.geometryStorage.name[i]);
            c.needsUpdate = true;
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
                var colors1 = a.faces[ 0 ].vertexColors;
                var colors2 = a.faces[ 1 ].vertexColors;
                try {
                    if (anl.getType(map.data[z + 1][x][y].name) == "hard") {
                        colors2[0] = shadow;
                        colors2[1] = shadow;
                        colors1[1] = shadow;
                    }
                    if (anl.getType(map.data[z - 1][x][y].name) == "hard") {
                        colors1[0] = shadow;
                        colors1[2] = shadow;
                        colors2[2] = shadow;
                    }
                    if (anl.getType(map.data[z][x + 1][y].name) == "hard") {
                        colors2[1] = shadow;
                        colors2[2] = shadow;
                        colors1[2] = shadow;
                    }
                    if (anl.getType(map.data[z][x - 1][y].name) == "hard") {
                        colors1[0] = shadow;
                        colors1[1] = shadow;
                        colors2[0] = shadow;
                    }
                    //
                    if (anl.getType(map.data[z + 1][x + 1][y].name) == "hard") {
                        colors2[1] = shadow;
                    }
                    if (anl.getType(map.data[z - 1][x + 1][y].name) == "hard") {
                        colors1[2] = shadow;
                        colors2[2] = shadow;
                    }
                    if (anl.getType(map.data[z + 1][x - 1][y].name) == "hard") {
                        colors2[0] = shadow;
                        colors1[1] = shadow;
                    }
                    if (anl.getType(map.data[z - 1][x - 1][y].name) == "hard") {
                        colors1[0] = shadow;
                    }
                } catch (e) {
                    
                }
                this.merge(a,name + "_py",x,y,z);
                break;
            case 5://DOWN
                var a = nyGeometry.clone();
                this.merge(a,name + "_ny",x,y,z);
                break;
            case 8://FORWARD
                var a = nzGeometry.clone();
                var colors1 = a.faces[ 0 ].vertexColors;
                var colors2 = a.faces[ 1 ].vertexColors;
                try {
                    if (anl.getType(map.data[z - 1][x][y - 1].name) == "hard") {
                        colors2[0] = shadow;
                        colors2[1] = shadow;
                        colors1[1] = shadow;
                    }
                    if (anl.getType(map.data[z - 1][x][y + 1].name) == "hard") {
                        colors1[0] = shadow;
                        colors1[2] = shadow;
                        colors2[2] = shadow;
                    }
                    if (anl.getType(map.data[z - 1][x + 1][y].name) == "hard") {
                        colors1[0] = shadow;
                        colors1[1] = shadow;
                        colors2[0] = shadow;
                    }
                    if (anl.getType(map.data[z - 1][x - 1][y].name) == "hard") {
                        colors2[1] = shadow;
                        colors2[2] = shadow;
                        colors1[2] = shadow;
                    }
                    //
                    if (anl.getType(map.data[z - 1][x + 1][y - 1].name) == "hard") {
                        // colors2[1] = shadow;
                        colors2[0] = shadow;
                        colors1[1] = shadow;
                    }
                    if (anl.getType(map.data[z - 1][x + 1][y + 1].name) == "hard") {
                        // colors1[2] = shadow;
                        // colors2[2] = shadow;
                        colors1[0] = shadow;
                    }
                    if (anl.getType(map.data[z - 1][x - 1][y + 1].name) == "hard") {
                        colors1[2] = shadow;
                        colors2[2] = shadow;
                    }
                    if (anl.getType(map.data[z - 1][x - 1][y - 1].name) == "hard") {
                        colors2[1] = shadow;
                    }
                } catch (e) {
                    
                }
                this.merge(a,name + "_nz",x,y,z);
                break;
            case 2://BACK
                var a = pzGeometry.clone();
                var colors1 = a.faces[ 0 ].vertexColors;
                var colors2 = a.faces[ 1 ].vertexColors;
                try {
                    if (anl.getType(map.data[z][x][y - 1].name) == "hard") {
                        colors2[0] = shadow;
                        colors2[1] = shadow;
                        colors1[1] = shadow;
                    }
                    if (anl.getType(map.data[z][x][y + 1].name) == "hard") {
                        colors1[0] = shadow;
                        colors1[2] = shadow;
                        colors2[2] = shadow;
                    }
                    if (anl.getType(map.data[z][x - 1][y].name) == "hard") {
                        colors1[0] = shadow;
                        colors1[1] = shadow;
                        colors2[0] = shadow;
                    }
                    if (anl.getType(map.data[z][x + 1][y].name) == "hard") {
                        colors2[1] = shadow;
                        colors2[2] = shadow;
                        colors1[2] = shadow;
                    }
                    //
                    if (anl.getType(map.data[z][x - 1][y - 1].name) == "hard") {
                        // colors2[1] = shadow;
                        colors2[0] = shadow;
                        colors1[1] = shadow;
                    }
                    if (anl.getType(map.data[z][x - 1][y + 1].name) == "hard") {
                        // colors1[2] = shadow;
                        // colors2[2] = shadow;
                        colors1[0] = shadow;
                    }
                    if (anl.getType(map.data[z][x + 1][y + 1].name) == "hard") {
                        colors1[2] = shadow;
                        colors2[2] = shadow;
                    }
                    if (anl.getType(map.data[z][x + 1][y - 1].name) == "hard") {
                        colors2[1] = shadow;
                    }
                } catch (e) {
                    
                }
                this.merge(a,name + "_pz",x,y,z);
                break;
            case 4://LEFT
                var a = nxGeometry.clone();
                var colors1 = a.faces[ 0 ].vertexColors;
                var colors2 = a.faces[ 1 ].vertexColors;
                try {
                    if (anl.getType(map.data[z][x - 1][y - 1].name) == "hard") {
                        colors2[0] = shadow;
                        colors2[1] = shadow;
                        colors1[1] = shadow;
                    }
                    if (anl.getType(map.data[z][x - 1][y + 1].name) == "hard") {
                        colors1[0] = shadow;
                        colors1[2] = shadow;
                        colors2[2] = shadow;
                    }
                    if (anl.getType(map.data[z - 1][x - 1][y].name) == "hard") {
                        colors1[0] = shadow;
                        colors1[1] = shadow;
                        colors2[0] = shadow;
                    }
                    if (anl.getType(map.data[z + 1][x - 1][y].name) == "hard") {
                        colors2[1] = shadow;
                        colors2[2] = shadow;
                        colors1[2] = shadow;
                    }
                    //
                    if (anl.getType(map.data[z - 1][x - 1][y - 1].name) == "hard") {
                        // colors2[1] = shadow;
                        colors2[0] = shadow;
                        colors1[1] = shadow;
                    }
                    if (anl.getType(map.data[z - 1][x - 1][y + 1].name) == "hard") {
                        // colors1[2] = shadow;
                        // colors2[2] = shadow;
                        colors1[0] = shadow;
                    }
                    if (anl.getType(map.data[z + 1][x - 1][y + 1].name) == "hard") {
                        colors1[2] = shadow;
                        colors2[2] = shadow;
                    }
                    if (anl.getType(map.data[z + 1][x - 1][y - 1].name) == "hard") {
                        colors2[1] = shadow;
                    }
                } catch (e) {
                    
                }
                this.merge(a,name + "_nx",x,y,z);
                break;
            case 6://RIGHT
                var a = pxGeometry.clone();
                var colors1 = a.faces[ 0 ].vertexColors;
                var colors2 = a.faces[ 1 ].vertexColors;
                try {
                    if (anl.getType(map.data[z][x][y - 1].name) == "hard") {
                        colors2[0] = shadow;
                        colors2[1] = shadow;
                        colors1[1] = shadow;
                    }
                    if (anl.getType(map.data[z][x][y + 1].name) == "hard") {
                        colors1[0] = shadow;
                        colors1[2] = shadow;
                        colors2[2] = shadow;
                    }
                    if (anl.getType(map.data[z + 1][x][y].name) == "hard") {
                        colors1[0] = shadow;
                        colors1[1] = shadow;
                        colors2[0] = shadow;
                    }
                    if (anl.getType(map.data[z - 1][x][y].name) == "hard") {
                        colors2[1] = shadow;
                        colors2[2] = shadow;
                        colors1[2] = shadow;
                    }
                    //
                    if (anl.getType(map.data[z + 1][x][y - 1].name) == "hard") {
                        // colors2[1] = shadow;
                        colors2[0] = shadow;
                        colors1[1] = shadow;
                    }
                    if (anl.getType(map.data[z + 1][x][y + 1].name) == "hard") {
                        // colors1[2] = shadow;
                        // colors2[2] = shadow;
                        colors1[0] = shadow;
                    }
                    if (anl.getType(map.data[z - 1][x][y + 1].name) == "hard") {
                        colors1[2] = shadow;
                        colors2[2] = shadow;
                    }
                    if (anl.getType(map.data[z - 1][x][y - 1].name) == "hard") {
                        colors2[1] = shadow;
                    }
                } catch (e) {
                    
                }
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
        this.speed = 5;
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
        this.speedXZ = 0;
        this.jumpStrength = 10;
    }
    this.startWalkW = function (num) {
        if (players[num].isWalking.W == false) {
            players[num].isWalking.W = true;
            players[num].walking = true;
            players[num].cycles.W[players[num].cycles.W.length] = window.setInterval(function () {
                let face = players[num].face;
                if (Math.sin(face) > 0) {
                    if (anl.getType(map.data[0|(players[num].rz + 0.7)][0|(players[num].rx + 0.3 - players[num].speedXZ * Math.sin(face))][0|(players[num].ry + 0.000001)].name) != "hard" && anl.getType(map.data[0|(players[num].rz + 0.3)][0|(players[num].rx + 0.3 - players[num].speedXZ * Math.sin(face))][0|(players[num].ry + 0.000001)].name) != "hard") {
                        controlCamera.getObject().position.x = players[num].rx -= players[num].speedXZ * Math.sin(face);
                    }
                } else if (Math.sin(face) < 0) {
                    if (anl.getType(map.data[0|(players[num].rz + 0.7)][0|(players[num].rx + 0.7 - players[num].speedXZ * Math.sin(face))][0|(players[num].ry + 0.000001)].name) != "hard" && anl.getType(map.data[0|(players[num].rz + 0.3)][0|(players[num].rx + 0.7 - players[num].speedXZ * Math.sin(face))][0|(players[num].ry + 0.000001)].name) != "hard") {
                        controlCamera.getObject().position.x = players[num].rx -= players[num].speedXZ * Math.sin(face);
                    }
                }
                if (Math.cos(face) > 0) {
                    if (anl.getType(map.data[0|(players[num].rz + 0.3 - players[num].speedXZ * Math.cos(face))][0|(players[num].rx + 0.3)][0|(players[num].ry + 0.000001)].name) != "hard" && anl.getType(map.data[0|(players[num].rz + 0.3 - players[num].speedXZ * Math.cos(face))][0|(players[num].rx + 0.7)][0|(players[num].ry + 0.000001)].name) != "hard") {
                        controlCamera.getObject().position.z = players[num].rz -= players[num].speedXZ * Math.cos(face);
                    }
                } else if (Math.cos(face) < 0) {
                    if (anl.getType(map.data[0|(players[num].rz + 0.7 - players[num].speedXZ * Math.cos(face))][0|(players[num].rx + 0.3)][0|(players[num].ry + 0.000001)].name) != "hard" && anl.getType(map.data[0|(players[num].rz + 0.7 - players[num].speedXZ * Math.cos(face))][0|(players[num].rx + 0.7)][0|(players[num].ry + 0.000001)].name) != "hard") {
                        controlCamera.getObject().position.z = players[num].rz -= players[num].speedXZ * Math.cos(face);
                    }
                }
            },players[num].speed);
        }
    }
    this.startWalkS = function (num) {
        if (players[num].isWalking.S == false) {
            players[num].isWalking.S = true;
            players[num].walking = true;
            players[num].cycles.S[players[num].cycles.S.length] = window.setInterval(function () {
                let face = players[num].face + Math.PI;
                if (Math.sin(face) > 0) {
                    if (anl.getType(map.data[0|(players[num].rz + 0.7)][0|(players[num].rx + 0.3 - players[num].speedXZ * Math.sin(face))][0|(players[num].ry + 0.000001)].name) != "hard" && anl.getType(map.data[0|(players[num].rz + 0.3)][0|(players[num].rx + 0.3 - players[num].speedXZ * Math.sin(face))][0|(players[num].ry + 0.000001)].name) != "hard") {
                        controlCamera.getObject().position.x = players[num].rx -= players[num].speedXZ * Math.sin(face);
                    }
                } else if (Math.sin(face) < 0) {
                    if (anl.getType(map.data[0|(players[num].rz + 0.7)][0|(players[num].rx + 0.7 - players[num].speedXZ * Math.sin(face))][0|(players[num].ry + 0.000001)].name) != "hard" && anl.getType(map.data[0|(players[num].rz + 0.3)][0|(players[num].rx + 0.7 - players[num].speedXZ * Math.sin(face))][0|(players[num].ry + 0.000001)].name) != "hard") {
                        controlCamera.getObject().position.x = players[num].rx -= players[num].speedXZ * Math.sin(face);
                    }
                }
                if (Math.cos(face) > 0) {
                    if (anl.getType(map.data[0|(players[num].rz + 0.3 - players[num].speedXZ * Math.cos(face))][0|(players[num].rx + 0.3)][0|(players[num].ry + 0.000001)].name) != "hard" && anl.getType(map.data[0|(players[num].rz + 0.3 - players[num].speedXZ * Math.cos(face))][0|(players[num].rx + 0.7)][0|(players[num].ry + 0.000001)].name) != "hard") {
                        controlCamera.getObject().position.z = players[num].rz -= players[num].speedXZ * Math.cos(face);
                    }
                } else if (Math.cos(face) < 0) {
                    if (anl.getType(map.data[0|(players[num].rz + 0.7 - players[num].speedXZ * Math.cos(face))][0|(players[num].rx + 0.3)][0|(players[num].ry + 0.000001)].name) != "hard" && anl.getType(map.data[0|(players[num].rz + 0.7 - players[num].speedXZ * Math.cos(face))][0|(players[num].rx + 0.7)][0|(players[num].ry + 0.000001)].name) != "hard") {
                        controlCamera.getObject().position.z = players[num].rz -= players[num].speedXZ * Math.cos(face);
                    }
                }
            },players[num].speed);
        }
    }
    this.startWalkA = function (num) {
        if (players[num].isWalking.A == false) {
            players[num].isWalking.A = true;
            players[num].walking = true;
            players[num].cycles.A[players[num].cycles.A.length] = window.setInterval(function () {
                let face = players[num].face + Math.PI/2;
                if (Math.sin(face) > 0) {
                    if (anl.getType(map.data[0|(players[num].rz + 0.7)][0|(players[num].rx + 0.3 - players[num].speedXZ * Math.sin(face))][0|(players[num].ry + 0.000001)].name) != "hard" && anl.getType(map.data[0|(players[num].rz + 0.3)][0|(players[num].rx + 0.3 - players[num].speedXZ * Math.sin(face))][0|(players[num].ry + 0.000001)].name) != "hard") {
                        controlCamera.getObject().position.x = players[num].rx -= players[num].speedXZ * Math.sin(face);
                    }
                } else if (Math.sin(face) < 0) {
                    if (anl.getType(map.data[0|(players[num].rz + 0.7)][0|(players[num].rx + 0.7 - players[num].speedXZ * Math.sin(face))][0|(players[num].ry + 0.000001)].name) != "hard" && anl.getType(map.data[0|(players[num].rz + 0.3)][0|(players[num].rx + 0.7 - players[num].speedXZ * Math.sin(face))][0|(players[num].ry + 0.000001)].name) != "hard") {
                        controlCamera.getObject().position.x = players[num].rx -= players[num].speedXZ * Math.sin(face);
                    }
                }
                if (Math.cos(face) > 0) {
                    if (anl.getType(map.data[0|(players[num].rz + 0.3 - players[num].speedXZ * Math.cos(face))][0|(players[num].rx + 0.3)][0|(players[num].ry + 0.000001)].name) != "hard" && anl.getType(map.data[0|(players[num].rz + 0.3 - players[num].speedXZ * Math.cos(face))][0|(players[num].rx + 0.7)][0|(players[num].ry + 0.000001)].name) != "hard") {
                        controlCamera.getObject().position.z = players[num].rz -= players[num].speedXZ * Math.cos(face);
                    }
                } else if (Math.cos(face) < 0) {
                    if (anl.getType(map.data[0|(players[num].rz + 0.7 - players[num].speedXZ * Math.cos(face))][0|(players[num].rx + 0.3)][0|(players[num].ry + 0.000001)].name) != "hard" && anl.getType(map.data[0|(players[num].rz + 0.7 - players[num].speedXZ * Math.cos(face))][0|(players[num].rx + 0.7)][0|(players[num].ry + 0.000001)].name) != "hard") {
                        controlCamera.getObject().position.z = players[num].rz -= players[num].speedXZ * Math.cos(face);
                    }
                }
            },players[num].speed);
        }
    }
    this.startWalkD = function (num) {
        if (players[num].isWalking.D == false) {
            players[num].isWalking.D = true;
            players[num].walking = true;
            players[num].cycles.D[players[num].cycles.D.length] = window.setInterval(function () {
                let face = players[num].face - Math.PI/2;
                if (Math.sin(face) > 0) {
                    if (anl.getType(map.data[0|(players[num].rz + 0.7)][0|(players[num].rx + 0.3 - players[num].speedXZ * Math.sin(face))][0|(players[num].ry + 0.000001)].name) != "hard" && anl.getType(map.data[0|(players[num].rz + 0.3)][0|(players[num].rx + 0.3 - players[num].speedXZ * Math.sin(face))][0|(players[num].ry + 0.000001)].name) != "hard") {
                        controlCamera.getObject().position.x = players[num].rx -= players[num].speedXZ * Math.sin(face);
                    }
                } else if (Math.sin(face) < 0) {
                    if (anl.getType(map.data[0|(players[num].rz + 0.7)][0|(players[num].rx + 0.7 - players[num].speedXZ * Math.sin(face))][0|(players[num].ry + 0.000001)].name) != "hard" && anl.getType(map.data[0|(players[num].rz + 0.3)][0|(players[num].rx + 0.7 - players[num].speedXZ * Math.sin(face))][0|(players[num].ry + 0.000001)].name) != "hard") {
                        controlCamera.getObject().position.x = players[num].rx -= players[num].speedXZ * Math.sin(face);
                    }
                }
                if (Math.cos(face) > 0) {
                    if (anl.getType(map.data[0|(players[num].rz + 0.3 - players[num].speedXZ * Math.cos(face))][0|(players[num].rx + 0.3)][0|(players[num].ry + 0.000001)].name) != "hard" && anl.getType(map.data[0|(players[num].rz + 0.3 - players[num].speedXZ * Math.cos(face))][0|(players[num].rx + 0.7)][0|(players[num].ry + 0.000001)].name) != "hard") {
                        controlCamera.getObject().position.z = players[num].rz -= players[num].speedXZ * Math.cos(face);
                    }
                } else if (Math.cos(face) < 0) {
                    if (anl.getType(map.data[0|(players[num].rz + 0.7 - players[num].speedXZ * Math.cos(face))][0|(players[num].rx + 0.3)][0|(players[num].ry + 0.000001)].name) != "hard" && anl.getType(map.data[0|(players[num].rz + 0.7 - players[num].speedXZ * Math.cos(face))][0|(players[num].rx + 0.7)][0|(players[num].ry + 0.000001)].name) != "hard") {
                        controlCamera.getObject().position.z = players[num].rz -= players[num].speedXZ * Math.cos(face);
                    }
                }
            },players[num].speed);
        }
    }
    this.stopWalk = function (num,til) {
        for (var i = 0; i < players[num].cycles[til].length; i++) {
            window.clearInterval(players[num].cycles[til][i]);
        }
        players[num].cycles[til] = new Array();
        players[num].isWalking[til] = false;
        if (!players[num].isWalking.W) {
            if (!players[num].isWalking.S) {
                if (!players[num].isWalking.A) {
                    if (!players[num].isWalking.D) {
                        players[num].speedXZ = 0;
                        players[num].walking = false;
                    }
                }
            }
        }
    }
    this.checkPlayer = function (num) {
        if (0|(players[num].ry + players[num].speedY/20) < 0 || 0|(players[num].ry + 1) >= map.data[0|(players[num].rz + 0.5)][0|(players[num].rx + 0.5)].length) {
            //Player Has Died...
        } else {
            if (players[num].walking == true) {
                if (players[num].speedXZ < 0.05) {
                    players[num].speedXZ += 0.0005;
                }
            } else {
                players[num].speedXZ = 0;
            }
            if (anl.getType(map.data[0|(players[num].rz + 0.7)][0|(players[num].rx + 0.7)][0|(players[num].ry -0.001 + players[num].speedY*control.checkSpeed/1000)].name) != "hard" && anl.getType(map.data[0|(players[num].rz + 0.3)][0|(players[num].rx + 0.3)][0|(players[num].ry -0.001 + players[num].speedY*control.checkSpeed/1000)].name) != "hard") {
                players[num].ry += players[num].speedY*control.checkSpeed/1000;
                if (players[num].speedY > - 40) {
                    players[num].speedY -= control.gravity*control.checkSpeed/1000;
                }
                controlCamera.getObject().position.y = players[num].ry + 1;
            } else {
                if (Math.abs(players[num].speedY) < 6) {
                    players[num].speedY = 0;
                } else {
                    players[num].speedY = -players[num].speedY/2;
                }
                // players[num].ry += players[num].speedY/20;
                players[num].ry = 0|(players[num].ry + 0.000001);
                controlCamera.getObject().position.y = players[num].ry + 1;
            }
        }
    }
    this.jump = function (num) {
        if (players[num].isWalking.Space == false) {
            players[num].isWalking.Space = true;
            players[num].cycles.Space[players[num].cycles.Space.length] = window.setInterval(function () {
                if (anl.getType(map.data[0|(players[num].rz + 0.7)][0|(players[num].rx + 0.7)][0|(players[num].ry + 2.6)].name) != "hard" && anl.getType(map.data[0|(players[num].rz + 0.3)][0|(players[num].rx + 0.3)][0|(players[num].ry + 2.6)].name) != "hard" && players[num].speedY <= 0) {
                    if (anl.getType(map.data[0|(players[num].rz + 0.7)][0|(players[num].rx + 0.7)][0|(players[num].ry -0.4)].name) == "hard" || anl.getType(map.data[0|(players[num].rz + 0.3)][0|(players[num].rx + 0.3)][0|(players[num].ry -0.2)].name) == "hard"){
                        players[num].speedY = -players[num].speedY/2 + players[num].jumpStrength;
                    }
                }
            },4);
        }
    }
}
function start() {
    var localData = {
        eyesight: localStorage.getItem("eyesight")||100,
        mapSize: localStorage.getItem("mapSize")||100,
        mapBuild: localStorage.getItem("mapBuild")||4,
        mapAbruptness: localStorage.getItem("mapAbruptness")||4,
        sunSpeed: localStorage.getItem("sunSpeed")||100,
        checkSpeed: localStorage.getItem("checkSpeed")||16,
        gravity: localStorage.getItem("gravity")||10,
        isImage: localStorage.getItem("isImage")||true,
        mapSeed: localStorage.getItem("mapSeed")||(Math.random() * 10000000000000000),
    };
    var stat = 0;
    if (window.HTMLCanvasElement) {
        stat++;
    } else {
    }
    if (window.Worker) {
        stat++;
    } else {
    }
    if (window.WebGLBuffer) {
        stat++;
    } else {
    }
    if (document.body.requestPointerLock) {
        stat++;
    } else {
    }
    if (window.indexedDB) {
        stat++;
    } else {
    }
    if (stat == 5) {
        swal({
            title: 'Ready',
            text: 'Start Game ?',
            type: 'success',
            showCancelButton: true,
        }).then(function(e) {
            if(e === true){
                swal({
                    title: 'Settings',
                    html:
"<table>"+
"    <tr>"+
"        <td align='left'><b>Eyesight</b></td><td width='100' align='left'><div id='eyesight' contenteditable='true'>"+ localData.eyesight +"</div></td>"+
"    </tr>"+
"    <tr>"+
"        <td align='left'><b>Map Size</b></td><td width='100' align='left'><div id='mapSize' contenteditable='true'>"+ localData.mapSize +"</div></td>"+
"    </tr>"+
"    <tr>"+
"        <td align='left'><b>Map Quality</b></td><td width='100' align='left'><div id='mapBuild' contenteditable='true'>"+ localData.mapBuild +"</div></td>"+
"    </tr>"+
"    <tr>"+
"        <td align='left'><b>Map Abruptness</b></td><td width='100' align='left'><div id='mapAbruptness' contenteditable='true'>"+ localData.mapAbruptness +"</div></td>"+
"    </tr>"+
"    <tr>"+
"        <td align='left'><b>Time Speed</b></td><td width='100' align='left'><div id='sunSpeed' contenteditable='true'>"+ localData.sunSpeed +"</div></td>"+
"    </tr>"+
"    <tr>"+
"        <td align='left'><b>Check Speed</b></td><td width='100' align='left'><div id='checkSpeed' contenteditable='true'>"+ localData.checkSpeed +"</div></td>"+
"    </tr>"+
"    <tr>"+
"        <td align='left'><b>Gravity</b></td><td width='100' align='left'><div id='gravity' contenteditable='true'>"+ localData.gravity +"</div></td>"+
"    </tr>"+
"    <tr>"+
"        <td align='left'><b>Use Images</b></td><td width='100' align='left'><div id='isImage' contenteditable='true'>"+ localData.isImage +"</div></td>"+
"    </tr>"+
"    <tr>"+
"        <td align='left'><b>Map Seed</b></td><td width='100' align='left'><div id='mapSeed' contenteditable='true'>"+ localData.mapSeed +"</div></td>"+
"    </tr>"+
"</table>",
                    showCancelButton: false,
                }).then(function(e) {
                    if(e === true){
                        window.control = {
                            eyesight: eval(document.getElementById("eyesight").innerText),
                            isImage: eval(document.getElementById("isImage").innerText),
                            mapSize: eval(document.getElementById("mapSize").innerText),
                            mapQuality: 2,
                            mapBuild: eval(document.getElementById("mapBuild").innerText),
                            mapQualityMitlply: 4,
                            mapAbruptness: eval(document.getElementById("mapAbruptness").innerText),
                            sunSpeed: eval(document.getElementById("sunSpeed").innerText),
                            speed: 10,
                            checkSpeed: eval(document.getElementById("checkSpeed").innerText),
                            sunCheckSpeed: 25,
                            gravity: eval(document.getElementById("gravity").innerText) * 4,
                        };
                        let seed = document.getElementById("mapSeed").innerText;
                        window.map = {
                            seed: parseInt(seed)/Math.pow(10,(seed.length - 2)),
                        };
                        localStorage.setItem("eyesight",control.eyesight);
                        localStorage.setItem("mapSize",control.mapSize);
                        localStorage.setItem("mapBuild",control.mapBuild);
                        localStorage.setItem("mapAbruptness",control.mapAbruptness);
                        localStorage.setItem("sunSpeed",control.sunSpeed);
                        localStorage.setItem("checkSpeed",control.checkSpeed);
                        localStorage.setItem("gravity",control.gravity/4);
                        localStorage.setItem("isImage",control.isImage);
                        localStorage.setItem("mapSeed",map.seed);
                        window.setTimeout("loadjs()",1000);
                    }
                });
            }
        });
    } else {
        swal({
            title: 'Wrong',
            text: 'Cannot Load !',
            type: 'error',
        });
    }
}