const { OperationsLayer } = require('./operations')

function filterByAll(constraintArray) {
	return OperationsLayer.filterByAll(constraintArray);
}

exports.filterByAll = filterByAll