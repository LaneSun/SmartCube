/**
 * thing����Ĺ��ú�����������֧�ּ򵥵��¼�������
 */
window.thingF = {
    /*************************************�¼�����*************************************/
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
    /*************************************һ�㺯��**************************************/
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
