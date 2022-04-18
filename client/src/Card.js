
/*
A card component that will serve as the basis for each individual entry within our spreadsheet.
*/

//TODO: Figure out how to handle double click to edit individual field. Or maybe just have a simple toggle - that might be easier.

import './Card.css'

function Card(props) {
    return(
        <div className="card" key={props.key}>
            <div className="cardInner">
            {props._median_value + ' | ' + props._median_income + ' | ' + props._median_age + ' | ' + props._total_rooms + ' | ' + props._total_bedrooms + ' | ' + props._population + ' | ' + props._households + ' | ' + props._latitude + ' | ' + props._longitude + ' | '  + props._distance_to_coast + ' | ' + props._distance_to_LA + ' | ' + props._distance_to_SD + ' ' + props._distance_to_SF + ' | ' + props._distance_to_SJ + ' | ' + props._closest_metro}
            </div>
        </div>
    )
}

export default Card