import * as Actions from '../actions';
import _ from 'lodash';
import moment from 'moment';
const initialState = {
    prematured: [],
    transactions: [],
    filteredTransactions: [],
    isFiltering: false,
    startDate: moment().subtract(1, 'year').format('YYYY-MM-DD'),
    endDate: moment(new Date()).format('YYYY-MM-DD'),
    searchText: '',
};

const reportsReducer = function (state = initialState, action) {
    switch (action.type) {
        case Actions.SET_ORDERS_SEARCH_TEXT: {
            return {
                ...state,
                searchText: action.searchText,
            };
        }
        case Actions.GET_TRANSACTIONS: {
            return {
                ...state,
                transactions: action.payload,
            };
        }
        case Actions.GET_TRANSFERS: {
            return {
                ...state,
                transactions: action.payload,
            };
        }
        case Actions.GET_CREDITED_DEBITED_ACCOUNTS: {
            return {
                ...state,
                transactions: action.payload,
            };
        }
        case Actions.GET_TRANSFERS_BY_DATE: {
            return {
                ...state,
                filteredTransactions: action.payload,
                isFiltering: true,
            };
        }
        case Actions.GET_CALYPSO_BATCHS: {
            return {
                ...state,
                prematured: action.payload,
            };
        }
        case Actions.GET_PREMATURED_TERMINATIONS: {
            return {
                ...state,
                prematured: action.payload,
                isFiltering: false,
                filteredTransactions: [],
            };
        }
        default: {
            return state;
        }
    }
};

export default reportsReducer;
