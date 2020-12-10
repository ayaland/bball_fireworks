const express = require(`express`);
const app = express();
const mongoose = require(`mongoose`);
const bodyParser = require('body-parser');
const db = require(`./config/keys`).mongoURI;
const path = require(`path`);
const port = process.env.PORT || 5000;
const scrapeData = require('./routes/api/scrapeData')

const pageURL = 'http://www.basketball-reference.com';

// mongoose.connect returns a promise
mongoose
    .connect(db, 
        { useNewUrlParser: true, useUnifiedTopology: true })
    // .then(() => console.log("connected to mongo"))
    .catch((err) => console.log(err));

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "frontend", "src")));

app.get('/career', async (req, res) => {
    // console.log("inside app.js app.get")
    // console.log(req.query.name)
    let data = await scrapeData(pageURL, req.query.name);
    res.json(data)
    // format data and send JSON to frontend, res.json

    // Career.find()
    //     .then(careerStats => res.json(careerStats))
    //     .catch(err => res.status(404).json({ nocareerfound: "No stats found" }))
});

// app.use('/career', stats);

app.listen(port, () => {
    console.log(`Listening is working on ${port}`)
});