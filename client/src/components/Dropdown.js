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
            selectedItem: "Select an item",
            showSelection: false
        }
        this.toggleSelectState = this.toggleSelectState.bind(this)
    }

    toggleSelectState() {
        this.setState({
            showSelection: !this.state.showSelection
        })
    }

    render() {
        return(   
        <div className="dropdown-display">
            <div className="select-item" onClick={this.toggleSelectState}>{this.state.selectedItem}</div>
            <div className={this.state.showSelection ? `dropdown-select` : `hidden`}>
                {this.props.items.map(element => {
                    return (<div onClick={this.props.changed}>{element}</div>)
                })}
            </div>
        </div>
    )}
}


export default Dropdown