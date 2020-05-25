const axios = require("axios");
const {setupCache} = require("axios-cache-adapter");

// Create `axios` instance passing the newly created `cache.adapter`
const api = axios.create({
    adapter: setupCache({
        maxAge: 2 * 60 * 1000
    }).adapter
})

const url = "https://disease.sh";

/**
 * Interface COVID-19 Cases Statistics
 *
 * @typedef {Object} Covid19Impact
 * @property {Number} confirmed - number of confirmed cases of COVID-19.
 * @property {Number} deaths - number of confirmed deaths of COVID-19.
 * @property {Number} recovered - number of confirmed recovers of COVID-19.
 */


/**
 * Get global stats: cases, deaths, recovered, time last updated, and active cases.
 * Data is updated every 10 minutes
 */
async function getGlobalData() {

    const {data} = await api.get(`${url}/v2/all`);

    return data;
}

module.exports = {getGlobalData}