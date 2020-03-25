import { connect, play } from './network';
import { renderGame } from './render';
import { startCapturingInput, stopCapturingInput } from './input';
import { downloadAssets } from './assets';
import { initState } from './state';
import { setLeaderboardHidden } from './scoreboard';

import './css/main.css';

const playMenu = document.getElementById('play-menu');
const playButton = document.getElementById('play-button');
// const usernameInput = document.getElementById('username-input');
const usernameInput = "test user";

Promise.all(
    [
        connect(onGameOver),
        downloadAssets()
    ]).then(() => {
        // playMenu.classList.remove('hidden');
        // usernameInput.focus();
        // playButton.onclick = () => {
        //     // Play!
        play(usernameInput.value);
        // playMenu.classList.add('hidden');
        initState();
        startCapturingInput();
        renderGame();
        // setLeaderboardHidden(false);
    // };
    }
);

function onGameOver() {
    stopCapturingInput();
    stopRendering();
    playMenu.classList.remove('hidden');
    setLeaderboardHidden(true);
}