const express = require(`express`);
const app = express();
const mongoose = require(`mongoose`);
const bodyParser = require('body-parser');
const db = require(`./config/keys`).mongoURI;
const path = require(`path`);
const mime = require(`mime`);

// mongoose.connect returns a promise
mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log("connected to mongo"))
    .catch((err) => console.log(err));

app.use(express.static('/frontend/src'));
// app.engine('html', require('ejs').renderFile);
// app.set(`views`, __dirname+`/frontend/src`)

app.get(`/`, (req, res) => {
    let type = mime.getType(path);
    if (!res.getHeader('content-type')) {
        // let charset = mime.charsets.lookup(type);
        res.setHeader('Content-Type', type);
    };

    res.sendfile(path.resolve(__dirname, `frontend/src/index.html`))
    // res.send(`Hello!`);
    // res.render(`index.html`);
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Listening is working on ${port}`)
});