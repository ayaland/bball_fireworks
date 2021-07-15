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
    ctx.globalCompositeOperation = 'lighter';
    return { canvas, ctx }
}

window.addEventListener('DOMContentLoaded', () => {
    const show = new BballFireworks(getCanvas());
    const addFireworkButton = document.getElementById('addFirework');
    let addName = document.getElementById('form');
    let addNameButton = document.getElementById('submitButton');

    // addNameButton.addEventListener('click', (e) => {

    
    addName.addEventListener('submit', (e) => {
        e.preventDefault();
        let pName = utils.saveName();
        console.log('inside addEventListener')
        console.log(pName)
        axios.get('/career', {
            params: { 
                name: pName 
            } 
        })
        .then((data) => {
            const body = data.data;
            console.log(body)
            let seasons = body.seasons;
            let teamColors = body.teamColors;
            
            // construct the stats necessary to animate each season
            let stats = [];
            
            for (let i = 0; i < seasons.length; i++) {
                // document.getElementById("season").innerHTML = seasons[i][0];
                let season = []
                let teamAcronym = seasons[i][2]
                if (teamColors[teamAcronym]) {
                    // in the future, also scrape table head and get the indices by the stat abbrev., ie. AST
                    // this will be better than changing these int all the time
                    let year = seasons[i][0];
                    let team = seasons[i][2];
                    let gamesPlayed = seasons[i][5];
                    let fieldGoals = seasons[i][8];
                    
                    season.push(year)
                    season.push(team)
                    season.push(parseInt(gamesPlayed))
                    season.push(parseInt(fieldGoals))
                    // console.log(season)
                    stats.push(season)
                    // console.log(stats)
                    
                } else {
                    continue;
                }
            }
            // start bballfireworks show
            
            show.animateSeason(stats, teamColors)
            document.getElementById("displayName").innerHTML = pName;
            // document.getElementById("year").innerHTML = stats[0][0];
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

window.requestAnimFrame = (() => {
    return window.requestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();
