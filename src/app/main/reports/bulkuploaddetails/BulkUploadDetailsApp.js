import React, { Component } from 'react';
import reducer from '../store/reducers';
import * as Actions from '../store/actions';
import { withStyles, Tabs, Tab, Link, Icon, Typography } from '@material-ui/core';
import { FusePageSimple } from '../../../../@fuse';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import withReducer from '../../../store/withReducer';
import SuccessfulUploadDetails from './components/SuccessfulUploadDetails';
import FailedUploadDetails from './components/FailedUploadDetails';

const styles = (theme) => ({});
class BulkUploadDetailsApp extends Component {
    state = {
        value: 0,
    };

    handleChange = (event, value) => {
        this.setState({ value });
    };
    handleLink = (link) => {
        this.props.history.push(link);
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
                                    <Typography color="textSecondary">
                                        Bulk Upload Details
                                    </Typography>
                                </div>
                            </div>
                        </div>
                    }
                    // classes={{
                    //     toolbar: 'p-0',
                    //     header: 'min-h-72 h-72 sm:h-136 sm:min-h-136',
                    // }}
                    classes={{
                        contentCardWrapper: 'p-16 sm:p-24 pb-80',
                        leftSidebar: 'w-256 border-0',
                        header: 'min-h-72 h-72 sm:h-136 sm:min-h-136',
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
                            <Tab
                                classes={{
                                    root: 'h-64',
                                }}
                                label="All Successful uploads"
                            />
                            <Tab
                                classes={{
                                    root: 'h-64',
                                }}
                                label="All Failed Uploads"
                            />
                        </Tabs>
                    }
                    content={
                        <div className="p-4 sm:p-24">
                            {value === 0 && <SuccessfulUploadDetails />}
                            {value === 1 && <FailedUploadDetails />}
                        </div>
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
            getBulkUploadDetailsReport: Actions.getBulkUploadDetailsReport,
        },
        dispatch
    );
}

function mapStateToProps({ BulkUploadDetailsApp }) {
    return {
        data: BulkUploadDetailsApp.bulkUploadDetails.data,
        startDate: BulkUploadDetailsApp.bulkUploadDetails.startDate,
        endDate: BulkUploadDetailsApp.bulkUploadDetails.endDate,
        size: BulkUploadDetailsApp.bulkUploadDetails.size,
        count: BulkUploadDetailsApp.bulkUploadDetails.count,
        page: BulkUploadDetailsApp.bulkUploadDetails.page,
    };
}
export default withReducer(
    'BulkUploadDetailsApp',
    reducer
)(
    withStyles(styles, { withTheme: true })(
        withRouter(connect(mapStateToProps, mapDispatchToProps)(BulkUploadDetailsApp))
    )
);
