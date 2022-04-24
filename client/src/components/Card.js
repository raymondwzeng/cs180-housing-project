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
            isEditMode: false,
            _median_value: props._median_value,
            _median_age: props._median_age,
            _median_income: props._median_income,
            _total_bedrooms: props._total_bedrooms,
            _population: props._population,
            _households: props._households,
            _latitude: props._latitude,
            _longitude: props._longitude,
            _distance_to_coast: props._distance_to_coast,
            _distance_to_LA: props._distance_to_LA,
            _distance_to_SD: props._distance_to_SD,
            _distance_to_SF: props._distance_to_SF,
            _distance_to_SJ: props._distance_to_SJ
        }
        console.log(props)
        this.toggleState = this.toggleState.bind(this) //Bind the state, allowing toggleState to actually interact with the component's state
        this.changeValue = this.changeValue.bind(this)
    }

    toggleState() {
        this.setState({
            isEditMode: !this.state.isEditMode
        })
    }

    changeValue(attributeName, value) {
        let currentState = this.state
        try {
            console.log(currentState[attributeName])
            currentState[attributeName] = value
        } catch (e) {
            console.warn(e)
        }
        this.setState(currentState)
    }

    render() {
        return <div className="card" key={this.props.key}>
                <div id='keyInfo'>
                    <div id='homeValue'>${this.props._median_value}</div> @
                    <div id='location'>({this.props._latitude}, {this.props._longitude}), closest to</div>
                    <div id='metro'>{this.props._closest_metro}</div>
                    <img id='dropdown-arrow' className={this.state.isEditMode ? `down` : `up`}  src="/dropdown_arrow.png" alt="dropdown arrow" onClick={this.toggleState}/>
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
                    <EditText id="median_value" name="Median Value" value={this.state._median_value} onChange={(e) => this.changeValue("_median_value", e.target.value)}></EditText>
                    <EditText id="median_income" name="Median Income" value={this.state._median_income} onChange={(e) => this.changeValue("_median_income", e.target.value)}></EditText>
                    <EditText id="median_age" name="Median Age" value={this.state._median_age} onChange={(e) => this.changeValue("_median_age", e.target.value)}></EditText>
                    <EditText id="total_bedrooms" name="Total Rooms" value={this.state._total_bedrooms} onChange={(e) => this.changeValue("_total_bedrooms", e.target.value)}></EditText>
                    <EditText id="population" name="Population" value={this.state._population} onChange={(e) => this.changeValue("_population", e.target.value)}></EditText>
                    <EditText id="households" name="Households" value={this.state._households} onChange={(e) => this.changeValue("_households", e.target.value)}></EditText>
                    <EditText id="latitude" name="Latitude" value={this.state._latitude} onChange={(e) => this.changeValue("_latitude", e.target.value)}></EditText>
                    <EditText id="longitude" name="Longitude" value={this.state._longitude} onChange={(e) => this.changeValue("_longitude", e.target.value)}></EditText>
                    <EditText id="distance_to_coast" name="Distance to Coast" value={this.state._distance_to_coast} onChange={(e) => this.changeValue("_distance_to_coast", e.target.value)}></EditText>
                    <EditText id="distance_to_LA" name="Distance to LA" value={this.state._distance_to_LA} onChange={(e) => this.changeValue("_distance_to_LA", e.target.value)}></EditText>
                    <EditText id="distance_to_SD" name="Distance to SD" value={this.state._distance_to_SD} onChange={(e) => this.changeValue("_distance_to_SD", e.target.value)}></EditText>
                    <EditText id="distance_to_SJ" name="Distance to SJ" value={this.state._distance_to_SJ} onChange={(e) => this.changeValue("_distance_to_SJ", e.target.value)}></EditText>
                    <EditText id="distance_to_SF" name="Distance to SF" value={this.state._distance_to_SF} onChange={(e) => this.changeValue("_distance_to_SF", e.target.value)}></EditText>
                </div>
            </div>
        </div>
    }
}

export default Card