let balloonStartButton = document.getElementById('start-button');
let balloonInflateButton = document.getElementById('inflate-button');

// #region Game Logic and Data

let balloonHeight = 40;
let balloonWidth = 40;
let balloonInflation = 15;
let maxBalloonInflation = 150;
let currentBalloonPopCount = 0;
let highestBalloonPopCount = 0;
let balloonClickCount = 0;
let balloonPopGameLength = 10000;
let balloonPopClockId = 0;
let balloonTimeRemaining = 0;
let currentBalloonPopPlayer = {};

const startBalloonPop = () => {

    balloonStartButton.setAttribute('disabled', 'true');
    balloonInflateButton.removeAttribute('disabled');
    startBalloonPopClock();
    setTimeout(stopBalloonPop, balloonPopGameLength)
}

const startBalloonPopClock = () => {
    balloonTimeRemaining = balloonPopGameLength;
    drawBalloonPopClock();
    balloonPopClockId = setInterval(drawBalloonPopClock, 1000)
}

const stopBalloonPopClock = () => {
    clearInterval(balloonPopClockId);
}

const drawBalloonPopClock = () => {
    let balloonPopCountdownElem = document.getElementById('balloon-pop-countdown')
    balloonPopCountdownElem.innerText = (balloonTimeRemaining / 1000).toString();
    balloonTimeRemaining -= 1000;
}

const inflateBalloon = () => {
    balloonClickCount++;
    balloonHeight += balloonInflation;
    balloonWidth += balloonInflation;

    if (balloonHeight >= maxBalloonInflation) {
        currentBalloonPopCount++;
        balloonHeight = 0;
        balloonWidth = 0;
    }
    drawFunction();
}

const drawFunction = () => {
    let balloonElem = document.getElementById('balloon');
    let clickCountElem = document.getElementById('click-balloon-count');
    let balloonPopCountElem = document.getElementById('balloon-pop-count')
    let highestBalloonPopCountElem = document.getElementById('highest-balloon-pop-count')

    balloonElem.style.width = balloonHeight + 'px';
    balloonElem.style.height = balloonWidth + 'px';
    clickCountElem.innerText = balloonClickCount.toString();
    balloonPopCountElem.innerText = currentBalloonPopCount.toString();
    highestBalloonPopCountElem.innerText = currentBalloonPopPlayer.popTopScore.toString()
}

const stopBalloonPop = () => {
    balloonStartButton.removeAttribute('disabled');
    balloonInflateButton.setAttribute('disabled', 'true');

    balloonClickCount = 0;
    balloonHeight = 40;
    balloonWidth = 40;

    if (currentBalloonPopCount > currentBalloonPopPlayer.popTopScore) {
        currentBalloonPopPlayer.popTopScore = currentBalloonPopCount;
        saveBalloonPopPlayers();
    }

    currentBalloonPopCount = 0;

    stopBalloonPopClock();
    drawFunction()
}

// #endregion

let balloonPopPlayers = []
loadBalloonPopPlayers();

const setBalloonPopPlayer = (event) => {
    event.preventDefault();
    let form = event.target;

    let balloonPopPlayer = form.playerName.value;

    currentBalloonPopPlayer = balloonPopPlayers.find(player => player.name == balloonPopPlayer)

    if (!currentBalloonPopPlayer) {
        currentBalloonPopPlayer = { name: balloonPopPlayer, popTopScore: 0 }
        balloonPopPlayers.push(currentBalloonPopPlayer)
        saveBalloonPopPlayers();
    }
    form.reset();
    document.getElementById('balloonPopGame').classList.remove('hidden')
    form.classList.add('hidden');
    // Keeps the local storage top score on the page
    drawFunction();
}

const changeBalloonPopPlayer = () => {
    document.getElementById('balloonPopPlayerForm').classList.remove('hidden');
    document.getElementById('balloonPopGame').classList.add('hidden');
}

const saveBalloonPopPlayers = () => {
    window.localStorage.setItem("balloonPopPlayers", JSON.stringify(balloonPopPlayers))
}

function loadBalloonPopPlayers() {
    // Step into local storage, look for players key, convert value of key back into an object. Use JSON.parse to do that
    let balloonPopPlayersData = JSON.parse(window.localStorage.getItem("balloonPopPlayers"));
    if (balloonPopPlayersData) {
        balloonPopPlayers = balloonPopPlayersData;
    }
}