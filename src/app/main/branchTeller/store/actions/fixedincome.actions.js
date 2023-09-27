import axios from 'axios';
import { showMessage } from '../../../../store/actions/fuse';

export const GET_FIXED_INCOME_LOADING = '[GET FIXED INCOME LOADING] GET FIXED INCOME INFO';
export const GET_FIXED_INCOME_SUCCESS = '[GET FIXED INCOME SUCCESS] GET FIXED INCOME SUCCESS';
export const GET_FIXED_INCOME_FAILURE = '[BVN FIXED INCOME FAILURE] GET FIXED INCOME FAILURE';
export const SET_ORDERS_SEARCH_TEXT = '[REPORTS APP] SET ORDERS SEARCH TEXT';

export function getFixedIncomeProducts(param)
{   
    return (dispatch) => {
         //Dispatching loading effect
        dispatch({ type: GET_FIXED_INCOME_LOADING });
        //Making API calls while loading
        const request = axios.get("financialserv/api/v1/productsByCategories/"+param);
        request.then((response) => {
            if (response.status === 200) {
                dispatch({
                    type   : GET_FIXED_INCOME_SUCCESS,
                    payload: {
                        data: response.data,
                    },
                })
            } else {
                dispatch(showMessage({ message: 'No Fixed Income Products Found' }));
            }
        }).catch(response => {
            const error = "No Fixed Income Products Found";//response.data.error
            dispatch({
                type   : GET_FIXED_INCOME_FAILURE,
                payload: {
                    data: error,
                },
            });
            dispatch(showMessage({ message: error }));

        })
    }
}


export function setOrdersSearchText(event)
{
    return {
        type      : SET_ORDERS_SEARCH_TEXT,
        searchText: event.target.value
    }
}
