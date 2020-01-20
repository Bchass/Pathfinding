import React, {Component} from 'react';
import Node from './Node/Node';

import './PathfindingVisualizer.css'
import { Dijkstra, shortestpath } from '../Algorithms/Dijkstra';

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
        //this.baseGrid = this.state
    }

    // reload the page for reset
    reset = () =>{
        window.location.reload(false);
    }
    // mount grid
    componentDidMount(){
        const grid = baseGrid();
        this.setState({grid});
    }

    animate(visited,shortest){
        for(let i = 0; i <= visited.length; i++){
            if(i === visited.length){
                setTimeout(() => {
                    this.animate_shortest(shortest);
                }, 20 * i);
                return;
            }
            setTimeout(()=> {
                const node = visited[i];
                document.getElementById(`node-${node.rows}-${node.columns}`).className='node node-visited';
            }, 20 * i);
        }
    }

    animate_shortest(shortest){
        for(let i = 0; i < shortest.length; i++){
            setTimeout(()=> {
                const node = shortest[i];
                document.getElementById(`node-${node.rows}-${node.columns}`).className='node node-shortest'
            }, 50 * i);
        }
    }

    visual(){
        const{grid} = this.state;
        const start_node = grid[start_node_rows][start_node_columns];
        const finish_node = grid[finish_node_rows][finish_node_columns];
        const visited = Dijkstra(grid,start_node,finish_node);
        const shortest = shortestpath(finish_node);
        this.animate(visited, shortest);
    }

  
    // render grid
    render() {
        const{grid} = this.state;
        return(
            <>
            <button onClick={() => this.visual()}>
                Dijkstra's Algorithm
            </button>
            <>
            <button onClick={this.reset}>Reset</button>
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
        isVistied: false,
        Wall: false,
        previous_node: null,
    }
}