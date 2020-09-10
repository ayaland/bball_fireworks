const express = require("express");
const router = express.Router();
const axios = require("axios");
const mongoose = require("mongoose");

const Career = require('../../models/Career');
const puppeteer = require('puppeteer');

router.get('/api/getData', (req, res) => {
    Career.find()
        .then(careerStats => res.json(careerStats))
        .catch(err => res.status(404).json({ nocareerfound: "No stats found" }))
});

router.post('/', (req, res) => {
    const newCareer = new Career({
        name: req.name,
    })

    newCareer.save()
        .then(career => res.json(career));
});


const scrape = async () => {
    const browser = await puppeteer.launch({
        headless: false,
        slowMo: 500
    });
    const page = await browser.newPage();
    await page.goto('http://www.basketball-reference.com');

    await page.waitFor('input[name=search]');

    await page.$eval('input[name = search]', nameField => nameField.value = pName);
    await page.click('input[type="submit"]');
    await page.waitForSelector('#totals')
    // await browser.close();
};

module.exports = scrape;