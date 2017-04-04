import React, { Component } from 'react';
//import { createContainer } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';

import ActiveUsers from './ActiveUsers.jsx';
import Visits from './Visits.jsx';
import Demographics from './Demographics.jsx';

export default class AnalyticsPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            

        }
        
    }

    render(){

        return (
          <div>
              <div className="row">
                  <div className="col-md-12">
                      <section className="panel" >
                          <div className="panel-body">
                              <ActiveUsers params={this.props.params}/>
                          </div>
                      </section>
                  </div>
              </div>
              <div className="row">
                  <div className="col-md-12">
                      <section className="panel" >
                          <div className="panel-body">
                             
                              <div className="col-md-3">
                                  <Link to='/analytics/AppEvents/app_launches' >
                                      <div className="mini-stat clearfix">
                                          <span className="mini-stat-icon green"><i className="fa fa-eye"></i></span>
                                          <div className="mini-stat-info">
                                          <span>
                                            <Visits params={this.props.params}/>
                                          </span>
                                              APP LAUNCHES
                                          </div>
                                      </div>
                                  </Link>

                              </div>
                             
                             

                          </div>
                      </section>
                  </div>
              </div>
              <Demographics params={this.props.params} />
          </div>
        );
    }

}

AnalyticsPage.propTypes = {
    list: React.PropTypes.object,
    todos: React.PropTypes.array,
    loading: React.PropTypes.bool,
    listExists: React.PropTypes.bool,
    params : React.PropTypes.object.isRequired
};
