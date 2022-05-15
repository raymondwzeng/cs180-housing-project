const csv = require('../csv');
const { expect } = require('chai');
const { OperationsLayer } = require('../operations');

describe("operations.getNeighborhoodList function", () => {

    it("Should read in exactly 20640 rows", () => {
        expect(OperationsLayer.getNeighborhoodList().length).to.be.equal(20640);
    })
    it("Should have a value of 42 in the 9th entry, median_age attribute", () => {
        /*
            Note: This is technically wrong in the sense that the values are NOT typed as numbers.
                    But that's just JS things lmao
        */
        expect(OperationsLayer.getNeighborhoodList()[8]["median_age"]).to.be.equal('42');
    })
});

describe("operations.deleteNeighborhood function", () => {
    let neighborhoodData = [360000, 50000, 50, 3000, 1000, 30000, 2000, 38, -122, 4206.81187, 544221.0324, 723064.4512, 53978.76396, 21266.94106];
    OperationsLayer.addNeighborhood(neighborhoodData); // Add a neighborhood to neighborhoodList to delete later
    let lastID = OperationsLayer.getNeighborhoodList().at(-1).id;
    let lengthBeforeDelete = OperationsLayer.getNeighborhoodList().length; // Length of the neighborhoodList before a row is deleted
    let deleteCode = OperationsLayer.deleteNeighborhood(lastID); // Delete the last neighborhood and return 0 if successful
    let lengthAfterDelete = OperationsLayer.getNeighborhoodList().length;  // Length of the neighborhoodList after a row is deleted

    it("LengthAfterDelete should be 1 less than LengthBeforeDelete", () => {
        expect(deleteCode).to.be.equal(0);
        expect(lengthAfterDelete).to.be.equal(lengthBeforeDelete - 1);
    })
    it("Should fail to delete neighborhood with id -1 and return -1", () => {
        expect(OperationsLayer.deleteNeighborhood(-1)).to.be.equal(-1);
    })
    it("Should fail to delete neighborhood with an id of lastID -1", () => {
        expect(OperationsLayer.deleteNeighborhood(lastID)).to.be.equal(-1);
    })
});

describe("operations.addNeighborhood function", () => {
	neighborhoodData = [360000, 50000, 50, 3000, 1000, 30000, 2000, 38, -122, 4206.81187, 544221.0324, 723064.4512, 53978.76396, 21266.94106];
    lastID = Number(OperationsLayer.getNeighborhoodList().at(-1).id);
    lengthBeforeAdd = OperationsLayer.getNeighborhoodList().length;
    addFunctionStatus = OperationsLayer.addNeighborhood(neighborhoodData) // Adds a new neighborhood and returns 0 if successful
    lengthAfterAdd = OperationsLayer.getNeighborhoodList().length;
    addedMedian = OperationsLayer.getNeighborhoodList().at(-1).median_value;
    addedID = OperationsLayer.getNeighborhoodList().at(-1).id

    OperationsLayer.deleteNeighborhood(lastID + 1); // Undo the neighborhood that we added

    it("Should add a new neighborhood to neighborhoodList", () => {
        expect(addFunctionStatus).to.be.equal(0);
    })
    it("Should read in the correct number of rows for neighborhoodList", () => {
        expect(lengthAfterAdd).to.be.equal(lengthBeforeAdd + 1);
    })
    it("Should read the correct values for the added neighborhood", () => {
        expect(addedMedian).to.be.equal(360000);
        expect(addedID).to.be.equal(Number(lastID) + 1);
    })

});

describe("operations.updateNeighborhood function", () => {
	validNeighborhoodData = [360000, 50000, 50, 3000, 1000, 30000, 2000, 38, -122, 4206.81187, 544221.0324, 723064.4512, 53978.76396, 21266.94106, 9];
    invalidNeighborhoodData = [360000, 50000, 50, 3000, 1000, 30000, 2000, 38, -122, 4206.81187, 544221.0324, 723064.4512, 53978.76396, 21266.94106, -1];

    it("Should update the neighborhood with the specified data and id in neighborhoodList", () => {
        expect(OperationsLayer.updateNeighborhood(validNeighborhoodData)).to.be.equal(0);
    })
    it("Should read the correct values for the updated neighborhood", () => {
        expect(OperationsLayer.getNeighborhoodList().at(8).median_value).to.be.equal(360000);
        expect(OperationsLayer.getNeighborhoodList().at(8).id).to.be.equal(9);
    })
    it("Should fail if we attempt to update a neighborhood with an invalid id", () => {
        expect(OperationsLayer.updateNeighborhood(invalidNeighborhoodData)).to.be.equal(-1);
    })
});

describe("testing creating caches", () =>{

    it("Should return the highest median value of 500001", () => {
        expect(parseInt(OperationsLayer.getHighMedianCache()[0].median_value)).to.be.equal(500001);
    })   
    it("Should return the lowest median value of 14999", () => {
        expect(parseInt(OperationsLayer.getLowMedianCache()[0].median_value)).to.be.equal(14999);
    })
    it("Should return the shortest distance to coast of 120.....", () => {
        expect(parseFloat(OperationsLayer.getClosestCoast()[0].distance_to_coast)).to.be.equal(120.6764466);
    })
    it("Should return the highest population of 35682", () => {
        expect(parseInt(OperationsLayer.getHighestPop()[0].population)).to.be.equal(35682);
    })
})