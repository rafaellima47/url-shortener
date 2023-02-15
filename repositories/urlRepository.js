require('dotenv').config();
const crypto = require('crypto');

const Url = require('../models/url');


class UrlRepository {
    static async findOneByLongUrl(longUrl){
        return await Url.findOne({ long: longUrl, expiration: { $gte: new Date } })
        .then((url) => {
          return url
        })
        .catch((err) => {
            console.log(`Error on finding url by long url: ${err}`);
        });
    }


    static async findOneByShortenedString(shortenedString){
        return await Url.findOne({ shortenedString: shortenedString, expiration: { $gte: new Date } })
        .then((url) => {
          return url
        })
        .catch((err) => {
            console.log(`Error on finding url by id: ${err}`);
        });
    }


    static async insertOne(long){
        const hours = parseInt(process.env.URL_EXPIRATION_TIME_HOURS) || 24;
        let shortnedString = crypto.randomBytes(11).toString('base64').slice(0, 11);
        shortnedString = shortnedString.replaceAll("/", Math.floor(Math.random() * 10));
        shortnedString = shortnedString.replaceAll("\\", Math.floor(Math.random() * 10));

        const newUrl = {
            shortenedString: shortnedString,
            long: long,
            expiration: new Date(+new Date() + hours * 60 * 60 * 1000)
        }

        return await Url.create(newUrl)
          .then((urlInserted) => {
            return urlInserted
          })
          .catch((err) => console.log(`Error on inserting new url: ${err}`));
    }
}


module.exports = UrlRepository