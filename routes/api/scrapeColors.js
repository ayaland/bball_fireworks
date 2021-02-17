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

const reghex = new RegExp(/#[0-9A-F]{6}/i)

const scrapeColors = async (colorsURL, page, league, teams) => {

    
    try {
    // create Object of full team names as key and values to be colors scraped
        let teamColors = new Object();
        for (let team of teams) {
            if (league == 'NBA') {
                let teamName = NBA[team];
                teamColors[teamName] = [];
            } else if (league == 'WNBA') {
                let teamName = WNBA[team];
                teamColors[teamName] = [];
            }
            // console.log(teamColors)
        };
        
        // loop over team names (keys) in the Object
        // put them in input field
        // scrape hex codes for colors
        for (let [teamName, hexCodes] of Object.entries(teamColors)) {
            // console.log(`${teamName}: ${hexCodes}`);
            await page.goto(colorsURL);
            await page.evaluate(
                (teamName) => {
                    window.teamName = teamName
                },
                teamName
            );

            await page.waitForSelector('.search-form-input');
            await page.$eval('input[class ="search-form-input"]',
                (search) => (search.value = window.teamName));
            // page.click does not work after Puppeteer 1.6
            // await page.click('input[type="submit"]');
            await page.evaluate(() => document.querySelector('input.search-form-submit').click())

            await page.waitForSelector('div.colorblock');

            const pageData = await page.$$eval('div.colorblock', texts => {
                return Array.from(texts, text => {
                    const colorData = text.innerText;
                    return colorData;
                })
            });

            for (let arr of pageData) {
                // console.log(arr);
                let hex = reghex.exec(arr)[0];
                // console.log(hex);
                teamColors[teamName].push(hex);
                // console.log(teamColors)
            }

        return(teamColors)
        
        }
    }
    
    catch {
        console.log("Houston Rockets, we've had a problem")
    }
};

module.exports = scrapeColors;





// the HEX colors webpage has two search forms, this one seems unnecessary
// await page.waitForSelector('#searchform-2');
// await page.$eval('input[id ="searchform-2"]', 
//     (search) => (search.value = window.teamName));

// await page.waitForSelector('.search-form-input');
//     console.log('after selector')
//     await page.$eval('input[class ="search-form-input"]', 
//         (search) => (search.value = window.teamName));
//         console.log('after eval team name')
//     //  page.click does not work after Puppeteer 1.6
//     // await page.click('input[type="submit"]');
//     await page.evaluate(() => document.querySelector('input.search-form-submit').click())

//     await page.waitForSelector('div.colorblock');

// const pageData = await page.$$eval('div.colorblock', texts => {
//     return Array.from(texts, text => {
//         const colorData = text.innerText;
//         // const colorData = text.innerText.split('\n');
//         return colorData;