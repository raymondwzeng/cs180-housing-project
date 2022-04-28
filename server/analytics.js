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
			for(int i=0;i<list.length;i++){
				column.push(list[i].median_value);
			}
			break;
		case 2:
			for(int i=0;i<list.length;i++){
				column.push(list[i].median_income);
			}
			break;
		case 3:
			for(int i=0;i<list.length;i++){
				column.push(list[i].median_age);
			}
			break;
		case 4:
			for(int i=0;i<list.length;i++){
				column.push(list[i].total_rooms);
			}
			break;
		case 5:
			for(int i=0;i<list.length;i++){
				column.push(list[i].total_bedrooms);
			}
			break;
		case 6:
			for(int i=0;i<list.length;i++){
				column.push(list[i].population);
			}
			break;
		case 7:
			for(int i=0;i<list.length;i++){
				column.push(list[i].households);
			}
			break;
		case 8:
			for(int i=0;i<list.length;i++){
				column.push(list[i].latitude);
			}
			break;
		case 9:
			for(int i=0;i<list.length;i++){
				column.push(list[i].longitude);
			}
			break;
		case 10:
			for(int i=0;i<list.length;i++){
				column.push(list[i].distance_to_coast);
			}
			break;
		case 11:
			for(int i=0;i<list.length;i++){
				column.push(list[i].distance_to_LA);
			}
			break;
		case 12:
			for(int i=0;i<list.length;i++){
				column.push(list[i].distance_to_SD);
			}
			break;
		case 13:
			for(int i=0;i<list.length;i++){
				column.push(list[i].distance_to_SJ);
			}
			break;
		case 14:
			for(int i=0;i<list.length;i++){
				column.push(list[i].distance_to_SF);
			}
			break;
		case 15:
			for(int i=0;i<list.length;i++){
				column.push(list[i].id);
			}
			break;
	}
	return column;
}

exports.filterByAll = filterByAll