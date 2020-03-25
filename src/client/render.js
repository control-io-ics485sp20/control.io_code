import { debounce } from 'throttle-debounce';
import { getCurrentState } from './state';

const canvas = document.getElementById('game-canvas');
const context = canvas.getContext('2d');
setCanvasDimensions();

function render() {
    const { me, others, bullets } = getCurrentState();
    if (!me) {
        // console.log("Could not render game!");
        return;
    }
  
    console.log("test");
    // Draw background
    renderBackground(me.x, me.y);
  
    // Draw boundaries
    context.strokeStyle = 'black';
    context.lineWidth = 1;
    context.strokeRect(canvas.width / 2 - me.x, canvas.height / 2 - me.y, MAP_SIZE, MAP_SIZE);
  
    // // Draw all bullets
    // bullets.forEach(renderBullet.bind(null, me));
  
    // // Draw all players
    // renderPlayer(me, me);
    // others.forEach(renderPlayer.bind(null, me));
}

function setCanvasDimensions() {
    // On small screens (e.g. phones), we want to "zoom out" so players can still see at least
    // 800 in-game units of width.
    const scaleRatio = Math.max(1, 800 / window.innerWidth);
    canvas.width = scaleRatio * window.innerWidth;
    canvas.height = scaleRatio * window.innerHeight;
}

// window.addEventListener('resize', debounce(40, setCanvasDimensions));

function renderBackground(x, y) {
    const backgroundX = MAP_SIZE / 2 - x + canvas.width / 2;
    const backgroundY = MAP_SIZE / 2 - y + canvas.height / 2;
    const backgroundGradient = context.createRadialGradient(
      backgroundX,
      backgroundY,
      MAP_SIZE / 10,
      backgroundX,
      backgroundY,
      MAP_SIZE / 2,
    );
    backgroundGradient.addColorStop(0, 'black');
    backgroundGradient.addColorStop(1, 'gray');
    context.fillStyle = backgroundGradient;
    context.fillRect(0, 0, canvas.width, canvas.height);
}

let renderInterval = setInterval(render, 1000 / 60);

// Replaces main menu rendering with game rendering.
export function renderGame() {
    clearInterval(renderInterval);
    renderInterval = setInterval(render, 1000 / 60);
}

// Replaces game rendering with main menu rendering.
// export function stopRendering() {
//     clearInterval(renderInterval);
//     renderInterval = setInterval(renderMainMenu, 1000 / 60);
// }

  