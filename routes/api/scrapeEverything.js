const puppeteer = require('puppeteer');
const scrapeStats = require('./scrapeStats');
const scrapeColors = require('./scrapeColors');

const scrapeEverything = async (pageURL, colorsURL, pName) => {
    const browser = await puppeteer.launch({
    headless: false,
    slowMo: 50
    });

    try {
        // any promise that needs to be resolved uses 'await'
        const page = await browser.newPage();

        // 1) scrape basketball-reference
        const rowsandTeams = await scrapeStats(pageURL, page, pName);
        console.log(rowsandTeams)
        // seasons format is [
        //                    [season, age, team, league, etc.], 
        //                    [season, age, team, league, etc.]
        //                   ]
        const seasons = rowsandTeams[0]; // array of (W)NBA season stats
        const teams = rowsandTeams[1]; // set of all team acronyms
        const league = seasons[0][3];
        console.log(league)
        
        const pageTwo = await browser.newPage();
        
        // 2) scrape teamcolorcodes.com
        // teamColors format is { 
            //                    Team1: [team1's, hex, color, codes],
            //                    Team2: [team2's, hex, color, codes]
            //                   }    
        const teamColors = await scrapeColors(colorsURL, pageTwo, league, teams);
        // console.log('scrapeEverything')
        // console.log(teamColors)
        return { seasons, teamColors }
    }

    catch(error) {
        console.log(error)
    }

    finally {
        // console.log('would close now')
        browser.close()
    }
};

module.exports = scrapeEverything;