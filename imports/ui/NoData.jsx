import React, { Component } from 'react';

export default class NoData extends Component {

    render(){
        var style = {
            "textAlign" : "center"
        }
        var mini = {
            float : "none",
            marginRight : 0
        }
        var st = {
            "display" : "block"
        }
        var tt = {
            "display" : "block",
            "fontSize" : "1.5em"
        }
        return (
            <div className="mini-stat clearfix" style={style}>
                <span className="mini-stat-icon orange" style={mini}><i className="fa fa-database"></i></span>
                <span style={st}>
                        <b>No Data</b>
                </span>
                {this.props.title ?(
                    <span style={tt}>{this.props.title}</span>
                ):''}
            </div>
        )
    }

}
