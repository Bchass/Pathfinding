import React, {Component} from 'react';
import Node from './Node/Node';
import './PathfindingVisualizer.css';
import { Dijkstra, shortestpath } from '../Algorithms/Dijkstra';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

// start & finish points
const start_node_rows = 10;
const start_node_columns = 15;
const finish_node_rows = 10;
const finish_node_columns = 35;

// measure in ms -> secs
const ms = require('pretty-ms');

// button styling
const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }));

// button class
export class ContainedButtons {
    constructor() {
        const classes = useStyles();
    }
}

// main class
export default class PathfindingVisualizer extends Component{
    constructor(props){
        super(props);
        this.state = {
            grid: [],
            mousePressed: false,
            Time: 0
        };
    }
    // TODO: Timer stops at finish node
    // Record time of algorithm
    tick(){
        this.interval = setInterval(() =>{
            this.setState(prevState => ({
                Time: prevState.Time + 1
            }));
        }, 750);
    }
    // Mount timer
    componentWillMount(){
        clearInterval(this.interval);
    }

    stopTimer(){
        this.setState({isVistied: false})
        clearInterval(this.PathfindingVisualizer)
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

    // TODO: Fix bug with right click 
    // place a node when mouse is pressed
    MouseDown(rows, columns){
        const newGrid = startNewGrid(this.state.grid,rows,columns);
        this.setState({grid: newGrid, mousePressed: true});

    }

    MouseEnter(rows, columns){
        if(!this.state.mousePressed) return;
        const newGrid = startNewGrid(this.state.grid,rows,columns);
        this.setState({grid: newGrid});
    }

    MouseUp(){
        this.setState({mousePressed: false});
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
                document.getElementById(`node-${node.rows}-${node.columns}`).className='node node-shortest';
            }, 50 * i);
        }
    }

    visual(){
        const{grid} = this.state;
        const start_node = grid[start_node_rows][start_node_columns];
        const finish_node = grid[finish_node_rows][finish_node_columns];
        const visited = Dijkstra(grid,start_node,finish_node);
        const shortest = shortestpath(finish_node);
        const Time = this.tick(finish_node);
        this.animate(visited, shortest, Time);
    }

    // TODO: create method for aStar
    // render grid
    render() {
        const{grid, mousePressed} = this.state;
        return(
            <>
            <Button size="small" variant="contained" color="primary"onClick={() => this.visual()}>
                Dijkstra's Algorithm
            </Button>
            <>
            <Button size="small" variant="contained" color="secondary" onClick={this.reset}>Reset
            </Button>
            <Button size="small" variant="contained" onClick={() => this.visual1()}>
                aStar Algorithm
            </Button>
            <div className="grid">
            Time: {ms(this.state.Time)}
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
                                    mousePressed = {mousePressed}
                                    onMouseDown = {(rows, columns) => this.MouseDown(rows, columns)}
                                    onMouseEnter = {(rows, columns) => this.MouseEnter(rows,columns)}
                                    onMouseUp = {() =>  this.MouseUp()}
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
            current.push(cnode(columns,rows));
        }
        grid.push(current);
    }
    return grid;
}

// creates node
const cnode = (columns,rows) =>{
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

// create new nodes for wall
const startNewGrid = (grid, rows, columns) => {
    const newGrid = grid.slice();
    const node = newGrid[rows][columns];
    const newnode = {
        ...node,
        Wall: !node.Wall,
    };
    newGrid[rows][columns] = newnode;
    return newGrid;
    
}