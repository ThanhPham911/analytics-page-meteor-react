import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

export default class Login extends Component{

    constructor(props) {
        super(props);

        this.state = {
            error : ''
        }
    }

    handleLogin(event){
        event.preventDefault();
        const userID = ReactDOM.findDOMNode(this.refs.userID).value.trim();
        const userPass = ReactDOM.findDOMNode(this.refs.userPass).value.trim();

        var that = this;
        Meteor.loginWithPassword(userID, userPass,
            function (er,dt) {
                if(er){
                    that.setState({
                        error : er.reason
                    })

                }else{
                    that.context.router.history.push('/analytics/overview');
                }
            }
        );
    }

    render(){
        return (
            <div>
                <form className="form-signin" onSubmit={this.handleLogin.bind(this)}>
                    <h2 className="form-signin-heading">sign in now</h2>
                    <div className="login-wrap">
                        <div className="user-login-info">
                            <label className="error">{this.state.error}</label>
                            <input type="text" className="form-control" placeholder="User ID" ref="userID" />
                            <input type="password" className="form-control" placeholder="Password" ref="userPass"/>
                        </div>
                        <button type="submit" className="btn btn-lg btn-login btn-block" >Sign in</button>
                    </div>
                </form>
            </div>
        );
    }
    
}

Login.contextTypes = {
    router: React.PropTypes.object
};
