import React, { Component, PropTypes } from 'react';

import Select from 'react-select';

export default class ProjectsFilter extends Component {

    constructor(props) {
        super(props);
    }

    logChange(val) {
        console.log("Selected: " + val);
    }

    render() {
        return (
            <div className="col-md-3">
                <section className="panel" >
                    <div className="panel-body">
                        <Select
                            multi={true}
                            value={this.props.value}
                            options={this.props.options}
                            onChange={this.props.handleProjectChange.bind(this)}
                            placeholder="All Campaigns"
                            />
                    </div>
                </section>

            </div>
        );
    }

}

ProjectsFilter.propTypes = {
    options: PropTypes.array.isRequired,
    value : PropTypes.array.isRequired,
    handleProjectChange : PropTypes.func.isRequired,
};
