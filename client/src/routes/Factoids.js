/*
Factoids page! Should contain some interesting answers to some questions we want answered.
*/

import Navbar from "../components/navbar";
import "./Factoids.css"
import defaultHeaders from "../routes/Data.js"
import Card from "../components/Card.js"
import { Component } from "react";

export default class Factoids extends Component {
    //TODO: Remove mock data getter
    async postFuncMock() {
        try {
            let response = await fetch('http://localhost:4000/api/neighborhoodList', {
                method: 'POST',
                headers: defaultHeaders,
                body: JSON.stringify({
                    firstParam: "MOCK TEST PLEASE REMOVE BEFORE PROD"
                })
            })
    
            //turn the POST response into a json file, and return the firstParam
    
            let data = await response.json()
            for (var i = 0; i < data.length; i++) {
                data[i].key = data[i]._id
                // container.push(data[i])
            }
            return data
        }
        catch (error) {
            console.error("ERROR: No response from server. Please check if server is running.");
            return "ERROR: No Response From Server";
        }
    }

    constructor(props) {
        super(props)
        this.state = Object.assign({ ...props }, {cardContainer: []})
        this.postFuncMock().then(data => {
            this.state.cardContainer = data
            this.forceUpdate()
        })
    }

render() {
    return (<div>
        <Navbar />
        <h2>Top 10 Neighborhoods...</h2>
        <div id="3-questions-answered" className="flex-horizontal">
            <div className="column-grow align-center">
                <h3>By Highest Median House Price</h3>
                {
                    this.state.cardContainer.slice(0, 10).map(element => {
                        return <Card {...element} editingEnabled={false} />
                    })
                }
            </div>
            <div className="column-grow">
                <h3>By Lowest Median House Price</h3>
                {
                    this.state.cardContainer.slice(0, 10).map(element => {
                        return <Card {...element} editingEnabled={false} />
                    })
                }
            </div>
            <div className="column-grow">
                <h3>By Closest Distance to Coast</h3>
                {
                    this.state.cardContainer.slice(0, 10).map(element => {
                        return <Card {...element} editingEnabled={false} />
                    })
                }
            </div>
            <div className="column-grow">
                <h3>By Highest Population</h3>
                {
                    this.state.cardContainer.slice(0, 10).map(element => {
                        return <Card {...element} editingEnabled={false} />
                    })
                }
            </div>
        </div>
    </div>)
}
}