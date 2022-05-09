/*
    Graphs.js

    The place where we will be comparing and contrasting various columns
*/

import { GlyphSeries, XYChart, Tooltip, Axis, BarSeries } from "@visx/xychart"
import { Component } from "react";
import Dropdown from "../components/Dropdown"
import { defaultHeaders } from "./Data";
import Navbar from '../components/navbar';

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
            currentData: [],
            bucketifiedData: []
                /*
                    Schema of bucketifiedData:
                    "bucketMin-bucketMax": [array of values]
                */
        }
        this.changeSelectedData = this.changeSelectedData.bind(this)
        this.getColumnFromServer = this.getColumnFromServer.bind(this)
        this.bucketify = this.bucketify.bind(this)
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
            this.bucketify(newData.sort((a, b) => a.x - b.x)) //A hacky solution to sort twice, but we want as much data for this.
        })
    }

    /**
     * Turns the column and moves them into 10 buckets. Bucket size is even, calculated by taking the range of the parameters.
     * @param {Array} newData - The new data to add in. Passed because the state might not update fast enough.
     */
    bucketify(newData) {
        const min = newData[0].x
        const max = newData[newData.length - 1].x
        const range = (max - min)
        const numberOfBuckets = 10 //Can change later
        let currentBucketMin = min
        let currentBucketMax = min + (range / numberOfBuckets)
        let bucketIndex = 0
        let bucketDictState = String(currentBucketMin.toFixed(2))
        let bucketState = new Map()
        bucketState.set(bucketDictState, [])
        newData.forEach(element => { //Since they're already sorted, we can add them into each bucket or increase the bucket 
            while(element.x >= currentBucketMax) {
                currentBucketMin = min + ((range / numberOfBuckets) * bucketIndex)
                currentBucketMax = min + ((range / numberOfBuckets) * (bucketIndex + 1))
                bucketDictState = String(currentBucketMin.toFixed(2))
                bucketState.set(bucketDictState, [])
                bucketIndex++
            }
            bucketState.get(bucketDictState).push(element)
        })
        // console.log(bucketState)
        let bucketifiedData = []
        bucketState.forEach((key, value) => {
            let newData = {x: Number(value), y: key.length}
            bucketifiedData.push(newData)
        })
        // console.log(bucketifiedData)
        this.setState({
            bucketifiedData: bucketifiedData
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
            <div id='navigation-bar'>
                <Navbar />
            </div>
            <h1>1990 Housing Data Viewer - Graphs</h1>
            <div className="flex-horizontal">
            <div className="big-font small-horizontal-padding">Choose a column to compare against median housing:</div>
            <Dropdown items={items} changed={this.changeSelectedData} selected={this.state.selectedColumn}/>
            </div>

            <div id="graphs">
                <XYChart height={300} xScale={{ type: 'band' }} yScale={{ type: 'linear' }}>
                    <GlyphSeries dataKey="Scatterplot Data" data={this.state.currentData} {...accessors}/>
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
                <XYChart height={300} xScale={{type: 'band'}} yScale={{type: 'linear'}}>
                    <BarSeries dataKey="Histogram Data" data={this.state.bucketifiedData} {...accessors}/>
                    <Axis key={`axis-bottom`} label={this.state.selectedColumn} orientation="bottom"/>
                    <Axis key={`axis-side`} label="Occurences" orientation="left"/>
                    <Tooltip
                        showSeriesGlyphs
                        renderTooltip={({tooltipData, _}) => (
                                <div>
                                    {'Value: '}
                                    {accessors.xAccessor(tooltipData.nearestDatum.datum)}
                                    {'\n Occurrences: '}
                                    {accessors.yAccessor(tooltipData.nearestDatum.datum)}
                                </div>
                        )}/>
                </XYChart>
            </div>
        </div>
    )}
}

export default Graph