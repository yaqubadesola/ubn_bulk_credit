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

class BulkUploadDetailsView extends Component {
    state = {
        filteredData: [],
        searchValue: null,
    };
    componentDidMount() {
        console.log(this.props);
        const { getTransactionSummaryQuery, startDate, endDate, page, size } = this.props;
        getTransactionSummaryQuery({
            startDate,
            endDate,
            size,
            page,
        });
    }
    resetFilteredData = () => {
        this.props.getTransactionSummaryQuery({
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
        const { startDate, endDate, getTransactionSummaryQuery } = this.props;
        getTransactionSummaryQuery({
            startDate,
            endDate,
            size: rowsPerPage,
            page,
        });
    };
    changePageSize = (page, _, rowsPerPage) => {
        const { startDate, endDate, getTransactionSummaryQuery } = this.props;
        getTransactionSummaryQuery({
            startDate,
            endDate,
            size: rowsPerPage,
            page,
        });
    };
    orderTransactionSummaryQuery = (data) => {
        return _.orderBy(data, ['createdAt'], ['desc']);
    };
    render() {
        const { data, page, size, count, startDate, endDate, getTransactionSummaryQuery } =
            this.props;
        const { searchValue, filteredData } = this.state;
        console.log(size);
        let allSummaryQuery = data;
        allSummaryQuery =
            searchValue && searchValue.length > 0
                ? this.orderTransactionSummaryQuery(filteredData)
                : this.orderTransactionSummaryQuery(data);
        const columns = [
            {
                name: 'id',
                label: ' S/N',
                options: {
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
                name: 'amount',
                label: 'Amount',
                options: {
                    filter: true,
                    sort: false,
                },
            },

            {
                name: 'fromAccountName',
                label: "Sender's Account Name",
                options: {
                    filter: true,
                    sort: false,
                },
            },
            {
                name: 'fromAccountNumber',
                label: "Sender's Account Number ",
                options: {
                    filter: true,
                    sort: false,
                },
            },
            {
                name: 'toAccountName',
                label: "Receiver's Account Name",
                options: {
                    filter: true,
                    sort: false,
                },
            },
            {
                name: 'toAccountNumber',
                label: "Receiver's Account Number ",
                options: {
                    filter: true,
                    sort: false,
                },
            },

            {
                name: 'narration',
                label: 'Narration',
                options: {
                    filter: true,
                    sort: false,
                },
            },
            {
                name: 'debitTime',
                label: 'Debit Time',
                options: {
                    filter: true,
                    sort: false,
                    customBodyRender: (date) => {
                        if (date === null) return 'NIL';
                        return (
                            <Typography variant="inherit" color="textSecondary">
                                {moment(date).format('YYYY-MM-DD')}
                            </Typography>
                        );
                    },
                },
            },
            {
                name: 'channelCode',
                label: 'Channel Code',
                options: {
                    filter: true,
                    sort: false,
                },
            },
            {
                name: 'paymentReference',
                label: 'Payment Reference',
                options: {
                    filter: true,
                    sort: false,
                },
            },
            {
                name: 'ftSessionId',
                label: 'Session ID',
                options: {
                    filter: true,
                    sort: false,
                },
            },
            {
                name: 'transactionLocation',
                label: 'Transaction Location',
                options: {
                    filter: true,
                    sort: false,
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
            {
                name: 'count',
                label: 'Count',
                options: {
                    filter: true,
                    sort: false,
                },
            },
            {
                name: 'nameEnquirySessionId',
                label: 'Name Enquiry Session ID',
                options: {
                    filter: true,
                    sort: false,
                },
            },
        ];

        const headerNames = [
            {
                download: true,
                name: ' S/N',
                options: {
                    // customBodyRender: (value) => this.checkTransactionType(value),
                },
            },
            {
                download: true,
                name: 'Amount',
            },

            {
                download: true,
                name: "Sender's Account Name",
            },
            {
                download: true,
                name: "Sender's Account Number ",
            },
            {
                download: true,
                name: "Receiver's Account Name",
            },
            {
                download: true,
                name: "Receiver's Account Number ",
            },

            {
                download: true,
                name: 'Narration',
            },
            {
                download: true,
                name: 'Debit Time',
            },
            {
                download: true,
                name: 'Channel Code',
            },
            {
                download: true,
                name: 'Payment Reference',
            },
            {
                download: true,
                name: 'Session ID',
            },
            {
                download: true,
                name: 'Transaction Location',
            },
            {
                download: true,
                name: 'Status',
            },
            {
                download: true,
                name: 'Count',
            },
            {
                download: true,
                name: 'Name Enquiry Session ID',
            },
        ];
        const footerNames = [];

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
            downloadOptions: { filename: 'TransactionSummaryQueryReport.csv', separator: ',' },
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
                        getTransactionSummary={getTransactionSummaryQuery}
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
                        title={'Bulk Uploads Detail Report'}
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

function mapStateToProps({ BulkUploadDeatilsApp }) {
    console.log(BulkUploadDeatilsApp.bulkUploadDetail, '.transactionSummary');
    return {
        data: BulkUploadDeatilsApp.bulkUploadDetail.data,
        startDate: BulkUploadDeatilsApp.bulkUploadDetail.startDate,
        endDate: BulkUploadDeatilsApp.bulkUploadDetail.endDate,
        size: BulkUploadDeatilsApp.bulkUploadDetail.size,
        count: BulkUploadDeatilsApp.bulkUploadDetail.count,
        page: BulkUploadDeatilsApp.bulkUploadDetail.page,
    };
}
export default withStyles(styles, { withTheme: true })(
    withRouter(connect(mapStateToProps, mapDispatchToProps)(BulkUploadDetailsView))
);
