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
    const teams = rowsandTeams[1];
    const seasons = rowsandTeams[0];
    // console.log(rowsandTeams);
    // return rowsandTeams;
};

module.exports = scrapeEverything;