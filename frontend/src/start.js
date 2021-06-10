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
        .then((data) => {
            // console.log('start.js')
            const body = data.data;
            // console.log(body)

            let seasons = body.seasons;
            let teamColors = body.teamColors;
            // console.log(seasons)
            // console.log(teamColors)

            let stats = [];
            // construct the stats necessary to animate each season
            for (let i = 0; i < seasons.length; i++) {
                let season = []
                let team = seasons[i][1];
                let gamesPlayed = seasons[i][4];
                let fieldGoals = seasons[i][7];

                season.push(team)
                season.push(parseInt(gamesPlayed))
                season.push(parseInt(fieldGoals))
                // console.log(season)
                stats.push(season)
                // console.log(stats)
            }
            // start bballfireworks show
            show.animateSeason(stats, teamColors)
        });
    });

    addFireworkButton.addEventListener('click', (e) => {
        // click by click test
            // show.clearCanvas();
            // show.draw();
            // show.updateObjects();
            // show.launchFirework();

            show.animateSeason(stats, teamColors)
    });
})

// will need .then or async syntax to wait for data to return

window.requestAnimFrame = (() => {
    return window.requestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();
