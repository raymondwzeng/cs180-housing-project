/*
    Graphs.js

    The place where we will be comparing and contrasting various columns
*/

import { GlyphSeries, XYChart, Tooltip, Axis } from "@visx/xychart"
import { Component } from "react";
import Dropdown from "../components/Dropdown"
import { defaultHeaders } from "./Data";

const items = [
    "Median_House_Value", 
    "Median_Income", 
    "Median_Age", 
    "Tot_Rooms",
    "Tot_Bedrooms",
    "Population",
    "Households",
    "Latitude",
    "Longitude",
    "Distance_to_coast",
    "Distance_to_LA",
    "Distance_to_SanDiego",
    "Distance_to_SanJose",
    "Distance_to_SanFrancisco"]

const units = {
    "Median_Income": "(thousands of USD)"
}
  
  const accessors = {
    xAccessor: d => d.x,
    yAccessor: d => d.y,
  };

class Graph extends Component{
    constructor(props) {
        super(props)
        this.state = {
            selectedColumn: "",
            currentData: []
        }
        this.changeSelectedData = this.changeSelectedData.bind(this)
        this.getColumnFromServer = this.getColumnFromServer.bind(this)
    }

    /**
     * getMedianValueFromServer
     * 
     * Shouldn't be executed so many times, but we can figure that out in a future sprint™
     * 
     * @param {Array} newData - The empty data table to fill up. 
     */
    async getMedianValueFromServer(newData) {
        const params = new URLSearchParams({column_name: "Median_House_Value"})
        await fetch(`http://localhost:4000/api/column?${params}`, {
            method: "GET",
            headers: defaultHeaders
        }).then(resp => resp.json())
        .then(responseJSON => {
            responseJSON.forEach(element => {
                newData.push({y: element})
            });
        })
    }

    /**
     * getColumnFromServer
     * 
     * No parameters.
     * TODO: Avoid calling the API twice to get the housing data for median home price (since that's fixed)
     */
    async getColumnFromServer(){
        let newData = []
        this.setState({currentData: []}) //Erase data
        await this.getMedianValueFromServer(newData)
        const params = new URLSearchParams({column_name: this.state.selectedColumn})
        await fetch(`http://localhost:4000/api/column?${params}`, {
            method: "GET",
            headers: defaultHeaders
        }).then(resp => resp.json())
        .then(responseJSON => {
            let index = 0;
            responseJSON.forEach(element => {
                newData[index++].x = element
            })
            this.setState({currentData: newData.slice(0, 2000).sort((a, b) => a.x - b.x)})
        })
    }

    changeSelectedData(event) {
        const innerText = event.target.innerText.replaceAll(" ", "_")
        this.setState({
            selectedColumn: innerText
        })
        this.getColumnFromServer()
    }


    render() {
        return(
        <div>
            <div className="flex-horizontal">
            <div className="big-font small-horizontal-padding">Choose a column to compare against median housing:</div>
            <Dropdown items={items} changed={this.changeSelectedData} selected={this.state.selectedColumn}/>
            </div>

            <div id="graphs">
                <XYChart height={300} xScale={{ type: 'band' }} yScale={{ type: 'linear' }}>
                    <GlyphSeries data={this.state.currentData} {...accessors}/>
                    <Axis key={`axis-bottom`} label={this.state.selectedColumn.replaceAll("_", " ") + (units[this.state.selectedColumn] != null ? units[this.state.selectedColumn] : "")} orientation="bottom"/>
                    <Axis key={`axis-side`} label="Median House Value" orientation="left"/>
                    <Tooltip
                        showSeriesGlyphs
                        renderTooltip={({ tooltipData, _ }) => (
                            <div>
                            {accessors.xAccessor(tooltipData.nearestDatum.datum)}
                            {', '}
                            {accessors.yAccessor(tooltipData.nearestDatum.datum)}
                            </div>
                        )}/>
                </XYChart>
            </div>
        </div>
    )}
}

export default Graph