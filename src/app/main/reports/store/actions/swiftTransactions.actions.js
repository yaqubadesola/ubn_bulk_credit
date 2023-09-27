import axios from 'axios';
import moment from 'moment';

export const GET_SWIFT_TRANSACTIONS = '[REPORTS APP] GET SWIFT INTERACTIONS';

export function getSwiftTransactions({
    limit = 100,
    start = 0,
    startDate = moment().subtract(10, 'years').valueOf(),
    endDate = moment().valueOf(),
    direction,
}) {
   let params = { limit, start }
    const request = axios.get(
        `logserv/api/v1/swift/report/?direction=${direction}&limit=${limit}&start=${start}&endDate=${endDate}&startDate=${startDate}`
    );

    return (dispatch) =>
        request.then((response) => {
            if (response.status === 200) {
                dispatch({
                    type: GET_SWIFT_TRANSACTIONS,
                    payload: response.data.payload,
                    page: params.start,
                    count: params.limit,
                    direction: direction,
                    size: response.data.size,
                    serverSide: false,
                });
            }
        });
}

export function getSwiftTransactionsByDate(options, date) {
    let { startDate, endDate } = date;
    startDate = moment(startDate).valueOf();
    endDate = moment(endDate).valueOf();
    const { limit, start, direction } = options;

    const request = axios.get(
        `logserv/api/v1/swift/report/?direction=${direction}&limit=${limit}&start=${start}&endDate=${endDate}&startDate=${startDate}`
    );

    return (dispatch) =>
        request.then((response) => {
            if (response.status === 200) {
                dispatch({
                    type: GET_SWIFT_TRANSACTIONS,
                    payload: response.data.payload,
                    page: start,
                    count: limit,
                    direction: direction,
                    size: response.data.size,
                    serverSide: true,
                    startDate,
                    endDate,
                });
            }
        });
}
