import * as Actions from '../actions';
import _ from 'lodash';
import moment from 'moment';
const initialState = {
    page: 0,
    count: 100,
    startDate: moment(new Date()).format('YYYY-MM-DD'),
    endDate: moment(new Date()).format('YYYY-MM-DD'),
    data: [],
    serverSide: false,
    direction: 'C',
};

const swiftTransactionReducer = function (state = initialState, action) {
    switch (action.type) {
        case Actions.GET_SWIFT_TRANSACTIONS: {
            return {
                ...state,
                data: action.payload,
                page: action.page,
                count: action.count,
                size: action.size,
                startDate: action.startDate,
                endDate: action.endDate,
                serverSide: action.serverSide,
                direction: action.direction,
            };
        }
        default: {
            return state;
        }
    }
};

export default swiftTransactionReducer;
