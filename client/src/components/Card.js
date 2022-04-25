/*
A card component that will serve as the basis for each individual entry within our spreadsheet.

Note: Unlike the other components throughout the app, this one is class based.
*/

import './Card.css'
import EditText from './EditText'
import { Component } from 'react'
import EditAttributes from './EditAttributes'

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
        this.toggleState = this.toggleState.bind(this) //Bind the state, allowing toggleState to actually interact with the component's state
    }

    toggleState() {
        this.setState({
            isEditMode: !this.state.isEditMode
        })
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
                <EditAttributes {...this.props}/>
                <div id='options-div'>
                        <button onClick={() => this.props.updateData(this.props._id, this.state)}>Update data</button>
                        <button onClick={() => this.props.deleteEntry(this.props._id)}>Delete entry</button>
                </div>
            </div>
        </div>
    }
}

export default Card