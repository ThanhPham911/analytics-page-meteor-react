import React, { Component, PropTypes } from 'react';

import Select from 'react-select';

export default class ActivityFilter extends Component {

    constructor(props) {
        super(props);
    }

    logChange(val) {
        console.log("Selected: " + val);
    }

    render() {
        return (
            <Select
                value={this.props.value}
                options={this.props.options}
                onChange={this.props.handleChange.bind(this)}
                clearable={false}
                />

        );
    }

}

ActivityFilter.propTypes = {
    options: PropTypes.array.isRequired,
    //value : PropTypes.array.isRequired,
    handleChange : PropTypes.func.isRequired,
};
