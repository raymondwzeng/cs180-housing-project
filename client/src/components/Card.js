/*
A card component that will serve as the basis for each individual entry within our spreadsheet.

Note: Unlike the other components throughout the app, this one is class based.
*/

import './Card.css'
import EditText from './EditText'
import { Component } from 'react'

class Card extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isEditMode: false
        }
        console.log(props)
        this.toggleState = this.toggleState.bind(this) //Bind the state, allowing toggleState to actually interact with the component's state
    }

    toggleState() {
        this.setState({
            isEditMode: !this.state.isEditMode
        })
    }

    render() {
        return <div className="card" key={this.props.key} onClick={this.toggleState}>
                <div id='keyInfo'>
                    <div id='homeValue'>${this.props._median_value}</div> @
                    <div id='location'>({this.props._latitude}, {this.props._longitude}), closest to</div>
                    <div id='metro'>{this.props._closest_metro}</div>
                </div>
                <div id='aboutTheNeighborhood'>
                    <div>Population: {this.props._population}</div> |
                    <div>{this.props._households} households with {this.props._total_bedrooms} bedrooms</div>
                </div>
                <div id='aboutTheOwners'>
                    <div>Median income: ${(this.props._median_income * 10000).toPrecision(5)}</div> |
                    <div>Median age: {this.props._median_age}</div>
                </div>
            <div id="editCard" className={this.state.isEditMode ? `blank` : `hidden`}>{/*TODO: Fill this in, and display: NONE while doing so.*/}
                <div id='header'>Edit Information</div>
                <div>
                    {/* TODO: Set onchange */}
                    <EditText id="median_value" name="Median Value" value={this.props._median_value}></EditText>
                    <EditText id="median_income" name="Median Income" value={this.props._median_income}></EditText>
                    <EditText id="median_age" name="Median Age" value={this.props._median_age}></EditText>
                    <EditText id="total_bedrooms" name="Total Rooms" value={this.props._total_bedrooms}></EditText>
                    <EditText id="population" name="Population" value={this.props._population}></EditText>
                    <EditText id="households" name="Households" value={this.props._households}></EditText>
                    <EditText id="latitude" name="Latitude" value={this.props._latitude}></EditText>
                    <EditText id="longitude" name="Longitude" value={this.props._longitude}></EditText>
                    <EditText id="distance_to_coast" name="Distance to Coast" value={this.props._distance_to_coast}></EditText>
                    <EditText id="distance_to_LA" name="Distance to LA" value={this.props._distance_to_LA}></EditText>
                    <EditText id="distance_to_SD" name="Distance to SD" value={this.props._distance_to_SD}></EditText>
                    <EditText id="distance_to_SJ" name="Distance to SJ" value={this.props._distance_to_SJ}></EditText>
                    <EditText id="distance_to_SF" name="Distance to SF" value={this.props._distance_to_SF}></EditText>
                </div>
            </div>
        </div>
    }
}

export default Card