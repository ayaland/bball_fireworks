const puppeteer = require('puppeteer');
const scrapeStats = require('./scrapeStats');
const scrapeColors = require('./scrapeColors');

const scrapeEverything = async (pageURL, colorsURL, pName) => {
    const browser = await puppeteer.launch({
        args: ['--no-sandbox'],
        headless: false,
        slowMo: 50
    });

    try {
        // any promise that needs to be resolved uses 'await'
        const page = await browser.newPage();


        // 1) scrape basketball-reference.com
        const statsObject = await scrapeStats(pageURL, page, pName);
        const teams = statsObject['teams']; // set of all team acronyms
        const league = statsObject['league']
        
        const pageTwo = await browser.newPage();
        
        // 2) scrape teamcolorcodes.com
        // teamColors format is { 
            //                    Team1: [team1's, hex, color, codes],
            //                    Team2: [team2's, hex, color, codes]
            //                   }    
        const teamColors = await scrapeColors(colorsURL, pageTwo, league, teams);
        // console.log(statsObject['seasons'])
        return { statsObject, teamColors }
    }

    catch(error) {
        console.log(error)
    }

    finally {
        browser.close()
    }
};

module.exports = scrapeEverything;