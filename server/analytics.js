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
			for(let i=0;i<list.length;i++){
				column.push(parseInt(list[i].median_value));
			}
			break;
		case 2:
			for(let i=0;i<list.length;i++){
				column.push(parseFloat(list[i].median_income));
			}
			break;
		case 3:
			for(let i=0;i<list.length;i++){
				column.push(parseInt(list[i].median_age));
			}
			break;
		case 4:
			for(let i=0;i<list.length;i++){
				column.push(parseInt(list[i].total_rooms));
			}
			break;
		case 5:
			for(let i=0;i<list.length;i++){
				column.push(parseInt(list[i].total_bedrooms));
			}
			break;
		case 6:
			for(let i=0;i<list.length;i++){
				column.push(parseInt(list[i].population));
			}
			break;
		case 7:
			for(let i=0;i<list.length;i++){
				column.push(parseInt(list[i].households));
			}
			break;
		case 8:
			for(let i=0;i<list.length;i++){
				column.push(parseFloat(list[i].latitude));
			}
			break;
		case 9:
			for(let i=0;i<list.length;i++){
				column.push(parseFloat(list[i].longitude));
			}
			break;
		case 10:
			for(let i=0;i<list.length;i++){
				column.push(parseFloat(list[i].distance_to_coast));
			}
			break;
		case 11:
			for(let i=0;i<list.length;i++){
				column.push(parseFloat(list[i].distance_to_LA));
			}
			break;
		case 12:
			for(let i=0;i<list.length;i++){
				column.push(parseFloat(list[i].distance_to_SD));
			}
			break;
		case 13:
			for(let i=0;i<list.length;i++){
				column.push(parseFloat(list[i].distance_to_SJ));
			}
			break;
		case 14:
			for(let i=0;i<list.length;i++){
				column.push(parseFloat(list[i].distance_to_SF));
			}
			break;
		case 15:
			for(let i=0;i<list.length;i++){
				column.push(parseInt(list[i].id));
			}
			break;
	}
	return column;
}

exports.filterByAll = filterByAll
exports.getColumn = getColumn