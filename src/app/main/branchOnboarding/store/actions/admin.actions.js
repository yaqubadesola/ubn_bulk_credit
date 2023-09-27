import axios from 'axios';
import { showMessage } from '../../../../store/actions/fuse';
import * as Actions from '.';
import qs from 'qs';
import _ from 'lodash';

export const GET_ADMINS = '[ADMINS APP] GET ADMINS';
export const UPDATE_ADMIN = '[ADMINS APP] UPDATE ADMINS';
export const UPDATE_ADMIN_STATUS = '[ADMINS APP] UPDATE ADMINS STATUS';
export const DELETE_ADMIN = '[ADMINS APP] DELETE ADMINS';
export const GET_ADMIN = '[ADMINS APP] GET ADMIN';
export const GET_ADMIN_BY_EMAIL = '[ADMINS APP] GET ADMIN BY EMAIL';
export const SAVE_ADMIN = '[ADMINS APP] SAVE ADMIN';

export function getAdmin(params) {
    const request = axios.get('authserv/api/v1/admin/' + params);

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type: GET_ADMIN,
                payload: response.data,
            })
        );
}

export function getAdminByEmail(params) {
  
    const request = axios.get('authserv/api/v1/admin/get_ad_profile', { params });

    return (dispatch) =>
        request.then((response) =>{
            //
            dispatch({
                type: GET_ADMIN_BY_EMAIL,
                payload: response.data,
            })
        }
        
        ).catch(error => console.log("Errors ", error));
}

export function updateAdmin(rawData, user, reason, intent) {
    let params = {};
    let role = rawData && rawData.role
    let data = _.omit(rawData, ['createdAt', 'updatedAt'])
    data.role = role ? _.omit(role, ['createdAt', 'updatedBy', 'updatedAt', 'lastLogin', 'from', 'settings', 'addedBy']) : null
    params.adminPayloadId = data && data.adUserID;
    params.type = 'ADMIN';
    params.makerEmail = user ? user.email : null;
    params.makerName = user ? user.displayName : null;
    params.makerId = user ? user.adUserID : null;
    params.reason = reason;
    params.payload = data ? JSON.stringify(data) : null;
    params.intent = intent;
    const request = axios.post('utilityserv/api/v1/maker_entry', params, {
        headers: {
            'Content-Type': 'application/json',
        },
    });

    return (dispatch) => {
        request.then((response) => {
            if (response.data && response.data.code === '409') {
                params.id = response.data.entryId;
            } else if (response.data && response.data.response) {
                params.id = response.data.response.id;
            }

            axios.put('utilityserv/api/v1/maker_entry/update', params, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            dispatch(showMessage({ message: 'Admin request successfully sent to checker' }));

            if (response && response.data && response.data.code === 101) {
                dispatch(showMessage({ message: response.data.message }));
            }
            dispatch(Actions.getAdmins());
            Promise.all([
                dispatch({
                    type: UPDATE_ADMIN,
                }),
            ]);
        });
    };
}

export function updateAdminStatus(params) {
    const request = axios.post('authserv/api/v1/admin/enable', qs.stringify(params));

    return (dispatch) =>
        request.then((response) => {
            dispatch(showMessage({ message: 'Admin Status Updated Successfully' }));

            Promise.all([
                dispatch({
                    type: UPDATE_ADMIN_STATUS,
                    payload: response.data,
                }),
            ]).then(() => dispatch(Actions.getAdmins()));
        });
}

export function deleteAdmin(id) {
    const request = axios.delete('authserv/api/v1/admin/' + id);

    return (dispatch) =>
        request.then((response) => {
            dispatch(showMessage({ message: 'Admin Deleted' }));

            Promise.all([
                dispatch({
                    type: DELETE_ADMIN,
                    payload: response.data,
                }),
            ]).then(() => dispatch(Actions.getAdmins()));
        });
}

export function getOrder(params) {
    const request = axios.get('/api/e-commerce-app/order', { params });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type: GET_ADMIN,
                payload: response.data,
            })
        );
}

export function saveAdmin(data, maker = {}) {
    if (data && data.email) {
        let matches = data.email.match(new RegExp(/(?:[\.@])(\w[\w-]*\w\.\w*)$/));
        if (matches && matches[1] !== 'unionbankng.com') {
            return showMessage({ message: 'Please use a valid unionbankng.com email' });
        }
    } else {
        return showMessage({ message: 'Please input an email' });
    }

    let params = {
        payload: data,
        payloadId: data.id,
        adminPayloadId: data.adUserID,
        makerEmail: maker.email,
        makerName: maker.displayName,
        makerId: maker.adUserID,
        type: 'ADMIN',
        action: 0,
        intent: 'New',
    };

    params.payload = JSON.stringify(params.payload);
    const request = axios.post('utilityserv/api/v1/maker_entry', params, {
        headers: {
            'Content-Type': 'application/json',
        },
    });

    return (dispatch) =>
        request.then((response) => {
            if (response.data && response.data.code === '409') {
                return dispatch(showMessage({ message: response.data.message }));
            }
            if (response.status === 200) {
                dispatch(showMessage({ message: 'Admin Sent to checker' }));
                return dispatch({
                    type: SAVE_ADMIN,
                    payload: response.data,
                });
            } else {
                return dispatch(showMessage({ message: 'Failed To Admin Saved' }));
            }
        });
}
