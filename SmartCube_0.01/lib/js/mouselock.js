//JS API
function mouselockjs(elem) {
// 我们将要使之全屏并指针锁定的元素。
var mouseLock;

this.fullscreenChange = function () {
  if (document.webkitFullscreenElement === mouseLock ||
      document.mozFullscreenElement === mouseLock ||
      document.fullScreenElement === mouseLock) {
    // 元素进入全屏模式了，现在我们可以请求指针锁定。
    mouseLock.requestPointerLock = mouseLock.requestPointerLock    ||
                              mouseLock.mozRequestPointerLock ||
                              mouseLock.webkitRequestPointerLock;
    mouseLock.requestPointerLock();
    document.removeEventListener('fullscreenchange', this.fullscreenChange, false);
    document.removeEventListener('mozfullscreenchange', this.fullscreenChange, false);
    document.removeEventListener('webkitfullscreenchange', this.fullscreenChange, false);
    document.addEventListener("mousemove", function (e) {
    movementX = e.clientX;
    movementY = e.clientY;
    mouse.rx = movementX;
    mouse.ry = movementY;    
    //console.log("X=" + movementX, "Y=" + movementY);
    if (anl.rMoveLogic != undefined) {
        anl.rMoveLogic(movementX,movementY);
    }
} , false);
    document.addEventListener("mousemove", function(e) {
    movementX = e.movementX       ||
                  e.mozMovementX    ||
                  e.webkitMovementX ||
                  0,
    movementY = e.movementY       ||
                  e.mozMovementY    ||
                  e.webkitMovementY ||
                  0;
    // mouse.x = movementX;
    // mouse.y = movementY;
    //console.log("X=" + movementX, "Y=" + movementY);
    if (anl.moveLogic != undefined) {
        anl.moveLogic(movementX,movementY);
    }
    } , false);
    document.addEventListener("mousedown", function(e) {
    x = e.clientX;
    y = e.clientY;
    mouse.clicked = true;
    switch (e.button) {
        case 0:
            if (anl.downLogicL != undefined)
            anl.downLogicL(x,y);
            break;
        case 1:
            if (anl.downLogicM != undefined)
            anl.downLogicM(x,y);
            break;
        case 2:
            if (anl.downLogicR != undefined)
            anl.downLogicR(x,y);
            break;
        default:
            break;
    }
    } , false);
    document.addEventListener("mouseup", function (e) {
    movementX = e.clientX;
    movementY = e.clientY;
    mouse.rx = movementX;
    mouse.ry = movementY;
    //console.log("X=" + movementX, "Y=" + movementY);
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
    mouseLock.requestPointerLock = mouseLock.requestPointerLock    ||
                              mouseLock.mozRequestPointerLock ||
                              mouseLock.webkitRequestPointerLock;
    mouseLock.requestPointerLock();
  }
}

this.outControl = function () {
  document.exitPointerLock();
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