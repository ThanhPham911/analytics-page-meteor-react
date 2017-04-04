import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
//import { createContainer } from 'meteor/react-meteor-data';

import HighChart from '../charts/HighCharts.jsx';

import Papa from 'papaparse';
import Data from 'highcharts/modules/data.src';
import Export from 'highcharts/modules/exporting.src';
import Loading from '../Loading.jsx';

export default class ActiveUsers extends Component {

    constructor(props) {
        super(props);

        this.state = {
            options : {},
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
        var csv ;
        Meteor.call('analytics.ActiveUsers',props.params.dateQuery,props.params.hotspot,props.params.project, function(er, rs){
//             console.log(rs);
//             rs = {
//                 data : {
//                     aggregations : [
//                         ['Wed Mar 29 2017 00:00:00 GMT+0700 (ICT)', 892,376],
//                         ['Thu Mar 30 2017 00:00:00 GMT+0700 (ICT)', 921, 426]
//                     ]
//                 }
//             }
            csv = Papa.unparse({
                fields: ['Categories', 'Visits', 'Unique Visitors'],
                data: rs.data.aggregations
            });

            //console.log(csv);
            if(that._isMounted){
                that.setState({
                    options : {

                        data: {
                            csv: csv
                        },

                        title: {
                            text: 'Active Users'
                        },

                        xAxis: {
                            tickInterval: 24 * 3600 * 1000, // one week
                            tickWidth: 0,
                            
                        },

                        yAxis: {
                            title: {
                                text: 'Daily Visits'
                            }
                        },

                        tooltip: {
                            shared: true,
                            crosshairs: true
                        },

                        plotOptions: {
                            series: {
                                marker: {
                                    lineWidth: 1
                                }
                            }
                        },

                        series: [{
                            name: 'Visits',
                            lineWidth: 3,
                            marker: {
                                radius: 4
                            }
                        }, {
                            name: 'Unique Visitors'
                        }]

                       
                    },
                    loading : false
                })
            }

        });

        //}
    }

    render(){
        return (
            <div>
                {!this.state.loading ? (
                        <HighChart container='activeUsersChart' options={this.state.options} modules={[Data]} />
                    ) : <Loading />
                }
            </div>
        );
    }
}
