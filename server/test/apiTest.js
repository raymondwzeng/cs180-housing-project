const chai = require("chai")
const csv = require('../csv')
const { expect, assert } = require("chai")
const chaiHttp = require("chai-http")

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
    it("Should receive the full neighborhoodList array after GET to /api/neighborhoodList", () => {
	    const csvNeighborhoodList = csv.load();

        chai.request("http://localhost:4000")
            .get("/api/neighborhoodList")
            .send().end((err, res) => {
                  expect(err).to.be.null
                  //expect(res).to.be.json
                  //TODO: Make a proper test case to ensure that all neighborhood list items are sent using the request
                  //expect(res.body).to.eql(csvNeighborhoodList); //deep equality assertion
              })
    })
})