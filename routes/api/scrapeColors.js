// const puppeteer = require('puppeteer');

const NBA = {
    'ATL': 'Atlanta Hawks',
    'BOS': 'Boston Celtics',
    'BRK': 'Brooklyn Nets',
    'CHO': 'Charlotte Hornets',
    'CHI': 'Chicago Bulls',
    'CLE': 'Cleveland Cavaliers',
    'DAL': 'Dallas Mavericks',
    'DEN': 'Denver Nuggets',
    'DET': 'Detroit Pistons',
    'GSW': 'Golden State Warriors',
    'HOU': 'Houston Rockets',
    'IND': 'Indiana Pacers',
    'LAC': 'Los Angeles Clippers',
    'LAL': 'Los Angeles Lakers',
    'MEM': 'Memphis Grizzlies',
    'MIA': 'Miami Heat',
    'MIL': 'Milwaukee Bucks',
    'MIN': 'Minnesota Timberwolves',
    'NOP': 'New Orleans Pelicans',
    'NYK': 'New York Knicks',
    'OKC': 'Oklahoma City Thunder',
    'ORL': 'Orlando Magic',
    'PHI': 'Philadelphia 76ers',
    'PHX': 'Phoenix Suns',
    'POR': 'Portland Trail Blazers',
    'SAC': 'Sacramento Kings',
    'SAS': 'San Antonio Spurs',
    'SEA': 'Seattle Supersonics',
    'TOT': 'Toronto Raptors',
    'UTA': 'Utah Jazz',
    'WAS': 'Washington Wizards',
    'defunct teams': 'charlotte bobcats, N.O. Jazz, SD clippers'
}

const WNBA = {
    'ATL': 'Atlanta Dream',
    'CHI': 'Chicago Sky',
    'CON': 'Connecticut Sun',
    'DAL': 'Dallas Wings',
    'IND': 'Indiana Fever',
    'LAS': 'Los Angeles Sparks',
    'LAV': 'Las Vegas Aces',
    'MIN': 'Minnesota Lynx',
    'NYL': 'New York Liberty',
    'PHX': 'Phoenix Mercury',
    'SEA': 'Seattle Storm',
    'WAS': 'Washington Mystics',
    'defunct teams': 'Tulsa Shock, Sacramento Monarchs, San Antonio Stars'
}

const scrapeColors = async (pageURL, page, league, teams) => {

    // const page = await browser.newPage();

    // try {
        await page.goto(pageURL);
        // await page.waitForSelector('input[id ="searchform-2"]');
        // await page.waitForSelector('form');
        // await page.waitForSelector('div.site-inner');

        let teamColors = {}
        for (let team of teams) {
            // console.log(league)
            if (league == 'NBA') {
                // console.log(NBA[team]);
                let teamName = NBA[team];
                // console.log(teamName)
                // await page.waitForSelector('input');
                await page.evaluate(
                    (teamName) => {
                        window.teamName = teamName
                    },
                    teamName
                );

                // await page.$eval('input[name = "s"]', (s) => (s.value = window.teamName));
                // console.log(window.teamName);
                // await page.waitForSelector('input[type="submit"]', { visible: true })
                // await page.click('input[id ="searchform-2"]')
                // await page.evaluate(() => document.querySelector('input.search-form-2').click())
                await page.$eval('input[id ="searchform-2"]', (search) => (search.value = window.teamName));
                // console.log('after first input')
                await page.evaluate(() => document.querySelector('input.search-form-input').click())
                // await page.click('input[class ="search-form-input"]')
                await page.$eval('input[class ="search-form-input"]', (search) => (search.value = window.teamName));
                // teamColors.add()
                // console.log('after $eval')
                // console.log('after second input')

                // await page.click('input[type="submit"]');
                //  page.click does not work after Puppeteer 1.6
                await page.evaluate(() => document.querySelector('input.search-form-submit').click())
                // await page.click('[class="search-form-submit"]');
                // await page.click('input[class="search-form-submit"]');
                // await page.press('Enter')
                // await page.click('submit')

                // console.log('after page click')

            } else if (league == 'WNBA') {
                console.log('in WNBA')
                console.log(team)
            }
        }
    // }

    // catch {
    //     console.log('Houston Rockets, we have a problem')
    // }
};

// // console.log(rows);
// // await browser.close();
// const colors = []
// for (let season of rows) {
//     console.log(season[1]);
// }
// return rows;

module.exports = scrapeColors;