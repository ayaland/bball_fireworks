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
        // e.preventDefault();
        faqModal.style.display = "block";
        openModal.style.display = "none";
    })

    let closeModal = document.getElementById("closeModal");
    closeModal.addEventListener('click', (e) => {
        // e.preventDefault();
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
            let seasons = body.seasons;
            let headings = body.headings;
            let league = body.league;
            let teamColors = body.teamColors;
            
            // construct the stats necessary to animate each season
            let stats = [];

            if (league == 'WNBA') {
                for (let i = 0; i < seasons.length; i++) {
                    let seasonArray = []
                    let yearIndex = headings.indexOf('Year');
                    let teamIndex = headings.indexOf('Team');
                    let gamesplayedIndex = headings.indexOf('G')
                    let fieldgoalsIndex = headings.indexOf('FG');
                    
                    let year = seasons[i][yearIndex];
                    let team = seasons[i][teamIndex];
                    let gamesPlayed = seasons[i][gamesplayedIndex];
                    let fieldGoals = seasons[i][fieldgoalsIndex];

                    if (teamColors[team]) {
                        seasonArray.push(year);
                        seasonArray.push(team);
                        seasonArray.push(parseInt(gamesPlayed));
                        seasonArray.push(parseInt(fieldGoals));
                        stats.push(seasonArray);
                    } else {
                        continue;
                    }
                }
                
            } else if (league == 'NBA') {
                for (let i = 0; i < seasons.length; i++) {
                    let seasonArray = [];
                    let yearIndex = headings.indexOf('Season');
                    let teamIndex = headings.indexOf('Tm');
                    let gamesplayedIndex = headings.indexOf('G');
                    let fieldgoalsIndex = headings.indexOf('FG');
                    
                    let year = seasons[i][yearIndex];
                    let team = seasons[i][teamIndex];
                    let gamesPlayed = seasons[i][gamesplayedIndex];
                    let fieldGoals = seasons[i][fieldgoalsIndex];

                    if (teamColors[team]) {
                        seasonArray.push(year);
                        seasonArray.push(team);
                        seasonArray.push(parseInt(gamesPlayed));
                        seasonArray.push(parseInt(fieldGoals));
                        stats.push(seasonArray);
                    } else {
                        continue;
                    }
                }

            }
            
            // for (let i = 0; i < seasons.length; i++) {
            //     let season = []
            //     let teamAcronym = seasons[i][2]
            //     if (teamColors[teamAcronym]) {
            //         // in the future, also scrape table head and get the indices by the stat abbrev., ie. AST
            //         // this will be better than changing these int all the time
            //         let year = seasons[i][0];
            //         let team = seasons[i][2];
            //         let gamesPlayed = seasons[i][5];
            //         let fieldGoals = seasons[i][8];
                    
            //         seasonArray.push(year)
            //         seasonArray.push(team)
            //         seasonArray.push(parseInt(gamesPlayed))
            //         season.push(parseInt(fieldGoals))
            //         stats.push(season)
                    
            //     } else {
            //         continue;
            //     }
            // }

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
