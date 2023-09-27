import * as Actions from '../../actions/fuse/index';

const initialState = {
    axiosReqUploading: false,
};

const axiosLoader = function (state = initialState, action) {
    switch ( action.type )
    {
    
        case Actions.AXIOS_REQ_UPLOADING:
            {
                return {
                    ...state,
                    axiosReqUploading: true
                }
            }
        case Actions.AXIOS_REQ_UPLOADED:
            {
                    return {
                        ...state,
                        axiosReqUploading: false
                    }
            }
        default:
        {
            return state;
        }
    }
};

export default axiosLoader;
