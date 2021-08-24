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
    'TOR': 'Toronto Raptors',
    'UTA': 'Utah Jazz',
    'WAS': 'Washington Wizards',
    'defunct teams': 'Charlotte Bobcats, New Orleans Hornets, New Orleans Jazz, San Diego Clippers'
}

const WNBA = {
    'ATL': 'Atlanta Dream',
    'CHI': 'Chicago Sky',
    'CON': 'Connecticut Sun',
    'DAL': 'Dallas Wings',
    'IND': 'Indiana Fever',
    'LAS': 'Sparks',
    'LVA': 'Aces',
    'MIN': 'Minnesota Lynx',
    'NYL': 'New York Liberty',
    'PHO': 'Phoenix Mercury',
    'SEA': 'Seattle Storm',
    'WAS': 'Washington Mystics',
    'defunct teams': 'Tulsa Shock, Sacramento Monarchs, San Antonio Stars'
}

const reghex = new RegExp(/#[0-9A-F]{6}/i);

const getKeyByValue = (object, value) => {
    return Object.keys(object).find(key => object[key] === value)
};

const scrapeColors = async (colorsURL, page, league, teams) => {
    // create Object of full team names as [key] and array of color HEX codes as [value]
    try {
        let teamColors = new Object();
        for (let team of teams) {
            if (league == 'NBA' && NBA[team]) {
                let teamName = NBA[team];
                teamColors[teamName] = [];

            } else if (league == 'WNBA' && WNBA[team]) {
                let teamName = WNBA[team];
                console.log('else if WNBA ' + teamName)
                teamColors[teamName] = [];

            } else {
                let teamName = team;
                console.log(teamName)
            }
        };
        
        // loop over team names (keys) in the Object
        // put them in input field
        // scrape hex codes for colors
        for (let [teamName, hexCodes] of Object.entries(teamColors)) {
            await page.goto(colorsURL, { waitUntil: 'networkidle2' });
            await page.waitForSelector('input.search-form-input');
            await page.evaluate(
                (teamName) => {
                    window.teamName = teamName
                },
                teamName
            );
            await page.$eval('input[class="search-form-input"]',
                (search) => (search.value = window.teamName));

            // page.click does not work after Puppeteer 1.6
            // await page.click('input[type="submit"]');
            await page.evaluate(() => document.querySelector('input.search-form-submit').click())

            await page.waitForSelector('div.colorblock');
            // if ((await page.$('div.colorblock')) == null) {
            //     console.log('team does not exist')
            //     continue;
            // } else {
            const pageData = await page.$$eval('div.colorblock', texts => {
                return Array.from(texts, text => {
                    const colorData = text.innerText;
                    return colorData;
                })
            });
            // console.log(pageData)

            for (let arr of pageData) {
                console.log(arr)
                let hex = reghex.exec(arr)[0];
                teamColors[teamName].push(hex);
            };

            for (let[teamName, hexCodes] of Object.entries(teamColors)) {
                if (league == 'NBA') {
                    let acro = getKeyByValue(NBA, teamName)
                    teamColors[acro] = hexCodes;
                } else if (league == 'WNBA') {
                    let acro = getKeyByValue(WNBA, teamName)
                    teamColors[acro] = hexCodes;
                }
            }
        } 
        console.log(teamColors)
    return(teamColors);
    }
    
    catch(error) {
        console.log("Houston Rockets, we've had a problem")
        console.log(error);
    }
};

module.exports = scrapeColors;

    // await page.waitForSelector('.et_pb_s');
    // await page.$eval('input[class="et_pb_s"]',
    //     (search) => (search.value = window.teamName)
    // );
    // await page.evaluate(
    //     () => document.querySelector('input.et_pb_searchsubmit').click()
    // );
    // // await page.evaluate(
    //     // () => document.querySelector('a.inner-text == window.teamName Team Colors').click()
    // // );
    // await page.waitForSelector('.entry-title')
    // await page.evaluate(
    //     () => document.querySelector('h2.entry-title').click()
    // );
    // const [link] = await page.$x("//a[contains(., ' Team Colors')]");
    // if (link) {
    //     await link.click();
    // }

    // await page.waitForSelector('div.et_pb_text_inner');
    // const pageData = await page.$$eval('span', texts => {
    //     console.log('inside pageData const')
    //     // elements.map(el => el.innerText)
    //     return Array.from(texts, text => {
    //         const colorData = text.innerText;
    //         return colorData
    //     })
    // }
    // );

    // const pageData = await page.$$eval('span', texts => {
    //     return Array.from(texts, text => {
    //         const colorData = text.innerText;
    //         console.log('colorData')
    //         console.log(colorData)
    //         return colorData
    //     })
    // });



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