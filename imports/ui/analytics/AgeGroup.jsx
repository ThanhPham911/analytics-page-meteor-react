import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

import HighChart from '../charts/HighCharts.jsx';
import Data from 'highcharts/modules/data.src';
import Loading from '../Loading.jsx';
import NoData from '../NoData.jsx';

export default class AgeGroup extends Component {

    constructor(props) {
        super(props);

        this.state = {
            options : {},
            loading : false,
            noData : false
        }

        this.handleData = this.handleData.bind(this);

    }

    componentDidMount() {
        if(this.props.Mac.lenght > 0) {
            this.handleData(this.props);
        }
        this._isMounted = true;
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.Mac == 0){
            this.setState({
                noData : true
            })
        }else if(nextProps.Mac.length > 0 && this.props.Mac != nextProps.Mac) {
            this.handleData(nextProps);
        }
    }

    componentWillUnmount(){
        this._isMounted = false;
    }

    handleData(props){
        this.setState({
            loading : true,
            noData : false
        })
        var that = this;
        var csv ;

        Meteor.call('analytics.GroupAge',props.Mac, function(er, rs){
//            rs = [
//                {_id : "13 - 17", count : 16},
//                {_id : "18 - 24", count : 62},
//                {_id : "25 -34", count : 94 }
//                ];
            var data;
            data = _.reject(rs, function(num){
                return num._id == 'Unknown';
            })
            data = _.map(data, function(num){ return _.values(num) });


            if(data.length == 0){
                that.setState({
                    loading : false,
                    noData : true
                })
            }else {
                
                if(that._isMounted){
                    that.setState({
                        options : {

                            chart: {
                                plotBackgroundColor: null,
                                plotBorderWidth: 0,
                                plotShadow: false,
                                height : 300
                            },
                            title: {
                                text: 'AGE',
                                align: 'center',
                                verticalAlign: 'middle',
                                y: 80
                            },
                            tooltip: {
                                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                            },
                            plotOptions: {
                                pie: {
                                    dataLabels: {
                                        enabled: true,
                                        distance: -50,
                                        style: {
                                            fontWeight: 'bold',
                                            color: 'white'
                                        }
                                    },
                                    startAngle: -90,
                                    endAngle: 90,
                                    center: ['50%', '75%']
                                }
                            },
                            series: [{
                                type: 'pie',
                                name: 'User',
                                innerSize: '45%',
                                data: data
                            }]
                        },
                        loading : false
                    })
                }

            }
        });

            //}
        }


    render(){
        var style = this.props.display?{display:"none"}:{};
        return (
            <div style={style}>
                {!this.state.loading ? (
                    this.state.noData ? (
                        <NoData title='AGE'/>
                        ): <HighChart container='AgeGroupChart' options={this.state.options} />
                ) : <Loading />
                }

            </div>
        );
    }
}
