import * as Actions from '../actions';
import _ from 'lodash';
import moment from 'moment';
const initialState = {
    page: 0,
    size: 100,
    count: 0,
    startDate: moment().subtract(1, 'year').format('YYYY-MM-DD'),
    endDate: moment(new Date()).format('YYYY-MM-DD'),
    data: [],
    // filteredData: [],
    // isFiltering: false,
    // isLoading: false,
    // searchText: ''
    serverSide: false,
};

const airtimeDataReducer = function (state = initialState, action) {
    switch (action.type) {
        case Actions.GET_AIRTIME_DATA_REPORTS: {
            return {
                ...state,
                data: action.payload ? action.payload : state.data,
                page: action.page,
                count: action.count,
                size: action.size,
                startDate: action.startDate,
                endDate: action.endDate,
                serverSide: action.serverSide,
            };
        }

        default: {
            return state;
        }
    }
};

export default airtimeDataReducer;
