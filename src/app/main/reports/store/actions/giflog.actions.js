import axios from 'axios';
import moment from 'moment';

export const GET_GIF_LOGS = '[REPORTS APP] GET GIF LOGS LOG';
export const GET_GIF_LOGS_LOG_BY_DATE = '[REPORTS APP] GET GIF LOGS BY DATE';

export function getGifDataLog({
    limit = 100,
    start = 0,
    startDate = moment().subtract(10, 'years').valueOf(),
    endDate = moment().valueOf(),
    // direction,
}) {
    let params = { limit, start };
    const request = axios.get(
        `logserv/api/v1/wealth_investments?limit=${limit}&start=${start}&endDate=${endDate}&startDate=${startDate}`
    );

    return (dispatch) =>
        request.then((response) => {
            if (response.status === 200) {
                dispatch({
                    type: GET_GIF_LOGS,
                    payload: response.data.payload,
                    page: params.start,
                    count: params.limit,
                    size: response.data.size,
                    serverSide: false,
                    startDate,
                    endDate,
                });
            }
        });
}

export function getGifDataLogByDate(options, date) {
    let { startDate, endDate } = date;
    startDate = moment(startDate).valueOf();
    endDate = moment(endDate).valueOf();
    const { limit, start } = options;

     const request = axios.get(
         `logserv/api/v1/wealth_investments?limit=${limit}&start=${start}&endDate=${endDate}&startDate=${startDate}`
     );

    return (dispatch) =>
        request.then((response) => {
            if (response.status === 200) {
                dispatch({
                    type: GET_GIF_LOGS,
                    payload: response.data.payload,
                    page:start,
                    count: limit,
                    size: response.data.size,
                    serverSide: true,
                    startDate,
                    endDate,
                });
            }
        });
}


export function getCummulativeGifDataLog({
    limit = 100,
    start = 0,
    startDate = moment().subtract(10, 'years').valueOf(),
    endDate = moment().valueOf(),
}) {
    let params = { limit, start };
    const request = axios.get(
        `financialserv/api/v1/wealth/get_all_wealth_investments?limit=${limit}&start=${start}&endDate=${endDate}&startDate=${startDate}`
    );

    return (dispatch) =>
        request.then((response) => {
            if (response.status === 200) {
                dispatch({
                    type: GET_GIF_LOGS,
                    payload: response.data.payload,
                    page: start,
                    count: limit,
                    size: response.data.size,
                    serverSide: true,
                });
            }
        });
}

export function getCummulativeGifDataLogByDate(options, date) {
    let { startDate, endDate } = date;
    startDate = moment(startDate).valueOf();
    endDate = moment(endDate).valueOf();
    const { limit, start, direction } = options;

   const request = axios.get(
       `financialserv/api/v1/wealth/get_all_wealth_investments?limit=${limit}&start=${start}&endDate=${endDate}&startDate=${startDate}`
   );

    return (dispatch) =>
        request.then((response) => {
            if (response.status === 200) {
                dispatch({
                    type: GET_GIF_LOGS,
                    payload: response.data.payload,
                    page: start,
                    count: limit,
                    size: response.data.size,
                    serverSide: true,
                    startDate,
                    endDate,
                });
            }
        });
}