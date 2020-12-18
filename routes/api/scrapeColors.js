// const puppeteer = require('puppeteer');

const NBA_TEAMS = {
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

const WNBA_TEAMS = {
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

const scrapeColors = async (pageURL, teams) => {
    // const browser = await puppeteer.launch({
    //     headless: false,
    //     slowMo: 100
    // });

    // const page = await browser.newPage();

    try {
        await page.goto(pageURL);
        console.log(teams);
    }

    catch {
        console.log('problem')
    }
};

// // console.log(rows);
// // await browser.close();
// const colors = []
// for (let season of rows) {
//     console.log(season[1]);
// }
// return rows;

module.exports = scrapeColors;