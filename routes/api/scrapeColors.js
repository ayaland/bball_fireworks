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
    'defunct teams': 'Charlotte Bobcats, New Orleans Jazz, San Diego Clippers'
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

const scrapeColors = async (colorsURL, page, league, teams) => {

    // const page = await browser.newPage();
    await page.goto(colorsURL);

    // try {
        // create Object of full team names as key and values to be colors scraped
        let teamColors = new Object();
        for (let team of teams) {
            if (league == 'NBA') {
                let teamName = NBA[team];
                teamColors[teamName] = '';
            } else if (league == 'WNBA') {
                let teamName = WNBA[team];
                teamColors[teamName] = '';
            };
        // console.log(teamColors)

        for (let [teamName, hexCodes] of Object.entries(teamColors)) {
            console.log(`${teamName}: ${hexCodes}`);
            await page.evaluate(
                (teamName) => {
                    window.teamName = teamName
                },
                teamName
            );
            // the HEX colors webpage has two search forms, this one seems unnecessary
            // await page.waitForSelector('#searchform-2');
            // await page.$eval('input[id ="searchform-2"]', 
            //     (search) => (search.value = window.teamName));

            await page.waitForSelector('.search-form-input');
            await page.$eval('input[class ="search-form-input"]', 
                (search) => (search.value = window.teamName));
            // await page.click('input[type="submit"]');
            //  page.click does not work after Puppeteer 1.6
            await page.evaluate(() => document.querySelector('input.search-form-submit').click())
            
            await page.waitForSelector('div.colorblock');
            
            // teamColors.add()
            const hexColors = await page.$$eval('.colorblock', texts => {
                return Array.from(texts, text => {
                   const colorData = text.innerText.split('\n');
                   return colorData;
                })
            });
            console.log(hexColors)
            return(hexColors)
                    
                }
        }

                


                // const colorsC = new Array();
                // for (let color of colors) {
                //     colorsC.add(color.style)
                // }

                // await page.evaluate(() => {
                //     console.log('inside data page evaluate')
                //     const els = document.querySelectorAll('.colorblock');
                //     console.log(els)
                    // return getComputedStyle(colors);
                    // console.log(getComputedStyle(els))
                // });
                // console.log(data)

        // }
    // }

    // catch {
    //     console.log("Houston Rockets, we've had a problem")
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