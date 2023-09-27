import axios from 'axios';
import moment from 'moment';
export const GET_BULK_UPLOAD_DETAIL_REPORT = '[REPORT APP] GET BULK UPLOAD DETAIL REPORT';

export function getBulkUploadDetailsReport({
    value,
    start = 0,
    limit = 100,
    startDate = moment().subtract(10, 'years').valueOf(),
    endDate = moment().valueOf(),
}) {
    ///api/v1/bulk/get_bulk_entries_status/{value}/page_no/{page}/size_no/{size}/&endDate=${endDate}&startDate=${startDate}
    const params = { value, page: start, size: limit, startDate, endDate };
    const request = axios.get(`authserv/api/v1/bulk/get_bulk_entries_status/page_no/size_no/date`, {
        params,
    });

    return (dispatch) =>
        request.then((response) => {
            console.log('response data ', response);
            dispatch({
                type: GET_BULK_UPLOAD_DETAIL_REPORT,
                payload: response.data.payload,
                page: response.data.start,
                count: response.data.limit,
                size: response.data.size,
            });
        });
}
