import React, { Component, PropTypes } from 'react';
import { SideNav, Nav } from 'react-sidenav';

export default class SideNavComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selected : '/analytics/overview'
        }
    }

    componentDidMount(){
        this.setState({
            selected : this.props.history.location.pathname
        })
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps != this.props){
            this.setState({
                selected : nextProps.history.location.pathname
            })
        }
    }

    updateSelection(selection){
        this.setState({selected: selection.id});
        this.props.history.push(selection.id)
    }

    render() {
        var navi = [
            { id: '/analytics/overview', icon: 'fa fa-dashboard' , text: 'Overview'},
            { id: 'activity', icon: 'fa fa-line-chart', text: 'Activity' ,
                navlist: [
                    { id: '/analytics/activity/active' ,text: 'Active Users' },
                    { id: '/analytics/activity/events' ,text: 'Events' }
                ]
            },
            { id: 'people', icon: 'fa fa-users', text: 'People' ,
                navlist: [
                    { id: '/analytics/people/demographics' ,text: 'Demographics' },
                    { id: '/analytics/people/technology' ,text: 'Technology' }
                ]
            }
        ];
        return (
            <aside>
                <div id="sidebar" className="nav-collapse">
                    <div className="leftside-navigation">
                        <div style={{"paddingTop" : "80px"}}>
                            <SideNav selected={this.state.selected} navs={navi} onSelection={this.updateSelection.bind(this)} />
                        </div>
                    </div>
                </div>

            </aside>

        );
    }
}
