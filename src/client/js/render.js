console.log("[Control.IO] Loaded render module.")

/**
 * runAnimation
 *
 * Starts the animation sequence. Methods within are called on each frame.
 */
function runAnimation(gameobj) {
    requestAnimationFrame(runAnimation);

    gameobj.updatePos();

    renderer.render(scene, camera);
}