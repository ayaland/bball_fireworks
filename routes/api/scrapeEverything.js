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
        // const page = await browser.goto(pageURL);
        const page = await browser.newPage();

        // scrape basketball-reference
        const rowsandTeams = await scrapeStats(pageURL, page, pName);
        // seasons format is [[age, team, league, etc.], [age, team, league, etc.]]
        const seasons = rowsandTeams[0]; // array of (W)NBA season stats
        // console.log(seasons)

        // scrape teamcolorcodes.com
        const teams = rowsandTeams[1]; // set of all team acronyms
        const league = seasons[0][2];
        // console.log('bballreference done')
        const teamColors = await scrapeColors(colorsURL, page, league, teams);
        // console.log('teamColors done')
        // return rowsandTeams;
        // teamColors format is { Team1: [team1's, hex, color, codes],
        //                        Team2: [team2's, hex, color, codes]
        //                      }
        return { seasons, teamColors }
    }

    catch(error) {
        // console.log('scrapeEverything')
        console.log(error)
    }

    finally {
        // console.log('finally')
        browser.close()
    }

};

module.exports = scrapeEverything;