import axios from 'axios';
import moment from 'moment';
import _ from 'lodash';

export const GET_PRODUCT_CATEGORIES = '[INVESTMENTS APP] GET PRODUCT CATEGORIES';
export const GET_INVESTMENTS = '[INVESTMENTS APP] GET INVESTMENTS';
export const GET_TBILLS_INVESTMENTS = '[INVESTMENTS APP] GET TBILLS INVESTMENTS';
export const GET_BONDS_INVESTMENTS = '[INVESTMENTS APP] GET BONDS INVESTMENTS';
export const GET_EUROBONDS_INVESTMENTS = '[INVESTMENTS APP] GET EUROBONDS INVESTMENTS';
export const GET_COMMERCIALPAPERS_INVESTMENTS =
    '[INVESTMENTS APP] GET COMMERCIAL PAPERS INVESTMENTS';
export const GET_INVESTMENTS_FILTERED = '[INVESTMENTS APP] GET INVESTMENTS FILTERED';
export const GET_INVESTMENTS_ALL_BY_DATE = '[ALL INVESTMENTS APP] GET INVESTMENTS BY DATE';
export const GET_INVESTMENTS_ALL = '[ALL INVESTMENTS APP] GET INVESTMENTS';
export const RESET_FILTER = '[INVESTMENT APP] RESET FILTER';

const investment_enums = [
    'GET_INVESTMENTS',
    'GET_TBILLS_INVESTMENTS',
    'GET_BONDS_INVESTMENTS',
    'GET_COMMERCIALPAPERS_INVESTMENTS',
    'GET_EUROBONDS_INVESTMENTS',
];

export function getProductCategories() {
    const request = axios.get('financialserv/api/v1/productCategories');
    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type: GET_PRODUCT_CATEGORIES,
                payload: response.data,
            })
        );
}

export function resetFilter() {
    return (dispatch) =>
        dispatch({
            type: RESET_FILTER,
        });
}

export function getAllInvestments() {
    const request = axios.get('financialserv/api/v1/calypsoArchives');

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type: GET_INVESTMENTS,
                payload: response.data,
            })
        );
}

export function getAllGenericInvestments() {
    const request = axios.get('financialserv/api/v1/calypsoArchives');

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type: GET_INVESTMENTS_ALL,
                payload: response.data,
            })
        );
}

export function getInvestmentsStatus(key, categoryId) {
    const request = axios.get(
        `financialserv/api/v1/investments/get_by_productcategory_and_status?key=${key}`
    );

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type: GET_INVESTMENTS,
                payload: response.data,
            })
        );
}

export function getBondInvestmentsStatus({
    start = 0,
    limit = 100,
    startDate = moment().subtract(10, 'years').valueOf(),
    endDate = moment().valueOf(),
}) {
    const request = axios.get(
        `logserv/api/v1/investmentActivityLogs/find_by_category?productCategoryId=2&start=${start}&limit=${limit}&endDate=${endDate}&startDate=${startDate}`
    );

    return (dispatch) =>
        request.then((response) => {
            dispatch({
                type: GET_BONDS_INVESTMENTS,
                payload: response.data && response.data.content,
                page: start,
                count: limit,
                size: response.data.totalPages,
                startDate,
                endDate,
            });
        });
}
export function getEurobondInvestmentsStatus({
    start = 0,
    limit = 100,
    startDate = moment().subtract(10, 'years').valueOf(),
    endDate = moment().valueOf(),
}) {
    const request = axios.get(
        `logserv/api/v1/investmentActivityLogs/find_by_category?productCategoryId=4&start=${start}&limit=${limit}&endDate=${endDate}&startDate=${startDate}`
    );

    return (dispatch) =>
        request.then((response) => {
            dispatch({
                type: GET_EUROBONDS_INVESTMENTS,
                payload: response.data && response.data.content,
                page: start,
                count: limit,
                size: response.data.totalPages,
                startDate,
                endDate,
            });
        });
}

export function getTbillsInvestmentsStatus({
    categoryId,
    start = 0,
    limit = 100,
    startDate = moment().subtract(10, 'years').valueOf(),
    endDate = moment().valueOf(),
}) {
    ///api/v1/bulk/get_bulk_entries_status/{value}/page_no/{page}/size_no/{size}/&endDate=${endDate}&startDate=${startDate}
    const params = { value: categoryId, page: start, size: limit, startDate, endDate };
    const request = axios.get(`authserv/api/v1/bulk/get_bulk_entries_status/page_no/size_no/date`, {
        params,
    });

    return (dispatch) =>
        request.then((response) => {
            console.log('response data ', response);
            dispatch({
                type: GET_TBILLS_INVESTMENTS,
                payload: response.data.payload,
                page: response.data.start,
                count: response.data.limit,
                size: response.data.size,
            });
        });
}

export function getCommercialPapersInvestmentsStatus({
    categoryId,
    start = 0,
    limit = 100,
    startDate = moment().subtract(10, 'years').valueOf(),
    endDate = moment().valueOf(),
}) {
    const request = axios.get(
        `logserv/api/v1/investmentActivityLogs/find_by_category?productCategoryId=3&start=${start}&limit=${limit}&endDate=${endDate}&startDate=${startDate}`
    );

    return (dispatch) =>
        request.then((response) => {
            if (response.status === 200) {
                dispatch({
                    type: GET_COMMERCIALPAPERS_INVESTMENTS,
                    payload: response.data && response.data.content,
                    page: start,
                    count: limit,
                    size: response.data.totalPages,
                    startDate,
                    endDate,
                });
            }
        });
}

export function getAllInvestmentsByDate(currentInvestments, date) {
    return (dispatch, getState) => {
        const { allInvestments } = getState().allInvestmentsApp.investments;
        const startDate = moment(date.startDate);
        const endDate = moment(date.endDate);
        let investmentsLog;
        if (startDate.startOf('day').valueOf() === endDate.startOf('day').valueOf()) {
            investmentsLog =
                allInvestments &&
                allInvestments.filter(
                    (d) =>
                        moment(d.createdAt).startOf('day').valueOf() ===
                        startDate.startOf('day').valueOf()
                );
        } else {
            investmentsLog =
                allInvestments &&
                allInvestments.filter((d) => moment(d.createdAt).isBetween(startDate, endDate));
        }
        dispatch({
            type: GET_INVESTMENTS_ALL_BY_DATE,
            payload: investmentsLog,
        });
    };
}

export function getInvestmentsByDate(investmentType, date, allInvestments) {
    function pullData(data, date) {
        const startDate = moment(date.startDate).startOf('day').valueOf();
        const endDate = moment(date.endDate).endOf('day').valueOf();
        data = data && data.filter((d) => moment(d.createdAt).isBetween(startDate, endDate));
        return data;
    }

    let investmentsLog;
    let type;
    let bondInvestmentsFiltered = [];
    let eurobondInvestmentsFiltered = [];
    let tbillsInvestmentsFiltered = [];
    let commercialpaperInvestmentsFiltered = [];
    return (dispatch, getState) => {
        const {
            commercialpaperInvestments,
            bondInvestments,
            tbillsInvestments,
            eurobondInvestments,
        } = getState().successInvestmentsApp && getState().successInvestmentsApp.investments;
        if (investmentType === investment_enums[0]) {
            investmentsLog = pullData(allInvestments, date);
            type = GET_INVESTMENTS_FILTERED;
        } else if (investmentType === investment_enums[1]) {
            tbillsInvestmentsFiltered = pullData(tbillsInvestments, date);
            type = GET_TBILLS_INVESTMENTS;
        } else if (investmentType === investment_enums[2]) {
            bondInvestmentsFiltered = pullData(bondInvestments, date);
            type = GET_BONDS_INVESTMENTS;
        } else if (investmentType === investment_enums[3]) {
            commercialpaperInvestmentsFiltered = pullData(commercialpaperInvestments, date);
            type = GET_COMMERCIALPAPERS_INVESTMENTS;
        } else if (investmentType === investment_enums[4]) {
            eurobondInvestmentsFiltered = pullData(eurobondInvestments, date);
            type = GET_EUROBONDS_INVESTMENTS;
        }
        dispatch({
            type,
            payload: investmentsLog,
            bondInvestmentsFiltered,
            eurobondInvestmentsFiltered,
            commercialpaperInvestmentsFiltered,
            tbillsInvestmentsFiltered,
        });
    };
}
