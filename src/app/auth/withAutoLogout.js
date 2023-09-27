import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as userActions from './store/actions';
import { bindActionCreators } from 'redux';
//const AUTO_LOGOUT_TIMEOUT = 30000; // 0.5 minutes (in milliseconds)

const withAutoLogout = (WrappedComponent, timeout = 180000) => {
  class AutoLogout extends Component {
    logoutTimer = null;

    componentDidMount() {
      this.startLogoutTimer();
      window.addEventListener('mousemove', this.resetLogoutTimer);
      window.addEventListener('keydown', this.resetLogoutTimer);
    }

    componentWillUnmount() {
      this.clearLogoutTimer();
      window.removeEventListener('mousemove', this.resetLogoutTimer);
      window.removeEventListener('keydown', this.resetLogoutTimer);
    }

    startLogoutTimer = () => {
      this.logoutTimer = setTimeout(() => {
        // Perform logout logic here
        this.props.logout()
        //console.log('Auto logout');
      }, timeout);
    };

    resetLogoutTimer = () => {
      this.clearLogoutTimer();
      this.startLogoutTimer();
    };

    clearLogoutTimer = () => {
      if (this.logoutTimer) {
        clearTimeout(this.logoutTimer);
        this.logoutTimer = null;
      }
    };

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };

  function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            logout: userActions.logoutUser,
        },
        dispatch
    );
  }

  return connect("", mapDispatchToProps)(AutoLogout);
};



export default withAutoLogout;
