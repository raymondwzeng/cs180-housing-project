const neighborhood = require('../neighborhood')
const { expect } = require('chai')

describe("Testing neighborhood class median value getter", () => {
    let data = new neighborhood([452600,8.3252,41,880,129,322,126,37.88,-122.23,9263.04077285038,556529.1583418,735501.80698384,67432.5170008434,21250.2137667799])
    it("Checking median_value getter, should read 452600", () => {
        expect(data.median_value).to.be.equal(452600)
    })
    it("Testing neighborhood class median income getter", () => {

        expect(data.median_income).to.be.equal(8.3252);
    })
})