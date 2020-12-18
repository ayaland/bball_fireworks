const express = require(`express`);
const app = express();
const mongoose = require(`mongoose`);
const bodyParser = require('body-parser');
const db = require(`./config/keys`).mongoURI;
const path = require(`path`);
const port = process.env.PORT || 5000;
const scrapeStats = require('./routes/api/scrapeStats');
const scrapeColors = require('./routes/api/scrapeColors');
const scrapeEverything = require('./routes/api/scrapeEverything');

const pageURL = 'http://www.basketball-reference.com';
const colorsURL = 'https://teamcolorcodes.com/';

// mongoose.connect returns a promise
mongoose
    .connect(db, 
        { useNewUrlParser: true, useUnifiedTopology: true })
    // .then(() => console.log("connected to mongo"))
    .catch((err) => console.log(err));

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "frontend", "src")));

app.get('/career', async (req, res) => {
    // let data = await scrapeStats(pageURL, req.query.name);
    let data = await scrapeEverything(pageURL, colorsURL, req.query.name);

    // stats is an array of [[career stats], {teams played for}];
    // let stats = data[0];
    // let teams = data[1];
    // res.json(data)
    // format data and send JSON to frontend, res.json

    // Career.find()
    //     .then(careerStats => res.json(careerStats))
    //     .catch(err => res.status(404).json({ nocareerfound: "No stats found" }))
});

// app.use('/career', stats);

app.listen(port, () => {
    console.log(`Listening is working on ${port}`)
});