import React, {Component} from 'react';
import './Node.css';



export default class Node extends Component{

    render(){
        const{
            columns,Finish,Start,Wall,rows,
        } = this.props;
        const extraClassName = Finish ? 'node-finish': Start ? 'node-start' : Wall ? 'node-Wall' : '';
        return(
            <div
            id={`node-${rows}-${columns}`}
            className={`node ${extraClassName}`}
            ></div>
        )
    }
}