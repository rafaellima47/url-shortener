const { Router } = require('express');

const UrlRepository = require('../repositories/urlRepository');
const Utils = require('../utils');

const router = Router()


router.post('/shorten', async(req, res) => {
    try {
        const longUrl = req.body.url || "";
    
        const urlFound = await UrlRepository.findOneByLongUrl(longUrl);
        if (urlFound){
            res.status(200).send({shortUrl: Utils.generateShortUrl(req.get("host"), urlFound.shortenedString)});
        }
        else {
            const newUrl = await UrlRepository.insertOne(longUrl);
            res.status(200).send({shortUrl: Utils.generateShortUrl(req.get("host"), newUrl.shortenedString)});
        }
    }
    catch(err) {
        res.status(500).send({error: err});
    }
});


router.post('/expand', async(req, res) => {
    try{
        const shortUrl = req.body.url || '';
        const regex = /\/([^/]+)$/;
        const match = shortUrl.match(regex);
        const shortenedString = match ? match[1] : '';

        const urlFound = await UrlRepository.findOneByShortenedString(shortenedString);
        if (urlFound) {
            res.status(200).send({longUrl: urlFound.long});
        }
        else {
            res.status(404).send({error: `Long Url not found for ${shortUrl}`});
        }
    }
    catch(err) {
        res.status(500).send({error: err});
    }
});


router.get('/:id', async (req, res) => {
    try {
        const shortenedString = req.params.id || "";
    
        const urlFound = await UrlRepository.findOneByShortenedString(shortenedString);
        if (urlFound) {
            res.redirect(urlFound.long);
        }
        else {
            res.status(404).send({error: `Url not found for redirect`});
        }
    }
    catch(err) {
        res.status(500).send({error: err});
    }
})


module.exports = router