/**
 * people����Ĺ��ú�����������֧�ּ򵥵��¼�������
 */
window.peopleF = {
    /*************************************�¼�����*************************************/
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
    /*************************************һ�㺯��**************************************/
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