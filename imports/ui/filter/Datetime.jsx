import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import DateRangePicker from 'react-bootstrap-daterangepicker';

export default class DateTimeFilter extends Component {

    constructor(props) {
        super(props);

        this.state = {
            ranges: {
                'Today': [moment(), moment()],
                'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                'Last 7 Days': [moment().subtract(6, 'days'), moment()],
                'Last 30 Days': [moment().subtract(29, 'days'), moment()],
                'This Month': [moment().startOf('month'), moment().endOf('month')],
                'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
            },
            startDate: moment().subtract(6, 'days'),
            endDate: moment()
        };
    }

    handleEvent(event, picker) {
        this.props.handleDateChange(picker.startDate.startOf('day'), picker.endDate.endOf('day'));
        this.setState({
            startDate: picker.startDate,
            endDate: picker.endDate
        });
    }

    render() {
        var start = this.state.startDate.format('YYYY-MM-DD');
        var end = this.state.endDate.format('YYYY-MM-DD');
        var label = start + ' - ' + end;
        if (start === end) {
            label = start;
        }

        const dateStyle = {
            background : '#fff',
            cursor: 'pointer',
            width: '100%'
        }

        return (
            <div className="col-md-3">
                <section className="panel" >
                    <div className="panel-body">
                        <DateRangePicker
                            startDate={this.state.startDate}
                            endDate={this.state.endDate}
                            ranges={this.state.ranges}
                            onEvent={this.handleEvent.bind(this)}
                            className="Select" >
                            <div className="Select-control" style={dateStyle}>
                                <span className="Select-multi-value-wrapper">
                                    <div className="Select-placeholder">
                                        <i className="glyphicon glyphicon-calendar fa fa-calendar"></i>&nbsp;
                                        <span>{label}</span>
                                    </div>
                                </span>
                                <span className="Select-arrow-zone"><span className="Select-arrow"></span></span>
                            </div>
                        </DateRangePicker>
                    </div>
                </section>
            </div>
        );
    }
}

DateTimeFilter.propTypes = {
    handleDateChange: PropTypes.func.isRequired,
};
