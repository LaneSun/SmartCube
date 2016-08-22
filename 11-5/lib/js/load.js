/**
 * Created by Administrator on 2016/8/19 0019.
 */
window.control = {
    time: 60000,
};
function load(){
    cycle();
    window.setInterval(cycle,control.time);
};
function cycle(){
    $.getJSON("http://f.apiplus.cn/js11x5-50.json?callback=?",function (data){
        window.data = data;
        sanfi();
    });
};
function sanfi(){
    document.getElementById("info").hidden = false;
    for (var i = 0;i < data.data.length;i++) {
        if(localStorage.getItem(data.data[i].expect) != data.data[i].opencode){
            localStorage.setItem(data.data[i].expect,data.data[i].opencode);
        }
        document.getElementById("info").innerText = "Updata:" + Number(i/data.data.length*100).toString().substring(0,2) + "%";
    }
    document.getElementById("info").hidden = true;
    var sen = "";
    for (var i = 0;i < localStorage.length;i++) {
        sen += localStorage.key(i) + " " + localStorage.getItem(localStorage.key(i)) + "<br>";
    }
    document.getElementById("num").innerText = "已记录" + localStorage.length + "条数据";
    document.getElementById("data").innerHTML = sen;
}
function clearData() {
    localStorage.clear();
    var sen = "";
    for (var i = 0;i < localStorage.length;i++) {
        sen += localStorage.key(i) + " " + localStorage.getItem(localStorage.key(i)) + "<br>";
    }
    document.getElementById("num").innerText = "已记录" + localStorage.length + "条数据";
    document.getElementById("data").innerHTML = sen;
}