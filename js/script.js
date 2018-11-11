let satellite,
    satelliteRadius,
    axisRadius,
    isGoRight = true,
    intervalID,
    currentX,
    currentY;

document.addEventListener("DOMContentLoaded", function (event) {
    createUI();

    currentX = 0;
    currentY = axisRadius;
    setCoords(0, axisRadius);//set in start position
});

function createUI() {
    const axis = document.createElement('div');
    satellite = document.createElement('div');
    const startButton = document.createElement('button');
    const stopButton = document.createElement('button');

    startButton.innerHTML = 'START';
    stopButton.innerHTML = 'STOP';

    axis.className = 'axis';
    satellite.className = 'satellite';
    startButton.className = 'btn';
    stopButton.className = 'btn';

    axis.appendChild(satellite);
    document.body.appendChild(axis);
    document.body.appendChild(startButton);
    document.body.appendChild(stopButton);

    startButton.addEventListener('click', onButtonClick);
    stopButton.addEventListener('click', onButtonClick);

    axisRadius = axis.offsetWidth / 2;
    satelliteRadius = satellite.offsetWidth / 2;
}

function setCoords(x, y) {
    satellite.style.left = x - satelliteRadius + 'px';
    satellite.style.top = y - satelliteRadius + 'px';
}

function onButtonClick(event) {
    if (event.currentTarget.outerText === 'START') {
        intervalID = setInterval(() => {
            const [x, y] = calculateCoords();
            console.log('x= ', x, ' y= ', y);
            setCoords(x, y);
        }, 40);
    } else {
        clearInterval(intervalID);
    }
}

function calculateCoords(step = 0.1) {
    if (isGoRight) {
        if (currentX + step <= 2 * axisRadius) {
            currentX += step;
            currentY = getYCoord(currentX, isGoRight);
        } else {
            isGoRight = false;
        }
    } else {
        if (currentX - step >= 0) {
            currentX -= step;
            currentY = getYCoord(currentX, isGoRight);
        } else {
            isGoRight = true;
        }
    }

    return [currentX, currentY];
}

function getYCoord(x, isGoRight) {
    const R = axisRadius;
    const y1 = R + Math.sqrt(8 * R * x - 4 * x * x) / 2;
    const y2 = R - Math.sqrt(8 * R * x - 4 * x * x) / 2;

    return isGoRight ? y2 : y1;
}