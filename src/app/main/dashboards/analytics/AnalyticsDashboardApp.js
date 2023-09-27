import React, { Component } from 'react';
import { Typography } from '@material-ui/core';
import { FuseAnimate } from '../../../../@fuse';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import Widget1 from './widgets/Widget1';
import Widget2 from './widgets/Widget2';
import Widget3 from './widgets/Widget3';
import Widget4 from './widgets/Widget4';
import Widget5 from './widgets/Widget5';
import Widget6 from './widgets/Widget6';
import Widget7 from './widgets/Widget7';
import Widget8 from './widgets/Widget8';
import Widget9 from './widgets/Widget9';
import BranchTeller from './BranchTeller';
import TicketWidget from './widgets/TicketWidget';
import withReducer from '../../../store/withReducer';
import * as Actions from './store/actions';
import reducer from './store/reducers';
//import { askForPermissioToReceiveNotifications } from '../../../../push-notification';
// import firebaseService from '../../../services/firebaseService';

const tempState = {
    token: '',
};
class AnalyticsDashboardApp extends Component {
    state = { ...tempState };

    componentDidMount() {
        this.props.getWidgets();
        // askForPermissioToReceiveNotifications().then((token) => {
        //     this.setState({ token: token });
        // });
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.user.user.data.adUserID !== nextState) {
            if (this.state.token) {
                console.log('nothing');
            }
            return true;
        }
        return false;
    }

    render() {
        const { widgets, user, rights } = this.props;
        const userRole = user.user.data.role;
        if (!widgets) {
            return null;
        }

        console.log("User's role = ", userRole);
        console.log('User = ', user.user);
        console.log('Right = ', rights);
        return (
            <div className="w-full">
                {/* 
                <Widget1 data={widgets.widget1} />

                <FuseAnimate animation="transition.slideUpIn" delay={200}>

                    <div className="flex flex-col md:flex-row sm:p-8 container">

                        <div className="flex flex-1 flex-col min-w-0">

                            <FuseAnimate delay={600}>
                                <Typography className="p-16 pb-8 text-18 font-300">
                                    Account Reports
                                </Typography>
                            </FuseAnimate>

                            <div className="flex flex-col sm:flex sm:flex-row pb-32">

                                <div className="widget flex w-full sm:w-1/3 p-16">
                                    <Widget2 data={widgets.widget2} />
                                </div>

                                <div className="widget flex w-full sm:w-1/3 p-16">
                                    <Widget3 data={widgets.widget3} />
                                </div>

                                <div className="widget w-full sm:w-1/3 p-16">
                                    <Widget4 data={widgets.widget4} />
                                </div>
                            </div>

                            <FuseAnimate delay={600}>
                                <Typography className="p-16 pb-8 text-18 font-300">
                                    Ticket Reports
                                </Typography>
                            </FuseAnimate>

                            <div className="flex flex-col sm:flex sm:flex-row pb-32">

                                <div className="widget flex w-full sm:w-1/3 p-16">
                                    <TicketWidget data={widgets.widget2} status="new" />
                                </div>

                                <div className="widget flex w-full sm:w-1/3 p-16">
                                    <TicketWidget data={widgets.widget2} />
                                </div>

                                <div className="widget w-full sm:w-1/3 p-16">
                                    <TicketWidget data={widgets.widget2} />
                                </div>
                            </div>

                            <FuseAnimate delay={600}>
                                <Typography className="px-16 pb-8 text-18 font-300">
                                    Analytics & Reports
                                </Typography>
                            </FuseAnimate>

                            <div className="widget w-full p-16 pb-32">
                                <Widget5 data={widgets.widget5} />
                            </div>

                            <FuseAnimate delay={600}>
                                <Typography className="px-16 pb-8 text-18 font-300">
                                    Where are your users?
                                </Typography>
                            </FuseAnimate>

                            <div className="widget w-full p-16 pb-32">
                                <Widget5 data={widgets.widget5} />
                            </div>
                        </div>

                        <div className="flex flex-wrap w-full md:w-320 pt-16">

                            <div className="mb-32 w-full sm:w-1/2 md:w-full">
                                <FuseAnimate delay={600}>
                                    <Typography className="px-16 pb-8 text-18 font-300">
                                        Top Interest
                                    </Typography>
                                </FuseAnimate>

                                <div className="widget w-full p-16">
                                    <Widget7 data={widgets.widget7} />
                                </div>
                            </div>

                            <div className="mb-32 w-full sm:w-1/2 md:w-full">

                                <FuseAnimate delay={600}>
                                    <div className="px-16 pb-8 text-18 font-300">
                                        How are your sales?
                                    </div>
                                </FuseAnimate>

                                <div className="widget w-full p-16">
                                    <Widget8 data={widgets.widget8} />
                                </div>
                            </div>

                            <div className="mb-32 w-full sm:w-1/2 md:w-full">
                                <FuseAnimate delay={600}>
                                    <Typography className="px-16 pb-8 text-18 font-300 lg:pt-0">
                                        What are your top campaigns?
                                    </Typography>
                                </FuseAnimate>
                                <div className="widget w-full p-16">
                                    <Widget9 data={widgets.widget9} />
                                </div>
                            </div>
                        </div>
                    </div>
                </FuseAnimate> */}
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            getWidgets: Actions.getWidgets,
        },
        dispatch
    );
}
function mapStateToProps({ analyticsDashboardApp, auth }) {
    const { rights } = auth;
    return {
        widgets: analyticsDashboardApp.widgets.data,
        user: auth,
        rights: rights.right.role,
    };
}
export default withReducer(
    'analyticsDashboardApp',
    reducer
)(withRouter(connect(mapStateToProps, mapDispatchToProps)(AnalyticsDashboardApp)));
