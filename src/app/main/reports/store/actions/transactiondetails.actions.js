import axios from 'axios';

export const GET_TRANSACTION_DETAILS_REPORT = '[REPORT APP] GET TRANSACTION DETAILS';

export const getTransactionDetails = (params) => {
    const request = axios.get('logserv/api/v1/transactions/get_all_transactions', { params });
    return (dispatch) => {
        request.then((response) => {
            console.log(response);
            dispatch({
                type: GET_TRANSACTION_DETAILS_REPORT,
                payload: response.data.payload,
                startDate: params.startDate,
                endDate: params.endDate,
                size: params.size,
                count: response.data.limit,
                page: response.data.start,
            });
        });
    };
};
