import axios from 'axios';
import { showMessage } from '../../../../store/actions/fuse';
import { textEncryption,encryptAES }  from '../../../../encryption';
import _ from 'lodash';

//Get BVN OTP
export const GET_BVN_OTP_LOADING = '[BVN OTP LOADING] GET BVN OTP INFO';
export const GET_BVN_OTP_SUCCESS = '[BVN OTP SUCCESS] GET BVN OTP INFO';
export const GET_BVN_OTP_FAILURE = '[BVN OTP FAILURE] GET BVN OTP INFO';


//Get BVN OTP
export const GET_WALLET_BAL_LOADING = '[GET_WALLET_BAL_ LOADING] GET BVN OTP INFO';
export const GET_WALLET_BAL_SUCCESS = '[GET_WALLET_BAL_ SUCCESS] GET BVN OTP INFO';
export const GET_WALLET_BAL_FAILURE = '[GET_WALLET_BAL_ FAILURE] GET BVN OTP INFO';


//BVN Details
export const GET_BVN_DETAIL_LOADING = '[BVN DETAIL LOADING] GET_BVN_DETAIL_LOADING';
export const GET_BVN_DETAIL_SUCCESS = '[BVN DETAIL SUCCESS] GET_BVN_DETAIL_SUCCESS';
export const GET_BVN_DETAIL_FAILURE = '[BVN DETAIL FAILURE] GET_BVN_DETAIL_FAILURE';

//Get Branches
export const GET_BRANCHES = '[ADMIN APP] GET BRANCHES';

//Creation on New Customer
export const CREATE_CUSTOMER_LOADING = 'CREATE CUSTOMER LOADING] CREATE CUSTOMER LOADING';
export const CREATE_CUSTOMER_SUCCESS = 'CREATE CUSTOMER SUCCESS] CREATE CUSTOMER SUCCESS';
export const CREATE_CUSTOMER_FAILURE = 'CREATE CUSTOMER FAILURE] CREATE CUSTOMER FAILURE';

//Product COnfirmation actions
export const GET_PROD_CONFIRMATION_LOADING = '[BVN PRODUCT CONFIRMATION LOADING] CONFIRM PRODUCT LOADING';
export const GET_PROD_CONFIRMATION_SUCCESS = '[BVN PRODUCT CONFIRMATION SUCCESS] CONFIRM PRODUCT SUCCESS';
export const GET_PROD_CONFIRMATION_FAILURE = '[BVN PRODUCT CONFIRMATION FAILURE] CONFIRM PRODUCT FAILURE';

//Creating Maker entry actions
export const MAKER_ENTRY_LOADING = '[MAKER ENTRY LOADING] MAKER ENTRY LOADING';
export const MAKER_ENTRY_SUCCESS = '[MAKER ENTRY SUCCESS] MAKER ENTRY SUCCESS';
export const MAKER_ENTRY_FAILURE = '[MAKER ENTRY FAILURE] MAKER ENTRY FAILURE';

//Get all PTA Document Types
export const GET_PTA_DOCTYPES            = '[DOCTYPES APP] GET PTA DOCTYPES';

//Uploading Files actions
export const UPLOAD_FILES_LOADING   = '[UPLOAD FILES LOADING] UPLOAD FILES LOADING';
export const UPLOAD_FILES_SUCCESS   = '[UPLOAD FILES SUCCESS] UPLOAD FILES SUCCESS';
export const UPLOAD_FILES_FAILURE  = '[UPLOAD FILES FAILURE] UPLOAD FILES FAILURE';

export const RESTART_STATE_DATA  = '[RESTART STATE DATA] RESTART_STATE_DATA';

export function createNewM36User(data) {

    let {
        bvn,
        email,
        firstName,
        lastName,
        m36KycLevel,
        phoneNumber,
        address,
        userUuid,
        walletId
    } = data;
    const params = {bvn, email, firstName, lastName, address, m36KycLevel, phoneNumber, userUuid, walletId}

    // console.log("data to save ", params)
    return (dispatch) => {

        //Dispatching loading effect
       dispatch({ type: CREATE_CUSTOMER_LOADING });
       //Making API calls while loading
       const request = axios.post('authserv/api/v1/onboard/create_user', params, {
            headers: {
                'Content-Type': 'application/json',
            },
        });      
       request.then((response) => {
           if (response.status === 200) {
               if (response.data && response.data.code === '000') {
                //    console.log("User Created Successfully here ", response)
                   
                axios.get("authserv/api/v1/onboard/verify_customer/bvn/" + bvn
                ).then(response=>{
                    // console.log("M36 new User BVN rsponse ",response);
                    if (response.status === 200) {
                        if (response.data && response.data.code === '000') {
                            dispatch({
                                type   : CREATE_CUSTOMER_SUCCESS,
                                payload: {
                                    data: response.data.body,
                                },
                            })
                                
                            dispatch(showMessage({ message: "M36 User Created Successfully!"}));
                        }
                        else{
                            const {data} = response
                            dispatch({
                                type   : CREATE_CUSTOMER_FAILURE,
                                payload: {
                                    data: data.message,
                                },
                            });
                            dispatch(showMessage({ message: `${data.message} - User not created` }));
                        }

                    }
                });

               }else{
                   const {data} = response
                   dispatch({
                       type   : CREATE_CUSTOMER_FAILURE,
                       payload: {
                           data: data.message,
                       },
                   });
                   dispatch(showMessage({ message: 'Request Unsuccessful - User not created' }));
               }
            }          
        }).catch(response => {
           const {data} = response
           dispatch({
            type   : CREATE_CUSTOMER_FAILURE,
            payload: {
                error: data.message,
            },
        });
        dispatch(showMessage({ message: 'Request Unsuccessful - User not created' }));

       })
   }
}

export function getBvnOTP(param)
{   
   //
   const encrytped_bvn = textEncryption(param)
    return (dispatch) => {

         //Dispatching loading effect
        dispatch({ type: GET_BVN_OTP_LOADING });
        //Making API calls while loading
        const request = axios.post("authserv/api/v1/onboard/send_verification_otp_new_user/", {bvn: encrytped_bvn});
        request.then((response) => {
            if (response.status === 200) {
                // console.log("Get Otp response ", response)
                if (response.data && response.data.code === '000') {
                    dispatch({
                        type   : GET_BVN_OTP_SUCCESS,
                        payload: {
                            data: {otpSent: true, bvn:param},
                        },
                    })
                }else{
                    const {data} = response
                    dispatch({
                        type   : GET_BVN_OTP_FAILURE,
                        payload: {
                            data: data.message,
                        },
                    });
                    dispatch(showMessage({ message: data.message ? data.message : 'Invalid BVN Details' }));
                }
            } else {
                dispatch(showMessage({ message: 'Request Unsuccessful' }));
            }
        }           
        ).catch(error => {
            const err = error.message
            dispatch({
                type   : GET_BVN_OTP_FAILURE,
                payload: {
                    data: error,
                },
            });
            dispatch(showMessage({ message: 'Request Unsuccessful' }));
        })
    }
}

export function getWalletBalance(param)
{   
   //
    return (dispatch) => {

         //Dispatching loading effect
        dispatch({ type: GET_WALLET_BAL_LOADING });
        //Making API calls while loading
        const request = axios.get("/authserv/api/v1/wallet/find_by_user?uuid=" + param);
        request.then((response) => {
            if (response.status === 200) {
                // console.log("Get wallet bal ", response)
                    const {subWallets} = response.data
                    const {balance, currency} = subWallets[0]
                    dispatch({
                        type   : GET_WALLET_BAL_SUCCESS,
                        payload: {
                            data: {wallet_bal: balance, code: currency.code},
                        },
                    })
            } else {
                dispatch(showMessage({ message: 'Request Unsuccessful' }));
            }
        }           
        ).catch(error => {
            const err = error.message
            dispatch({
                type   : GET_WALLET_BAL_FAILURE,
                payload: {
                    data: error,
                },
            });
            dispatch(showMessage({ message: 'Request Unsuccessful' }));
        })
    }
}

export function getBvnDetail({bvn, otp})
{   
    const bvnEncrypted =  textEncryption(bvn)
    const otpEncrypted =  textEncryption(otp.toString())
    const params = {bvn: bvnEncrypted, otp: otpEncrypted}
    return (dispatch) => {

         //Dispatching loading effect
        dispatch({ type: GET_BVN_DETAIL_LOADING });
        //Making API calls while loading
        const request = axios.post('authserv/api/v1/onboard/verify_otp_new', params, {
            headers: {
                'Content-Type': 'application/json',
            },
        });     
        request.then((response) => {
            // console.log("Response 1:  ",response)
            if (response.status === 200) {
                if (response.data && response.data.code === '000') {
                    dispatch({
                        type   : GET_BVN_DETAIL_SUCCESS,
                        payload: {
                            data: response.data.body,
                        },
                    })
                }else{
                    const {data} = response
                    dispatch({
                        type   : GET_BVN_DETAIL_FAILURE,
                        payload: {
                            data: data.message,
                        },
                    });
                    dispatch(showMessage({ message: data.message }));
                }
            } else {
                // console.log("Response 2:  ",response)
                dispatch(showMessage({ message: 'Request Unsuccessful' }));
            }
        }           
        ).catch(error => {
            const err = error.message
            dispatch({
                type   : GET_BVN_DETAIL_FAILURE,
                payload: {
                    data: error,
                },
            });
            dispatch(showMessage({ message: 'Request Unsuccessful' }));
        })
    }
}

export function getAllBranches() {
    return (dispatch) =>{
        const request = axios.get('financialserv/api/v1/branches');
        request.then((response) =>{
            // console.log("responses = ",response)
            dispatch({
                type: GET_BRANCHES,
                payload: response.data,
            })
        });
    }
        
}


export function getProductConfirmation(product){
      //Making API calls while loading
    //console.log(" single Prod =",product)
      return (dispatch) => {
      dispatch({ type: GET_PROD_CONFIRMATION_LOADING });
      const request = axios.post("financialserv/api/v1/branchModule/investment/confirm", product);
      request.then((response) => {
            if(response.status === 200) {
                if (response.data.code == 101) {
                    //console.log("response fialure 101", response.data)
                    const error = response.data.message
                    dispatch({
                        type   : GET_PROD_CONFIRMATION_FAILURE,
                        payload: {
                            data: error,
                        },
                    });
                    dispatch(showMessage({ message: error }));
                }else{
                   //
                    dispatch({
                        type   : GET_PROD_CONFIRMATION_SUCCESS,
                        payload: {
                            data: response.data.investment,
                        },
                    })
                }
               
            } else {
                dispatch({
                    type   : GET_PROD_CONFIRMATION_FAILURE,
                    payload: {
                        data: 'Product can not be confirmed',
                    },
                });
                dispatch(showMessage({ message: 'Product can not be confirmed' }));
            }
      }).catch(error => {
            // console.log("I got an error here",error)
            dispatch({
                type   : GET_PROD_CONFIRMATION_FAILURE,
                payload: {
                    data: error.response,
                },
            });
            dispatch(showMessage({ message: error.response.data.error }));

        })
    }
}

// export function createPendingProductMakerEntry({ data, makerEntryId, user, newMakerObj, reason, productType }) {

export function resetStateData(data) {
// 
    return (dispatch) => {
        dispatch({
            type   : RESTART_STATE_DATA,
            payload: {
                data,
            },
        })
    }

}

export function createPendingProductMakerEntry(data,user) {
    const {branchCode,ubnAccountNumber} = data
    const {
        bvn,
        email,
        firstName,
        lastName,
        m36KycLevel,
        phoneNumber,
        address,
        userUuid,
        walletId,
    } = data.form;
    const params = {bvn, email, firstName, lastName, address, m36KycLevel, branchCode, ubnAccountNumber, phoneNumber, userUuid, walletId}

    let makerData = params
    //console.log("latest state ",state)
    // console.log("new data ",data)
    // console.log("buyer detail ",user)
    // console.log("new makerObj ",makerData)
    // console.log("prodType ",singleProduct)
    // console.log("fileUploadedUrls ",fileUploadedUrls)
    // const all_file_keys = Object.keys(fileUploadedUrls)
    // for (let i = 0; i < all_file_keys.length; i++) {
    //     let file = fileUploadedUrls[all_file_keys[i]]
        //console.log("File is =",file)
    // }
    //let params = {};
    let newMakerEntrId;
    // form.address     = address
    // form.m36KycLevel = kycLevel
    makerData = _.omit(makerData, ['createdAt', 'updatedAt']);
    params.payloadId = null
    params.approvedBy = null
    //params.comment =  form.comment
    params.type = 'BRANCH_USER';
    params.status = 'PENDING';
    params.intent =  "Request to create new customer on Branch Module"
    params.makerEmail = user ? user.email : null;
    params.makerName = user ? user.firstName + user.lastName : null;
    params.makerId = user ? user.adUserID : null;
    //makerData.userUid = form.userUuid;
    //makerData.userDetail =  form;
    //makerData.branchCode =  branchCode !== ""? branchCode : "";
    // makerData.fileUploadedUrls = fileUploadedUrls? fileUploadedUrls : {};
    // makerData.customerFormUrl  = fileUploadedUrls.customerFormUrl;
    // makerData.approvalFormUrl  = fileUploadedUrls.approvalFormUrl;
    params.payload = makerData;

    params.payload = makerData
        ? encryptAES(JSON.stringify(makerData))
        : null;
        //console.log("All params b4 saving ", params)
        const request = axios.post('utilityserv/api/v1/maker_entry', params, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

    return (dispatch) => {
        dispatch({ type: MAKER_ENTRY_LOADING });
        request.then((response) => {
            console.log("maker response ", response.data)
            if (response.data && response.data.code === '409') {
                params.id = response.data.id;
            } else if (response.data && response.data.code === "000") {
                // console.log("update ID", response.data.response.id)
                newMakerEntrId = response.data.response.id;
                params.id = response.data.response.id;
            } 
        
            axios.put('utilityserv/api/v1/maker_entry/update', params, {
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then(response=>{
              
                if(response){  
                    //let {product} =  makerData;
                    const checkerLinks = "https://admin-m36ng.azurewebsites.net/";
                    const m36ngAPI = "https://qa.m36ng.com";
                let comments = `<div><p>New User Registration and Wallet creation on M36 branch module awaits your approval.</p>

                                    <p>kindly log on to the M36 Branch Module with your OWA credentials and respond. </p>
                                    <p>Please click on the link below to access 
                                    the portal
                                    <br><b><a href="${checkerLinks}" target="_blank">${checkerLinks}</a></b></p></div>`
                    let message = {
                        body: comments,
                        footer: "string",
                        id: 0,
                        sender: {
                        displayName: user ? user.firstName + user.lastName : null,
                        email: user ? user.email : null,
                        },
                        recipients: [
                        {
                            displayName: "BSM",
                            email: "ayaqub@unionbankng.com",
                            id: 0,
                            recipientType: "TO",
                        },
                        ],
                        status: "PENDING",
                        subject: "M36 Branch Request Assigned for Action",
                    }; 
                    //Sending Mail to BSM for activation
                    const requestMailSending = axios.post(
                        `${m36ngAPI}/gateway/utilityserv/api/v1/email/send_email`,
                        message
                    );
                    requestMailSending.then((response) => {
                        if (response.status === 200) {
                            dispatch({
                                type   : MAKER_ENTRY_SUCCESS,
                                payload: {
                                    data: data,
                                },
                            })
                            dispatch(showMessage({ message: 'Request successfully sent to checker for Approval' }));          
                        } else {
                            dispatch(showMessage({ message: 'Request mail for activation not sent' }));
                        }
                    }).catch (error =>  {
                        dispatch({
                            type   : MAKER_ENTRY_FAILURE,
                            payload: {
                                data: error,
                            },
                        })
                    })
                }
            });         

            if (response && response.data && response.data.code === 101) {
                dispatch(showMessage({ message: response.data.message }));
            }
           
          }).catch(err=> {
            dispatch({
                type   : MAKER_ENTRY_FAILURE,
                payload: {
                    data:"Request Unsuccessful"
                },
            })
            dispatch(showMessage({ message: "Duplicate BVN detected" }));
          })
        } 
   
}

export function getDocTypes()
{
    const request = axios.get('financialserv/api/v1/userDocTypes');

    return (dispatch) =>
        request.then((response) => 
            dispatch({
                type   : GET_PTA_DOCTYPES,
                payload: response.data
            })
        );
}

export  function getUploadedFilesUrl(files){
    return (dispatch) => {
        dispatch({ type: UPLOAD_FILES_LOADING });  
        // console.log("All files to upload", files)
        const all_file_keys = Object.keys(files)
        const allPromises = [];
        for (let i = 0; i < all_file_keys.length; i++) {
            let file = files[all_file_keys[i]]
            allPromises.push(axios.post('utilityserv/api/v1/uploadFile', {base64String : file.base64String}));
        }
        // const {customerFile, approvalFile } = files
     
        //     const promise1 = customerFile ? axios.post('utilityserv/api/v1/uploadFile', {base64String : customerFile}): "";
        //     const promise2 = approvalFile ? axios.post('utilityserv/api/v1/uploadFile', {base64String : approvalFile}): "";
        //     const allPromises = promise1 !== "" && promise2 !== "" ? [promise1, promise2] : [promise1];
      
        Promise.all(allPromises).then(function (responses) {
            // Get a JSON object from each of the responses
            // console.log("responses from upload",responses)
            return Promise.all(responses.map(function (response) {
                
                return response.data;
            }));
        }).then(function (response) {
            const file_keys = Object.keys(files)
            // const uploadedUrls = response.map((item,index) => {
            //     file_keys: item.data
            // })
            var uploadedUrls = {}
            for (var i = 0; i < response.length; i++) {
                uploadedUrls[file_keys[i]] = response[i].data;
            }
            //console.log(newObj);
            // console.log("All uploaded files = ",uploadedUrls);
            dispatch({ 
                type: UPLOAD_FILES_SUCCESS,
                payload: {
                    data:uploadedUrls,
                },
            });  
         
        }).catch(function (error) {
            // if there's an error, log it
            dispatch({ type: UPLOAD_FILES_FAILURE });  
            // console.log("Error data could not be loaded ", error);
        });
    }
}