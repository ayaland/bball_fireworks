import { modelNames } from 'mongoose';
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
    // const addFireworkButton = document.getElementById('addFirework');
    
    let faqModal = document.getElementById("faqModal");
    
    let openModal = document.getElementById("openModal");
    openModal.addEventListener('click', (e) => {
        faqModal.style.display = "block";
        openModal.style.display = "none";
    })

    let closeModal = document.getElementById("closeModal");
    closeModal.addEventListener('click', (e) => {
        faqModal.style.display = "none";
        openModal.style.display = "block";
    })

    let nameForm = document.getElementById('form');
    nameForm.addEventListener('submit', (e) => {
        e.preventDefault();

        document.getElementById('appMessages').innerHTML = 'Getting career stats and colors, please wait ...';

        let pName = utils.saveName();
        nameForm.reset();

        axios.get('/career', {
            params: { 
                name: pName 
            } 
        })
        .then((data) => {
            const body = data.data;
            let statsObject = body.statsObject;
            let teamColors = body.teamColors;

            let seasons = statsObject.seasons;
            let headings = statsObject.headings;
            let league = statsObject.league;
            
            // construct the stats necessary to animate each season
            let stats = [];
            for (let i = 0; i < seasons.length; i++) {
                let seasonArray = [];
                let team = '';
                
                // split code for WNBA and NBA tables having different headings
                if (league == 'WNBA') {
                    let yearIndex = headings.indexOf('Year');
                    let teamIndex = headings.indexOf('Team');

                    let year = seasons[i][yearIndex];
                    team = seasons[i][teamIndex];

                    seasonArray.push(year);
                    seasonArray.push(team);

                } else if (league == 'NBA') {
                    let yearIndex = headings.indexOf('Season');
                    let teamIndex = headings.indexOf('Tm');

                    let year = seasons[i][yearIndex];
                    team = seasons[i][teamIndex];

                    seasonArray.push(year);
                    seasonArray.push(team);
                }

                // these stat headings are the same for all players
                let gamesplayedIndex = headings.indexOf('G');
                let fieldgoalsIndex = headings.indexOf('FG');

                let gamesPlayed = seasons[i][gamesplayedIndex];
                let fieldGoals = seasons[i][fieldgoalsIndex];

                seasonArray.push(gamesPlayed)
                seasonArray.push(fieldGoals)

                if (teamColors[team]) {
                    console.log(seasonArray)
                    stats.push(seasonArray);
                } else {
                    continue;
                }
            }

            // start bballfireworks show
            show.animateSeason(stats, teamColors)
            document.getElementById("displayName").innerHTML = pName;
        });
    });

    // addFireworkButton.addEventListener('click', (e) => {
    //     // click by click test
    //         // show.clearCanvas();
    //         // show.draw();
    //         // show.updateObjects();
    //         // show.launchFirework();

    //         show.animateSeason(stats, teamColors)
    // });
})

window.requestAnimFrame = (() => {
    return window.requestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();
