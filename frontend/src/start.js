import BballFireworks from './js/bball_fireworks';
const axios = require('axios')
const utils = require('./js/utils')

export const getCanvas = () => {
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
    // show should be instantiated in .then((data))
    const show = new BballFireworks(getCanvas());
    const addFireworkButton = document.getElementById('addFirework');
    let addNameField = document.getElementById('submitButton');

    addNameField.addEventListener('click', (e) => {
        let pName = utils.saveName();
        axios.get('/career', {
             params: { 
                 name: pName 
            } 
        })
        .then(() => {

            // start bballfireworks shows
            // setInterval(() => {
            //     show.clearCanvas();
            //     show.draw();
            //     show.updateObjects();
            //     show.launchFirework();
            // for (let i = 0; i < data.length; i++) {
            //     }, 20);
            }
        );
    });

    addFireworkButton.addEventListener('click', (e) => {
        // click by click test
            // show.clearCanvas();
            // show.draw();
            // show.updateObjects();
            // show.launchFirework();
            
        // setInterval(() => {
        //     show.clearCanvas();
        //     show.draw();
        //     show.updateObjects();
        //     show.launchFirework();
        // }, 20);

        // window.requestAnimationFrame(show.loop(4000))
        show.animate4Seconds();
    });
})

// will need .then or async syntax to wait for data to return

window.requestAnimFrame = (() => {
    return window.requestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

// module.exports({ getCanvas : getCanvas })
// window.onload = show.loop;
