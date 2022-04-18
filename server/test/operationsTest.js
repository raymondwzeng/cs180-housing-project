const operations = require('../operations');
const csv = require('../csv');
const { expect } = require('chai');

describe("operations.getNeighborhoodList function", () => {
	const operationsNeighborhoodList = operations.getNeighborhoodList();
	const csvNeighborhoodList = csv.load();

	//operationsNeighborhoodList should be identical to the one returned by the load() function
	it("Should return an exact copy of the csv neighborhoodList", () => {
        expect(operationsNeighborhoodList).to.eql(csvNeighborhoodList); //deep equality assertion
    })
    it("Should read in exactly 20640 rows", () => {
        expect(operationsNeighborhoodList.length).to.be.equal(20640);
    })
    it("Should have a value of 42 in the 9th entry, median_age attribute", () => {
        /*
            Note: This is technically wrong in the sense that the values are NOT typed as numbers.
                    But that's just JS things lmao
        */
        expect(operationsNeighborhoodList[8]["median_age"]).to.be.equal('42');
    })
});