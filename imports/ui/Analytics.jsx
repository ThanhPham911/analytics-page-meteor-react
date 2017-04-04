import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import Tracker from 'tracker-component';
import { createContainer } from 'meteor/react-meteor-data';
import { Route } from 'react-router';

import 'react-bootstrap-daterangepicker/css/daterangepicker.css';
import 'react-select/dist/react-select.css';
import moment from 'moment';

import { Projects } from '../api/projects.js';

import Header from './Header.jsx';
import SideNavComponent from './SideNav.jsx';
import DateTimeFilter from './filter/Datetime.jsx';
import ProjectsFilter from './filter/Projects.jsx';
import EventsFilter from './filter/Events.jsx';

import AnalyticsPage from './analytics/AnalyticsPage.jsx';
import ActivityContainer from './analytics/activity/ActivityContainer.jsx';
import PeopleContainer from './analytics/people/PeopleContainer.jsx';
import AppEventDetails from './analytics/activity/events/AppEventDetails.jsx';

// App component - represents the whole app
class Analytics extends Tracker.Component {

    constructor(props) {
        super(props);

        this.state = {
            startDate: moment().subtract(6, 'days').startOf('day'),
            endDate: moment().endOf('day'),
            projectsSelect : [],
            filter : true,
            query : {},
            projectQuery : [],
            dateQuery : {},
            hotspotQuery : [],
            params : {},
            metricEventValue : {
                value : 'app_launches',
                label : 'App Launches'
            },
            events : {},
            showEventsFillter : false,
        };



        this.handleEvents = this.handleEvents.bind(this);
        this.handleShowEvents = this.handleShowEvents.bind(this);
    }

    componentWillMount() {

        if (!this.props.currentUser) {
            this.props.history.push('/signin');
        }
    }

    componentDidMount(){
        this.handleProjectQuery(this.props);

        if(this.props.location){
            this.handleEvents(this.props.location);
            this.handleShowEvents(this.props.location)
        }

    }

    componentDidUpdate() {
        if (!this.props.currentUser) {
            this.props.history.push('/signin');
        }
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.location !== nextProps.location){
            this.handleEvents(nextProps.location);
            this.handleShowEvents(nextProps.location);
        }

        if(this.state.projectQuery.length == 0){
            this.setState({
                projectQuery : _.map(nextProps.projects, function(num){
                    return num._id
                })
            })
        }


    }

    handleProjectQuery(nextProps){
        const a = moment(moment().subtract(6, 'days').startOf('day'));
        const b = moment(moment().endOf('day'));
        const dlength = b.diff(a, 'days');

        const date = {
            start: moment(moment().subtract(6, 'days').startOf('day')).valueOf(),
            end: moment(moment().endOf('day')).valueOf(),
            length: dlength
        }

        var projects = _.map(nextProps.projects, function(num){
            return num._id
        })

        this.setState({
            dateQuery : date,
            projectQuery : projects
        })
    }

    handleDateChange(startDate, endDate){
        if(this.state.startDate.valueOf() !== startDate.valueOf() || this.state.endDate.valueOf() !== endDate.valueOf()){
            const a = moment(startDate);
            const b = moment(endDate);
            const dlength = b.diff(a, 'days');

            const date = {
                start: moment(startDate).valueOf(),
                end: moment(endDate).valueOf(),
                length: dlength
            }

            this.setState ({
                startDate : startDate,
                endDate : endDate,
                dateQuery : date
            })
        }

    }

    renderProjects(){
        return  _.map(this.props.projects, function(val, key){
            return {value : val._id, label : val.name}
        })
    }

    handleProjectChange(projects){

        var projectQuery;
        projectQuery = projects.length == 0 ? _.map(this.props.projects, function(num){
            return num._id
        }): _.map(projects, function(num){
            return num.value
        });
        this.setState({
            projectsSelect : projects,
            projectQuery : projectQuery
        })
    }

    handleEventList(){
        this.setState({
            metricEventValue : {
                value : this.props.hasKey,
                label : this.props.hasKey.replace(/_/g, " ").toUpperCase()
            }
        })
    }

    handleEvents(location){
        var obj = location.pathname.split("/");
        var events;
        if(obj[2] == 'AppEvents'){
            //events = location.pathname.split("/").slice(-1)[0];
            events = obj[3];
            var values = events;
            var metricEvent = {value: events, label: events.replace(/_/g, " ").toUpperCase()};
            var eventQuery = {};
            if(values == 'internet_access'){
                eventQuery['action'] = 'authsuccess';
            }else if(values == 'app_launches'){
                eventQuery['name'] = 'home';
            }else{
                var index = values.lastIndexOf("_");
                eventQuery['name'] = values.substr(0,index).replace(/_/g, " ");
                eventQuery['action'] = values.split("_").slice(-1)[0];
            }

            this.setState({
                metricEventValue : metricEvent,
                events : eventQuery
            })
        };

    }

    handleShowEvents(location){
        var obj = location.pathname.split("/");
        if(!_.contains(['activity','overview'], obj[2])){
            this.setState({
                showEventsFillter : true
            })
        }else{
            this.setState({
                showEventsFillter : false
            })
        }
    }

    handleEventChange(events){
        var values = events.value;
        var eventQuery = {};
        if(values == 'internet_access'){
            eventQuery['action'] = 'authsuccess';
        }else if(values == 'app_launches'){
            eventQuery['name'] = 'home';
        }else{
            var index = values.lastIndexOf("_");
            eventQuery['name'] = values.substr(0,index).replace(/_/g, " ");
            eventQuery['action'] = values.split("_").slice(-1)[0];
        }

        this.setState({
            metricEventValue : events,
            events : eventQuery
        })
    }

    renderChildren() {
        return (
            <div>
                <Route path="/analytics/overview" component={(props) => <AnalyticsPage params={{dateQuery : this.state.dateQuery, project : this.state.projectQuery, hotspot: this.state.hotspotQuery}} />} />
                <Route path="/analytics/activity/:id" component={(props) => <ActivityContainer hashKey={props.match.params.id} params={{dateQuery : this.state.dateQuery, project : this.state.projectQuery, hotspot: this.state.hotspotQuery}} /> }/>
                <Route path="/analytics/people/:id" component={(props) => <PeopleContainer hashKey={props.match.params.id} params={{dateQuery : this.state.dateQuery, project : this.state.projectQuery, hotspot: this.state.hotspotQuery, events : this.state.events}} /> }/>
                <Route path="/analytics/AppEvents/:id" component={(props) => <AppEventDetails history={props.history} hashKey={props.match.params.id} params={{dateQuery : this.state.dateQuery, project : this.state.projectQuery, hotspot: this.state.hotspotQuery, events : this.state.events}} /> }/>
            </div>
        );
    }

    render() {
        return (
            <div>
                <Header {...this.props}/>
                <SideNavComponent {...this.props} />
                <section id="main-content">
                    <section className="wrapper">
                        <div className="row">
                            <DateTimeFilter handleDateChange={this.handleDateChange.bind(this)}/>
                            <ProjectsFilter options={this.renderProjects()} value={this.state.projectsSelect} handleProjectChange={this.handleProjectChange.bind(this)}/>

                        </div>
                        {this.state.showEventsFillter ?  (
                            <div className="row">
                                <EventsFilter value={this.state.metricEventValue} handleChange={this.handleEventChange.bind(this)} params={{dateQuery : this.state.dateQuery, project : this.state.projectQuery, hotspot: this.state.hotspotQuery}} />
                            </div>
                        ) : ''}
                        {!this.props.loading && this.state.projectQuery.length > 0 ? (
                            this.renderChildren()
                        ) : ''}
                    </section>
                </section>

            </div>
        );
    }
}

export default createContainer((props) => {
    const userId = Meteor.userId();
    const todosHandle = Meteor.subscribe('projectsByUser',userId);
    const loading = !todosHandle.ready();
    return {
        projects: Projects.find({}).fetch(),//projects : [{_id : '123', name : 'Demo', owner : '456'}]
        loading,
        currentUser : Meteor.user()
    };
}, Analytics);

