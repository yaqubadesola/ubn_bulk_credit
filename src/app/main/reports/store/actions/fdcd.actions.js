import axios from 'axios'
import moment from 'moment'

export const GET_FIXED_DEPOSIT = '[REPORTS APP] GET FIXED DEPOSIT';
export const GET_FIXED_DEPOSIT_BY_DATE = '[REPORTS APP] GET FIXED DEPOSIT BY DATE';
export const GET_CALL_DEPOSIT = '[REPORTS APP] GET CALL DEPOSIT';


export function getFixedDeposit()
{
    const request = axios.get('financialserv/api/v1/term_deposits');

    return (dispatch) =>

        request.then((response) => {
            if(response.status === 200){
                dispatch({
                    type   : GET_FIXED_DEPOSIT,
                    payload: response.data
                })
            }
        })
}

export function getCallDeposit(params) // {typeId: 1}
{
    const request = axios.get('financialserv/api/v1/term_deposit/get_all_by_type', { params });

    return (dispatch) =>

        request.then((response) => {
            if(response.status === 200){
                dispatch({
                    type   : GET_CALL_DEPOSIT,
                    payload: response.data
                })
            }
        })
}

export function getFixedDepositsByDate(deposits, date) {

    return (dispatch, getState) => {
        const {data} = getState().fdcdReportsApp.fdcd;
        const startDate = moment(date.startDate)
        const endDate = moment(date.endDate)
        let fdcdLog;
        // = data && data.filter(d => moment(d.createdAt).isBetween(startDate, endDate))
        if(startDate.startOf('day').valueOf() === endDate.startOf('day').valueOf()) {
            fdcdLog = data && data.filter(d => moment(d.createdAt).startOf('day').valueOf() === startDate.startOf('day').valueOf() ) 
        }else {
            fdcdLog = data && data.filter(d => moment(d.createdAt).isBetween(startDate, endDate))
        }
        dispatch({
            type: GET_FIXED_DEPOSIT_BY_DATE,
            payload: fdcdLog,
        })
    }    
}
