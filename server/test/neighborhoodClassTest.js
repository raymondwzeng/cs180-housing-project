const neighborhood = require('../neighborhood')
const { expect } = require('chai')

describe("Testing neighborhood class median value getter", () => {
    let data = new neighborhood([452600,8.3252,41,880,129,322,126,37.88,-122.23,9263.04077285038,556529.1583418,735501.80698384,67432.5170008434,21250.2137667799])
    it("Checking median_value getter, should read 452600", () => {
        expect(data.median_value).to.be.equal(452600)
    })
    it("Testing neighborhood class median income getter", () => {

        expect(data.median_income).to.be.equal(8.3252);
    })
    it("Testing neighborhood class median age getter", () => {

        expect(data.median_age).to.be.equal(41);
    })
    it("Testing neighborhood class total rooms getter", () => {

        expect(data.total_rooms).to.be.equal(880);
    })
    it("Testing neighborhood class total bedrooms getter", () => {

        expect(data.total_bedrooms).to.be.equal(129);
    })
    it("Testing neighborhood class population getter", () => {

        expect(data.population).to.be.equal(322);
    })
    it("Testing neighborhood class households getter", () => {

        expect(data.households).to.be.equal(126);
    })
    it("Testing neighborhood class latitude getter", () => {

        expect(data.latitude).to.be.equal(37.88);
    })
    it("Testing neighborhood class longitude getter", () => {

        expect(data.longitude).to.be.equal(-122.23);
    })
    it("Testing neighborhood class distance to coase getter", () => {

        expect(data.distance_to_coast).to.be.equal(9263.04077285038);
    })
    it("Testing neighborhood class distance to la getter", () => {

        expect(data.distance_to_LA).to.be.equal(556529.1583418);
    })
    it("Testing neighborhood class distance to sd getter", () => {

        expect(data.distance_to_SD).to.be.equal(735501.80698384);
    })
    it("Testing neighborhood class distance to sj getter", () => {

        expect(data.distance_to_SJ).to.be.equal(67432.5170008434);
    })
    it("Testing neighborhood class distance to sf getter", () => {

        expect(data.distance_to_SF).to.be.equal(21250.2137667799);
    })
    it("Testing neighborhood class closest metro getter", () => {

        expect(data.closest_metro).to.be.equal("San Francisco");
    })
    it("Testing neighborhood class avg_household_size", () => {

        expect(data.median_income).to.be.equal(322/126);
    }) 
    it("Checking median_value setter, should read 452000", () => {
        data.median_value=452000;
        expect(data.median_value).to.be.equal(452000);
    })
    it("Testing neighborhood class median income setter", () => {
        data.median_income=8;
        expect(data.median_income).to.be.equal(8);
    })
    it("Testing neighborhood class median age setter", () => {
        data.median_age=40;
        expect(data.median_age).to.be.equal(40);
    })
    it("Testing neighborhood class total rooms setter", () => {
        data.total_rooms=879;
        expect(data.total_rooms).to.be.equal(879);
    })
    it("Testing neighborhood class total bedrooms setter", () => {
        data.total_bedrooms=130;
        expect(data.median_income).to.be.equal(130);
    })
    it("Testing neighborhood class population setter", () => {
        data.population=320;
        expect(data.population).to.be.equal(320);
    })
    it("Testing neighborhood class households setter", () => {
        data.households=125;
        expect(data.households).to.be.equal(125);
    })
    it("Testing neighborhood class latitude setter", () => {
        data.latitude=37.89;
        expect(data.latitude).to.be.equal(37.89);
    })
    it("Testing neighborhood class longitude setter", () => {
        data.longitude=-122.25;
        expect(data.longitude).to.be.equal(-122.25);
    })
    it("Testing neighborhood class distance to coast setter", () => {
        data.distance_to_coast=9200;
        expect(data.distance_to_coast).to.be.equal(9200);
    })
    it("Testing neighborhood class distance to la setter", () => {
        data.distance_to_LA=5000;
        expect(data.distance_to_LA).to.be.equal(5000);
    })
    it("Testing neighborhood class distance to sd setter", () => {
        data.distance_to_SD=5001;
        expect(data.distance_to_SD).to.be.equal(5001);
    })
    it("Testing neighborhood class distance to sj setter", () => {
        data.distance_to_SJ=5002;
        expect(data.distance_to_SJ).to.be.equal(5002);
    })
    it("Testing neighborhood class distance to sf setter", () => {
        data.distance_to_SF=50003;
        expect(data.distance_to_SF).to.be.equal(5003);
    })
    it("Testing neighborhood class closest metro getter after distance setter", () => {
        data.distance_to_LA=10;
        expect(data.closest_metro).to.be.equal("Los Angeles");
    })
    
})