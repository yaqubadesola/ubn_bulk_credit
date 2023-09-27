import axios from 'axios';
import moment from 'moment';

export const GET_WILL_AND_TRUST_DATA = '[REPORTS APP] GET WILL AND TRUST DATA';
export const GET_WILL_AND_TRUST_DATA_BY_DATE = '[REPORTS APP] GET WILL AND TRUST DATA BY DATE';

export function getWillAndTrust({
    limit = 100,
    start = 0,
    startDate = moment().subtract(10, 'years').valueOf(),
    endDate = moment().valueOf(),
}) {
    let params = {
        limit: 100,
        start: 0,
        startDate: moment().subtract(10, 'years').valueOf(),
        endDate: moment().valueOf(),
    };
    const request = axios.get(
        `lifeservice/api/v1/will_and_trust_history/find_all?limit=${limit}&start=${start}&endDate=${endDate}&startDate=${startDate}`
    );

    return (dispatch) =>
        request.then((response) => {
            if (response.status === 200) {
                console.log(response.data);
                dispatch({
                    type: GET_WILL_AND_TRUST_DATA,
                    payload: response.data.payload,
                    page: params.start,
                    count: params.limit,
                    startDate: params.startDate,
                    endDate: params.endDate,
                    size: response.data.size,
                    serverSide: true,
                });
            }
        });
}

export function getWillAndTrustByDate(currentRangeofdays, date) {
    let { startDate, endDate } = date;
    startDate = moment(startDate).valueOf();
    endDate = moment(endDate).valueOf();
    const { limit, start } = currentRangeofdays;

    const request = axios.get(
        `financialserv/api/v1/willandtrust/report?limit=${limit}&start=${start}&endDate=${endDate}&startDate=${startDate}`
    );

    return (dispatch) =>
        request.then((response) => {
            if (response.status === 200) {
                dispatch({
                    type: GET_WILL_AND_TRUST_DATA_BY_DATE,
                    payload: response.data.content,
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
