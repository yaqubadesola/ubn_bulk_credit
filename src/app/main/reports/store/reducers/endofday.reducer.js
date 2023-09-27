import * as Actions from '../actions';
import _ from 'lodash';
import moment from 'moment';
const initialState = {
    page: 0,
    count: 100,
    startDate: moment(new Date()).format('YYYY-MM-DD'),
    endDate: moment(new Date()).format('YYYY-MM-DD'),
    data: [],

    openingBalance: 0,
    closingBalance: 0,
    serverSide: false,
};

const endofdayReducer = function (state = initialState, action) {
    switch (action.type) {
        case Actions.GET_END_OF_DAYS: {
            console.log(action);
            return {
                ...state,
                data: action.payload,
                page: action.page,
                count: action.count,
                size: action.size,
                startDate: action.startDate,
                endDate: action.endDate,
                serverSide: action.serverSide,
                openingBalance: action.openingBalance,
                closingBalance: action.closingBalance,
            };
        }
        case Actions.GET_END_OF_DAY_BY_CURRENCY: {
            return {
                ...state,
                data: action.payload,
                page: action.page,
                count: action.count,
                size: action.size,
                startDate: action.startDate,
                endDate: action.endDate,
            };
        }
        case Actions.GET_END_OF_DAY_CREATED_DATE: {
            return {
                ...state,
                data: action.payload,
            };
        }
        case Actions.GET_END_OF_DAY_CREATED_DATE_AND_CURRENCY: {
            return {
                ...state,
                data: action.payload,
            };
        }
        case Actions.GET_END_OF_DAYS_BY_DATE_LOADING: {
            return {
                ...state,
                isLoading: true,
            };
        }
        case Actions.GET_END_OF_DAYS_BY_DATE: {
            return {
                ...state,
                isFiltering: true,
                isLoading: false,
                filteredData: action.payload,
            };
        }
        default: {
            return state;
        }
    }
};

export default endofdayReducer;
