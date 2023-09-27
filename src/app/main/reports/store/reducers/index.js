import { combineReducers } from 'redux';
import investments from './investments.reducer';
import bulkuploadsummary from './bulkuploadsummary.reducer';
import bulkUploadDetails from './bulkuploaddetailsreport.reducer';
import reports from './reports.reducer';

const reducer = combineReducers({
    investments,
    bulkuploadsummary,
    reports,
    bulkUploadDetails,
});

export default reducer;
