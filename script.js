let startTime, updatedTime, difference, tInterval, running = false;
let lapCounter = 0;
const startPauseBtn = document.getElementById('startPause');
const resetBtn = document.getElementById('reset');
const lapBtn = document.getElementById('lap');
const display = document.getElementById('display');
const laps = document.getElementById('laps');

function startPause() {
    if (!running) {
        startTime = new Date().getTime() - difference;
        tInterval = setInterval(getShowTime, 1000);
        startPauseBtn.innerText = 'Pause';
        running = true;
    } else {
        clearInterval(tInterval);
        difference = new Date().getTime() - startTime;
        startPauseBtn.innerText = 'Démarrer';
        running = false;
    }
}

function reset() {
    clearInterval(tInterval);
    startPauseBtn.innerText = 'Démarrer';
    running = false;
    difference = 0;
    display.innerText = '00:00:00';
    laps.innerHTML = '';
    lapCounter = 0;
}

function lap() {
    if (running) {
        const lapTime = display.innerText;
        lapCounter++;
        const lapDiv = document.createElement('div');
        lapDiv.innerText = `Tour ${lapCounter}: ${lapTime}`;
        laps.appendChild(lapDiv);
    }
}

function getShowTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    display.innerText = (hours < 10 ? '0' : '') + hours + ':' + (minutes < 10 ? '0' : '') + minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
}

startPauseBtn.addEventListener('click', startPause);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', lap);
