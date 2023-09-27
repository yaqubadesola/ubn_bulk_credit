import '../@fake-db'
import React from 'react';
import {createGenerateClassName, jssPreset} from '@material-ui/core';
import {FuseAuthorization, FuseLayout, FuseTheme} from '../@fuse';
import JssProvider from 'react-jss/lib/JssProvider';
import Provider from 'react-redux/es/components/Provider';
import {Router} from 'react-router-dom';
import {create} from 'jss';
import jssExtend from 'jss-extend';
import history from '../history';
import {Auth} from './auth';
import store from './store';    
import AppContext from './AppContext';
import routes from './fuse-configs/routesConfig';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import { Notifications } from 'react-push-notification';

const jss = create({
    ...jssPreset(),
    plugins: [...jssPreset().plugins, jssExtend()]
});

jss.options.insertionPoint = document.getElementById('jss-insertion-point');
const generateClassName = createGenerateClassName();

const App = () => {
    
    return (
        <AppContext.Provider
            value={{
                routes
            }}
        >
            <JssProvider jss={jss} generateClassName={generateClassName}>
                <Provider store={store}>
                    <Auth>
                        <Router history={history}>
                            <FuseAuthorization>
                                <FuseTheme> 
                                    {/* <AutoLogout/> */}
                                    <Notifications />
                                    <FuseLayout/>   
                                </FuseTheme>
                            </FuseAuthorization>
                        </Router>
                    </Auth>
                </Provider>
            </JssProvider>
        </AppContext.Provider>
    );
};

export default App;
