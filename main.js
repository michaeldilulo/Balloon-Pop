let balloonStartButton = document.getElementById('start-button');
let balloonInflateButton = document.getElementById('inflate-button');

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
    highestBalloonPopCountElem.innerText = highestBalloonPopCount.toString()
}

const stopBalloonPop = () => {
    balloonStartButton.removeAttribute('disabled');
    balloonInflateButton.setAttribute('disabled', 'true');

    balloonClickCount = 0;
    balloonHeight = 40;
    balloonWidth = 40;

    if (currentBalloonPopCount > highestBalloonPopCount) {
        highestBalloonPopCount = currentBalloonPopCount;
    }

    currentBalloonPopCount = 0;

    stopBalloonPopClock();
    drawFunction()
}