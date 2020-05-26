const axios = require("axios");

const url = "https://disease.sh";

/**
 * Get global stats: cases, deaths, recovered, time last updated, and active cases.
 * Data is updated every 10 minutes
 */
// eslint-disable-next-line consistent-return
async function getGlobalData() {
    const {data} = await axios.get(`${url}/v2/all`);
    return data;
}

module.exports = {getGlobalData}