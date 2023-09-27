import * as Actions from '../actions';
import _ from 'lodash';

const initialState = {
    getFxSales  : [],
    filteredFxSales: [],
    fxswitch: [],
    filteredFxswitch: [],
    filterData: false,
};

const fxReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_FX_SALES:
        {
            return {
                ...state,
                getFxSales   : action.payload,
            };
        }
        case Actions.GET_FX_SWITCH:
        {
            return {
                ...state,
                fxswitch: action.payload,
            };
        }
        case Actions.GET_FX_SWITCH_BY_DATE:
        {
            return {
                ...state,
                filteredFxswitch: action.payload,
                filterData: true
            };
        }
        case Actions.GET_FX_SALES_BY_DATE:
        {
            return {
                ...state,
                filteredFxSales: action.payload,
                filterData: action.filterData
            };
        }
        case Actions.UPDATE_FILTERING:
        {
            return {
                ...state,
                filterData: false
            };
        }
        default:
        {
            return state;
        }
    }
};

export default fxReducer;
