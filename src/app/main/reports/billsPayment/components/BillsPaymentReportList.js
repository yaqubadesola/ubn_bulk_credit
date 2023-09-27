import React, {Component} from 'react';
import { withStyles, Icon, Typography, Fade, LinearProgress} from '@material-ui/core';
import {FuseAnimate} from '../../../../../@fuse';
import {withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import * as Actions from '../../store/actions';
import {connect} from 'react-redux';
import MUIDataTable from "mui-datatables";
import AddButton from './AddButton'
import moment from 'moment'
import Loader from 'react-loader-spinner'
import _ from 'lodash'
import DataService from '../../../../services/dataService/data.service';

const styles = theme => ({
    listItem: {
        color         : 'inherit!important',
        textDecoration: 'none!important',
        height        : 40,
        width         : 'calc(100% - 16px)',
        borderRadius  : '0 20px 20px 0',
        paddingLeft   : 24,
        paddingRight  : 12,
        '&.active'    : {
            backgroundColor    : theme.palette.secondary.main,
            color              : theme.palette.secondary.contrastText + '!important',
            pointerEvents      : 'none',
            '& .list-item-icon': {
                color: 'inherit'
            }
        }
    }
});

class BillsPaymentReportList extends Component {

    state = {
        filteredData: [],
        searchValue: null,
        limit: 100
    }

    componentDidMount(){
        this.loadPageData()
    }

    loadPageData = () => {
        let {page, count} =  this.props
        this.props.getBillsPaymentReports({limit: count, start: page, currencyCode: 'NGN' });
    }

    changePage = (tablePage, tableCount, rowPerPage) => {
       if(this.props.serverSide) {
          let {startDate, endDate }  =  this.props
          this.props.getBillsPaymentReportsByCreatedDate( {limit: rowPerPage, start: tablePage}, { startDate, endDate })
       }else {
        this.props.getBillsPaymentReports({limit: rowPerPage, start: tablePage, currencyCode: 'NGN' });
       }
     
    };


    changePageSize = (tablePage, tableCount, rowPerPage) => {
        if (this.props.serverSide) {
            let startDate;
            let endDate;

            if(this.props.startDate) {
                startDate = this.props.startDate
            } else {
                if(DataService.getStartDate()) {
                    startDate = DataService.getStartDate()
                }
            }

            if(this.props.endDate) {
                endDate = this.props.endDate
            } else {
                if(DataService.getEndDate()) {
                    endDate = DataService.getEndDate()
                }
            }

            this.props.getBillsPaymentReportsByCreatedDate( {limit: rowPerPage, start: tablePage}, { startDate, endDate })
        } else {
            this.props.getBillsPaymentReports({limit: rowPerPage, start: tablePage, currencyCode: 'NGN' });
        }
    }

    searchTable = (arr, searchText) => {
        searchText = searchText ? searchText.toLowerCase() : ''
        let matches = arr.filter(function(obj) {
          return Object.keys(obj).some(function(key) {
             if(key !== 'id' && typeof obj[key] !== 'object' && obj[key] !== null && !moment(obj[key], moment.ISO_8601, true).isValid()){
              return JSON.stringify(obj[key]).toLowerCase().includes(searchText);
             }
          })
        });
        this.setState({filteredData : matches, searchValue: searchText})
      };

    resetFilteredData = () => {
        this.loadPageData()
    }

    orderBillsPaymentReportData = (data) => {
       return _.orderBy(data, ['createdAt'], ['desc']);
    }

    // static getDerivedStateFromProps(props, state){
    //     if (props.mtnprimaryoffer !== state.mtnprimaryoffer) {
    //         return {
    //             paginate: props.mtnprimaryoffer
    //         };
    //     }else if(props.filteredmtnprimaryoffer !== state.filteredmtnprimaryoffer){
    //         return {
    //             paginate: props.filteredmtnprimaryoffer
    //         };
    //     } 
    // }

    // componentDidUpdate(props, state){
    //     const {mtnprimaryoffer, filteredmtnprimaryoffer} = this.props
    //     if(props.mtnprimaryoffer !== this.props.mtnprimaryoffer){
    //         this.setState({paginate: mtnprimaryoffer})
    //     }else if(props.filteredmtnprimaryoffer !== this.props.filteredmtnprimaryoffer){
    //         this.setState({paginate: filteredmtnprimaryoffer})
    //     }
    // }

    render()
    {
        let { YYYY } = this.props;
        const { filteredData , searchValue} =  this.state
        YYYY = searchValue && searchValue.length > 0 ?  this.orderBillsPaymentReportData(filteredData) :  this.orderBillsPaymentReportData(YYYY)
    
        const columns = [
            {
                name: "billerName",
                label: "Biller Name",
                options: {
                    filter: true,
                    sort: true
                }
            },
            {
                name: "billType",
                label: "Biller Type",
                options: {
                    filter: true,
                    sort: true
                }
            },
            {
                name: "customerId",
                label: "Customer's ID",
                options: {
                    filter: true,
                    sort: true
                }
            },
            
            {
                name: "customerName",
                label: "Customer's Name",
                options: {
                    filter: true,
                    sort: true
                }
            },
            {//
                name: "merchantCode",
                label: "Merchant Code",
                options: {
                    filter: true,
                    sort: true,
                }
            },
            {
                name: "responseCodeGrouping",
                label: "Response Code Group",
                options: {
                    filter: true,
                    sort: true,
                }
            },
            {//
                name: "responseMessage",
                label: "Response Message",
                options: {
                    filter: true,
                    sort: true,
                }
            },
            {
                name: "status",
                label: "Status",
                options: {
                    filter: true,
                    sort: true,
                }
            },
            {
                name: "transactionRef",
                label: "Transaction Ref",
                options: {
                    filter: true,
                    sort: true,
                }
            },
            {
                name: "amount",
                label: "Amount",
                options: {
                    filter: true,
                    sort: true,
                    customBodyRender: (value, tableMeta, updateValue) => {
                        const nf = new Intl.NumberFormat('en-US', {
                            style: 'currency',
                            currency: 'NGN',
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                        });
    
                        if (value === '') {
                            return '';
                        }
                        return nf.format(value);
                    },
                }
            }, 
            {
                name: "walletId",
                label: "Wallet ID",
                options: {
                    filter: true,
                    sort: true
                }
            },        
            {
                name: "createdAt",
                label: "Date Created",
                options: {
                    filter: true,
                    sort: true,
                    customBodyRender: date => {
                        if(date === null) return '';
                        return (
                            <Typography variant="inherit" color="textSecondary">
                                {moment(date).format('LLL')}
                            </Typography>
                        )
                    }
                }
            },
            {
                name: "updatedAt",
                label: "Date Updated",
                options: {
                    filter: true,
                    sort: true,
                    customBodyRender: date => {
                        if(date === null) return '';
                        return (
                            <Typography variant="inherit" color="textSecondary">
                                {moment(date).format('LLL')}
                            </Typography>
                        )
                    }
                }
            },
           
           
        ];

        const headerNames = [
            {
              name: 'Biller\'s Name',
              download: true,
            },
            {
              name: 'Biller Type',
              download: true,
            },
            {
              name: 'Customer\'s ID',
              download: true,
            },
            {
                name: 'Customer\'s Name',
                download: true,
            }
            ,
            {
                name: 'Merchant Code',
                download: true,
            }           
            ,
            {
                name: 'Response Code Group',
                download: true,
            },
            {
                name: 'Response Message',
                download: true,
            },
            {
                name: 'Status',
                download: true,
            },
            {
                name: 'Date Created',
                download: true,
            },
            {
                name: 'Date Updated',
                download: true,
            }
        ];
        const footerNames = []//Date Created
      /* const footerNames = ['S/N',"BVN", "Date of Birth", "First Name",	"Surname",	"Phone Number",	"Email Address",
	"Address",	"Gender",	"City",	"State",	"Country",	"Nationality",	"Local Govt. Area",
    "Postal code","Mother's Maiden Name",	"Bank",	"Bank Account"]*/

        const options = {
            filterType: 'checkbox',
            responsive: 'scrollMaxHeight',
            selectableRows: 'none',
            filter: false,
            rowsPerPage: this.props.count,
            rowsPerPageOptions: [25, 50, 100, 1000, 10000],
            serverSide: true,
            // count: searchValue && searchValue.length > 0 ? filteredData.length : this.props.size * this.props.count,
            count: searchValue && searchValue.length > 0 ? filteredData.length : this.props.size,
            page: this.props.page,
            searchText: this.state.searchValue,
            downloadOptions: {filename: 'BillsPaymentReportData.csv', separator: ','},
            onDownload: (buildHead, buildBody, columns, data) => {
                const dates = data.map(d => ({...d, data: d.data.map(m => moment(m, moment.ISO_8601, true).isValid() ? moment(m).format('lll') : m )}));

                return (
                    buildHead(headerNames) +
                    buildBody(
                        dates.concat({
                            index: data.length,
                            data: footerNames,
                        }),
                    )
                )
            },

            onTableChange: (action, tableState) => {
                console.log(action, tableState);
                switch (action) {
                  case "changePage":
                    this.changePage(tableState.page, tableState.count/this.props.size, tableState.rowsPerPage);
                    break;
                    case 'changeRowsPerPage':
                        this.changePageSize(tableState.page, tableState.count / this.props.size, tableState.rowsPerPage)
                         break;
                  case "search":
                      this.searchTable(YYYY,tableState.searchText);
                      break;
                  case "onSearchClose":
                      this.resetFilteredData();
                      break;
                }
              },
              /*
            onTableChange: (action, tableState) => {
                console.log(action, "Action");
                console.log(tableState.page, "tableState Page");
                const { limit, start, size } = paginate
                switch (action) {
                    case 'changePage':
                      
                      break;
                    // case 'changeRowsPerPage':
                    //   airtimeData({limit, start: tableState.page, currencyCode: 'NGN' });
                    //   break;
                }
            },
            */
            // onChangeRowsPerPage: (numberOfRows) => {
            //     console.log(numberOfRows, "numberOfRows")
            //     airtimeData({numberOfRows, start: 0});
            // },
            customToolbar: () => {
               let {page, count, startDate, endDate} = this.props
                return (
                    <AddButton  startDate={startDate} endDate={endDate} page={page} limit={count} count={count}/>
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
                        title={"Bills Payment Report"}
                        data={YYYY}
                        columns={columns}
                        options={options}
                    />
                </FuseAnimate>
            </React.Fragment>
        );
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({     
        getBillsPaymentReports: Actions.getBillsPaymentReports,
        getBillsPaymentReportsByDate: Actions.getBillsPaymentReportsByDate,
    }, dispatch);
}

function mapStateToProps({BillsPaymentReportApp}){
    console.log(BillsPaymentReportApp.billspayment, "BillsPaymentReportApp.billspayment")
    return {
        YYYY:           BillsPaymentReportApp.billspayment.data,
        page:           BillsPaymentReportApp.billspayment.page,
        count:          BillsPaymentReportApp.billspayment.count,
        size:           BillsPaymentReportApp.billspayment.size,
        serverSide:     BillsPaymentReportApp.billspayment.serverSide,
        startDate:      BillsPaymentReportApp.billspayment.startDate,
        endDate:        BillsPaymentReportApp.billspayment.endDate
    }
}

export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(BillsPaymentReportList)));
