import { Component } from "react"
import EditAttributes from "./EditAttributes"

class EditCard extends Component {
    render() {
        return (<div>
            <div id="editCard" className={this.props.isEditMode ? `blank` : `hidden`}>{/*TODO: Fill this in, and display: NONE while doing so.*/}
            <div id='header'>Edit Information</div>
            <EditAttributes {...this.props} onChange={(e) => this.props.changeValue(e.target.id, e.target.value)}/>
            <div id='options-div'>
                <button onClick={this.props.updateData}>Update data</button>
                <button onClick={this.props.deleteEntry}>Delete entry</button>
            </div>
            </div>
        </div>
        )
    }
}

export default EditCard