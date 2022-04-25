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

describe("Save function with edits", () => {
    OperationsLayer.deleteNeighborhood(1)
    it("Should have 20639 rows after deletion", () => {
        let data = csv.load("./California_Houses_Backup.csv")    
        expect(data.length).to.be.equal(20639)
    })
    it("Should have a value of 452602 as a median value in row with ID 4 when updated", () => {
        OperationsLayer.updateNeighborhood([
            452602,      8,     41,
               880,    129,    322,
               126,     37,   -122,
              9263, 556529, 735501,
             67432,  21250,      4
          ])
        let data = csv.load("./California_Houses_Backup.csv")
        expect(data[2].median_value).to.be.equal("452602")
    })
    it("Should have a length of 20640 after adding a new neighborhood", () => {
        const newNeighborhood = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        OperationsLayer.addNeighborhood(newNeighborhood)
        let data = csv.load("./California_Houses_Backup.csv")
        expect(data.length).to.be.equal(20640)
        expect(data[20639].median_value).to.be.equal("0")
    })
})