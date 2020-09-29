let balloonStartButton = document.getElementById('start-button');
let balloonInflateButton = document.getElementById('inflate-button');

let balloonHeight = 40;
let balloonWidth = 40;
let balloonInflation = 15;
let maxBalloonInflation = 150;
let balloonPopCount = 0;
let balloonClickCount = 0;

const startBalloonPop = () => {

    balloonStartButton.setAttribute('disabled', 'true');
    balloonInflateButton.removeAttribute('disabled');

    setTimeout(() => {
        balloonStartButton.removeAttribute('disabled');
        balloonInflateButton.setAttribute('disabled', 'true');
    }, 10000)
}

const inflateBalloon = () => {
    balloonClickCount++;
    balloonHeight += balloonInflation;
    balloonWidth += balloonInflation;

    let balloonElem = document.getElementById('balloon');
    let clickCountElem = document.getElementById('click-balloon-count');
    let balloonPopElem = document.getElementById('balloon-pop-count');

    balloonElem.style.width = balloonHeight + 'px';
    balloonElem.style.height = balloonWidth + 'px';
    clickCountElem.innerText = balloonClickCount.toString();
    balloonPopElem.innerText = balloonPopCount.toString();

    if (balloonHeight >= maxBalloonInflation) {
        balloonPopCount++;
        balloonHeight = 0;
        balloonWidth = 0;
    }
}