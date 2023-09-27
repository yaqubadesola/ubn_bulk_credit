import {combineReducers} from 'redux';
import admins from './admins.reducer';
import admin from './admin.reducer';
import departments from './departments.reducer';
import newinvestment from './new-investment.reducer';
import fixedincome from './fixedincome.reducer';
const reducer = combineReducers({
    admins,
    admin,
    newinvestment,
    departments,
    fixedincome
    
});

export default reducer;
