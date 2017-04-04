import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import { Route, IndexRoute, browserHistory } from 'react-router';
class App extends Component {

    constructor(props) {
        super(props);

        this.state = {

        };

    }

    componentDidMount(){
        this.props.history.push('/signin');
    }

    componentWillReceiveProps(nextProps) {
        //this.props.history.push('/signin');
    }

    render() {
        return (
            <div></div>

        );
    }
}

export default createContainer((props) => {
    
    return {
       
    };
}, App);

