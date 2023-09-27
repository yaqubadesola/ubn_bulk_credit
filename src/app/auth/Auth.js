import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as userActions from './store/actions';
import { bindActionCreators } from 'redux';
import * as Actions from '../store/actions';
// import firebase from 'firebase/app';
import auth0Service from '../services/auth0Service';
import auth2Service from '../services/auth2Service';
import jwtService from '../services/jwtService';
import axios from 'axios';
import addNotification from 'react-push-notification';
import withAutoLogout from './withAutoLogout';
// import AutoLogout from './AutoLogout';

class Auth extends Component {
    /*eslint-disable-next-line no-useless-constructor*/
    constructor(props) {
        super(props);

        /**
         * Comment the line if you do not use JWt
         */
        this.auth2Check();
        /**
         * Comment the line if you do not use JWt
         */
        // this.jwtCheck();

        /**
         * Comment the line if you do not use Auth0
         */
        //this.auth0Check();

        /**
         * Comment the line if you do not use Firebase
         */
        // this.firebaseCheck();

        this.state = {
            msgAlerts: null,
        };
    }

    componentWillMount() {
        const self = this;
        axios.interceptors.request.use(
            function (config) {
                self.props.axiosRequestUploading();
                return config;
            },
            function (error) {
                return Promise.reject(error);
            }
        );

        axios.interceptors.response.use(
            function (response) {
                self.props.axiosRequestUploaded();

                return response;
            },
            function (error) {
                return Promise.reject(error);
            }
        );
    }

    auth2Check = () => {
        auth2Service.on('onAutoLogin', () => {
            this.props.showMessage({ message: 'Logging in with Auth2' });

            /**
             * Sign in and retrieve user data from Api
             */
            auth2Service
                .signInWithToken()
                .then((user) => {
                    /*  Setting isActive status to false on firebase if user logged out from admin */
                    //console.log("Active Admin ", user.adUserID)
                    this.props.setUserData(user);
                    if (user.role.id !== 1) {
                        user.role && this.props.getRoleRight(user.role.id);
                        user.role && this.props.getAuthRoles(user.role.id);
                    }
                    this.props.getRoles();

                    this.props.showMessage({ message: 'Logged in with Auth2' });
                })
                .catch((error) => {
                    this.props.showMessage({ message: error });
                });
        });

        auth2Service.on('onAutoLogout', (message) => {
            if (message) {
                this.props.showMessage({ message });
            }
            this.props.logout();
        });

        // auth2Service.on('on404Error', (message) => {
        //     if (message) {
        //         this.props.showMessage({ message });
        //     }
        //     //this.props.logout();
        // });

        auth2Service.init();
    };

    jwtCheck = () => {
        jwtService.on('onAutoLogin', () => {
            this.props.showMessage({ message: 'Logging in with JWT' });

            /**
             * Sign in and retrieve user data from Api
             */
            jwtService
                .signInWithToken()
                .then((user) => {
                    this.props.setUserData(user);

                    this.props.showMessage({ message: 'Logged in with JWT' });
                })
                .catch((error) => {
                    this.props.showMessage({ message: error });
                });
        });

        jwtService.on('onAutoLogout', (message) => {
            if (message) {
                this.props.showMessage({ message });
            }
            this.props.logout();
        });

        jwtService.init();
    };

    auth0Check = () => {
        auth0Service.init();

        if (auth0Service.isAuthenticated()) {
            this.props.showMessage({ message: 'Logging in with Auth0' });

            /**
             * Retrieve user data from Auth0
             */
            auth0Service.getUserData().then((tokenData) => {
                this.props.setUserDataAuth0(tokenData);

                this.props.showMessage({ message: 'Logged in with Auth0' });
            });
        }
    };

    render() {
        const { children } = this.props;

        return <React.Fragment>{children}</React.Fragment>;
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            getRoleRight: userActions.getRoleRight,
            getRoleRights: userActions.getRoleRights,
            getAuthRoles: userActions.getAuthRoles,
            getRoles: userActions.getRoles,
            logout: userActions.logoutUser,
            setUserData: userActions.setUserData,
            setUserToken: userActions.setUserToken,
            setUserDataAuth0: userActions.setUserDataAuth0,
            // setUserDataFirebase: userActions.setUserDataFirebase,
            showMessage: Actions.showMessage,
            axiosRequestUploaded: Actions.axiosRequestUploaded,
            axiosRequestUploading: Actions.axiosRequestUploading,
            hideMessage: Actions.hideMessage,
        },
        dispatch
    );
}

export default connect(null, mapDispatchToProps)(withAutoLogout(Auth));
