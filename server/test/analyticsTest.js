const analytics = require('../analytics');
const { expect } = require('chai');

  describe("Testing filter by all function", () =>{
    let medianHousePrice = [0, 358501]
    let latitude = [-150, 150]
    let longitude = [-150, 150]
    let id =[0,20640]
    let median_age=[0,1000]
    let median_income=[0,500]
    let total_rooms=[0,100000]
    let total_bedrooms=[0,100000]
    let population=[0,150000]
    let households=[0,10000]
    let distance_to_coast=[0,100000000000]
    let distance_to_LA=[0,10000000000]
    let distance_to_SD=[0,10000000000]
    let distance_to_SJ=[0,10000000000]
    let distance_to_SF=[0,10000000000]
    let req = {
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
      }
      let test=[358500,8.3014,21,7099,1106,2401,1138,37.86,-122.22,10225.73307,554279.8501,733236.8844,65049.90857,20880.6004,2]
      it("Checks that first neighborhood is not returned in the filtered function", () => {
        expect(parseInt(analytics.filterByAll(req)[0].id)).to.be.equal(test[14]);
      })
      it("Checks that it filters by id", () => {
        let req1=JSON.parse(JSON.stringify(req));
        req1.maxMedianHousePrice=5000001;
        req1.minID=2;
        req1.maxID=5;
        expect(parseInt(analytics.filterByAll(req1)[3].id)).to.be.equal(5);
      })
      it("Checks that it filters by median income", () => {
        let req2=JSON.parse(JSON.stringify(req));
        req2.maxMedianIncome =8.3015;
        expect(parseInt(analytics.filterByAll(req2)[0].id)).to.be.equal(2);
      })
      it("Checks that it filters by Median Age", () => {
        let req3=JSON.parse(JSON.stringify(req));
        req3.minMedianAge =52;
        expect(parseInt(analytics.filterByAll(req3)[0].id)).to.be.equal(3);
      })
      it("Checks that it filters by Tot_rooms", () => {
        let req4=JSON.parse(JSON.stringify(req));
        req4.maxTotalRooms = 1000;
        expect(parseInt(analytics.filterByAll(req4)[0].id)).to.be.equal(6);
      })
      it("Checks that it filters by Tot_Bedrooms", () => {
        let req5=JSON.parse(JSON.stringify(req));
        req5.maxTotalBedrooms =200;
        expect(parseInt(analytics.filterByAll(req5)[0].id)).to.be.equal(3);
      })
      it("Checks that it filters by Population", () => {
        let req6=JSON.parse(JSON.stringify(req));
        req6.minPopulation =565;
        req6.maxPopulation=565;
        req6.maxMedianHousePrice=5000001;
        expect(parseInt(analytics.filterByAll(req6)[0].id)).to.be.equal(5);
      })
      it("Checks that it filters by Households", () => {
        let req7=JSON.parse(JSON.stringify(req));
        req7.minHouseholds =647;
        req7.maxHouseholds=647;
        expect(parseInt(analytics.filterByAll(req7)[0].id)).to.be.equal(8);
      })
  })

  describe("Testing column getting", () => {
    let medianHousePrice = [0, 500001]
    let latitude = [-150, 150]
    let longitude = [-150, 150]
    let id = [0,20641]
    let median_age=[0,52]
    let median_income=[0,500000000.1]
    let total_rooms=[0,39320]
    let total_bedrooms=[0,6445]
    let population=[0,35682]
    let households=[0,6082]
    let distance_to_coast=[0,333805.5]
    let distance_to_LA=[0,1018261.5]
    let distance_to_SD=[0,1196920.5]
    let distance_to_SJ=[0,836763.5]
    let distance_to_SF=[0,903628.5]
    let req = {
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
      }
      let test=[452600,8.3252,41,880,129,322,126,37.88,-122.23,9263.040773,556529.1583,735501.807,67432.517,21250.21377,1]
      it("Checks that it gets 20640 items in total", () => {

        expect(analytics.getColumn(req,1).length).to.be.equal(20640);
      })
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