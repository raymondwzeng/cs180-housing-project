
/*
A card component that will serve as the basis for each individual entry within our spreadsheet.
*/

//TODO: Figure out how to handle double click to edit individual field. Or maybe just have a simple toggle - that might be easier.

import './Card.css'
import EditText from './EditText'
import { useState } from 'react'

function Card(props) {

    return(
        <div className="card" key={props.key} onClick={props.onClick}>
            {/* <div className="cardInner"> */}
            {/* {props._median_value + ' | ' + props._median_income + ' | ' + props._median_age + ' | ' + props._total_rooms + ' | ' + props._total_bedrooms + ' | ' + props._population + ' | ' + props._households + ' | ' + props._latitude + ' | ' + props._longitude + ' | '  + props._distance_to_coast + ' | ' + props._distance_to_LA + ' | ' + props._distance_to_SD + ' ' + props._distance_to_SF + ' | ' + props._distance_to_SJ + ' | ' + props._closest_metro} */}
                <div id='keyInfo'>
                    <div id='homeValue'>${props._median_value}</div> @
                    <div id='location'>({props._latitude}, {props._longitude}), closest to</div>
                    <div id='metro'>{props._closest_metro}</div>
                </div>
                <div id='aboutTheNeighborhood'>
                    <div>Population: {props._population}</div> |
                    <div>{props._households} households with {props._total_bedrooms} bedrooms</div>
                </div>
                <div id='aboutTheOwners'>
                    <div>Median income: ${(props._median_income * 10000).toPrecision(5)}</div> |
                    <div>Median age: {props._median_age}</div>
                </div>
            {/* </div> */}
            <div id="editCard">{/*TODO: Fill this in, and display: NONE while doing so.*/}
                <div id='header'>Edit Information</div>
                <div>
                    {/* TODO: Set onchange */}
                    <EditText id="median_value" name="Median Value" value={props._median_value}></EditText>
                    <EditText id="median_income" name="Median Income" value={props._median_income}></EditText>
                    <EditText id="median_age" name="Median Age" value={props._median_age}></EditText>
                    <EditText id="total_bedrooms" name="Total Rooms" value={props._total_bedrooms}></EditText>
                    <EditText id="population" name="Population" value={props._population}></EditText>
                    <EditText id="households" name="Households" value={props._households}></EditText>
                    <EditText id="latitude" name="Latitude" value={props._latitude}></EditText>
                    <EditText id="longitude" name="Longitude" value={props._longitude}></EditText>
                    <EditText id="distance_to_coast" name="Distance to Coast" value={props._distance_to_coast}></EditText>
                    <EditText id="distance_to_LA" name="Distance to LA" value={props._distance_to_LA}></EditText>
                    <EditText id="distance_to_SD" name="Distance to SD" value={props._distance_to_SD}></EditText>
                    <EditText id="distance_to_SJ" name="Distance to SJ" value={props._distance_to_SJ}></EditText>
                    <EditText id="distance_to_SF" name="Distance to SF" value={props._distance_to_SF}></EditText>
                </div>
            </div>
        </div>
    )
}

export default Card