/*
    Dropdown.js

    A dropdown menu react component. Clickable by default. Takes in a list of items in props.items by default.
*/

import { Component } from "react"
import "./Dropdown.css"

class Dropdown extends Component{
    constructor(props) {
        super(props)
        this.state = {
            selectedItem: "",
            showSelection: false
        }
        this.toggleSelectState = this.toggleSelectState.bind(this)
        this.changeSelected = this.changeSelected.bind(this)
    }

    toggleSelectState() {
        this.setState({
            showSelection: !this.state.showSelection
        })
    }

    changeSelected(event) {
        this.setState({
            selectedItem: event.target.innerText.replaceAll(" ", "_")
        })
        this.props.changed(event) //Call the passed in changed event, but we want to do a bit more.
    }

    render() {
        return(   
        <div className="dropdown-display">
            <div className="select-item" onClick={this.toggleSelectState}>Select an item...</div>
            <div className={this.state.showSelection ? `dropdown-select` : `hidden`}>
                {this.props.items.map(element => {
                    return (<div key={element} className={element === this.state.selectedItem ? "chosenItem" : ""} onClick={(event) => this.changeSelected(event)}>{element.replaceAll("_", " ")}</div>)
                })}
            </div>
        </div>
    )}
}


export default Dropdown