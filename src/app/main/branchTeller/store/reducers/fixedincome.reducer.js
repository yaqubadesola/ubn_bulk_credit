import * as Actions from '../actions';

const initialState = {
    data:null,
    loading:false,
    error:"",
    searchText: ""

};

const newInvestmentReducer = function (state = initialState, action) {
    switch ( action.type )
    {   
        case Actions.GET_FIXED_INCOME_LOADING: {
            return {
                ...state,
                loading: true,
            };
        }
        case Actions.GET_FIXED_INCOME_SUCCESS:
            return {
                ...state,
                data: action.payload.data,
                loading: false,
            };
        case Actions.GET_FIXED_INCOME_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case Actions.SET_ORDERS_SEARCH_TEXT:
            {
                return {
                    ...state,
                    searchText: action.searchText,
                };
            }
        default:
            return state;
    }
};

export default newInvestmentReducer;
