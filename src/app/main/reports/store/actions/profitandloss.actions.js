import axios from 'axios';
import moment from 'moment';

export const GET_PROFIT_AND_LOSS_DATA = '[REPORTS APP] GET PROFIT AND LOSS DATA';
export const GET_PROFIT_AND_LOSS_DATA_BY_DATE = '[REPORTS APP] GET PROFIT AND LOSS DATA BY DATE';
export const SET_SEARCH_BUTTON_TO_CLICKED = '[REPORTS APP] SET SEARCH BUTTON TO CLICKED';
export const SET_SEARCH_BUTTON_TO_UNCLICKED = '[REPORTS APP] SET SEARCH BUTTON TO UNCLICKED';

export function getProfitAndLoss({
    limit = 100,
    productCategoryId,
    start = 0,
    startDate = moment().subtract(10, 'years').valueOf(),
    endDate = moment().valueOf(),
}) {
    let params = {
        startDate: moment().subtract(10, 'years').valueOf(),
        endDate: moment().valueOf(),
    };
    const request = axios.get(
        `logserv/api/v1/profit_loss?productCategoryId=${productCategoryId}&limit=${limit}&start=${start}&endDate=${endDate}&startDate=${startDate}`
    );

    return (dispatch) =>
        request.then((response) => {
            if (response.status === 200) {
                dispatch({
                    type: GET_PROFIT_AND_LOSS_DATA,
                    payload: response.data.payload,
                    page: start,
                    count: limit,
                    startDate: params.startDate,
                    endDate: params.endDate,
                    totalPages: response.data.totalPages,
                    size: response.data.size,
                    serverSide: false,
                });
            }
        });
}

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

export function getProfitAndLossByDate(currentRangeofdays, date, productCategoryId) {
    let { startDate, endDate } = date;
    startDate = moment(startDate).valueOf();
    endDate = moment(endDate).valueOf();
    const { limit, start } = currentRangeofdays;

    const request = axios.get(
        `logserv/api/v1/profit_loss?productCategoryId=${productCategoryId}&limit=${limit}&start=${start}&endDate=${endDate}&startDate=${startDate}`
    );

    return (dispatch) =>
        request.then((response) => {
            if (response.status === 200) {
                console.log(response.data);
                dispatch({
                    type: GET_PROFIT_AND_LOSS_DATA_BY_DATE,
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
