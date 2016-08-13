//JS API
function mouselockjs(elem) {
// 我们将要使之全屏并指针锁定的元素。
var mouseLock,forMouse = [],latMouse = [];

this.fullscreenChange = function () {
  if (document.webkitFullscreenElement === mouseLock ||
      document.mozFullscreenElement === mouseLock ||
      document.fullScreenElement === mouseLock) {
    // 元素进入全屏模式了，现在我们可以请求指针锁定。
    // mouseLock.requestPointerLock = mouseLock.requestPointerLock    ||
    //                           mouseLock.mozRequestPointerLock ||
    //                           mouseLock.webkitRequestPointerLock;
    // mouseLock.requestPointerLock();
    document.removeEventListener('fullscreenchange', this.fullscreenChange, false);
    document.removeEventListener('mozfullscreenchange', this.fullscreenChange, false);
    document.removeEventListener('webkitfullscreenchange', this.fullscreenChange, false);
//     document.addEventListener("touchmove", function (e) {
//     movementX = e.clientX;
//     movementY = e.clientY;
//     mouse.rx = movementX;
//     mouse.ry = movementY;    
//     //console.log("X=" + movementX, "Y=" + movementY);
//     if (anl.rMoveLogic != undefined) {
//         anl.rMoveLogic(movementX,movementY);
//     }
// } , false);
    document.addEventListener("touchmove", function(e) {
    for (var i = 0; i < e.touches.length; i++) {
        var element = e.touches[i];
        latMouse[i] = latMouse[i] == undefined ? {} : latMouse[i];
        forMouse[i] = forMouse[i] == undefined ? {} : forMouse[i];
        latMouse[i].x = element.clientX;
        latMouse[i].y = element.clientY;
        movementX = (latMouse[i].x - forMouse[i].x) * control.touchSpeed || 0;
        movementY = (latMouse[i].y - forMouse[i].y) * control.touchSpeed || 0;
        // mouse.x = movementX;
        // mouse.y = movementY;
        // console.log("X=" + movementX, "Y=" + movementY);
        if (anl.moveLogic != undefined) {
            anl.moveLogic(movementX,movementY,latMouse[i].x,latMouse[i].y);
        }
        forMouse[i].x = element.clientX;
        forMouse[i].y = element.clientY;
    }
    } , false);
    document.addEventListener("touchstart", function(e) {
    for (var i = 0; i < e.touches.length; i++) {
        var element = e.touches[i];
        forMouse[i] = forMouse[i] == undefined ? {} : forMouse[i];
        forMouse[i].x = element.clientX;
        forMouse[i].y = element.clientY;
        x = element.clientX;
        y = element.clientY;
        mouse.clicked = true;
        // console.log("X=" + movementX, "Y=" + movementY);
        if (anl.downLogic != undefined){
            anl.downLogic(x,y);
        }        
    }
    } , false);
    document.addEventListener("touchend", function (e) {
    movementX = e.changedTouches[0].clientX;
    movementY = e.changedTouches[0].clientY;
    mouse.rx = movementX;
    mouse.ry = movementY;
    // console.log("X=" + movementX, "Y=" + movementY);
    if (anl.upLogic != undefined) {
        anl.upLogic(movementX,movementY);
    }
} , false);
  }
}

this.rlock = function () {
  if (document.webkitFullscreenElement === mouseLock ||
      document.mozFullscreenElement === mouseLock ||
      document.fullScreenElement === mouseLock) {
    // 元素进入全屏模式了，现在我们可以请求指针锁定。
    // mouseLock.requestPointerLock = mouseLock.requestPointerLock    ||
    //                           mouseLock.mozRequestPointerLock ||
    //                           mouseLock.webkitRequestPointerLock;
    // mouseLock.requestPointerLock();
  }
}

this.outControl = function () {
//   document.exitPointerLock();
}

// function pointerLockChange() {
//   if (document.mozPointerLockElement === mouseLock ||
//       document.webkitPointerLockElement === mouseLock) {
//     console.log("指针锁定成功了。");
//   } else {
//     console.log("指针锁定已丢失。");
//   }
// }

// document.addEventListener('pointerlockchange', pointerLockChange, false);
// document.addEventListener('mozpointerlockchange', pointerLockChange, false);
// document.addEventListener('webkitpointerlockchange', pointerLockChange, false);

// function pointerLockError() {
//   console.log("锁定指针时出错。");
// }

// document.addEventListener('pointerlockerror', pointerLockError, false);
// document.addEventListener('mozpointerlockerror', pointerLockError, false);
// document.addEventListener('webkitpointerlockerror', pointerLockError, false);

this.lock = function (elems) {
  mouseLock = document.getElementById(elems);
  // 开始于使元素进入全屏模式。目前的实现
  // 要求元素在请求指针锁定前要处于全屏模式下
  // -- 这在以后可能会发生改变。
  mouseLock.requestFullscreen = mouseLock.requestFullscreen    ||
                           mouseLock.mozRequestFullscreen ||
                           mouseLock.webkitRequestFullscreen;
  mouseLock.requestFullscreen();
  document.addEventListener('fullscreenchange', this.fullscreenChange, false);
  document.addEventListener('mozfullscreenchange', this.fullscreenChange, false);
  document.addEventListener('webkitfullscreenchange', this.fullscreenChange, false);
}
this.lock(elem);
}