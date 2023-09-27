import axios from 'axios';
import moment from 'moment';

export const GET_AIRTIME_DATA_REPORTS = '[REPORTS APP] GET AIRTIME & DATA REPORTS';

export function getAirtimeDataReports(params) {
    //const request = axios.get(`lifeservice/api/v1/airtime-data/report?limit=${limit}&currencyCode=${currencyCode}&start=${start}&endDate=${endDate}&startDate=${startDate}`);
    console.log(params);
    const request = axios.get(`lifeservice/api/v1/airtime-data/get_report`, { params });
    return (dispatch) =>
        request.then((response) => {
            //
            if (response.status === 200) {
                dispatch({
                    type: GET_AIRTIME_DATA_REPORTS,
                    payload: response.data.payload,
                    page: params.page,
                    count: response.data.limit,
                    size: response.data.size,
                    startDate: params.startDate,
                    endDate: params.endDate,
                    serverSide: false,
                });
            }
        });
}
