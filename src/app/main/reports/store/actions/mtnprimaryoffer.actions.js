import axios from 'axios';
import moment from 'moment';

export const GET_MTN_PRIMARY_OFFERS = '[REPORTS APP] GET MTN PRIMARY OFFERS';
export const GET_MTN_PRIMARY_OFFERS_BY_DATE = '[REPORTS APP] GET MTN PRIMARY OFFERS BY DATE';
export const GET_MTN_PRIMARY_OFFERS_BY_DATE_LOADING =
    '[REPORTS APP] GET MTN PRIMARY OFFERS BY DATE LOADING';
export const GET_MTN_PRIMARY_OFFER = '[REPORTS APP] GET MTN PRIMARY OFFER';
export const GET_MTN_PRIMARY_OFFER_BY_CURRENCY = '[REPORTS APP] GET MTN PRIMARY OFFER BY CURRENCY';
export const GET_MTN_PRIMARY_OFFER_CREATED_DATE =
    '[REPORTS APP] GET MTN PRIMARY OFFER CREATED DATE';
export const GET_MTN_PRIMARY_OFFER_CREATED_DATE_AND_CURRENCY =
    '[REPORTS APP] GET MTN PRIMARY OFFER CREATED DATE AND CURRENCY';

export function getMtnPrimaryOffers({
    limit = 100,
    start = 0,
    currencyCode = 'NGN',
    startDate = moment().subtract(10, 'years').valueOf(),
    endDate = moment().valueOf(),
}) {
    const request = axios.get(
        `financialserv/api/v1/mtnshares?limit=${limit}&currencyCode=${currencyCode}&start=${start}&endDate=${endDate}&startDate=${startDate}`
    );
    return (dispatch) =>
        request.then((response) => {
            if (response.status === 200) {
                dispatch({
                    type: GET_MTN_PRIMARY_OFFERS,
                    payload: response.data.data,
                    page: start,
                    count: limit,
                    size: response.data.size,
                    serverSide: false,
                });
            }
        });
}

export function getMtnPrimaryOffersByCurrencyAndDateCreated(
    params = { createdDate: '', currency: 'NGN', limit: 10, start: 0 }
) {
    const request = axios.get('logserv/api/end_of_day/reports/by_created_date_and_currency', {
        params,
    });

    return (dispatch) =>
        request.then((response) => {
            if (response.status === 200 && response.statusText === 'OK') {
                dispatch({
                    type: GET_MTN_PRIMARY_OFFER_CREATED_DATE_AND_CURRENCY,
                    payload: response.data,
                });
            }
        });
}

export function getMtnPrimaryOffersByCurrency(params = { currency: 'NGN', limit: 10, start: 0 }) {
    const request = axios.get('logserv/api/end_of_day/reports/by_currency', { params });

    return (dispatch) =>
        request.then((response) => {
            if (response.status === 200 && response.statusText === 'OK') {
                dispatch({
                    type: GET_MTN_PRIMARY_OFFER_BY_CURRENCY,
                    payload: response.data,
                });
            }
        });
}

export function getMtnPrimaryOffersByCreatedDate(
    params = { createdDate: '', limit: 10, start: 0 }
) {
    const request = axios.get('/api/end_of_day/reports/by_created_date', { params });

    return (dispatch) =>
        request.then((response) => {
            if (response.status === 200) {
                dispatch({
                    type: GET_MTN_PRIMARY_OFFER_CREATED_DATE,
                    payload: response.data,
                });
            }
        });
}

export function getMtnPrimaryOffersByDate(currentRangeMtnPrimaryOffer, date) {
    let queryStartDate;
    let queryEndDate;
    const params = new URLSearchParams();
    if (date) {
        let { startDate, endDate } = date;
        params.append('startDate', moment(startDate).valueOf());
        params.append('endDate', moment(endDate).valueOf());
    }
    const { limit, start } = currentRangeMtnPrimaryOffer;
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
                    type: GET_MTN_PRIMARY_OFFERS,
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
