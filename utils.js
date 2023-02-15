require('dotenv').config();

class Utils {
    static generateShortUrl(host, shortenedString) {
        const regex = /^(?:https?:\/\/)?([^:\/\n?]+)(?::(\d+))?/i;
        const match = host.match(regex);
        const domain = match[2] ? `${match[1]}:${match[2]}` : match[1];
        
        return `${domain}/${shortenedString}`;
    }
}

module.exports = Utils;