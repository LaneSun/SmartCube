/**
 * thing对象的公用函数包，用于支持简单的事件处理器
 */
window.thingF = {
    /*************************************事件函数*************************************/
    add: function (thing,type,code){
        var temp = thing.events[type+"_functions"];
        temp[temp.length] = code
    },
    before: function (thing,name){
        for (var i = 0;i < thing.events.before_functions.length;i++){
            thing.event.before_functions(thing,name)
        }
    },
    after: function (thing,name){
        for (var i = 0;i < thing.events.after_functions.length;i++){
            thing.event.after_functions(thing,name)
        }
    },
    /*************************************一般函数**************************************/
    changeChoose: function (thing){
        thing.events.before("changeChoose");
        if (thing.choosedInt < thing.things.length) {
            thing.choosedInt++
        } else {
            thing.choosedInt = 0
        }
        thing.events.after("changeChoose");
    }
};
