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
    it("LengthAfterDelete should be 1 less than LengthBeforeDelete", () => {

        lengthBeforeDelete = OperationsLayer.getNeighborhoodList().length; // Length of the neighborhoodList before a row is deleted
        deleteCode = OperationsLayer.deleteNeighborhood(10); // Delete id 10 and return 0 if successful
        lengthAfterDelete = OperationsLayer.getNeighborhoodList().length;  // Length of the neighborhoodList after a row is deleted

        expect(deleteCode).to.be.equal(0);
        expect(lengthAfterDelete).to.be.equal(lengthBeforeDelete - 1);
    })
    it("Should fail to delete neighborhood with id -1 and return -1", () => {
        expect(OperationsLayer.deleteNeighborhood(-1)).to.be.equal(-1);
    })
    it("Should fail to delete neighborhood with id 10 and return -1", () => {
        expect(OperationsLayer.deleteNeighborhood(10)).to.be.equal(-1);
    })
});

describe("operations.addNeighborhood function", () => {
	    
    it("Should add a new neighborhood with the specified data to neighborhoodList", () => {
        neighborhoodData = [360000, 50000, 50, 3000, 1000, 30000, 2000, 38, -122, 4206.81187, 544221.0324, 723064.4512, 53978.76396, 21266.94106];
        lastID = OperationsLayer.getNeighborhoodList().at(-1).id;
        lengthBeforeAdd = OperationsLayer.getNeighborhoodList().length;

        expect(OperationsLayer.addNeighborhood(neighborhoodData)).to.be.equal(0);
        lengthAfterAdd = OperationsLayer.getNeighborhoodList().length;
        expect(lengthBeforeAdd).to.be.equal(lengthAfterAdd - 1);
        expect(OperationsLayer.getNeighborhoodList().at(-1).median_value).to.be.equal(360000);
        expect(OperationsLayer.getNeighborhoodList().at(-1).id).to.be.equal(lastID + 1);
    })
});

describe("operations.updateNeighborhood function", () => {
	    
    it("Should update the neighborhood with the specified data and id in neighborhoodList", () => {
        neighborhoodData = [360000, 50000, 50, 3000, 1000, 30000, 2000, 38, -122, 4206.81187, 544221.0324, 723064.4512, 53978.76396, 21266.94106, 9];
        expect(OperationsLayer.updateNeighborhood(neighborhoodData)).to.be.equal(0);
        expect(OperationsLayer.getNeighborhoodList().at(8).median_value).to.be.equal(360000);
        expect(OperationsLayer.getNeighborhoodList().at(8).id).to.be.equal(9);
    })
    it("Should fail if we attempt to update a neighborhood with an invalid id", () => {
        neighborhoodData = [360000, 50000, 50, 3000, 1000, 30000, 2000, 38, -122, 4206.81187, 544221.0324, 723064.4512, 53978.76396, 21266.94106, -1];
        expect(OperationsLayer.updateNeighborhood(neighborhoodData)).to.be.equal(-1);
    })
});