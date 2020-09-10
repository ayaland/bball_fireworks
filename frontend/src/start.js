// import BballFireworks from './js/bball_fireworks';
const BballFireworks = require('./js/bball_fireworks');
// import utils from './js/utils';
// import saveName from './js/utils';
const saveName = require('./js/utils')

export const getCanvas = () => {
    console.log('start.js')
    const canvas = document.querySelector('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight * 3 / 4;
    // ctx.globalCompositeOperation = 'destination-out';
    // ctx.fillStyle = '/.';
    // ctx.fillRect(0, 0, canvas.width, canvas.height)
    // ctx.globalCompositeOperation = 'lighter';
    return { canvas, ctx }
}

window.addEventListener('DOMContentLoaded', () => {
    console.log('test')
    const show = new BballFireworks(getCanvas());
    const addFireworkButton = document.querySelector('#addFirework');
    // const addNameField = document.queryCommandValue('#saveName');
    const addNameField = saveName();
    console.log(addNameField);
    debugger;
    // console.log(show);
    // console.log(addFireworkButton);

    addNameField.addEventListener('click', (e) => {
        utils.saveName();
        console.log('inside start saveName')
    })

    addFireworkButton.addEventListener('click', (e) => {
        show.clearCanvas();
        show.draw();
        show.updateObjects();
        show.launchFirework();
    });
})

window.requestAnimFrame = (() => {
    return window.requestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

// module.exports({ getCanvas : getCanvas })
// window.onload = show.loop;
