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
    const show = new BballFireworks(getCanvas(), [40, 50, 20, 70]);
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
            show.animateSeason()
            }
        );
    });

    addFireworkButton.addEventListener('click', (e) => {
        // click by click test
            // show.clearCanvas();
            // show.draw();
            // show.updateObjects();
            // show.launchFirework();

        // window.requestAnimationFrame(show.loop(4000))

        let gamesPlayed = [80, 50, 20, 70]
        // for (let i = 0; i <= gamesPlayed.length - 1; i++) {
            // show.animateSeason(gamesPlayed)
            // show.helper(gamesPlayed)
            show.animateSeason()
        // }
    });
})

// will need .then or async syntax to wait for data to return

window.requestAnimFrame = (() => {
    return window.requestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();
