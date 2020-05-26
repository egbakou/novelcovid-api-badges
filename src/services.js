const axios = require("axios");

const url = "https://disease.sh";

/**
 * Get global stats: cases, deaths, recovered, time last updated, and active cases.
 * Data is updated every 10 minutes
 */
// eslint-disable-next-line consistent-return
async function getGlobalData() {
    try {
        const { data } = await axios.get(`${url}/v2/all`);
        console.log(data);
        return data;
    } catch (error) {
        console.error(error);
    }
}

module.exports = {getGlobalData}