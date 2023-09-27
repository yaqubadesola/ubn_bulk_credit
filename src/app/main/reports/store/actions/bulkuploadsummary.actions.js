import axios from 'axios';
import moment from 'moment';
import { showMessage } from '../../../../store/actions';
export const GET_BULK_UPLOAD_REPORTS = '[REPORTS APP] GGET BULK UPLOAD REPORTS';
const query = {
    // startDate: moment().subtract(10, 'years').valueOf(),
    // endDate: moment().valueOf(),
    startDate: moment().subtract(10, 'years').valueOf(),
    endDate: moment().valueOf(),
    page: 0,
    size: 100,
};
// const params = { value: categoryId, page: start, size: limit, startDate, endDate };
export function getOnboardedCustomersReport(params = query) {
    console.log('Äll params = ', params);

    const request = axios.get('authserv/api/v1/file/get_all_bulk_file', { params });

    return (dispatch) => {
        request.then((response) => {
            console.log('Onboarded res = ', response);
            if (response.status === 200) {
                dispatch({
                    type: GET_BULK_UPLOAD_REPORTS,
                    payload: response.data.payload,
                    startDate: params.startDate,
                    endDate: params.endDate,
                    size: params.size,
                    page: response.data.page,
                    count: response.data.limit,
                });
            }
        });
    };
}
