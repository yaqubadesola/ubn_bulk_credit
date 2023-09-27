import * as Actions from '../actions';
import moment from 'moment';
const initialState = {
    data: [],
    startDate: moment().subtract(1, 'year').format('YYYY-MM-DD'),
    endDate: moment(new Date()).format('YYYY-MM-DD'),
    size: 100,
    page: 0,
};

const transactionDetails = (state = initialState, action) => {
    switch (action.type) {
        case Actions.GET_TRANSACTION_DETAILS_REPORT: {
            return {
                ...state,
                data: action.payload,
                startDate: action.startDate,
                endDate: action.endDate,
                size: action.size,
                count: action.count,
                page: action.page,
            };
        }
        default:
            return state;
    }
};

export default transactionDetails;
