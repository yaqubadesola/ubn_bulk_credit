import * as Actions from '../actions';
import _ from 'lodash';

const initialState = {
    productCategories: [],
    bondInvestments: [],
    commercialpaperInvestments: [],
    tbillsInvestments: [],
    successfulInvestments: [],
    eurobondInvestments: [],
    allInvestments: [],
    bondInvestmentsFiltered: [],
    successfulInvestmentsFiltered: [],
    commercialpaperInvestmentsFiltered: [],
    tbillsInvestmentsFiltered: [],
    filterData: false,
    allInvestmentsFiltered: [],
};

const failedInvestmentsReducer = function (state = initialState, action) {
    switch (action.type) {
        case Actions.GET_PRODUCT_CATEGORIES: {
            return {
                ...state,
                productCategories: action.payload,
            };
        }
        case Actions.RESET_FILTER: {
            return {
                ...state,
                filterData: false,
                bondInvestmentsFiltered: [],
                eurobondInvestmentsFiltered: [],
                successfulInvestmentsFiltered: [],
                commercialpaperInvestmentsFiltered: [],
                tbillsInvestmentsFiltered: [],
            };
        }
        case Actions.GET_INVESTMENTS: {
            return {
                ...state,
                successfulInvestments: action.payload,
                filterData: true,
            };
        }
        case Actions.GET_INVESTMENTS_FILTERED: {
            return {
                ...state,
                successfulInvestmentsFiltered: action.payload,
                filterData: true,
            };
        }

        case Actions.GET_INVESTMENTS_ALL: {
            return {
                ...state,
                allInvestments: action.payload,
            };
        }

        case Actions.GET_TBILLS_INVESTMENTS: {
            let data = action.tbillsInvestmentsFiltered
                ? { tbillsInvestmentsFiltered: action.tbillsInvestmentsFiltered, filterData: true }
                : { tbillsInvestments: action.payload, filterData: false };
            return Object.assign(
                {
                    ...state,
                },
                data
            );
        }
        case Actions.GET_BONDS_INVESTMENTS: {
            let data = action.bondInvestmentsFiltered
                ? { bondInvestmentsFiltered: action.bondInvestmentsFiltered, filterData: true }
                : { bondInvestments: action.payload, filterData: false };
            return Object.assign(
                {
                    ...state,
                },
                data
            );
        }
        case Actions.GET_EUROBONDS_INVESTMENTS: {
            let data = action.eurobondInvestmentsFiltered
                ? {
                      eurobondInvestmentsFiltered: action.eurobondInvestmentsFiltered,
                      filterData: true,
                  }
                : { eurobondInvestments: action.payload, filterData: false };
            return Object.assign(
                {
                    ...state,
                },
                data
            );
        }

        case Actions.GET_COMMERCIALPAPERS_INVESTMENTS: {
            let data = action.commercialpaperInvestmentsFiltered
                ? {
                      commercialpaperInvestmentsFiltered: action.commercialpaperInvestmentsFiltered,
                      filterData: true,
                  }
                : { commercialpaperInvestments: action.payload, filterData: false };

            return Object.assign(
                {
                    ...state,
                },
                data
            );
        }

        case Actions.GET_INVESTMENTS_ALL_BY_DATE: {
            return {
                ...state,
                allInvestmentsFiltered: action.payload,
                filterData: true,
            };
        }
        default: {
            return state;
        }
    }
};

export default failedInvestmentsReducer;
