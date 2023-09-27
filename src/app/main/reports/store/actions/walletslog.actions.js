import axios from 'axios'
import moment from 'moment'

export const GET_WALLETS_LOG = '[REPORTS APP] GET WALLETS LOG';
export const GET_WALLETS_LOG_DATA_BY_DATE = '[REPORTS APP] GET WALLETS LOG BY DATE';
export const SET_SEARCH_BUTTON_TO_CLICKED = '[REPORTS APP] SET SEARCH BUTTON TO CLICKED';
export const SET_SEARCH_BUTTON_TO_UNCLICKED = '[REPORTS APP] SET SEARCH BUTTON TO UNCLICKED';

export function getWalletsLog()
{
    const request = axios.get('logserv/api/v1/wallet_logs');

    return (dispatch) =>

        request.then((response) => {
            if(response.status === 200){
                dispatch({
                    type   : GET_WALLETS_LOG,
                    payload: response.data
                })
            }
        })
}
export function getPaginatedWalletLog({
    limit = 100,
    start = 0,
    startDate = moment().subtract(10, 'years').valueOf(),
    endDate = moment().valueOf(),
}) {
    // let params = {
    //     startDate: moment().subtract(10, 'years').valueOf(),
    //     endDate: moment().valueOf(),
    // };
    const request = axios.get(
        `logserv/api/v1/wallet_logs/find_in_range?limit=${limit}&start=${start}&endDate=${endDate}&startDate=${startDate}`
    );

    return (dispatch) =>
        request.then((response) => {
            if (response.status === 200) {
                dispatch({
                    type: GET_WALLETS_LOG,
                    payload: response.data.payload,
                    page: start,
                    count: limit,
                    startDate: startDate,
                    endDate: endDate,
                    totalPages: response.data.totalPages,
                    size: response.data.size,
                    serverSide: true,
                });
            }
        });
}

export function getPaginatedWalletLogByDate(currentRangeofdays, date,) {
    let { startDate, endDate } = date;
    startDate = moment(startDate).valueOf();
    endDate = moment(endDate).valueOf();
    const { limit, start } = currentRangeofdays;

    const request = axios.get(
        `logserv/api/v1/wallet_logs/find_in_range?limit=${limit ? limit : 100}&start=${start}&endDate=${endDate}&startDate=${startDate}`
    );

    return (dispatch) =>
        request.then((response) => {
            if (response.status === 200) {
                dispatch({
                    type: GET_WALLETS_LOG_DATA_BY_DATE,
                    payload: response.data.payload,
                    page: start,
                    count: limit,
                    size: response.data.size,
                    serverSide: true,
                    totalPages: response.data.totalPages,
                    startDate,
                    endDate,
                });
            }
        });
}
// Defunct
// export function getWalletsLogByDate(wallets, date) {
//     const startDate = moment(date.startDate).startOf('day').valueOf()
//     const endDate = moment(date.endDate).endOf('day').valueOf()
//     const walletsLog = wallets && wallets.filter(d => moment(d.valueDate).isBetween(startDate, endDate))

//     return (dispatch) =>
//         dispatch({
//             type: GET_WALLETS_LOG_BY_DATE,
//             payload: walletsLog,
//         })
// }

export function clickSearchBtn() {
    return {
        type: SET_SEARCH_BUTTON_TO_CLICKED,
    };
}

export function unclickSearchBtn() {
    return {
        type: SET_SEARCH_BUTTON_TO_UNCLICKED,
    };
}