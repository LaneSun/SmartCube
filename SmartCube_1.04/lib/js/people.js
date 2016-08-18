/**
 * people对象，从support对象中分离
 */
function people() {
    /*************************************一般属性*************************************/
    this.name = "";
    this.speed = 5;
    this.position = {
        x: 0,
        y: 0,
        z: 0
    }
    this.face = {
        x: 0,
        y: 0
    };
    this.cycles = {
        W: [],
        S: [],
        A: [],
        D: [],
        Space: []
    };
    this.isWalking = {
        W: false,
        S: false,
        A: false,
        D: false,
        Space: false
    };
    this.speedY = 0;
    this.speedXZ = 0;
    this.jumpStrength = 10;
    this.things = [8];
    this.choosedInt = 0;
    /*************************************事件属性**************************************/
    this.events = {
        add: function (type,code){peopleF.add(this,type,code)},
        before: function (name){peopleF.before(this,name)},
        after: function (name){peopleF.after(this,name)},
        before_functions: [],
        after_functions: []
    }
}
