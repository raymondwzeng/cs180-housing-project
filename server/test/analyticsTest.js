const analytics = require('../analytics');
const { expect } = require('chai');

  describe("Testing filter by all function", () =>{
    let medianHousePrice = [0, 358501]
    let latitude = [-150, 150]
    let longitude = [-150, 150]
    let req = {
        minMedianHousePrice: medianHousePrice[0],
        maxMedianHousePrice: medianHousePrice[1],
        minLatitude: latitude[0],
        maxLatitude: latitude[1],
        minLongitude: longitude[0],
        maxLongitude: longitude[1]
      }
      let test=[358500,8.3014,21,7099,1106,2401,1138,37.86,-122.22,10225.73307,554279.8501,733236.8844,65049.90857,20880.6004,2]
      it("Checks that first neighborhood is not returned in the filtered function", () => {
        expect(parseInt(analytics.filterByAll(req)[0].id)).to.be.equal(test[14]);
      })
  })

  describe("Testing column getting", () => {
    let medianHousePrice = [0, 1500000]
    let latitude = [-150, 150]
    let longitude = [-150, 150]
    let req = {
        minMedianHousePrice: medianHousePrice[0],
        maxMedianHousePrice: medianHousePrice[1],
        minLatitude: latitude[0],
        maxLatitude: latitude[1],
        minLongitude: longitude[0],
        maxLongitude: longitude[1]
      }
      let test=[452600,8.3252,41,880,129,322,126,37.88,-122.23,9263.040773,556529.1583,735501.807,67432.517,21250.21377,1]
      it("Checks that it gets median value", () => {
        expect(analytics.getColumn(req,1)[0]).to.be.equal(test[0]);
      })
      it("Checks that it gets median income", () => {
        expect(analytics.getColumn(req,2)[0]).to.be.equal(test[1]);
      })
      it("Checks that it gets median age", () => {
        expect(analytics.getColumn(req,3)[0]).to.be.equal(test[2]);
      })
      it("Checks that it gets total rooms", () => {
        expect(analytics.getColumn(req,4)[0]).to.be.equal(test[3]);
      })
      it("Checks that it gets total bedrooms", () => {
        expect(analytics.getColumn(req,5)[0]).to.be.equal(test[4]);
      })
      it("Checks that it gets population", () => {
        expect(analytics.getColumn(req,6)[0]).to.be.equal(test[5]);
      })
      it("Checks that it gets household", () => {
        expect(analytics.getColumn(req,7)[0]).to.be.equal(test[6]);
      })
      it("Checks that it gets latitude", () => {
        expect(analytics.getColumn(req,8)[0]).to.be.equal(test[7]);
      })
      it("Checks that it gets longitude", () => {
        expect(analytics.getColumn(req,9)[0]).to.be.equal(test[8]);
      })
      it("Checks that it gets distance to coast", () => {
        expect(analytics.getColumn(req,10)[0]).to.be.equal(test[9]);
      })
      it("Checks that it gets distance to la", () => {
        expect(analytics.getColumn(req,11)[0]).to.be.equal(test[10]);
      })
      it("Checks that it gets distance to sd", () => {
        expect(analytics.getColumn(req,12)[0]).to.be.equal(test[11]);
      })
      it("Checks that it gets distance to sj", () => {
        expect(analytics.getColumn(req,13)[0]).to.be.equal(test[12]);
      })
      it("Checks that it gets distance to sf", () => {
        expect(analytics.getColumn(req,14)[0]).to.be.equal(test[13]);
      })
      it("Checks that it gets id", () => {
        expect(analytics.getColumn(req,15)[0]).to.be.equal(test[14]);
      })
  })