const csv = require('../csv')
const { expect } = require('chai')
const { OperationsLayer } = require('../operations')

/*
describe("CSV loading and reading", () => {
    const data = new OperationsLayer()
    it("Should read in exactly 20640 rows", () => {
        expect(data.length).to.be.equal(20640)
    })
    it("Should have a value of 42 in the 9th entry, median_age attribute", () => {
        
           // Note: This is technically wrong in the sense that the values are NOT typed as numbers.
                    //But that's just JS things lmao
        
        expect(data[8]["median_age"]).to.be.equal('42')
    })
})
*/

describe("Load Function", () => {
    let data = csv.load("./California_Houses.csv")
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
    it("Should not read from file that does not exist", () => {
        expect(csv.load('./DNE')).to.be.equal('File not found!')
        
    })
    // it("Should read from a file called ./test", () => {
    //     expect(csv.load('./test')).to.be.not.equal('File not found!')
        
    // })
})
