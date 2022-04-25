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