import React, {Component} from 'react';
import './Node.css';



export default class Node extends Component{

    render(){
        const{
            columns,Finish,Start,Wall,onMouseDown,onMouseEnter,onMouseUp,rows,
        } = this.props;
        const extraClassName = Finish 
        ? 'node-finish'
        : Start
        ? 'node-start'
        : Wall
        ? 'node-Wall'
        : '';
        return (
            <div
            id={`node-${rows}-${columns}`}
            className={`node ${extraClassName}`}
            onMouseDown={() => onMouseDown(rows,columns)}
            onMouseEnter={() => onMouseEnter(rows,columns)}
            onMouseUp={() => onMouseUp()}
            ></div>
        );
    }
}