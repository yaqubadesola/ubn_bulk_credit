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
    searchBtnClicked: false,
};

const profitandlossReducer = function (state = initialState, action) {
    switch (action.type) {
        case Actions.GET_PROFIT_AND_LOSS_DATA: {
            return {
                ...state,
                data: action.payload,
                page: action.page,
                count: initialState.count,
                size: action.size,
                totalPages: action.totalPages,
                startDate: action.startDate,
                endDate: action.endDate,
                serverSide: action.serverSide,
            };
        }
        case Actions.GET_PROFIT_AND_LOSS_DATA_BY_DATE: {
            return {
                ...state,
                isFiltering: true,
                isLoading: false,
                data: action.payload,
                page: action.page,
                count: initialState.count,
                size: action.size,
                totalPages: action.totalPages,
                startDate: action.startDate,
                endDate: action.endDate,
                serverSide: action.serverSide,
            };
        }
        case Actions.SET_SEARCH_BUTTON_TO_CLICKED: {
            return {
                searchBtnClicked: true,
            };
        }

        case Actions.SET_SEARCH_BUTTON_TO_UNCLICKED: {
            return {
                searchBtnClicked: false,
            };
        }
        default: {
            return state;
        }
    }
};

export default profitandlossReducer;
