import React, {Component} from 'react';
import Node from './Node/Node';

import './PathfindingVisualizer.css'

export default class PathfindingVisualizer extends Component{
    constructor(props){
        super(props);
        this.state = {
            nodes: [],
        };
    }


grid() {
    const nodes = [];
    for (let rows = 0; rows < 15; rows++){
        const current = [];
        for(let column = 0; column < 50; column++){
            current.push([]);
        }
        nodes.push(current);
    }
    this.setState({nodes})
}

render(){
    const {nodes} = this.state;
    console.log(nodes)

    return (
        <div className="grid">
            {nodes.map((row, rowID) => {
                return <div>
                    {row.map((node, nodeID) => <Node></Node>)}
                    </div>
                })}
        </div>
    );
}
}