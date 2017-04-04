import React, { Component } from 'react';

export default class Loading extends Component {

    render(){
        var style = {
            "color": "#32d2c9",
            "textAlign" : "center"
        }
        return (
            <div className="row">
                <div className="col-sm-12">
                    <section className="panel">
                        <div className="panel-body">
                            <div className="loading" style={style}>
                                <i className="fa fa-spinner fa-pulse fa-3x" ></i>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        )
    }

}
