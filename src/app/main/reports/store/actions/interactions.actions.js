import axios from 'axios';
import moment from 'moment';

export const GET_INTERACTIONS = '[REPORTS APP] GET INTERACTIONS';

export function getInteractions({
    limit = 100,
    start = 0,
    startDate = moment().subtract(10, 'years').valueOf(),
    endDate = moment().valueOf(),
}) {
    let params = {
        limit,
        start,
        startDate,
        endDate,
    };
    const request = axios.get(
        `conciergeserv/api/v1/interaction/report/?limit=${limit}&start=${start}&endDate=${endDate}&startDate=${startDate}`
    );

    return (dispatch) =>
        request.then((response) => {
            if (response.status === 200) {
                dispatch({
                    type: GET_INTERACTIONS,
                    payload: response.data.content,
                    page: params.start,
                    count: params.limit,
                    size: response.data.size,
                    serverSide: false,
                });
            }
        });
}

export function getInteractionsByDate(interactionsOptions, date) {
    let { startDate, endDate } = date;
    startDate = moment(startDate).valueOf();
    endDate = moment(endDate).valueOf();
    const { limit, start } = interactionsOptions;

    const request = axios.get(
        `conciergeserv/api/v1/interaction/report/?limit=${limit}&start=${start}&endDate=${endDate}&startDate=${startDate}`
    );

    return (dispatch) =>
        request.then((response) => {
            if (response.status === 200) {
                dispatch({
                    type: GET_INTERACTIONS,
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
