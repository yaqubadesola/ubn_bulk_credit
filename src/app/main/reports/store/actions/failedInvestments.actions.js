import axios from 'axios';
import moment from 'moment';

export const GET_PRODUCT_CATEGORIES = '[INVESTMENTS APP] GET PRODUCT CATEGORIES';
export const GET_INVESTMENTS = '[INVESTMENTS APP] GET INVESTMENTS';
export const GET_TBILLS_INVESTMENTS = '[INVESTMENTS APP] GET TBILLS INVESTMENTS';
export const GET_BONDS_INVESTMENTS = '[INVESTMENTS APP] GET BONDS INVESTMENTS';
export const GET_EUROBONDS_INVESTMENTS = '[INVESTMENTS APP] GET EUROBONDS INVESTMENTS';
export const GET_COMMERCIALPAPERS_INVESTMENTS =
    '[INVESTMENTS APP] GET COMMERCIAL PAPERS INVESTMENTS';
export const GET_INVESTMENTS_FILTERED = '[INVESTMENTS APP] GET INVESTMENTS FILTERED';
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

export function getFailedBondInvestments(key, categoryId) {
    const request = axios.get(
        `financialserv/api/v1/investments/get_by_productcategory_and_status?categoryId=${categoryId}&key=${key}`
    );

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type: GET_BONDS_INVESTMENTS,
                payload: response.data,
            })
        );
}
export function getFailedEurobondInvestments(key, categoryId) {
    const request = axios.get(
        `financialserv/api/v1/investments/get_by_productcategory_and_status?categoryId=${categoryId}&key=${key}`
    );

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type: GET_EUROBONDS_INVESTMENTS,
                payload: response.data,
            })
        );
}

export function getFailedTbillsInvestments(key, categoryId) {
    const request = axios.get(
        `financialserv/api/v1/investments/get_by_productcategory_and_status?categoryId=${categoryId}&key=${key}`
    );

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type: GET_TBILLS_INVESTMENTS,
                payload: response.data,
            })
        );
}
export function getFailedCommercialPapersInvestments(key, categoryId) {
    const request = axios.get(
        `financialserv/api/v1/investments/get_by_productcategory_and_status?categoryId=${categoryId}&key=${key}`
    );

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type: GET_COMMERCIALPAPERS_INVESTMENTS,
                payload: response.data,
            })
        );
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
            eurobondInvestments,
            tbillsInvestments,
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
