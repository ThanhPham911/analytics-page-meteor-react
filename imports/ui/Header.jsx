import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';

export default class Header extends Component {


    niceScrollMenu(event){
        event.preventDefault();
        $('#sidebar').toggleClass('hide-left-bar');
        $('#main-content').toggleClass('merge-left');
    }

    logout(){

        Meteor.logout(function(er,dt){
            if(er){
                console.log(er);
            }
        });
    }

    render(){
        return(
            <header className="header fixed-top clearfix">
                <div className="brand">
                    <a href="#" className="logo"><img src="/images/logo.png" /></a>
                    <div className="sidebar-toggle-box">
                        <div className="fa fa-bars" onClick={this.niceScrollMenu.bind(this)}></div>
                    </div>
                </div>
                <div className="nav notify-row" id="top_menu">
                    <h3 style={{"marginTop": 0,"marginRight": "15px","width": "100%"}}>SoSmart Analytics for Intant Apps</h3>
                </div>
                <div className="top-nav clearfix">
                    <button type="button" className="btn btn-primary pull-right top-menu" onClick={this.logout.bind(this)}><i className="fa fa-key"></i> Log Out</button>
                </div>
            </header>
        )
    }
}
