const {badgen} = require("badgen");
const numeral = require("numeral");
const express = require("express");

const {svgMiddleware} = require("./middleware");
const services = require("./services");

const router = express.Router();


/**
 * Adding commas to large numbers for display purposes
 * @param {Number} num
 * @return {String}
 */
const formatNumber = (num) => numeral(num).format('0,0');


/**
 * Helper function calling the badgen to create badge
 * @param {String} label
 * @param {String} color
 * @param {Number} data
 * @return {String} svg markup for the badge requested
 */
const getBadge = (label, color, data) => badgen({
    label,     // <Text>
    status: formatNumber(data), // <Text>, required
    color,    // <Color RGB> or <Color Name> (default: 'blue')
    style: 'classic',    // 'flat' or 'classic' (default: 'classic')
    iconWidth: 13,    // Set this if icon is not square (default: 13)
})
router.use(svgMiddleware)


router.get(
    ["/confirmed"],
    async (req, res) => {
        const {cases} = await services.getGlobalData();
        const label = req.query.long ? "covid-19 cases" : "cases";
        res.send(getBadge(label, "orange", cases));
    });

router.get(
    ["/deaths"],
    async (req, res) => {
        const {deaths} = await services.getGlobalData();
        const label = req.query.long ? "covid-19 deaths" : "deaths";
        res.send(getBadge(label, "red", deaths));
    });

router.get(
    ["/recovered"],
    async (req, res) => {
        const {recovered} = await services.getGlobalData();
        const label = req.query.long ? "covid-19 recovered" : "recovered";
        res.send(getBadge(label, "green", recovered));
    });


router.get(
    ["/actives"],
    async (req, res) => {
        const {active} = await services.getGlobalData();
        const label = req.query.long ? "covid-19 actives" : "actives";
        res.send(getBadge(label, "pink", active));
    });


router.get(
    ["/todaycases"],
    async (req, res) => {
        const {todayCases} = await services.getGlobalData();
        const label = req.query.long ? "covid-19 today-cases" : "today-cases";
        res.send(getBadge(label, "orange", todayCases));
    });


router.get(
    ["/todaydeaths"],
    async (req, res) => {
        const {todayDeaths} = await services.getGlobalData();
        const label = req.query.long ? "covid-19 today-deaths" : "today-deaths";
        res.send(getBadge(label, "red", todayDeaths));
    });

module.exports = router;
