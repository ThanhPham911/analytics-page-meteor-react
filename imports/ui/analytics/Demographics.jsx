import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

import AgeGroup from './AgeGroup.jsx';
import Loading from '../Loading.jsx';

export default class Demographics extends Component {

    constructor(props) {
        super(props);

        this.state = {
            Mac : [],
            loading : false
        }

        this.handleData = this.handleData.bind(this);

    }

    componentDidMount() {
        this.handleData(this.props);
        this._isMounted = true;
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.params != nextProps.params){
            this.handleData(nextProps);
        }

    }

    componentWillUnmount(){
        this._isMounted = false;
    }

    handleData(props){
        this.setState({
            loading : true
        })
        var that = this;

        Meteor.call('analytics.getMac',props.params.dateQuery,props.params.hotspot,props.params.project, function(er, rs){
            //rs = ["C0:9F:05:23:20:25", "B0:47:BF:43:BD:E2", "14:1F:78:55:2F:2B", "5C:F8:A1:81:9B:DC"];
            if(that._isMounted){
                that.setState({
                    Mac : rs,
                    loading : false
                })
            }
        })
    }

    render(){
        return (
            <div className="row">

                <div className="col-md-3" >
                    {this.state.loading ? (
                        <Loading />
                    ) : ''
                    }
                    <AgeGroup Mac={this.state.Mac} display={this.state.loading}/>
                </div>
                
            </div>
        )
    }
}
