import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

import NumberFormat from 'react-number-format';
import Loading from '../Loading.jsx';

export default class Visits extends Component {

    constructor(props) {
        super(props);

        this.state = {
            Visits: 0,
            loading: false
        }


        this.handleData = this.handleData.bind(this);

    }

    componentDidMount() {
        this._isMounted = true;
        this.handleData(this.props);
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

        Meteor.call('analytics.Visits',props.params.dateQuery,props.params.hotspot,props.params.project,props.params.events, function(er, rs){
            if(that.props.handleVisit){
                that.props.handleVisit(rs);
            }
            if(that._isMounted){
                that.setState({
                    Visits : rs,
                    loading : false
                })
            }

        })
    }

    render(){
        return (
            <div>
                {!this.state.loading ? (
                    <NumberFormat value={this.state.Visits} displayType={'text'} thousandSeparator={true} />
                ) : <Loading />
                }
            </div>
        );
    }

}
