import axios from 'axios';
import moment from 'moment';

export const GET_TRANSACTION_SUMMARY_REPORT = '[REPORTS APP] GET TRANSACTION SUMMARY REPORTS';
const defaultParams = {
    startDate: '2023-01-01',
    endDate: moment(new Date()).format('YYYY-MM-DD'),
};

export function getTransactionSummary(params = defaultParams) {
    console.log(params);

    const request = axios.get('logserv/api/v1/transactions/get_summary', { params });

    return (dispatch) => {
        request.then((response) => {
            console.log(response);
            if (response.status === 200) {
                dispatch({
                    type: GET_TRANSACTION_SUMMARY_REPORT,
                    payload: response.data,
                    startDate: params.startDate,
                    endDate: params.endDate,
                });
            }
        });
    };
}
