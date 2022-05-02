import { Component } from "react";
import App, { defaultHeaders } from "../App";
import EditAttributes from "./EditAttributes";

class AddCard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isEnabled: false,
            _median_value: 0,
            _median_income: 0,
            _median_age: 0,
            _total_rooms: 0,
            _total_bedrooms: 0,
            _population: 0,
            _households: 0,
            _latitude: 0,
            _longitude: 0,
            _distance_to_coast: 0,
            _distance_to_LA: 0,
            _distance_to_SD: 0,
            _distance_to_SJ: 0,
            _distance_to_SF: 0
        }
        this.toggleState = this.toggleState.bind(this)
        this.submitToAPI = this.submitToAPI.bind(this)
        this.changeValue = this.changeValue.bind(this)
    }

    toggleState() {
        this.setState({
            isEnabled: !this.state.isEnabled
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

    submitToAPI() {
        const sendState = this.state
        delete sendState["isEnabled"]
        fetch('http://localhost:4000/api/cards', {
            method: 'POST',
            headers: defaultHeaders,
            body: JSON.stringify({...sendState})})
            .then(response => response.json())
            .then(responseJSON => console.log(responseJSON)) //TODO: Update the set of cards.
        App.displayAllData(App.fetchAllData())
    }

    render() {
        return (
            <div className="card">
                <div onClick={this.toggleState} className={this.state.isEnabled ? `hidden` : `visible`}>Add a new entry...</div>
                <div className={this.state.isEnabled ? `visible` : `hidden`}>
                    <EditAttributes {...this.state} onChange={(e) => this.changeValue(e.target.id, e.target.value)}/>
                    <button onClick={this.submitToAPI}>Create</button>
                    <button onClick={this.toggleState}>Cancel</button>
                </div>
            </div>
        )
    }
}


export default AddCard