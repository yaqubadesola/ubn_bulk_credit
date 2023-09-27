//import firebaseService from '../../../services/firebaseService';
import * as UserActions from './user.actions';
import * as Actions from '../../../store/actions';
import jwtService from '../../../services/jwtService';

export const REGISTER_ERROR = 'REGISTER_ERROR';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';

export function submitRegister({ displayName, password, email }) {
    return (dispatch) =>
        jwtService
            .createUser({
                displayName,
                password,
                email,
            })
            .then((user) => {
                dispatch(UserActions.setUserData(user));
                return dispatch({
                    type: REGISTER_SUCCESS,
                });
            })
            .catch((error) => {
                return dispatch({
                    type: REGISTER_ERROR,
                    payload: error,
                });
            });
}

// export function registerWithFirebase(model)
// {

//     //console.log("Want to log in", model)
//     const {email, password, displayName} = model;
//     return (dispatch) =>
//         firebaseService.auth && firebaseService.auth.createUserWithEmailAndPassword(email, password)
//             .then(response => {
//                 //console.log("user before creating",response.user)
//                 dispatch(UserActions.createUserSettingsFirebase({
//                     ...response.user,
//                     displayName,
//                     email
//                 }));

//                 return dispatch({
//                     type: REGISTER_SUCCESS
//                 });
//             })
//             .catch(error => {

//                 //console.log("My error ", error.message)
//                 const usernameErrorCodes = [
//                     'auth/operation-not-allowed',
//                     'auth/user-not-found',
//                     'auth/user-disabled'
//                 ];

//                 const emailErrorCodes = [
//                     'auth/email-already-in-use',
//                     'auth/invalid-email'
//                 ];

//                 const passwordErrorCodes = [
//                     'auth/weak-password',
//                     'auth/wrong-password'
//                 ];

//                 const response = {
//                     email      : emailErrorCodes.includes(error.code) ? error.message : null,
//                     displayName: usernameErrorCodes.includes(error.code) ? error.message : null,
//                     password   : passwordErrorCodes.includes(error.code) ? error.message : null
//                 };

//                 if ( error.code === 'auth/invalid-api-key' )
//                 {
//                     dispatch(Actions.showMessage({message: error.message}));
//                 }

//                 return dispatch({
//                     type   : REGISTER_ERROR,
//                     payload: response
//                 });
//             });
// }
