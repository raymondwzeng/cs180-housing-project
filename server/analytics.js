const { OperationsLayer } = require('./operations')
const Neighborhood = require('./neighborhood')

function filterByAll(constraintArray) {
	return OperationsLayer.filterByAll(constraintArray);
}
function getColumn(constraintArray,x){
	let list=OperationsLayer.filterByAll(constraintArray);
	let column=[]
	switch(x){
		case 1:
			list.forEach(element => column.push(parseInt(element.median_value)));
			break;
		case 2:
			list.forEach(element => column.push(parseFloat(element.median_income)));
			break;
		case 3:
			list.forEach(element => column.push(parseInt(element.median_age)));
			break;
		case 4:
			list.forEach(element => column.push(parseInt(element.total_rooms)));
			break;
		case 5:
			list.forEach(element => column.push(parseInt(element.total_bedrooms)));
			break;
		case 6:
			list.forEach(element => column.push(parseInt(element.population)));
			break;
		case 7:
			list.forEach(element => column.push(parseInt(element.households)));
			break;
		case 8:
			list.forEach(element => column.push(parseFloat(element.latitude)));
			break;
		case 9:
			list.forEach(element => column.push(parseFloat(element.longitude)));
			break;
		case 10:
			list.forEach(element => column.push(parseFloat(element.distance_to_coast)));
			break;
		case 11:
			list.forEach(element => column.push(parseFloat(element.distance_to_LA)));
			break;
		case 12:
			list.forEach(element => column.push(parseFloat(element.distance_to_SD)));
			break;
		case 13:
			list.forEach(element => column.push(parseFloat(element.distance_to_SJ)));
			break;
		case 14:
			list.forEach(element => column.push(parseFloat(element.distance_to_SF)));
			break;
		case 15:
			list.forEach(element => column.push(parseInt(element.id)));
			break;
	}
	return column;
}

exports.filterByAll = filterByAll
exports.getColumn = getColumn