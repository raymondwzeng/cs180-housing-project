/*
Factoids page! Should contain some interesting answers to some questions we want answered.
*/

import Navbar from "../components/navbar";
import "./Factoids.css"
import defaultHeaders from "../routes/Data.js"
import Card from "../components/Card.js"
import HousePriceCard from "../components/HousePriceCard.js"
import PopulationCard from "../components/PopulationCard.js";
import DistanceCard from "../components/DistanceCard.js";
import { Component } from "react";

export default class Factoids extends Component {
    /**
     * getColumns
     * 
     * Calls the getColumnByName for each respective method.
     */
    async getColumns() {
        this.getColumnByName('highestMedianValue').then(data => {
            this.setState({
                highestMedianValue: data
            })
        })
        this.getColumnByName('lowestMedianValue').then(data => {
            this.setState({
                lowestMedianValue: data
            })
        })
        this.getColumnByName('closestDistanceToCoast').then(data => {
            this.setState({
                closestDistanceToCoast: data
            })
        })
        this.getColumnByName('highestPopulation').then(data => {
            this.setState({
                highestPopulation: data
            })
        })
    }

    async getColumnByName(name) {
        try {
            const response = await fetch('http://localhost:4000/cache/' + name, {
                method: 'GET',
                headers: defaultHeaders
            }).then(data => data.json())
            return response
        } catch(error) {
            console.error(error)
            return null
        }
    }

    constructor(props) {
        super(props)
        this.state = {
            highestMedianValue: [],
            lowestMedianValue: [],
            closestDistanceToCoast: [],
            highestPopulation: []
        }
    }

    async componentDidMount() {
        await this.getColumns()
    }

render() {
    return (<div>
        <Navbar />
        <h2>Top 10 Neighborhoods...</h2>
        <div id="3-questions-answered" className="flex-horizontal">
            <div className="column-grow align-center">
                <h3>By Highest Median House Price</h3>
                {
                    this.state.highestMedianValue.map((element, index) => {
                        return <HousePriceCard {...element} editingEnabled={false} index={index+1} />
                    })
                }
            </div>
            <div className="column-grow">
                <h3>By Lowest Median House Price</h3>
                {
                    this.state.lowestMedianValue.map((element, index) => {
                        return <HousePriceCard {...element} editingEnabled={false} index={index+1}/>
                    })
                }
            </div>
            <div className="column-grow">
                <h3>By Closest Distance to Coast</h3>
                {
                    this.state.closestDistanceToCoast.map((element, index) => {
                        return <DistanceCard {...element} editingEnabled={false} index={index+1}/>
                    })
                }
            </div>
            <div className="column-grow">
                <h3>By Highest Population</h3>
                {
                    this.state.highestPopulation.map((element, index) => {
                        return <PopulationCard {...element} editingEnabled={false} index={index+1}/>
                    })
                }
            </div>
        </div>
    </div>)
}
}