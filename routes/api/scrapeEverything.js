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

    const rowsandTeams = scrapeStats(pageURL, page, pName);
    
    rowsandTeams.then(console.log(rowsandTeams))
};

module.exports = scrapeEverything;