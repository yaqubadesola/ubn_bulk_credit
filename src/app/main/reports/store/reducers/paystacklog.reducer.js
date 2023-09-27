import * as Actions from '../actions';
import _ from 'lodash';
import moment from 'moment'

const initialState = {
    data: [],
    filterData: [],
    isFiltering: false,
    searchText: '',
    serverSide: false,
    page: 0,
    count: 100,
};

const paystacklogReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_PAYSTACK_LOGS:
        {
            return {
                ...state,
                data: action.payload,
                isFiltering: false,
                filterData: [],
                page : action.page,
                count: action.count,
                size: action.size,
                serverSide: action.serverSide,

            };
        }
        case Actions.GET_PAYSTACK_LOGS_BY_DATE:
        {
            return {
                ...state,
                isFiltering: true,
                filterData: action.payload,
                serverSide: action.serverSide,
                startDate: action.startDate,
                endDate: action.endDate,
                page : action.page,
                count: action.count,
                size: action.size,
            };
        }
        default:
        {
            return state;
        }
    }
};

export default paystacklogReducer;
