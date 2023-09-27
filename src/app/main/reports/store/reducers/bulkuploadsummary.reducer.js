import moment from 'moment';
import * as Actions from '../actions';

const initialState = {
    page: 0,
    startDate: moment().subtract(10, 'years').valueOf(),
    endDate: moment().valueOf(),
    data: [],
    size: 100,
};

const onboardedCustomersReducer = function (state = initialState, action) {
    switch (action.type) {
        case Actions.GET_BULK_UPLOAD_REPORTS: {
            console.log(action);
            const { payload, count, startDate, endDate, page, size } = action;

            return {
                ...state,
                data: payload,
                size: size,
                page: page,
                startDate: startDate,
                endDate: endDate,
                count: count,
            };
        }

        default: {
            return state;
        }
    }
};

// import moment from "moment";
// import * as Actions from "../actions";

// const initialState ={
//     page: 0,
//     count: 100,
//     startDate: moment(new Date()).format('YYYY-MM-DD'),
//     endDate: moment(new Date()).format('YYYY-MM-DD'),
//      data: [],
//    size:  100

// }

// const onboardedCustomersReducer = function( state = initialState, action){
//     switch(action.type){
//         case Actions.GET_ONBAORDED_CUSTOMERS_REPORTS: {
//             console.log(action)
//             const {payload, startDate, endDate, page, size} = action;

//             return {...state, data: payload&& payload,size:size,page:page  && page ,startDate: startDate, endDate: endDate}

//         }

//         default : {
//             return state
//         }
//     }
// }

// export default onboardedCustomersReducer

export default onboardedCustomersReducer;
