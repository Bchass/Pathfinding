import React, {Component} from 'react';
import Node from './Node/Node';

import './PathfindingVisualizer.css'

export default class PathfindingVisualizer extends Component{
    constructor(){
        super();
        this.state = {
            grid: [],
        };
    }

    component(){
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
            <div className="grid">
                {grid.map((rows, rowsdx) => {
                    return(
                        <div key={rowsdx}>
                            {rows.map((node, nodedx)=>{
                                const{rows,columns} = node;
                                return(
                                    <Node
                                    key={nodedx}
                                    columns = {columns}

                                    rows={rows}></Node>
                                );
                            })}
                            </div>
                    );
                    
                })}
            </div>
            </>
        );
}
    
}

// display grid layout
const baseGrid = () => {
    const grid = [];
    for(let rows = 0; rows < 20; rows++){
        const current = [];
        for(let columns = 0; columns < 50; columns++){
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
        rows
    }
}