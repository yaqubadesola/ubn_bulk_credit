import * as Actions from '../actions';
import _ from 'lodash';

const initialState = {
    form: {},
    isLoading: false,
    uploadResult: null,
    uploadErr: null,
};

const bulkUploadReducer = function (state = initialState, action) {
    switch (action.type) {
        case Actions.SAVE_UPLOADED_FILE_LOADING: {
            return {
                ...state,
                isLoading: true,
            };
        }
        case Actions.SAVE_UPLOADED_FILE_SUCCESS: {
            return {
                ...state,
                uploadResult: action.payload,
                isLoading: false,
            };
        }
        case Actions.SAVE_UPLOADED_FILE_FAILED: {
            return {
                ...state,
                uploadErr: action.payload,
                isLoading: false,
            };
        }
        default:
            return state;
    }
};
export default bulkUploadReducer;
