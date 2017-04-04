import React, { Component, PropTypes } from 'react';

import NumberFormat from 'react-number-format';
import ExportCSV from './csv.jsx';

export default class ShowAllDataToExport extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dataList : []
        }
    }

    componentDidMount() {
        this.setState({
            dataList : this.props.dataList
        })
    }

    componentWillReceiveProps(nextProps) {
        if(this.props != nextProps) {
            this.setState({
                dataList : nextProps.dataList
            })
        }
    }

    renderData(){
        if(this.state.dataList.length == 0){
            return (<tr><td>No Data</td></tr>);
        }else{
            return this.state.dataList.map((event) => (
                <tr key={event[0]}>
                    <td>{event[0]}</td>
                    <td>
                        <div className="progress progress-striped progress-xs">
                            <div style={{"width": event[1]}} aria-valuemax="100" aria-valuemin="0" aria-valuenow="40" role="progressbar" className="progress-bar progress-bar-success">
                                <span className="sr-only">40% Complete (success)</span>
                            </div>
                        </div>
                    </td>
                    <td><NumberFormat value={event[1]} displayType={'text'} thousandSeparator={true} />%</td>
                </tr>
            ));
        }

    }

    render() {
        const rowHeader = [this.props.name,'Percent'];
        return (
            <table className="table  table-hover general-table">
                <thead>
                <tr>
                    <th>{this.props.name}</th>
                    <th>Percent</th>
                    <th>
                        {this.props.dataList.length > 0 ? (
                            <ExportCSV fileName={this.props.name} rows={this.state.dataList} rowHeader={rowHeader}/>
                        ) : ''
                        }
                    </th>
                </tr>
                </thead>
                <tbody>
                {this.renderData()}
                </tbody>
            </table>
        );
    }

}
