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
})

describe("Save function with edits", () => { 
    it("Should have 20640 rows still", () => {
        let data = csv.load("./California_Houses_Backup.csv")
        expect(data.length).to.be.equal(20640)
    })
    it("Should have a value of 452602 as a median value in row with ID 4 when updated", () => {
        OperationsLayer.updateNeighborhood([452602,5.6431,52,1274,235,558,219,37.85,-122.25,7768.086571,555194.2661,734095.2907,65287.13841,18031.04757,4])
        let data = csv.load("./California_Houses_Backup.csv")
        expect(data[3].median_value).to.be.equal("452602")
        //Reset data
        OperationsLayer.updateNeighborhood([341300,5.6431,52,1274,235,558,219,37.85,-122.25,7768.086571,555194.2661,734095.2907,65287.13841,18031.04757,4])
    })
    it("Should have a length of 20641 after adding a new neighborhood", () => {
        const newNeighborhood = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        OperationsLayer.addNeighborhood(newNeighborhood)
        let data = csv.load("./California_Houses_Backup.csv")
        expect(data.length).to.be.equal(20641)
        expect(data[20640].median_value).to.be.equal("0")
        OperationsLayer.deleteNeighborhood(20641)
        console.log(OperationsLayer.getNeighborhoodList()[20640])
    })
})