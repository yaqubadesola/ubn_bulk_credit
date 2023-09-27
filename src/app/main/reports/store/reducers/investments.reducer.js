import * as Actions from '../actions';
import _, { initial } from 'lodash';
import moment from 'moment';

const initialState = {
    productCategories: [],
    bondInvestments: [],
    eurobondInvestments: [],
    commercialpaperInvestments: [],
    tbillsInvestments: [],
    successfulInvestments: [],
    allInvestments: [],
    bondInvestmentsFiltered: false,
    successfulInvestmentsFiltered: false,
    commercialpaperInvestmentsFiltered: false,
    tbillsInvestmentsFiltered: false,
    eurobondInvestmentsFiltered: false,
    filterData: false,
    allInvestmentsFiltered: [],
    page: 0,
    count: 100,
    size: 0,
    startDate: moment().subtract(10, 'years').valueOf(),
    endDate: moment().valueOf(),
};

const investmentsReducer = function (state = initialState, action) {
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
                page: initialState.page,
                count: initialState.count,
                size: initialState.size,
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
                ? {
                      tbillsInvestmentsFiltered: action.tbillsInvestmentsFiltered,
                  }
                : { tbillsInvestments: action.payload, filterData: false };
            return Object.assign(
                {
                    ...state,
                    page: action.page,
                    count: action.count,
                    size: action.size,
                    startDate: action.startDate,
                    endDate: action.endDate,
                },
                data
            );
        }
        case Actions.GET_BONDS_INVESTMENTS: {
            let data = action.bondInvestmentsFiltered
                ? {
                      bondInvestmentsFiltered: action.bondInvestmentsFiltered,
                  }
                : { bondInvestments: action.payload, filterData: false };
            return Object.assign(
                {
                    ...state,
                    page: action.page,
                    count: action.count,
                    size: action.size,
                    startDate: action.startDate,
                    endDate: action.endDate,
                },
                data
            );
        }
        case Actions.GET_EUROBONDS_INVESTMENTS: {
            let data = action.eurobondInvestmentsFiltered
                ? {
                      eurobondInvestmentsFiltered: action.eurobondInvestmentsFiltered,
                  }
                : { eurobondInvestments: action.payload, filterData: false };
            return Object.assign(
                {
                    ...state,
                    page: action.page,
                    count: action.count,
                    size: action.size,
                    startDate: action.startDate,
                    endDate: action.endDate,
                },
                data
            );
        }
        case Actions.GET_COMMERCIALPAPERS_INVESTMENTS: {
            let data = action.commercialpaperInvestmentsFiltered
                ? {
                      commercialpaperInvestmentsFiltered: action.commercialpaperInvestmentsFiltered,
                  }
                : { commercialpaperInvestments: action.payload, filterData: false };

            return Object.assign(
                {
                    ...state,
                    page: action.page,
                    count: action.count,
                    size: action.size,
                    startDate: action.startDate,
                    endDate: action.endDate,
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

export default investmentsReducer;
