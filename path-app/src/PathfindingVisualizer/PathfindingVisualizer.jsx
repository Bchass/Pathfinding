import React, {Component} from 'react';
import Node from './Node/Node';

import './PathfindingVisualizer.css'

// start & finish points
const start_node_rows = 10;
const start_node_columns = 15;
const finish_node_rows = 10;
const finish_node_columns = 35;

export default class PathfindingVisualizer extends Component{
    constructor(){
        super();
        this.state = {
            grid: [],
        };
    }
    // mount grid
    componentDidMount(){
        const grid = baseGrid();
        this.setState({grid});
    }
    // render grid
    render() {
        const{grid} = this.state;
        return(
            <>
            <button>
                Dijkstra's Algorithm
            </button>
            <>
            <button>
                Reset
            </button>
            <div className="grid">
                {grid.map((rows, rowsIdx) => {
                    return(
                        <div key={rowsIdx}>
                            {rows.map((node, nodeIdx)=>{
                                const{rows,columns,Finish,Start,Wall} = node;
                                return(
                                    <Node
                                    key={nodeIdx}
                                    columns = {columns}
                                    Finish = {Finish}
                                    Start = {Start}
                                    Wall = {Wall}

                                    rows={rows}></Node>
                                );
                            })}
                            </div>
                    );
                    
                })}
            </div>
            </>
            </>
        );
}
    
}

// display grid layout
const baseGrid = () => {
    const grid = [];
    for(let rows = 0; rows < 25; rows++){
        const current = [];
        for(let columns = 0; columns < 55; columns++){
            current.push(node(columns,rows));
        }
        grid.push(current);
    }
    return grid;
}

// creates node
const node = (columns,rows) =>{
    return{
        columns,
        rows,
        Start: rows === start_node_rows && columns === start_node_columns,
        Finish: rows === finish_node_rows && columns === finish_node_columns,
        distance: Infinity,
        Vistied: false,
        Wall: false,
        Previous: null,
    }
}