const puppeteer = require('puppeteer');
const scrapeStats = require('./scrapeStats');
const scrapeColors = require('./scrapeColors');

const scrapeEverything = async (pageURL, colorsURL, pName) => {

    const browser = await puppeteer.launch({
        headless: false,
        slowMo: 50
    });

    const page = await browser.newPage();
    // const page = await browser.goto(pageURL);
    // any promise that needs to be resolved uses 'await'
    const rowsandTeams = await scrapeStats(pageURL, page, pName);
    const teams = rowsandTeams[1]; // set of all team acronyms
    // console.log(teams)
    const seasons = rowsandTeams[0]; // array of (W)NBA season stats
    // console.log(teams);
    let league = seasons[0][2];
    // console.log(league);
    // return rowsandTeams;

    const teamColors = await scrapeColors(colorsURL, page, league, teams);
};

module.exports = scrapeEverything;