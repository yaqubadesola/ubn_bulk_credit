import axios from 'axios'
import moment from 'moment'

export const GET_PAYSTACK_LOGS = '[REPORTS APP] GET PAYSTACK LOGS';
export const GET_PAYSTACK_LOGS_BY_DATE = '[REPORTS APP] GET PAYSTACK LOGS BY DATE';

export function getPaystackLogs(params)
{
    const request = axios.get('logserv/api/v1/paystack_refs', { params });

    return (dispatch) =>

        request.then((response) => {
            if(response.status === 200){
                dispatch({
                    type   : GET_PAYSTACK_LOGS,
                    payload: response.data,
                    page: params.start,
                    count: params.limit,
                    size :  response.data.size,
                    serverSide: false
                })
            }
        })
}

export function getPaystackLogByDate(pgProps, currrentPaystacks, date) {
        const dates = {}

        dates.startDate = moment(pgProps.startDate).startOf('day').valueOf()
        dates.endDate = moment(pgProps.endDate).endOf('day').valueOf()
        let paramsObj = Object.assign( {start: pgProps.page}, {limit: pgProps.count}, dates )
        let queryString = Object.keys(paramsObj).map(key => key + '=' + paramsObj[key]).join('&');
        const request = axios.get(`logserv/api/v1/paystack_refs_by_range`+`?${queryString}`);
        return (dispatch) =>
            request.then((response) =>
            dispatch({
                type: GET_PAYSTACK_LOGS_BY_DATE,
                payload: response.data.payload,
                serverSide: true,
                startDate: date.startDate,
                endDate: date.endDate,
                page: paramsObj.start,
                count: paramsObj.limit,
                size: response.data.size,
                
              })
        )
    }  
