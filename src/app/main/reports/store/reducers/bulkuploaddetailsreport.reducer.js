import * as Actions from '../actions';
import moment from 'moment';
const initialState = {
    data: [],
    // startDate: moment().subtract(10, 'years').valueOf(),
    // endDate: moment().valueOf(),
    startDate: moment().subtract(1, 'year').format('YYYY-MM-DD'),
    endDate: moment(new Date()).format('YYYY-MM-DD'),
    count: 0,
    page: 0,
    size: 100,
};

const bulkUploadDetail = (state = initialState, action) => {
    switch (action.type) {
        case Actions.GET_BULK_UPLOAD_DETAIL_REPORT: {
            return {
                ...state,
                data: action.payload,
                size: action.size,
                page: action.page,
                startDate: action.startDate,
                endDate: action.endDate,
                count: action.count,
            };
        }
        default:
            return state;
    }
};

export default bulkUploadDetail;
