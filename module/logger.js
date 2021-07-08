const { blue, yellow, red } = require("chalk"),
    dateformat = require('dateformat');
    config = require('../config')

module.exports = class {
    static d(TAG, Log) {
        if (config.debug) {
            const date = dateformat(new Date(Date.now()), 'isoDateTime');
            return console.log(`[${date}] ` + blue(`Debug/${TAG}`) + ` : ${Log}`);
        }
    }

	static i(TAG, Log) {
        const date = dateformat(new Date(Date.now()), 'isoDateTime');
        return console.log(`[${date}] ` + blue(`Info/${TAG}`) + ` : ${Log}`);
    }

    static w(TAG, Log) {
        const date = dateformat(new Date(Date.now()), 'isoDateTime');
        return console.warn(`[${date}] ` + yellow(`Warn/${TAG}`) + ` :`, Log);
    }

    static e(TAG, Log) {
        const date = dateformat(new Date(Date.now()), 'isoDateTime');
        return console.error(`[${date}] ` + red(`Error/${TAG}`) + ` :`, Log);
    }

    static f(TAG, Log) {
        const date = dateformat(new Date(Date.now()), 'isoDateTime');
        return console.error(`[${date}] ` + red(`Fatal/${TAG}`) + ` :`, Log);
    }
};