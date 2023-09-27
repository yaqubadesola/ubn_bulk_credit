import axios from 'axios';
import { showMessage } from '../../../../store/actions/fuse';
import * as Actions from '.';

export const SAVE_UPLOADED_FILE_LOADING = '[BULK UPLOAD APP] SAVE UPLOADED FILE LOADIN';
export const SAVE_UPLOADED_FILE_SUCCESS = '[BULK UPLOAD APP] SAVE UPLOADED FILE SUCCESS';
export const SAVE_UPLOADED_FILE_FAILED = '[BULK UPLOAD APP] SAVE UPLOADED FILE START FAILED';

//Uploading Files actions
export const UPLOAD_FILES_LOADING = '[UPLOAD FILES LOADING] UPLOAD FILES LOADING';
export const UPLOAD_FILES_SUCCESS = '[UPLOAD FILES SUCCESS] UPLOAD FILES SUCCESS';
export const UPLOAD_FILES_FAILURE = '[UPLOAD FILES FAILURE] UPLOAD FILES FAILURE';

// export function getPublicHolidays() {
//     const request = axios.get('financialserv/api/v1/publicHolidays');

//     return (dispatch) =>
//         request.then((response) =>
//             dispatch({
//                 type: GET_HOLIDAYS,
//                 payload: response.data,
//             })
//         );
// }

// export function getPublicHoliday(id) {
//     const request = axios.get('financialserv/api/v1/publicHoliday/' + id);

//     return (dispatch) =>
//         request.then((response) =>
//             dispatch({
//                 type: GET_HOLIDAY,
//                 payload: response.data,
//             })
//         );
// }

// export function openNewHolidayDialog() {
//     const data = {
//         id: '',
//         name: '',
//         day: '',
//     };

//     return {
//         type: OPEN_NEW_HOLIDAY_DIALOG,
//         mode: 'new',
//         status: true,
//         payload: data,
//     };
// }

// export function closeNewHolidayDialog() {
//     return {
//         type: CLOSE_NEW_HOLIDAY_DIALOG,
//         status: false,
//     };
// }
// export function getUploadedFilesUrl(files) {
//     return (dispatch) => {
//         dispatch({ type: UPLOAD_FILES_LOADING });
//         console.log('All files to upload', files);
//         const all_file_keys = Object.keys(files);
//         const allPromises = [];
//         for (let i = 0; i < all_file_keys.length; i++) {
//             let file = files[all_file_keys[i]];
//             allPromises.push(
//                 axios.post('utilityserv/api/v1/uploadFile', { base64String: file.base64String })
//             );
//         }

//         Promise.all(allPromises)
//             .then(function (responses) {
//                 // Get a JSON object from each of the responses
//                 //console.log("responses from upload",responses)
//                 return Promise.all(
//                     responses.map(function (response) {
//                         return response.data;
//                     })
//                 );
//             })
//             .then(function (response) {
//                 const file_keys = Object.keys(files);
//                 // const uploadedUrls = response.map((item,index) => {
//                 //     file_keys: item.data
//                 // })
//                 var uploadedUrls = {};
//                 for (var i = 0; i < response.length; i++) {
//                     uploadedUrls[file_keys[i]] = response[i].data;
//                 }
//                 // console.log(newObj);
//                 //console.log("All uploaded files = ",uploadedUrls);
//                 dispatch({
//                     type: UPLOAD_FILES_SUCCESS,
//                     payload: {
//                         data: uploadedUrls,
//                     },
//                 });
//             })
//             .catch(function (error) {
//                 // if there's an error, log it
//                 dispatch({ type: UPLOAD_FILES_FAILURE });
//                 //console.log("Error data could not be loaded ", error);
//             });
//     };
// }

export function uploadFile(fileObj) {
    // console.log('All files to upload', fileObj);
    const { base64File } = fileObj;
    return (dispatch) => {
        dispatch({ type: UPLOAD_FILES_LOADING });
        // console.log('base64', base64File);
        // You can perform any necessary setup here, such as configuring Axios headers.

        // Make the Axios POST request to upload the file.
        axios
            .post('utilityserv/api/v1/uploadFile', { base64String: base64File })
            .then((response) => {
                // Handle success
                if (response.data) {
                    // console.log('File base64File responses = ', response.data);
                    const { day, selectedFile, hashedFIle } = fileObj;
                    const { data } = response.data;

                    // formData.append('fileLink', data);
                    // formData.append('hashedFile', hashedFIle);
                    Promise.all([
                        dispatch({
                            type: UPLOAD_FILES_SUCCESS,
                        }),
                    ]).then(() =>
                        dispatch(
                            addBulkUpload({ selectedFile, fileLink: data, hashedFIle, date: day })
                        )
                    );
                }

                dispatch({
                    type: UPLOAD_FILES_SUCCESS,
                    payload: {
                        data: response,
                    },
                });
            })
            .catch((error) => {
                // Handle error
                dispatch({ type: UPLOAD_FILES_FAILURE });
            });
    };
}

export function addBulkUpload({ selectedFile, date, hashedFIle, fileLink }) {
    // console.log('B4 Submit = ', data);
    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('date', date);
    formData.append('hashString', hashedFIle);
    formData.append('fileLink', fileLink);
    const request = axios.post('authserv/api/v1/bulk/funding', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return (dispatch) => {
        dispatch({ type: SAVE_UPLOADED_FILE_LOADING });
        request
            .then((response) => {
                console.log("All response ",response)
                if (response.data.code == '101') {
                    dispatch(
                        showMessage({
                            message: response.data.message,
                        })
                    );
                    dispatch({
                        type: SAVE_UPLOADED_FILE_FAILED,
                        payload: response.data.message,
                    });
                } else {
                    Promise.all([
                        dispatch({
                            type: SAVE_UPLOADED_FILE_SUCCESS,
                            payload: response.data,
                        }),
                    ]);
                    dispatch(showMessage({ message: 'File uploaded successfully' }));
                }
            })
            .catch((error) => {
                dispatch({
                    type: SAVE_UPLOADED_FILE_FAILED,
                    payload: error.message,
                });
                dispatch(
                    showMessage({
                        message:
                            'File could not be uploaded - please check the file and re-upload again',
                    })
                );
            });
    };
}

// export function updatePublicHoliday(data) {
//     const request = axios.put('authserv/api/v1/bulk/funding', data);

//     return (dispatch) =>
//         request.then((response) => {
//             dispatch(showMessage({ message: 'Public Holiday has been updated successfully' }));

//             Promise.all([
//                 dispatch({
//                     type: UPDATE_HOLIDAY,
//                 }),
//             ]).then(() => dispatch(Actions.getPublicHolidays()));
//         });
// }

// export function openEditHolidayDialog(id) {
//     const request = axios.get('financialserv/api/v1/publicHoliday/' + id);

//     return (dispatch) =>
//         request.then((response) =>
//             dispatch({
//                 type: OPEN_EDIT_HOLIDAY_DIALOG,
//                 mode: 'edit',
//                 status: true,
//                 payload: response.data,
//             })
//         );
// }

// export function closeEditHolidayDialog() {
//     return (dispatch) =>
//         dispatch({
//             type: CLOSE_EDIT_HOLIDAY_DIALOG,
//             status: false,
//         });
// }

// export function disablePublicHoliday(status) {
//     return (dispatch) => {
//         const request = axios.put('financialserv/api/v1/publicHoliday', {
//             param: {
//                 status,
//             },
//         });

//         return request.then((response) => {
//             Promise.all([
//                 dispatch({
//                     type: DISABLE_HOLIDAY,
//                 }),
//             ]).then(() => dispatch(Actions.getPublicHolidays()));
//         });
//     };
// }
