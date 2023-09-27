import * as Actions from '../actions';
import _ from 'lodash';

const initialState = {
    data: [],
    form: {
        bvn: "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
        email: "",
        walletId: "",
        MockData: "",
        skill: "",
        jobApplyFor: "",
        userUuid:"",
        workExperence: "",
        expectedSalary: "",         
        requestId: "", 
        checkerEmail: "",
        comment:"",
      },  
    address:"",  
    kycLevel: 0,
    kycOptions:[
        {   id:0,  name:"Union Bank KYC Level"    },
        {   id:1,  name:"Level 1"   },
        {   id:2,  name:"Level 2"   },
        {   id:3,  name:"Level 3"   },
        
    ],
    otpDetail:{
        otpSent: false,
        otpBvn: ""
    },
    walletDetail:{
        wallet_bal: "",
        code: ""
    },
    makerData:null,
    fileUploadedUrls : null,
    errors: {},
    branches:[],
    branchCode:"",
    doctypes:[],
    singleProduct:{      
        faceValue: "", 
        adjusted: false,
        selectedFIle1:null,
        selectedFIle2:null,
        userUid:"",
        product:{}
    },
    steps: [
        { label: "Collect BVN" },
        { label: "Validate Data" },
        { label: "Investment" },
        { label: "Buy Investment" },
        { label: "Summary" },
        { label: "Request Approval" },
        { label: "Finish" },
      ],
    stepCount: 0,
    stepSaveFlag: true,
    walletLoading:false,
    loading:false,
    editRate: false,
};

const newInvestmentReducer = function (state = initialState, action) {
    //console.log("Action Type ",action.type)
    switch ( action.type )
    {   
        case Actions.GET_BRANCHES: {
            return {
                ...state,
                branches: action.payload,
            };
        }
        case Actions.GET_PTA_DOCTYPES: {
            return {
                ...state,
                doctypes: action.payload,
            };
        }
        case Actions.GET_BVN_OTP_LOADING: 
            //console.log("am loading here")
            return {
                ...state,
                loading: true,
                stepCount:0
            };
        case Actions.GET_BVN_OTP_SUCCESS:
            return {
                ...state,
                otpDetail: action.payload.data,
                loading: false,
                stepCount: state.stepCount === 1 ? state.stepCount : state.stepCount + 1
            };
        case Actions.GET_BVN_OTP_FAILURE:
            return {
                ...state,
                loading: false,
                stepCount:0
            };
        case Actions.GET_WALLET_BAL_LOADING: 
            //console.log("am loading here")
            return {
                ...state,
                walletLoading: true,
            };
        case Actions.GET_WALLET_BAL_SUCCESS:
            return {
                ...state,
                walletDetail: action.payload.data,
                walletLoading: false,
            };
        case Actions.GET_WALLET_BAL_FAILURE:
            return {
                ...state,
                walletLoading: false,
        };
        case Actions.GET_BVN_DETAIL_LOADING: 
            //console.log("am loading here")
            return {
                ...state,
                loading: true,
                stepCount:1
            };
        case Actions.GET_BVN_DETAIL_SUCCESS:
            return {
                ...state,
                form: action.payload.data,
                loading: false,
                stepCount: state.stepCount + 1
            };
        case Actions.GET_BVN_DETAIL_FAILURE:
            return {
                ...state,
                loading: false,
                stepCount:1
            };
        case Actions.CREATE_CUSTOMER_LOADING: 
            //console.log("am loading here")
            return {
                ...state,
                loading: true,
                stepCount:2
            };
        case Actions.CREATE_CUSTOMER_SUCCESS:
            return {
                ...state,
                form: action.payload.data,
                loading: false,
                stepCount: state.stepCount + 1
            };
        case Actions.CREATE_CUSTOMER_FAILURE:
            return {
                ...state,
                loading: false,
                stepCount:2
            };
        case Actions.GET_PROD_CONFIRMATION_LOADING: 
            return {
                ...state,
                loading: true,
                stepCount:4
            };
        case Actions.GET_PROD_CONFIRMATION_SUCCESS:
            //console.log("reducer data ",action.payload.data)
            return {
                ...state,
                makerData: action.payload.data,
                loading: false,
                stepCount: state.stepCount + 1
            };
        case Actions.GET_PROD_CONFIRMATION_FAILURE:
            return {
                ...state,
                loading: false,
                stepCount:4,
                error: "",
            };

        //Creating a maker entry actions
        case Actions.MAKER_ENTRY_LOADING: 
            return {
                ...state,
                loading: true,
                stepCount:2
            };
        case Actions.MAKER_ENTRY_SUCCESS:
            // console.log("Maker entry success",action.payload.data)
            return {
                ...state,
                loading: false,
                stepCount: state.stepCount + 1
            };
        case Actions.MAKER_ENTRY_FAILURE:
            // console.log("Maker entry failure",action.payload.data)
            return {
                ...state,
                loading: false,
                error: action.payload.data,
            };
        case Actions.UPLOAD_FILES_LOADING: 
            return {
                ...state,
                loading: true,
            };
        case Actions.UPLOAD_FILES_SUCCESS: 
        // console.log("Upload File Success",action.payload.data)
            
            //const customerFile = action.payload.data[0]
            //const approvalFile = action.payload.data.length > 1 ? action.payload.data[1] : ""


            return {
                ...state,
                loading: false,
                fileUploadedUrls:action.payload.data
            };
        case Actions.UPLOAD_FILES_FAILURE: 
        // console.log("Upload File Failure")
            return {
                ...state,
                loading: false,
            };
        
        case Actions.RESTART_STATE_DATA:
            // console.log("State rese successfully")
            return {
                ...state,
                ...action.payload.data
            };
            
        default:
            return state;
    }
};

export default newInvestmentReducer;
