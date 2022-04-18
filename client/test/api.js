const chai = require("chai")
const {expect, asset} = require("chai")
const chaiHttp = require("chai-http")

chai.use(chaiHttp)

describe("Testing API calls from the client", () => {
    it("Should receive 20460 rows by default", () => {
        chai.request("http://localhost:4000")
            .post('/api/neighborhoodList')
            .end((err, res) => {
              expect(err, null)
              expect(res.body.length).to.equal(20640)
            })
    })
    it("Should receive a subset based on 1 constraint", () => {
        chai.request("http://localhost:4000")
            .post('/api/getFilteredData')
            .send({
                "minMedianHousePrice": 100000,
                "maxMedianHousePrice": 500000,
                "minLatitude": -150,
                "maxLatitude": 150,
                "minLongitude": -150,
                "maxLongitude": 150
            }).end((err, res) => {
                expect(err, null)
                expect(res.body.length).to.equal(16079)
            })
    })
    it("Should receive a subset based on multiple constraints", () => {
        chai.request("http://localhost:4000")
            .post('/api/getFilteredData')
            .send({
                "minMedianHousePrice": 100000,
                "maxMedianHousePrice": 182237,
                "minLatitude": -25,
                "maxLatitude": 77,
                "minLongitude": -150,
                "maxLongitude": 77
            }).end((err, res) => {
                expect(err, null)
                expect(res.body.length).to.equal(6920)
                expect(res.body[2]._median_age).to.equal('52')
            })
    })
})