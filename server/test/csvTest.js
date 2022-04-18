const csv = require('../csv')
const { expect } = require('chai')

describe("CSV loading and reading", () => {
    const data = csv.load()
    it("Should read in exactly 20640 rows", () => {
        expect(data.length).to.be.equal(20640)
    })
    it("Should have a value of 42 in the 9th entry, median_age attribute", () => {
        /*
            Note: This is technically wrong in the sense that the values are NOT typed as numbers.
                    But that's just JS things lmao
        */
        expect(data[8]["median_age"]).to.be.equal('42')
    })
})