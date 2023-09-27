import axios from 'axios';
import moment from 'moment';

export const GET_FX_SALES = '[FX APP] GET FX SALES';
export const GET_FX_SWITCH = '[FX APP] GET FX SWITCH';
export const UPDATE_FILTERING = '[FX APP] UPDATE FILTERING';
export const GET_FX_SWITCH_BY_DATE = '[FX APP] GET FX SWITCH BY DATE';
export const GET_FX_SALES_BY_DATE = '[FX APP] GET FX SALES BY DATE';

export function getFxSales() {
    const request = axios.get('financialserv/api/v1/fxsales');
    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type: GET_FX_SALES,
                payload: response.data,
            })
        );
}

export function getFxSwitch() {
    const request = axios.get('financialserv/api/v1/switch/get_all');
    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type: GET_FX_SWITCH,
                payload: response.data,
            })
        );
}

export function handleTabChange() {
    return {
        type: UPDATE_FILTERING,
        payload: {
            status: false,
        },
    };
}

export function getFxSwitchByDate(currentfxSwitches, date) {
    const request = axios.get('financialserv/api/v1/switch/get_all');
    console.log(date);

    return (dispatch, getState) => {
        const { fxswitch } = getState().fxswitchApp.fx;
        const startDate = moment(date.startDate);
        const endDate = moment(date.endDate);
        let fxswitchLog;
        if (startDate.startOf('day').valueOf() === endDate.startOf('day').valueOf()) {
            fxswitchLog =
                fxswitch &&
                fxswitch.filter(
                    (d) =>
                        moment(d.createdAt).startOf('day').valueOf() ===
                        startDate.startOf('day').valueOf()
                );
        } else {
            fxswitchLog =
                fxswitch &&
                fxswitch.filter((d) => moment(d.createdAt).isBetween(startDate, endDate));
        }

        console.log(fxswitchLog, 'selectedData fxswitchLog');
        request.then((response) => {
            console.log(response);
            dispatch({
                type: GET_FX_SWITCH_BY_DATE,
                payload: response.data,
            });
        });
    };
}

export function getFxSalesByDate(currentFxsales, date) {
    return (dispatch, getState) => {
        const { getFxSales } = getState().fxsalesApp.fx;
        const startDate = moment(date.startDate);
        const endDate = moment(date.endDate);
        let getFxSalesLog;

        if (startDate.startOf('day').valueOf() === endDate.startOf('day').valueOf()) {
            getFxSalesLog =
                getFxSales &&
                getFxSales.filter(
                    (d) =>
                        moment(d.createdAt).startOf('day').valueOf() ===
                        startDate.startOf('day').valueOf()
                );
        } else {
            getFxSalesLog =
                getFxSales &&
                getFxSales.filter((d) => moment(d.valueDate).isBetween(startDate, endDate));
        }

        dispatch({
            type: GET_FX_SALES_BY_DATE,
            payload: getFxSalesLog,
            filterData: true,
        });
    };
}
