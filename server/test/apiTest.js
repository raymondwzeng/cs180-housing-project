const chai = require("chai")
const csv = require('../csv')
const { expect, assert } = require("chai")
const chaiHttp = require("chai-http")
const { OperationsLayer } = require("../operations")
const analytics = require('../analytics');

chai.use(require('chai-json'))
chai.use(chaiHttp)

describe("Testing api/test (We keep this around as a single usage example)", () => {
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
})

describe("Testing api/neighborhoodList", () => {
    it("Should receive the full neighborhoodList array after POST to /api/neighborhoodList", () => {
        
        chai.request("http://localhost:4000")
            .post("/api/neighborhoodList")
            .send()
            .end((err, res) => {
                expect(err).to.be.null
                expect(res).to.be.json
                expect(res.body.length).to.be.equal(OperationsLayer.getNeighborhoodList().length)
            })
    })
    it("Should receive a filtered neighborhoodList array after POST to /api/getFilteredData", () => {

        let medianHousePrice = [100000, 150000]
        let latitude = [37, 38]
        let longitude = [-122, -121]
        let id =[0,30000]
        let median_age=[0,1000]
        let median_income=[0,5000000.1]
        let total_rooms=[0,100000]
        let total_bedrooms=[0,100000]
        let population=[0,150000]
        let households=[0,10000]
        let distance_to_coast=[0,100000000000]
        let distance_to_LA=[0,10000000000]
        let distance_to_SD=[0,10000000000]
        let distance_to_SJ=[0,10000000000]
        let distance_to_SF=[0,10000000000]
        //TODO: Add additional filters to the req once those filters are added to /api/getFilteredData
        req = JSON.stringify({
            minMedianHousePrice: medianHousePrice[0],
            maxMedianHousePrice: medianHousePrice[1],
            minLatitude: latitude[0],
            maxLatitude: latitude[1],
            minLongitude: longitude[0],
            maxLongitude: longitude[1],
            minMedianIncome: median_income[0],
            maxMedianIncome: median_income[1],
            minID: id[0],
            maxID: id[1],
            minMedianAge:median_age[0],
            maxMedianAge:median_age[1],
            minTotalRooms:total_rooms[0],
            maxTotalRooms:total_rooms[1],
            minTotalBedrooms:total_bedrooms[0],
            maxTotalBedrooms:total_bedrooms[1],
            minPopulation:population[0],
            maxPopulation:population[1],
            minHouseholds:households[0],
            maxHouseholds:households[1],
            minDistanceToCoast:distance_to_coast[0],
            maxDistanceToCoast:distance_to_coast[1],
            minDistanceToLA:distance_to_LA[0],
            maxDistanceToLA:distance_to_LA[1],
            minDistanceToSD:distance_to_SD[0],
            maxDistanceToSD:distance_to_SD[1],
            minDistanceToSJ:distance_to_SJ[0],
            maxDistanceToSJ:distance_to_SJ[1],
            minDistanceToSF:distance_to_SF[0],
            maxDistanceToSF:distance_to_SF[1]
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

describe("Testing api/cards as a whole", () => {
    it("Should have a larger list with our new item after adding", () => {
        const newNeighborhood = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        chai.request("http://localhost:4000")
            .post("/api/cards")
            .send(newNeighborhood)
            .end((err, res) => {
                expect(err).to.be.null
                expect(res).to.be.json
            })

        chai.request("http://localhost:4000")
            .post("/api/neighborhoodList")
            .send()
            .end((err, res) => {
                expect(err).to.be.null
                expect(res).to.be.json
                expect(res.body.length).to.be.equal(20641)
            })
    })

    it("Should have a different value in median value after updating", () => {
        const request = {
            id: 20641,
            state: {
                _median_value: 10,
                _median_income: 0,
                _median_age: 0,
                _total_rooms: 0,
                _total_bedrooms: 0,
                _population: 0,
                _households: 0,
                _latitude: 0,
                _longitude: 0,
                _distance_to_coast: 0,
                _distance_to_LA: 0,
                _distance_to_SD: 0,
                _distance_to_SJ: 0,
                _distance_to_SF: 0,
                id: 20641
            }
        }

        chai.request("http://localhost:4000")
            .patch("/api/cards")
            .send(request)
            .end((err, res) => {
                expect(err).to.be.null
                expect(res).to.be.json
            })

        chai.request("http://localhost:4000")
            .post("/api/getFilteredData")
            .send({
                minMedianHousePrice: 0,
                maxMedianHousePrice: 100,
                minLatitude: -150,
                maxLatitude: 150,
                minLongitude: -150,
                maxLongitude: 150,
                minMedianIncome: 0,
                maxMedianIncome: 50000000.1,
                minID: 0,
                maxID: 300000,
                minMedianAge:0,
                maxMedianAge:100,
                minTotalRooms:0,
                maxTotalRooms:100000,
                minTotalBedrooms:0,
                maxTotalBedrooms:100000,
                minPopulation:0,
                maxPopulation:150000,
                minHouseholds:0,
                maxHouseholds:10000,
                minDistanceToCoast:0,
                maxDistanceToCoast:100000000000,
                minDistanceToLA:0,
                maxDistanceToLA:100000000000,
                minDistanceToSD:0,
                maxDistanceToSD:100000000000,
                minDistanceToSJ:0,
                maxDistanceToSJ:100000000000,
                minDistanceToSF:0,
                maxDistanceToSF:100000000000
            })
            .end((err, res) => {
                expect(err).to.be.null
                expect(res).to.be.json
                expect(res.body.length).to.be.equal(1)
                expect(res.body[0]._median_value).to.be.equal(10) //expect to find our original value
            })
    })

    it("Should no longer exist after deletion", () => {
        chai.request("http://localhost:4000")
            .delete("/api/cards")
            .send({id: 20641})
            .end((err, res) => {
                expect(err).to.be.null
                expect(res).to.be.json
                expect(res.body).to.be.equal("Successfully deleted neighborhood with id: 20641")
            })
    })

    it("Should return error message if delete failed", () => {
        const req = {
            "id": "-1"
        }

        chai.request("http://localhost:4000")
            .delete("/api/cards")
            .send(req)
            .end((err, res) => {
                expect(err).to.be.null
                expect(res).to.be.json
                expect(res.body).to.be.equal("ERROR: unable to delete neighborhood with id of " + req.id)
            })
    })
})

describe("Testing api/column", () => {
    /*
    let medianHousePrice = [100000, 150000]
    let latitude = [37, 38]
    let longitude = [-122, -121]

    //TODO: Add additional filters to the req once those filters are added to /api/getFilteredData
    const request = {
        column_name: 'Median_House_Value',
        constraint_array: {
            minMedianHousePrice: medianHousePrice[0],
            maxMedianHousePrice: medianHousePrice[1],
            minLatitude: latitude[0],
            maxLatitude: latitude[1],
            minLongitude: longitude[0],
            maxLongitude: longitude[1]
        }
    }
    */

    it("Should receive a array of Median_House_Value data after GET to /api/column", () => {
        const params = new URLSearchParams({column_name: "Median_House_Value"})
        chai.request("http://localhost:4000")
            .get(`/api/column?${params}`)
            .end((err, res) => {
                expect(err).to.be.null
                expect(res).to.be.json
                expect(res.body[0]).to.be.equal(parseInt(OperationsLayer.getNeighborhoodList()[0]._median_value))
                expect(res.body[10]).to.be.equal(parseInt(OperationsLayer.getNeighborhoodList()[10]._median_value))
            })
    })
    it("Should receive a array of Median_Income data after GET to /api/column", () => {
        const params = new URLSearchParams({column_name: "Median_Income"})
        chai.request("http://localhost:4000")
            .get(`/api/column?${params}`)
            .end((err, res) => {
                expect(err).to.be.null
                expect(res).to.be.json
                expect(res.body[0]).to.be.equal(parseFloat(OperationsLayer.getNeighborhoodList()[0]._median_income))
                expect(res.body[10]).to.be.equal(parseFloat(OperationsLayer.getNeighborhoodList()[10]._median_income))
            })
    })
    it("Should receive a array of Median_Age data after GET to /api/column", () => {
        const params = new URLSearchParams({column_name: "Median_Age"})
        chai.request("http://localhost:4000")
            .get(`/api/column?${params}`)
            .end((err, res) => {
                expect(err).to.be.null
                expect(res).to.be.json
                expect(res.body[0]).to.be.equal(parseFloat(OperationsLayer.getNeighborhoodList()[0]._median_age))
                expect(res.body[10]).to.be.equal(parseFloat(OperationsLayer.getNeighborhoodList()[10]._median_age))
            })
    })
    it("Should receive a array of Tot_Rooms data after GET to /api/column", () => {
        const params = new URLSearchParams({column_name: "Tot_Rooms"})
        chai.request("http://localhost:4000")
            .get(`/api/column?${params}`)
            .end((err, res) => {
                expect(err).to.be.null
                expect(res).to.be.json
                expect(res.body[0]).to.be.equal(parseFloat(OperationsLayer.getNeighborhoodList()[0]._total_rooms))
                expect(res.body[10]).to.be.equal(parseFloat(OperationsLayer.getNeighborhoodList()[10]._total_rooms))
            })
    })
    it("Should receive a array of Tot_Bedrooms data after GET to /api/column", () => {
        const params = new URLSearchParams({column_name: "Tot_Bedrooms"})
        chai.request("http://localhost:4000")
            .get(`/api/column?${params}`)
            .end((err, res) => {
                expect(err).to.be.null
                expect(res).to.be.json
                expect(res.body[0]).to.be.equal(parseFloat(OperationsLayer.getNeighborhoodList()[0]._total_bedrooms))
                expect(res.body[10]).to.be.equal(parseFloat(OperationsLayer.getNeighborhoodList()[10]._total_bedrooms))
            })
    })
    
    it("Should receive a array of Population data after GET to /api/column", () => {
        const params = new URLSearchParams({column_name: "Population"})
        chai.request("http://localhost:4000")
            .get(`/api/column?${params}`)
            .end((err, res) => {
                expect(err).to.be.null
                expect(res).to.be.json
                expect(res.body[0]).to.be.equal(parseFloat(OperationsLayer.getNeighborhoodList()[0]._population))
                expect(res.body[10]).to.be.equal(parseFloat(OperationsLayer.getNeighborhoodList()[10]._population))
            })
    })
    
    it("Should receive a array of Households data after GET to /api/column", () => {
        const params = new URLSearchParams({column_name: "Households"})
        chai.request("http://localhost:4000")
            .get(`/api/column?${params}`)
            .end((err, res) => {
                expect(err).to.be.null
                expect(res).to.be.json
                expect(res.body[0]).to.be.equal(parseFloat(OperationsLayer.getNeighborhoodList()[0]._households))
                expect(res.body[10]).to.be.equal(parseFloat(OperationsLayer.getNeighborhoodList()[10]._households))
            })
    })
    it("Should receive a array of Latitude data after GET to /api/column", () => {
        const params = new URLSearchParams({column_name: "Latitude"})
        chai.request("http://localhost:4000")
            .get(`/api/column?${params}`)
            .end((err, res) => {
                expect(err).to.be.null
                expect(res).to.be.json
                expect(res.body[0]).to.be.equal(parseFloat(OperationsLayer.getNeighborhoodList()[0]._latitude))
                expect(res.body[10]).to.be.equal(parseFloat(OperationsLayer.getNeighborhoodList()[10]._latitude))
            })
    })
    it("Should receive a array of Longitude data after GET to /api/column", () => {
        const params = new URLSearchParams({column_name: "Longitude"})
        chai.request("http://localhost:4000")
            .get(`/api/column?${params}`)
            .end((err, res) => {
                expect(err).to.be.null
                expect(res).to.be.json
                expect(res.body[0]).to.be.equal(parseFloat(OperationsLayer.getNeighborhoodList()[0]._longitude))
                expect(res.body[10]).to.be.equal(parseFloat(OperationsLayer.getNeighborhoodList()[10]._longitude))
            })
    })
    it("Should receive a array of Distance_to_coast data after GET to /api/column", () => {
        const params = new URLSearchParams({column_name: "Distance_to_coast"})
        chai.request("http://localhost:4000")
            .get(`/api/column?${params}`)
            .end((err, res) => {
                expect(err).to.be.null
                expect(res).to.be.json
                expect(res.body[0]).to.be.equal(parseFloat(OperationsLayer.getNeighborhoodList()[0]._distance_to_coast))
                expect(res.body[10]).to.be.equal(parseFloat(OperationsLayer.getNeighborhoodList()[10]._distance_to_coast))
            })
    })
    it("Should receive a array of Distance_to_LA data after GET to /api/column", () => {
        const params = new URLSearchParams({column_name: "Distance_to_LA"})
        chai.request("http://localhost:4000")
            .get(`/api/column?${params}`)
            .end((err, res) => {
                expect(err).to.be.null
                expect(res).to.be.json
                expect(res.body[0]).to.be.equal(parseFloat(OperationsLayer.getNeighborhoodList()[0]._distance_to_LA))
                expect(res.body[10]).to.be.equal(parseFloat(OperationsLayer.getNeighborhoodList()[10]._distance_to_LA))
            })
    })
    it("Should receive a array of Distance_to_SanDiego data after GET to /api/column", () => {
        const params = new URLSearchParams({column_name: "Distance_to_SanDiego"})
        chai.request("http://localhost:4000")
            .get(`/api/column?${params}`)
            .end((err, res) => {
                expect(err).to.be.null
                expect(res).to.be.json
                expect(res.body[0]).to.be.equal(parseFloat(OperationsLayer.getNeighborhoodList()[0]._distance_to_SD))
                expect(res.body[10]).to.be.equal(parseFloat(OperationsLayer.getNeighborhoodList()[10]._distance_to_SD))
            })
    })
    it("Should receive a array of Distance_to_SanJose data after GET to /api/column", () => {
        const params = new URLSearchParams({column_name: "Distance_to_SanJose"})
        chai.request("http://localhost:4000")
            .get(`/api/column?${params}`)
            .end((err, res) => {
                expect(err).to.be.null
                expect(res).to.be.json
                expect(res.body[0]).to.be.equal(parseFloat(OperationsLayer.getNeighborhoodList()[0]._distance_to_SJ))
                expect(res.body[10]).to.be.equal(parseFloat(OperationsLayer.getNeighborhoodList()[10]._distance_to_SJ))
            })
    })
    it("Should receive a array of Distance_to_SanFrancisco data after GET to /api/column", () => {
        const params = new URLSearchParams({column_name: "Distance_to_SanFrancisco"})
        chai.request("http://localhost:4000")
            .get(`/api/column?${params}`)
            .end((err, res) => {
                expect(err).to.be.null
                expect(res).to.be.json
                expect(res.body[0]).to.be.equal(parseFloat(OperationsLayer.getNeighborhoodList()[0]._distance_to_SF))
                expect(res.body[10]).to.be.equal(parseFloat(OperationsLayer.getNeighborhoodList()[10]._distance_to_SF))
            })
    })
    it("Should receive a array of ID data after GET to /api/column", () => {
        const params = new URLSearchParams({column_name: "ID"})
        chai.request("http://localhost:4000")
            .get(`/api/column?${params}`)
            .end((err, res) => {
                expect(err).to.be.null
                expect(res).to.be.json
                expect(res.body[0]).to.be.equal(parseFloat(OperationsLayer.getNeighborhoodList()[0]._id))
                expect(res.body[10]).to.be.equal(parseFloat(OperationsLayer.getNeighborhoodList()[10]._id))
            })
    })
    it("Should receive receive no results after invalid GET to /api/column", () => {
        const params = new URLSearchParams({column_name: "foobar"})
        chai.request("http://localhost:4000")
            .get(`/api/column?${params}`)
            .end((err, res) => {
                expect(err).to.be.null
                expect(res).to.be.json
                expect(res.body).to.be.equal("ERROR: unable to obtain column with name: foobar")
            })
    })
})
