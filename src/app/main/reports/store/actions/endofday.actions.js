import axios from 'axios';
import moment from 'moment';

export const GET_END_OF_DAYS = '[REPORTS APP] GET END OF DAYS';
export const GET_END_OF_DAYS_BY_DATE = '[REPORTS APP] GET END OF DAYS BY DATE';
export const GET_END_OF_DAYS_BY_DATE_LOADING = '[REPORTS APP] GET END OF DAYS BY DATE LOADING';
export const GET_END_OF_DAY = '[REPORTS APP] GET END OF DAY';
export const GET_END_OF_DAY_BY_CURRENCY = '[REPORTS APP] GET END OF DAY BY CURRENCY';
export const GET_END_OF_DAY_CREATED_DATE = '[REPORTS APP] GET END OF DAY CREATED DATE';
export const GET_END_OF_DAY_CREATED_DATE_AND_CURRENCY =
    '[REPORTS APP] GET END OF DAY CREATED DATE AND CURRENCY';

export function getEndOfDays({
    limit = 100,
    start = 0,
    currencyCode = 'NGN',
    startDate = moment().subtract(10, 'years').valueOf(),
    endDate = moment().valueOf(),
}) {
    let params = {
        limit: 100,
        start: 0,
        currencyCode: 'NGN',
        startDate: moment().valueOf(),
        endDate: moment().valueOf(),
    };
    const floatGlDate = moment().format('YYYY-MM-DD');

    const getReportRequest = axios.get(
        `logserv/api/v1/end_of_day/reports/reports_in_range?limit=${limit}&currencyCode=${currencyCode}&start=${start}&endDate=${endDate}&startDate=${startDate}`
    );
    const getFloatGlRequest = axios.get(
        `financialserv/api/v1/floatGlEndOfDayReport/by_date?date=${floatGlDate}`
    );
    return (dispatch) =>
        Promise.all([getReportRequest, getFloatGlRequest]).then((response) => {
            const [endofdayResponse, floatGlResponse] = response;
            if (floatGlResponse.status === 200 && endofdayResponse.status === 200) {
                const { data } = floatGlResponse.data;

                dispatch({
                    type: GET_END_OF_DAYS,
                    payload: endofdayResponse.data.payload,
                    page: start,
                    count: limit,
                    size: endofdayResponse.data.size,
                    serverSide: true,
                    startDate: params.startDate,
                    endDate: params.endDate,
                    openingBalance: data.openingBalance ? data.openingBalance : 0,
                    closingBalance: data.closingBalance || 0,
                });
            }
        });
}

// export function getEndOfDaysByCurrencyAndDateCreated(params = { createdDate: '', currency: 'NGN', limit: 10, start: 0 }) {
//     const request = axios.get('logserv/api/end_of_day/reports/by_created_date_and_currency', { params });

//     return (dispatch) =>

//         request.then((response) => {
//             if (response.status === 200 && response.statusText === 'OK') {
//                 dispatch({
//                     type: GET_END_OF_DAY_CREATED_DATE_AND_CURRENCY,
//                     payload: response.data
//                 })
//             }
//         })
// }

// export function getEndOfDaysByCurrency(params = { currency: 'NGN', limit: 10, start: 0 }) {
//     const request = axios.get('logserv/api/end_of_day/reports/by_currency', { params });

//     return (dispatch) =>

//         request.then((response) => {
//             if (response.status === 200 && response.statusText === 'OK') {
//                 dispatch({
//                     type: GET_END_OF_DAY_BY_CURRENCY,
//                     payload: response.data
//                 })
//             }
//         })
// }

// export function getEndOfDaysByCreatedDate(params = { createdDate: '', limit: 10, start: 0 }) {
//     const request = axios.get('/api/end_of_day/reports/by_created_date', { params });

//     return (dispatch) =>

//         request.then((response) => {
//             if (response.status === 200) {
//                 dispatch({
//                     type: GET_END_OF_DAY_CREATED_DATE,
//                     payload: response.data
//                 })
//             }
//         })
// }

export function getEndofDaysByDate({ limit, start }, date) {
    let floatGlStartDate;
    let floatGlEndDate;
    if (date) {
        let { startDate, endDate } = date;

        const startDateObj = new Date(startDate);
        floatGlStartDate = moment(startDateObj).format('YYYY-MM-DD');
        const endDateObj = new Date(endDate);
        floatGlEndDate = moment(endDateObj).format('YYYY-MM-DD');
    }

    const getReportRequest = axios.get(
        `logserv/api/v1/end_of_day/reports/reports_in_range?endDate=${floatGlEndDate}&startDate=${floatGlStartDate}&start=${start}&limit=${limit}`
    );

    const getFloatGl = axios.get(
        `financialserv/api/v1/floatGlEndOfDayReport/between_dates?startDate=${floatGlStartDate}&endDate=${floatGlEndDate}`
    );

    return (dispatch) =>
        Promise.all([getReportRequest, getFloatGl]).then((response) => {
            const [endofdayResponse, floatGlResponse] = response;
            if (floatGlResponse.status === 200 && endofdayResponse.status === 200) {
                console.log(floatGlResponse);
                const { data } = floatGlResponse.data;
                dispatch({
                    type: GET_END_OF_DAYS,
                    payload: endofdayResponse.data.payload,
                    page: start,
                    count: limit,
                    size: endofdayResponse.data.size,
                    serverSide: true,
                    startDate: date.startDate,
                    endDate: date.endDate,
                    openingBalance: data.openingBalance ? data.openingBalance : 0,
                    closingBalance: data.closingBalance || 0,
                });
            }
            console.log(response);
        });
}
