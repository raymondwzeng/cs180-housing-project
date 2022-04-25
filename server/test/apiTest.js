const chai = require("chai")
const csv = require('../csv')
const { expect, assert } = require("chai")
const chaiHttp = require("chai-http")
const { OperationsLayer } = require("../operations")
const analytics = require('../analytics');

chai.use(require('chai-json'))
chai.use(chaiHttp)

describe("Testing API calls", () => {
    it("Should receive {\"first\": \"John\", \"last\": \"Doe\"} after POST to /api/test", () => {
        const dummyData = {
            "first": "John",
            "last": "Doe",
        }

        chai.request("http://localhost:4000")
            .post("/api/test")
            .send({
                "first": "John",
                "last": "Doe"
            }).end((err, res) => {
                expect(err).to.be.null
                expect(res).to.be.json
                assert.deepEqual(res.body, dummyData)
            })
    })
    it("Should receive the full neighborhoodList array after POST to /api/neighborhoodList", () => {
        
        chai.request("http://localhost:4000")
            .post("/api/neighborhoodList")
            .send()
            .end((err, res) => {
                expect(err).to.be.null
                expect(res).to.be.json
                //expect(res.body.length).to.be.equal(OperationsLayer.getNeighborhoodList().length)
                //expect(res.body).to.eql(OperationsLayer.getNeighborhoodList()) //assert deep equality
            })
    })
    it("Should receive a filtered neighborhoodList array after POST to /api/getFilteredData", () => {

        let medianHousePrice = [100000, 150000]
        let latitude = [37, 38]
        let longitude = [-122, -121]
        //TODO: Add additional filters to the req once those filters are added to /api/getFilteredData
        req = JSON.stringify({
            minMedianHousePrice: medianHousePrice[0],
            maxMedianHousePrice: medianHousePrice[1],
            minLatitude: latitude[0],
            maxLatitude: latitude[1],
            minLongitude: longitude[0],
            maxLongitude: longitude[1]
          })

        chai.request("http://localhost:4000")
            .post("/api/getFilteredData")
            .send(req)
            .end((err, res) => {
                expect(err).to.be.null
                expect(res).to.be.json
                expect(res.body.length).to.be.equal(analytics.filterByAll(req).length)
                expect(res.body).to.eql(analytics.filterByAll(req)) //assert deep equality
            })
    })
})