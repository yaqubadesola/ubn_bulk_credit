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

const endofdayReducer = function (state = initialState, action) {
    switch (action.type) {
        case Actions.GET_WILL_AND_TRUST_DATA: {
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
        case Actions.GET_WILL_AND_TRUST_DATA_BY_DATE: {
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
