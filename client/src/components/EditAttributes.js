import { Component } from "react"
import EditText from "./EditText"


class EditAttributes extends Component {
    render() {
        return (
        <div>
            <EditText id="_median_value" name="Median Value" value={this.props._median_value} onChange={this.props.onChange}></EditText>
            <EditText id="_median_income" name="Median Income" value={this.props._median_income} onChange={this.props.onChange}></EditText>
            <EditText id="_median_age" name="Median Age" value={this.props._median_age} onChange={this.props.onChange}></EditText>
            <EditText id="_total_bedrooms" name="Total Rooms" value={this.props._total_bedrooms} onChange={this.props.onChange}></EditText>
            <EditText id="_population" name="Population" value={this.props._population} onChange={this.props.onChange}></EditText>
            <EditText id="_households" name="Households" value={this.props._households} onChange={this.props.onChange}></EditText>
            <EditText id="_latitude" name="Latitude" value={this.props._latitude} onChange={this.props.onChange}></EditText>
            <EditText id="_longitude" name="Longitude" value={this.props._longitude} onChange={this.props.onChange}></EditText>
            <EditText id="_distance_to_coast" name="Distance to Coast" value={this.props._distance_to_coast} onChange={this.props.onChange}></EditText>
            <EditText id="_distance_to_LA" name="Distance to LA" value={this.props._distance_to_LA} onChange={this.props.onChange}></EditText>
            <EditText id="_distance_to_SD" name="Distance to SD" value={this.props._distance_to_SD} onChange={this.props.onChange}></EditText>
            <EditText id="_distance_to_SJ" name="Distance to SJ" value={this.props._distance_to_SJ} onChange={this.props.onChange}></EditText>
            <EditText id="_distance_to_SF" name="Distance to SF" value={this.props._distance_to_SF} onChange={this.props.onChange}></EditText>
        </div>
    )}
}

export default EditAttributes