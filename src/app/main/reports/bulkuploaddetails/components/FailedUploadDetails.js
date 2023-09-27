import React, { Component } from 'react';
import {
    withStyles,
    Fade,
    LinearProgress,
    FormControlLabel,
    Icon,
    Typography,
} from '@material-ui/core';
import { FuseAnimate } from '../../../../../@fuse';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import * as Actions from '../../store/actions';
import { connect } from 'react-redux';
import MUIDataTable from 'mui-datatables';
import moment from 'moment';
import _ from 'lodash';
import AddButton from './AddButton';

const styles = (theme) => ({
    listItem: {
        color: 'inherit!important',
        textDecoration: 'none!important',
        height: 40,
        width: 'calc(100% - 16px)',
        borderRadius: '0 20px 20px 0',
        paddingLeft: 24,
        paddingRight: 12,
        '&.active': {
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.secondary.contrastText + '!important',
            pointerEvents: 'none',
            '& .list-item-icon': {
                color: 'inherit',
            },
        },
    },
});

class FailedUploadDetails extends Component {
    state = {
        filteredData: [],
        searchValue: null,
    };
    componentDidMount() {
        console.log(this.props);
        const { getBulkUploadDetailsReport, startDate, endDate, page, size } = this.props;
        getBulkUploadDetailsReport({
            value: 2,
            startDate,
            endDate,
            size,
            page,
        });
    }
    resetFilteredData = () => {
        this.props.getBulkUploadDetailsReport({
            startDate: this.props.startDate,
            endDate: this.props.endDate,
        });
    };
    searchTable = (arr, searchText) => {
        searchText = searchText ? searchText.toLowerCase() : '';
        let matches = arr.filter(function (obj) {
            return Object.keys(obj).some(function (key) {
                if (
                    key !== 'id' &&
                    typeof obj[key] !== 'object' &&
                    obj[key] !== null &&
                    !moment(obj[key], moment.ISO_8601, true).isValid()
                ) {
                    return JSON.stringify(obj[key]).toLowerCase().includes(searchText);
                }
            });
        });
        this.setState({ filteredData: matches, searchValue: searchText });
    };

    changePage = (page, _, rowsPerPage) => {
        const { startDate, endDate, getBulkUploadDetailsReport } = this.props;
        getBulkUploadDetailsReport({
            value: 2,
            startDate,
            endDate,
            size: rowsPerPage,
            page,
        });
    };
    changePageSize = (page, _, rowsPerPage) => {
        const { startDate, endDate, getBulkUploadDetailsReport } = this.props;
        getBulkUploadDetailsReport({
            value: 2,
            startDate,
            endDate,
            size: rowsPerPage,
            page,
        });
    };
    orderFailedUplaodDetailsReport = (data) => {
        return _.orderBy(data, ['createdAt'], ['desc']);
    };
    render() {
        const { data, page, size, count, startDate, endDate, getBulkUploadDetailsReport } =
            this.props;
        const { searchValue, filteredData } = this.state;
        console.log(size);
        let allSummaryQuery = data;
        allSummaryQuery =
            searchValue && searchValue.length > 0
                ? this.orderFailedUplaodDetailsReport(filteredData)
                : this.orderFailedUplaodDetailsReport(data);
        const columns = [
            {
                name: 'id',
                label: 'S/N',
                options: {
                    filter: true,
                    customBodyRender: (value, tableMeta) => {
                        return (
                            <FormControlLabel
                                label={tableMeta.rowIndex + 1}
                                control={<Icon></Icon>}
                            />
                        );
                    },
                },
            },
            {
                name: 'accountNumber',
                label: 'Account Number',
                options: {
                    filter: true,
                    sort: false,
                },
            },
            {
                name: 'amount',
                label: 'Amount',
                options: {
                    filter: true,
                    sort: false,
                    customBodyRender: (value, tableMeta) => {
                        //
                        const nf = new Intl.NumberFormat('en-US', {
                            style: 'currency',
                            currency: 'NGN',
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                        });

                        return nf.format(value);
                    },
                },
            },
            {
                name: 'bvn',
                label: 'BVN',
                options: {
                    filter: true,
                    sort: false,
                },
            },
            {
                name: 'fullName',
                label: 'Fullname',
                options: {
                    filter: true,
                    sort: false,
                },
            },
            {
                name: 'staffId',
                label: 'Staff ID',
                options: {
                    filter: true,
                    sort: false,
                },
            },
            {
                name: 'narration',
                label: 'Description',
                options: {
                    filter: true,
                    sort: false,
                },
            },
            {
                name: 'createdAt',
                label: 'Date Funded',
                options: {
                    filter: true,
                    sort: false,
                    customBodyRender: (day) => {
                        if (!day) {
                            return '';
                        } else {
                            return (
                                <Typography variant="inherit" color="textSecondary">
                                    {moment(day).format('DD-MM-YYYY')}
                                </Typography>
                            );
                        }
                    },
                },
            },
            {
                name: 'status',
                label: 'Status',
                options: {
                    filter: true,
                    sort: false,
                },
            },
        ];

        const headerNames = [
            {
                name: 'S /N',
                download: true,
            },
            {
                name: 'Account No',
                download: true,
            },

            {
                name: 'Amount',
                download: true,
            },
            {
                name: 'Bvn',
                download: true,
            },
            {
                name: 'Fullname',
                download: true,
            },
            {
                name: 'Staff ID',
                download: true,
            },
            {
                name: 'Description',
                download: true,
            },
            {
                name: 'Date',
                download: true,
            },
            {
                name: 'Status',
                download: true,
            },
        ];

        const footerNames = [
            'S/N',
            'Account No',
            'Amount',
            'Bvn',
            'Fullname',
            'Staff ID',
            'Description',
            'Date',
            'Status',
        ];
        const options = {
            filterType: 'checkbox',
            responsive: 'scrollMaxHeight',
            selectableRows: 'none',
            rowsPerPage: 100,
            rowsPerPageOptions: [25, 50, 100, 1000],
            page: page,
            count: count,
            serverSide: true,
            searchText: this.state.searchValue,
            downloadOptions: { filename: 'AllFailedUploadDetailsReport.csv', separator: ',' },
            onDownload: (buildHead, buildBody, columns, data) => {
                const dates = data.map((d) => ({
                    ...d,
                    data: d.data.map((m) =>
                        moment(m, moment.ISO_8601, true).isValid() ? moment(m).format('lll') : m
                    ),
                }));

                return (
                    buildHead(headerNames) +
                    buildBody(
                        dates.concat({
                            index: data.length,
                            data: footerNames,
                        })
                    )
                );
            },
            onTableChange: (action, tableState) => {
                console.log(action, tableState);
                switch (action) {
                    case 'changePage':
                        this.changePage(
                            tableState.page,
                            tableState.count / size,
                            tableState.rowsPerPage
                        );
                        break;
                    case 'changeRowsPerPage':
                        this.changePageSize(
                            tableState.page,
                            tableState.count / this.props.size,
                            tableState.rowsPerPage
                        );
                        break;

                    case 'search':
                        this.searchTable(allSummaryQuery, tableState.searchText);

                    case 'onSearchClose':
                        this.resetFilteredData();
                        break;
                }
            },
            customToolbar: () => {
                return (
                    <AddButton
                        getBulkUploadDetailsReport={getBulkUploadDetailsReport}
                        value={2}
                        startDate={startDate}
                        size={size}
                        page={page}
                        endDate={endDate}
                    />
                );
            },
        };
        return (
            <React.Fragment>
                <Fade
                    in={this.props.axiosReqUploading}
                    style={{
                        transitionDelay: this.props.axiosReqUploading ? '800ms' : '800ms',
                    }}
                    unmountOnExit
                >
                    <LinearProgress variant="query" />
                </Fade>

                <FuseAnimate animation="transition.slideUpIn" delay={300}>
                    <MUIDataTable
                        title={'All Failed Uploads'}
                        data={allSummaryQuery}
                        columns={columns}
                        options={options}
                    />
                </FuseAnimate>
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

export default withStyles(styles, { withTheme: true })(
    withRouter(connect(mapStateToProps, mapDispatchToProps)(FailedUploadDetails))
);
