import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as Actions from '../store/actions';
import {
    withStyles,
    Fade,
    FormControlLabel,
    Icon,
    Typography,
    LinearProgress,
} from '@material-ui/core';
import { FuseAnimate } from '../../../../@fuse';

import MUIDataTable from 'mui-datatables';
import AddButton from './components/AddButton';
import moment from 'moment';
import _ from 'lodash';

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

class BulkSummaryList extends Component {
    state = {
        filteredData: [],
        searchValue: null,
        size: 100,
    };

    componentDidMount() {
        this.loadPageData();
    }

    handleLoadDocs = (param) => {
        //
        window.open(param, '_blank');
    };

    loadPageData = () => {
        let { page, startDate, endDate, size, getOnboardedCustomersReport } = this.props;
        getOnboardedCustomersReport({ size, page, startDate, endDate });
    };

    changePage = (tablePage, tableCount, rowPerPage) => {
        let { startDate, endDate, getOnboardedCustomersReport } = this.props;

        getOnboardedCustomersReport({ size: rowPerPage, page: tablePage, startDate, endDate });
    };

    changePageSize = (tablePage, tableCount, rowPerPage) => {
        let { startDate, endDate, getOnboardedCustomersReport } = this.props;

        getOnboardedCustomersReport({
            size: rowPerPage,
            page: tablePage,
            startDate,
            endDate,
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

    resetFilteredData = () => {
        this.loadPageData();
    };

    orderOnboardedCustomersReport = (data) => {
        return _.orderBy(data, ['createdAt'], ['desc']);
    };

    checkNumberType = (number) => {
        if (number.startsWith(0) || number.startsWith(234)) {
            return number.startsWith(0)
                ? `+234${number.slice(1, number.length)}`
                : `+234${number.slice(3, number.length)}`;
        }
        return `${number}`;
    };

    render() {
        let { data } = this.props;
        const { filteredData, searchValue } = this.state;
        data =
            searchValue && searchValue.length > 0
                ? this.orderOnboardedCustomersReport(filteredData)
                : this.orderOnboardedCustomersReport(data);
        console.log(data);
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
                name: 'adminName',
                label: 'Admin Name',
                options: {
                    filter: true,
                    sort: true,
                },
            },
            {
                name: 'adminEmail',
                label: 'Admin Email',
                options: {
                    filter: true,
                    sort: true,
                },
            },
            {
                //  <span onClick={() => this.handleLoadDocs(item[1])} style={{color:"blue", cursor:"pointer"}}>View document</span>
                name: 'id',
                label: 'File Name',
                options: {
                    filter: true,
                    sort: true,
                    customBodyRender: (id) => {
                        const rec = data.find((item) => item.id === id);
                        // console.log('payload data = ', rec);
                        if (rec.fileName === null) return '';
                        return (
                            <Typography variant="inherit" color="textSecondary">
                                <span
                                    onClick={() => this.handleLoadDocs(rec.fileLink)}
                                    style={{ color: 'blue', cursor: 'pointer' }}
                                >
                                    {rec.fileName}
                                </span>
                            </Typography>
                        );
                    },
                },
            },
            {
                name: 'fileUniqueId',
                label: 'File ID',
                options: {
                    filter: true,
                    sort: true,
                },
            },
            {
                name: 'totalProcessedData',
                label: 'Total Number of Records',
                options: {
                    filter: true,
                    sort: true,
                    customBodyRender: (value) => {
                        if (value === null) return '';
                        return value > 1 ? value - 1 : 0;
                    },
                },
            },
            {
                name: 'successfulProcessedData',
                label: 'Successful Records',
                options: {
                    filter: true,
                    sort: true,
                },
            },
            {
                name: 'failedProcessedData',
                label: 'Failed Records',
                options: {
                    filter: true,
                    sort: true,
                },
            },
            {
                name: 'type',
                label: 'Purpose',
                options: {
                    filter: true,
                    sort: true,
                },
            },
            {
                name: 'status',
                label: 'Status',
                options: {
                    filter: true,
                    sort: true,
                },
            },
            {
                name: 'createdAt',
                label: 'Date Uploaded',
                options: {
                    filter: true,
                    sort: true,
                    customBodyRender: (value) => {
                        if (value === null) return 'NIL';
                        return (
                            <Typography variant="inherit" color="textSecondary">
                                {moment(value).format('YYYY-MM-DD')}
                            </Typography>
                        );
                    },
                },
            },
        ];
        const headerNames = [
            {
                name: 'S/N',
                download: true,
            },
            {
                name: 'Admin Name',
                download: true,
            },
            {
                name: 'Admin Email',
                download: true,
            },
            {
                name: 'File Name',
                download: true,
            },
            {
                name: 'File ID',
                download: true,
            },
            {
                name: 'Total Number of Records',
                download: true,
            },
            {
                name: 'Successful Records',
                download: true,
            },
            {
                name: 'Failed Records',
                download: true,
            },
            {
                name: 'Purpose',
                download: true,
            },
            {
                name: 'Date Created',
                download: true,
            },
        ];
        const footerNames = [];

        const options = {
            filterType: 'checkbox',
            responsive: 'scrollMaxHeight',
            selectableRows: 'none',
            filter: false,
            rowsPerPage: 100,
            rowsPerPageOptions: [100, 1000, 10000, 25000],
            serverSide: true,
            // count: searchValue && searchValue.length > 0 ? filteredData.length : this.props.size * this.props.count,
            count: searchValue && searchValue.length > 0 ? filteredData.length : this.props.count,
            page: this.props.page,
            searchText: this.state.searchValue,
            downloadOptions: { filename: 'BulkSummaryReport.csv', separator: ',' },
            onDownload: (buildHead, buildBody, columns, data) => {
                const dates = data.map((d) => ({
                    ...d,
                    data: d.data.map((m) =>
                        moment(m, moment.ISO_8601, true).isValid() ? moment(m).format('lll') : m
                    ),
                }));
                console.log(dates);
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
                            tableState.count / this.props.count,
                            tableState.rowsPerPage
                        );
                        break;
                    case 'changeRowsPerPage':
                        this.changePageSize(
                            tableState.page,
                            tableState.count / this.props.count,
                            tableState.rowsPerPage
                        );
                        break;
                    case 'search':
                        this.searchTable(data, tableState.searchText);
                        break;
                    case 'onSearchClose':
                        this.resetFilteredData();
                        break;
                }
            },

            customToolbar: () => {
                let { page, count, startDate, endDate, size } = this.props;
                return (
                    <AddButton
                        startDate={startDate}
                        endDate={endDate}
                        page={page}
                        count={count}
                        size={size}
                    />
                );
            },
        };

        return (
            <React.Fragment>
                <Fade
                    in={this.props.axiosReqUploading}
                    style={{
                        transitionDelay: this.props.axiosReqUploading ? '800ms' : '0ms',
                    }}
                    unmountOnExit
                >
                    <LinearProgress variant="query" />
                </Fade>

                <FuseAnimate animation="transition.slideUpIn" delay={300}>
                    <MUIDataTable
                        title={'Bulk Upload Summary Report'}
                        data={data}
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
            getOnboardedCustomersReport: Actions.getOnboardedCustomersReport,
        },
        dispatch
    );
}

function mapStateToProps({ BulkUploadSummaryReportApp }) {
    console.log('BulkUploadSummaryReportApp =', BulkUploadSummaryReportApp);
    const { data, startDate, endDate, size, page, count } =
        BulkUploadSummaryReportApp.bulkuploadsummary;
    return {
        data,
        startDate,
        endDate,
        size,
        count,
        page,
    };
}

// export default withStyles(styles, { withTheme: true })(
//     withRouter(connect(mapStateToProps, mapDispatchToProps)(BulkSummaryList))
// );

export default withStyles(styles, { withTheme: true })(
    withRouter(connect(mapStateToProps, mapDispatchToProps)(BulkSummaryList))
);
