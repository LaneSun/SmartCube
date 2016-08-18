/**
 * OBJECTS对象，object的对象包，从support对象中分离
 */
OBJECTS = {
    buttet: function (owner,face,location){
        this.owner = owner;
        this.face = {};
        this.face.x = face.x;
        this.face.y = face.y;
        var material = new THREE.MeshLambertMaterial({map: anl.getMaps("objects/buttet")});
        material.transparent = true;
        this.object = new THREE.Mesh(new THREE.PlaneGeometry(0.7,0.7),material);
        this.object.position.x = location.x;
        this.object.position.y = location.y + 0.5;
        this.object.position.z = location.z;
        this.move = function (){
            var length = 0.8;
            var movement_y = length * Math.sin(this.face.x);
            var movement_x = length * Math.cos(this.face.x) * Math.sin(this.face.y);
            var movement_z = length * Math.cos(this.face.x) * Math.cos(this.face.y);
            this.object.position.y += movement_y;
            this.object.position.x -= movement_x;
            this.object.position.z -= movement_z;
            this.object.lookAt(players[0].position);
            try {
                if (anl.getType(map.data[this.object.position.z | 0][this.object.position.x | 0][this.object.position.y | 0].name) == "hard") {
                    var bumb = new anl.objects.bumb(this.owner,this.object.position,2,20,true,[0xff0000,0xffff00]);
                    bumb.play();
                    anl.craftChecker.remove(this)
                }
            } catch (e){
                anl.craftChecker.remove(this)
            }
        }
        this.play = function (){
            anl.craftChecker.add(this)
        }
    },
    fire: function (owner,face,location,length,speed,isG,color,isEase) {
        this.owner = owner;
        this.face = {};
        this.face.x = face.x;
        this.face.y = face.y;
        this.speedY = 0;
        var material = new THREE.MeshLambertMaterial({color:color});
        this.object = new THREE.Mesh(new THREE.BoxGeometry(length,length,length), material);
        this.object.position.x = location.x;
        this.object.position.y = location.y;
        this.object.position.z = location.z;
        var length = speed;
        var isGl = isG;
        var isEasel = isEase;
        var time = 0;
        this.move = function () {
            if (isGl){
                this.speedY -= control.gravity * 0.01;
            }
            if (isEasel){
                length = length/2;
            }
            var movement_y = length * Math.sin(this.face.x) + this.speedY * 0.01;
            var movement_x = length * Math.cos(this.face.x) * Math.sin(this.face.y);
            var movement_z = length * Math.cos(this.face.x) * Math.cos(this.face.y);
            this.object.position.y += movement_y;
            try {
                if (anl.getType(map.data[this.object.position.z + 0.5 | 0][this.object.position.x + 0.5 | 0][this.object.position.y + 0.5 | 0].name) == "hard") {
                    this.object.position.y -= movement_y;
                    this.speedY = 0
                }
            } catch (e){
                anl.craftChecker.remove(this)
            }
            this.object.position.x -= movement_x;
            try {
                if (anl.getType(map.data[this.object.position.z + 0.5 | 0][this.object.position.x + 0.5 | 0][this.object.position.y + 0.5 | 0].name) == "hard") {
                    this.object.position.x += movement_x;
                }
            } catch (e){
                anl.craftChecker.remove(this)
            }
            this.object.position.z -= movement_z;
            try {
                if (anl.getType(map.data[this.object.position.z + 0.5 | 0][this.object.position.x + 0.5 | 0][this.object.position.y + 0.5 | 0].name) == "hard") {
                    this.object.position.z += movement_z;
                }
            } catch (e){
                anl.craftChecker.remove(this)
            }
            //this.object.lookAt(players[0].position);
            time++;
            if (time > 100){
                anl.craftChecker.remove(this)
            }
        }
        this.play = function (){
            anl.craftChecker.add(this)
        }
    },
    bumb: function (owner,location,length,int,isG,color){
        this.owner = owner;
        this.length = length;
        this.int = int;
        this.color = color;
        this.isG = isG;
        this.location = {};
        this.location.x = location.x;
        this.location.y = location.y;
        this.location.z = location.z;
        var dot = [];
        this.play = function (){
            for (var i = 0;i < this.int;i++){
                var face = {};
                face.x = (Math.random() - 0.5) * 8;
                face.y = (Math.random() - 0.5) * 4;
                var length = Math.random() * 0.2;
                //var speed = Math.random() * this.length;
                var speed = this.length;
                var color = Math.random() > 0.5 ? this.color[0] : this.color[1];
                dot[i] = new anl.objects.fire(this.owner,face,this.location,length,speed,this.isG,color,true);
            }
            for (var i = 0;i < dot.length;i++){
                dot[i].play();
            }
        }
    }
};