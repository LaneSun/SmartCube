function doRender() {
    if (1 == camera instanceof THREE.Camera){
        renderer.render(scene, camera);
        stats.update();
    }
    requestAnimationFrame(doRender);
}