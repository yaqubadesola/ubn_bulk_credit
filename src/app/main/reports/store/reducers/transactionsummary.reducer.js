//

import * as Actions from '../actions';
import _ from 'lodash';
import moment from 'moment';
const initialState = {
    startDate: moment().subtract(1, 'year').format('YYYY-MM-DD'),
    endDate: moment(new Date()).format('YYYY-MM-DD'),

    data: [],
};

const transactionSummary = function (state = initialState, action) {
    switch (action.type) {
        case Actions.GET_TRANSACTION_SUMMARY_REPORT: {
            console.log(action);
            return {
                ...state,
                data: action.payload,

                startDate: action.startDate,
                endDate: action.endDate,
            };
        }

        default:
            return state;
    }
};

export default transactionSummary;
