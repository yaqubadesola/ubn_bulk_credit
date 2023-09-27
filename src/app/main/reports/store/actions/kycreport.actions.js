import axios from 'axios';
import moment from 'moment';

export const GET_KYC_REPORTS = '[REPORTS APP] GET KYC REPORTS';
export const GET_KYC_REPORTS_BY_DATE = '[REPORTS APP] GET KYC REPORTS BY DATE';
export const GET_KYC_REPORTS_BY_DATE_LOADING = '[REPORTS APP] GET KYC REPORTS BY DATE LOADING';
export const GET_KYC_REPORT = '[REPORTS APP] GET KYC REPORT';
export const GET_KYC_REPORT_BY_CURRENCY = '[REPORTS APP] GET KYC REPORT BY CURRENCY';
export const GET_KYC_REPORT_CREATED_DATE = '[REPORTS APP] GET KYC REPORT CREATED DATE';
export const GET_KYC_REPORT_CREATED_DATE_AND_CURRENCY =
    '[REPORTS APP] GET KYC REPORT CREATED DATE AND CURRENCY';

export function getKycReports({
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
        startDate: moment().subtract(10, 'years').valueOf(),
        endDate: moment().valueOf(),
    };
    const request = axios.get(
        `authserv/api/v1/admin/kyc/report?limit=${limit}&currencyCode=${currencyCode}&start=${start}&endDate=${endDate}&startDate=${startDate}`
    );

    return (dispatch) =>
        request.then((response) => {
            if (response.status === 200) {
                console.log('response ', response.data.data);
                dispatch({
                    type: GET_KYC_REPORTS,
                    payload: response.data.data,
                    page: params.start,
                    count: params.limit,
                    size: response.data.size,
                    serverSide: false,
                });
            }
        });
}

export function getKycReportsByCurrencyAndDateCreated(
    params = { createdDate: '', currency: 'NGN', limit: 10, start: 0 }
) {
    const request = axios.get('logserv/api/end_of_day/reports/by_created_date_and_currency', {
        params,
    });

    return (dispatch) =>
        request.then((response) => {
            if (response.status === 200 && response.statusText === 'OK') {
                dispatch({
                    type: GET_KYC_REPORT_CREATED_DATE_AND_CURRENCY,
                    payload: response.data,
                });
            }
        });
}

export function getKycReportsByCurrency(params = { currency: 'NGN', limit: 10, start: 0 }) {
    const request = axios.get('logserv/api/end_of_day/reports/by_currency', { params });

    return (dispatch) =>
        request.then((response) => {
            if (response.status === 200 && response.statusText === 'OK') {
                dispatch({
                    type: GET_KYC_REPORT_BY_CURRENCY,
                    payload: response.data,
                });
            }
        });
}

export function getKycReportsByCreatedDate(params = { createdDate: '', limit: 10, start: 0 }) {
    const request = axios.get('/api/end_of_day/reports/by_created_date', { params });

    return (dispatch) =>
        request.then((response) => {
            if (response.status === 200) {
                dispatch({
                    type: GET_KYC_REPORT_CREATED_DATE,
                    payload: response.data,
                });
            }
        });
}

export function getKycReportsByDate(currentRangeKycReport, date) {
    let queryStartDate;
    let queryEndDate;
    const params = new URLSearchParams();
    if (date) {
        let { startDate, endDate } = date;
        params.append('startDate', moment(startDate).valueOf());
        params.append('endDate', moment(endDate).valueOf());
    }
    const { limit, start } = currentRangeKycReport;
    let currencyCode = 'NGN';
    params.append('limit', limit);
    params.append('currencyCode', currencyCode);
    params.append('start', start);

    const request = axios.get('logserv/api/v1/end_of_day/reports/reports_in_range', {
        params,
    });

    return (dispatch) =>
        request.then((response) => {
            if (response.status === 200) {
                dispatch({
                    type: GET_KYC_REPORTS,
                    payload: response.data.payload,
                    page: start,
                    count: limit,
                    size: response.data.size,
                    serverSide: true,
                    queryStartDate,
                    queryEndDate,
                });
            }
        });
}
