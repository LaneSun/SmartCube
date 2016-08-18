/**
 * people对象的公用函数包，用于支持简单的事件处理器
 */
window.peopleF = {
    /*************************************事件函数*************************************/
    add: function (people,type,code){
        var temp = people.events[type+"_functions"];
        temp[temp.length] = code
    },
    before: function (people,name){
        for (var i = 0;i < people.events.before_functions.length;i++){
            people.event.before_functions(people,name)
        }
    },
    after: function (people,name){
        for (var i = 0;i < people.events.after_functions.length;i++){
            people.event.after_functions(people,name)
        }
    },
    /*************************************一般函数**************************************/
    changeChoose: function (people){
        people.events.before("changeChoose");
        if (people.choosedInt < people.things.length) {
            people.choosedInt++
        } else {
            people.choosedInt = 0
        }
        people.events.after("changeChoose");
    }
};