/**
 * THINGS对象，thing的对象包，从support对象中分离
 */
THINGS = {
    /***************************************AK-47****************************************/
    MAIN_AK47: function (owner){
        this.name = "AK-47";
        this.action = {
            choosed: function (){
                anl.thingChecker.add(this.former);
            },
            mousedown: function (){
                this.former.data.isShooting = true;
            },
            mouseup: function (){
                this.former.data.isShooting = false;
            },
            keydown: function (){
                //
            },
            unchoosed: function (){
                anl.thingChecker.remove(this.former);
            }
        };
        this.action.former = this;
        this.data = {
            bulletInt: 9,
            owner: owner,
            loadInt: 0,//0-9 0：开始上膛 9：上膛完成
            int: undefined,
            isShooting: false,
            load: function (){
                if(this.loadInt < 9){this.loadInt++}
            },
            shoot: function (){
                var newBullet = new anl.objects.buttet(this.owner,this.owner.face,this.owner.position);
                newBullet.play();
                this.loadInt = 0;
            }
        };
        this.data.former = this;
        this.settings = {
            speed: 100
        };
        this.events = {
            add: function (type,code){peopleF.add(this,type,code)},
            before: function (name){peopleF.before(this,name)},
            after: function (name){peopleF.after(this,name)},
            before_functions: [],
            after_functions: []
        };
        this.check = function (){
            if (this.data.isShooting && this.data.loadInt > 8){
                this.data.shoot()
            } else {
                this.data.loadInt++
            }
        }
    }
};