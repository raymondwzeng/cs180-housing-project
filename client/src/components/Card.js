/*
A card component that will serve as the basis for each individual entry within our spreadsheet.

Note: Unlike the other components throughout the app, this one is class based.
*/

import './Card.css'
import { Component } from 'react'
import EditAttributes from './EditAttributes'

class Card extends Component {
    constructor(props) {
        super(props)
        this.state = Object.assign({isEditMode: false}, {...this.props})
        this.toggleState = this.toggleState.bind(this) //Bind the state, allowing toggleState to actually interact with the component's state
        this.changeValue = this.changeValue.bind(this)
    }

    toggleState() {
        this.setState({
            isEditMode: !this.state.isEditMode
        })
    }

    changeValue(attributeName, value) {
        try {
            this.setState({
                [attributeName]: value
            })
        } catch (e) {
            console.warn(e)
        }
    }

    render() {
        return <div className="card" key={this.props.key}>
                <div id='keyInfo' className="column-flex">
                    <div id='homeValue'>${this.props._median_value}</div> @
                    <div id='location'>({this.props._latitude}, {this.props._longitude}), closest to</div>
                    <div id='metro'>{this.props._closest_metro}</div>
                    <img id='dropdown-arrow' className={this.state.isEditMode ? `down` : `up`}  src="/dropdown_arrow.png" alt="dropdown arrow" onClick={this.toggleState}/>
                </div>
                <div id='aboutTheNeighborhood' className="column-flex">
                    <div>Population: {this.props._population}</div> |
                    <div>{this.props._households} households with {this.props._total_bedrooms} bedrooms</div>
                </div>
                <div id='aboutTheOwners' className="column-flex">
                    <div>Median income: ${(this.props._median_income * 10000).toPrecision(5)}</div> |
                    <div>Median age: {this.props._median_age}</div>
                </div>
            <div id="editCard" className={this.state.isEditMode ? `blank` : `hidden`}>{/*TODO: Fill this in, and display: NONE while doing so.*/}
                <div id='header'>Edit Information</div>
                <EditAttributes {...this.state} onChange={(e) => this.changeValue(e.target.id, e.target.value)}/>
                <div id='options-div'>
                        <button onClick={() => this.props.updateData(this.props._id, this.state)}>Update data</button>
                        <button onClick={() => this.props.deleteEntry(this.props._id)}>Delete entry</button>
                </div>
            </div>
        </div>
    }
}

export default Card