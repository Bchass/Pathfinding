import React, {Component} from 'react';
import './Node.css';



export default class Node extends Component{

    render(){
        const{
            columns,
            rows,
        } = this.props;

        return(
            <div
            id={`node-${rows}-${columns}`}
            ></div>
        )
    }
}