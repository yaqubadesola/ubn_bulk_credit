// import firebaseService from '../../../services/firebaseService';
import auth2Service from '../../../services/auth2Service';
import { showMessage } from '../../../store/actions/fuse';
import { setUserToken } from './user.actions';
// import { registerWithFirebase } from './register.actions';
//import {textEncryption}  from '../../../encryption';
import * as Actions from '../../../store/actions';
import * as userActions from '.';
import axios from 'axios';

export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const GET_OTP_ERROR = 'GET_OTP_ERROR';
export const GET_OTP_SUCCESS = 'GET_OTP_SUCCESS';

export function getUserOtp({ email }) {
    const request = axios.get(`authserv/api/v1/admin/2fa/get_passcode?adminUserEmail=${email}`);

    return (dispatch) =>
        request.then((response) => {
            if (response && response.data.code === 101) {
                dispatch(showMessage({ message: response.data.message }));
                dispatch({
                    type: GET_OTP_ERROR,
                    payload: response.data,
                });
            } else if (response && response.data.code) {
                dispatch(showMessage({ message: 'Enter the OTP sent to you' }));

                Promise.all([
                    dispatch({
                        type: GET_OTP_SUCCESS,
                        payload: response.data,
                    }),
                ]);
            }
        });
}

export function submitLogin({ email, password, passcode }) {
    return (dispatch) =>
        auth2Service
            .signInWithEmailAndPassword(email, password, passcode) //auth2Service.signInWithEmailAndPassword(email, password, passcode)
            .then((user) => {
                // const adUserID = `${user.adUserID}@marcus.com`;
                // let fb_user_data = {
                //     email: email,
                //     password: process.env.REACT_APP_FB_PASS,
                //     displayName: user.displayName,
                //     fbFlag: true,
                // };
                // dispatch(registerWithFirebase(fb_user_data));
                dispatch(setUserToken(user));

                Promise.all([
                    dispatch({
                        type: LOGIN_SUCCESS,
                    }),
                ]).then(() => {
                    //firebaseService.signInFirebaseData(email,process.env.REACT_APP_FB_PASS);
                    if (user.role) {
                        // dispatch(userActions.getRoleRight(user.role.id));
                        // dispatch(userActions.getAuthRoles(user.role.id));
                        // dispatch(userActions.getRoles());
                    }
                });
            })
            .catch((error) => {
                dispatch(showMessage({ message: error.error_description }));
                // dispatch(showMessage({ message: "Network error please try again later" }));
                return dispatch({
                    type: LOGIN_ERROR,
                    payload: error,
                });
            });
}

// export function submitLoginWithFireBase({ username, password }) {
//     return (dispatch) =>
//         firebaseService.auth && firebaseService.auth.signInWithEmailAndPassword(username, password)
//             .then(() => {
//                 return dispatch({
//                     type: LOGIN_SUCCESS
//                 });
//             })
//             .catch(error => {
//                 const usernameErrorCodes = [
//                     'auth/email-already-in-use',
//                     'auth/invalid-email',
//                     'auth/operation-not-allowed',
//                     'auth/user-not-found',
//                     'auth/user-disabled'
//                 ];
//                 const passwordErrorCodes = [
//                     'auth/weak-password',
//                     'auth/wrong-password'
//                 ];

//                 const response = {
//                     username: usernameErrorCodes.includes(error.code) ? error.message : null,
//                     password: passwordErrorCodes.includes(error.code) ? error.message : null
//                 };

//                 if (error.code === 'auth/invalid-api-key') {
//                     dispatch(Actions.showMessage({ message: error.message }));
//                 }

//                 return dispatch({
//                     type: LOGIN_ERROR,
//                     payload: response
//                 });
//             });
// }
