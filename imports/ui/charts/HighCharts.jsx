import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Highcharts from 'highcharts';

export default class ActiveUsersChart extends Component {
    componentDidMount() {
        // Extend Highcharts with modules
        if (this.props.modules) {
            this.props.modules.forEach(function (module) {
                module(Highcharts);
            });
        }
        // Set container which the chart should render to.
        this.chart = new Highcharts[this.props.type || "Chart"](
            this.props.container,
            this.props.options
        );
    }

    componentWillReceiveProps(nextProps){
        if(this.props.options !== nextProps.options){
            this.chart = new Highcharts[nextProps.type || "Chart"](
                nextProps.container,
                nextProps.options
            );
        }

    }
    //Destroy chart before unmount.
    componentWillUnmount() {
        this.chart.destroy();
    }
    //Create the div which the chart will be rendered to.
    render() {
        return React.createElement('div', { id: this.props.container });
    }
}
