import * as Actions from '../actions';
import moment from 'moment';
import _ from 'lodash';

const initialState = {
    count: 100,
    startDate: moment(new Date()).format('YYYY-MM-DD'),
    endDate: moment(new Date()).format('YYYY-MM-DD'),
    // data: [],
    serverSide: false,
    searchText: ''
};

const giflogReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_GIF_LOGS:
        {
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
        default:
        {
            return state;
        }
    }
};

export default giflogReducer;
