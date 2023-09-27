// import React, {Component} from "react";

// import { Tabs, Tab, withStyles } from "@material-ui/core";

// import { FusePageSimple } from "../../../../@fuse";
// import { bindActionCreators } from "redux";
// import { withRouter } from "react-router-dom/cjs/react-router-dom.min";
// import { connect } from "react-redux";
// import withReducer from "../../../store/withReducer";
// import * as Actions from "../store/reducers"

import React, { Component } from 'react';
import { withStyles, Tabs, Link, Icon, Typography, Tab } from '@material-ui/core';
import { FusePageSimple } from '../../../../@fuse';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import withReducer from '../../../store/withReducer';
import * as Actions from '../store/actions';
import reducer from '../store/reducers';
import BulkSummaryList from './BulkSummaryList';

const styles = (theme) => ({});

class BulkUploadSummaryReportApp extends Component {
    state = {
        value: 0,
    };

    componentDidMount() {
        //MtnPrimaryOffers
        this.props.getOnboardedCustomersReport();
    }
    handleLink = (link) => {
        this.props.history.push(link);
    };
    handleChange = (event, value) => {
        this.setState({ value });
    };

    render() {
        const { value } = this.state;

        return (
            <React.Fragment>
                <FusePageSimple
                    header={
                        <div className="flex flex-1 items-center justify-between p-24">
                            <div className="flex flex-col">
                                <div className="flex items-center mb-16">
                                    <Link
                                        href="#"
                                        color="inherit"
                                        onClick={(evt) => this.handleLink('/')}
                                    >
                                        <Icon className="text-18" color="action">
                                            home
                                        </Icon>
                                    </Link>
                                    <Icon className="text-16" color="action">
                                        chevron_right
                                    </Icon>
                                    <Link
                                        color="inherit"
                                        onClick={(evt) => this.handleLink('/apps/reports')}
                                    >
                                        <Typography color="textSecondary">Reports</Typography>
                                    </Link>
                                    <Icon className="text-16" color="action">
                                        chevron_right
                                    </Icon>
                                </div>
                            </div>
                        </div>
                    }
                    classes={{
                        contentCardWrapper: 'p-0 sm:p-0 pb-80',
                    }}
                    contentToolbar={
                        <Tabs
                            value={value}
                            onChange={this.handleChange}
                            indicatorColor="secondary"
                            textColor="secondary"
                            variant="scrollable"
                            scrollButtons="off"
                            classes={{
                                root: 'h-64 w-full border-b-1',
                            }}
                        >
                            <Tab classes={{ root: 'h-64' }} label="BULK UPLOAD REPORT" />
                        </Tabs>
                    }
                    content={
                        <div className="p-4 sm:p-24">{value === 0 && <BulkSummaryList />}</div>
                    }
                    sidebarInner
                    onRef={(instance) => {
                        this.pageLayout = instance;
                    }}
                    innerScroll
                />
            </React.Fragment>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            getOnboardedCustomersReport: Actions.getOnboardedCustomersReport,
        },
        dispatch
    );
}

function mapStateToProps({ BulkUploadSummaryReportApp }) {
    return {
        onboardedCustomers: BulkUploadSummaryReportApp.bulkuploadsummary,
    };
}

export default withReducer(
    'BulkUploadSummaryReportApp',
    reducer
)(
    withStyles(styles, { withTheme: true })(
        withRouter(connect(mapStateToProps, mapDispatchToProps)(BulkUploadSummaryReportApp))
    )
);
