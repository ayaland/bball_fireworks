const puppeteer = require('puppeteer');
const scrapeStats = require('./scrapeStats');
const scrapeColors = require('./scrapeColors');

const scrapeEverything = async (pageURL, colorsURL, pName) => {
    // document.getElementById("appMessages").innerHTML = 'Opening headless browser...';
    const browser = await puppeteer.launch({
        args: ['--no-sandbox'],
        headless: true,
        slowMo: 50
    });

    try {
        // any promise that needs to be resolved uses 'await'
        const page = await browser.newPage();


        // 1) scrape basketball-reference
        const rowsandTeams = await scrapeStats(pageURL, page, pName);

        // seasons format is [
        //                    [season, age, team, league, etc.], 
        //                    [season, age, team, league, etc.]
        //                   ]
        const seasons = rowsandTeams[0]; // array of (W)NBA season stats
        const teams = rowsandTeams[1]; // set of all team acronyms
        const league = seasons[0][3];
        
        const pageTwo = await browser.newPage();
        
        // 2) scrape teamcolorcodes.com
        // teamColors format is { 
            //                    Team1: [team1's, hex, color, codes],
            //                    Team2: [team2's, hex, color, codes]
            //                   }    
        const teamColors = await scrapeColors(colorsURL, pageTwo, league, teams);
        return { seasons, teamColors }
    }

    catch(error) {
        console.log(error)
    }

    finally {
        browser.close()
    }
};

module.exports = scrapeEverything;