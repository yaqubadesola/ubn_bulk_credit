import * as Actions from '../actions';
import _ from 'lodash';
import moment from 'moment'
const initialState = {
    page: 0,
    count: 100,
    startDate: moment(new Date()).format('YYYY-MM-DD'),
    endDate: moment(new Date()).format('YYYY-MM-DD'),
    data: [],
    // filteredData: [],
    // isFiltering: false,
    // isLoading: false,
    // searchText: ''
    serverSide: false
};

const mtnPrimaryOfferReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_MTN_PRIMARY_OFFERS:
        {
     
            return {
                ...state,
                data: action.payload,
                page : action.page,
                count: action.count,
                size: action.size,
                startDate: action.startDate,
                endDate: action.endDate,
                serverSide: action.serverSide
            };
        }
        case Actions.GET_MTN_PRIMARY_OFFER_BY_CURRENCY:
        {
            return {
                ...state,
                data: action.payload,
                page : action.page,
                count: action.count,
                size: action.size,
                startDate: action.startDate,
                endDate: action.endDate
            };
        }
        case Actions.GET_MTN_PRIMARY_OFFER_CREATED_DATE:
        {
            return {
                ...state,
                data: action.payload,
            };
        }
        case Actions.GET_MTN_PRIMARY_OFFER_CREATED_DATE_AND_CURRENCY:
        {
            return {
                ...state,
                data: action.payload,
            };
        }
        case Actions.GET_MTN_PRIMARY_OFFERS_BY_DATE_LOADING:
        {
            return {
                ...state,
                isLoading: true,
            };
        }
        case Actions.GET_MTN_PRIMARY_OFFERS_BY_DATE:
        {
            return {
                ...state,
                isFiltering: true,
                isLoading: false,
                filteredData: action.payload,
            };
        }
        default:
        {
            return state;
        }
    }
};

export default mtnPrimaryOfferReducer;
