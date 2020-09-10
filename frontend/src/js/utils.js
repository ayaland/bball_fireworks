const CANVAS_CLEANUP_ALPHA = 0.3;

function randomIntFromRange(min = 0, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function random(min, max) {
    return Math.random() * (max - min) + min;
}

function plusOrMinus(x) {
    let sign = Math.random() < 0.5 ? -1 : 1;
    return sign * x;
}

function calculateDistance(x1, x2, y1, y2) {
    let x = x1 - x2;
    let y = y1 - y2;
    return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
}

function cleanCanvas() {
    ctx.globalCompositeOperation = 'destination-out';
    ctx.fillStyle = `rgba(0, 0, 0, ${CANVAS_CLEANUP_ALPHA})`;

    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.globalCompositeOperation = 'lighter';
}

const saveName = function saveName() {
    console.log('inside utils saveName')
    let savedName = document.getElementById("pName").value;
    // return savedName;
    // puppeteer.launch()
    // console.log(savedName)
    return savedName;
}

// module.exports = randomIntFromRange;
module.exports = saveName;
// exports.random = random;
// exports.plusOrMinus = plusOrMinus;
// exports.saveName = saveName;
// exports.calculateDistance = calculateDistance;
// exports.cleanCanvas = cleanCanvas;
// module.exports = { 
//     randomIntFromRange, 
//     random, 
//     calculateDistance,
//     cleanCanvas,
//     saveName,
// }