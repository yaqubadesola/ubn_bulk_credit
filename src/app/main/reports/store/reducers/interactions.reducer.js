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
};

const interactionsReducer = function (state = initialState, action) {
    switch (action.type) {
        case Actions.GET_INTERACTIONS: {
            return {
                ...state,
                data: action.payload,
                page: action.page,
                count: action.count,
                size: action.size,
                startDate: action.startDate,
                endDate: action.endDate,
                serverSide: action.serverSide,
            };
        }

        // case Actions.GET_INTERACTIONS_CREATED_DATE: {
        //     return {
        //         ...state,
        //         data: action.payload,
        //     };
        // }
        default: {
            return state;
        }
    }
};

export default interactionsReducer;
