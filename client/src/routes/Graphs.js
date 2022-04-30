/*
    Graphs.js

    The place where we will be comparing and contrasting various columns
*/

import { GlyphSeries, XYChart, Tooltip } from "@visx/xychart"
import { Component } from "react";
import Dropdown from "../components/Dropdown"

const items = ["1", "2", "3"]

const data1 = [
    { x: '2020-01-01', y: 50 },
    { x: '2020-01-02', y: 10 },
    { x: '2020-01-03', y: 20 },
  ];
  
  const data2 = [
    { x: '2020-01-04', y: 30 },
    { x: '2020-01-06', y: 40 },
    { x: '2020-01-05', y: 80 },
  ];

  const data3 = [
    { x: '2020-01-02', y: 30 },
    { x: '2020-01-03', y: 60 },
    { x: '2020-01-08', y: 80 },
  ];
  
  const accessors = {
    xAccessor: d => d.x,
    yAccessor: d => d.y,
  };

class Graph extends Component{
    constructor(props) {
        super(props)
        this.state = {
            selectedData: data1
        }

        this.changeSelectedData = this.changeSelectedData.bind(this)
    }

    changeSelectedData(event) {
        let newSelectedData
        console.log(event.target.innerText)
        switch(event.target.innerText) {
            case "1":
                newSelectedData = data1
                break;
            case "2":
                newSelectedData = data2
                break;
            case "3":
                newSelectedData = data3
                break;
            default:
                newSelectedData = data1
        }
        this.setState({
            selectedData: newSelectedData
        })
    }


    render() {
        return(
        <div>
            <h3>Choose a column to compare against median housing:</h3>
            <Dropdown items={items} changed={this.changeSelectedData}/>

            <div id="graphs">
                {/* <XYChartTest/> */}
                <XYChart height={300} xScale={{ type: 'band' }} yScale={{ type: 'linear' }}>
                    <GlyphSeries data={this.state.selectedData} xAccessor={accessors.xAccessor} yAccessor={accessors.yAccessor}/>
                    {/* <AnimatedAxis orientation="bottom" /> */}
                    <Tooltip
                        snapTooltipToDatumX
                        snapTooltipToDatumY
                        showVerticalCrosshair
                        showSeriesGlyphs
                        renderTooltip={({ tooltipData, colorScale }) => (
                            <div>
                            <div style={{ color: colorScale(tooltipData.nearestDatum.key) }}>
                                {tooltipData.nearestDatum.key}
                            </div>
                            {accessors.xAccessor(tooltipData.nearestDatum.datum)}
                            {', '}
                            {accessors.yAccessor(tooltipData.nearestDatum.datum)}
                            </div>
                        )}/>
                    {/* TODO: Fill out */}
                </XYChart>
            </div>
        </div>
    )}
}

export default Graph