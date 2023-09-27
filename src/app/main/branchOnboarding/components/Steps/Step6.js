import React , {Component} from "react";
import { Grid, Paper,Button, Typography,TextField,MenuItem, Divider, LinearProgress, CircularProgress } from "@material-ui/core";
import { myStyles } from "../common/styles";
import { withStyles } from '@material-ui/core/styles';
import PersonIcon from '@material-ui/icons/Person';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';//
import Replay from '@material-ui/icons/Replay';
import {getTenorsInBond} from '../components/HelperComponent';
import { bindActionCreators } from 'redux';
import * as Actions from '../store/actions';
import moment from 'moment';
import { connect } from 'react-redux';
import _ from 'lodash';

import {
  renderButton,
} from "../common/DisplayComponent";

const styles = (theme) =>  ({

  userTab:{
    fontSize:"18px", fontWeight:"bolder", display:"flex", alignItems: "center", flexWrap:"wrap"
  },
  userTab2:{
    display:"flex", alignItems: "center", flexWrap:"wrap"
  },
})

class Step6 extends Component{
  
  componentDidMount(){
    this.props.getWalletBal(this.props.state.form.userUuid)
    this.props.getBranches()
  }

  currencyFormat = (value,code) => {
    if(value !== "" && code !== ""){
      const nf = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: code,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
      return nf.format(value);
    }else{
      return ""
    }
   
  }
  nextCounponData = (timeline) => {
    if(timeline === null || timeline === "") return ""
    const timelineArr = timeline.split(",")
    return timelineArr[timelineArr.length - 1]
  }

  getTenorDays = (matDate) => {
    if(matDate){
        let date1 = new Date(Date());
        let date2 = new Date(Date.parse(matDate))
        const diffTime = Math.abs(date2 - date1);
        const tenorInDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
        return tenorInDays + " day(s)"
    }else{
        return ""
    }
  
}

  amountFormat = (amount, cur_type) => {
    //
      const nf = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: cur_type === "USD" ? 'USD' : 'NGN',
          minimumFractionDigits: 2,
      });
      if (!amount) {
          return '';
      }
      return nf.format(amount);
  }

  getInterestIncome = (faceValue,amountInvested) => {
      if(faceValue != 0  && amountInvested != 0){
        return faceValue - amountInvested
      }else{
        return 0
      }
  }

  render(){
    const {
      state, 
      handlePrev,
      branches,
      handleChange,  
      handleMakerEntry,
      getWalletBal,
      amountTobeDebited,
      classes
    } = this.props

    const sortedBranches = _.sortBy(branches, [
        function (o) {
            return o.name;
        },
    ]);

    //console.log("state step6  ", state)

    
    const sendMakerEntry = (state) => {
      if(this.props.amountToBeDebited(state) > state.walletDetail.wallet_bal){
        alert("Insufficient wallet balance! Please fund your wallet")
        return null
      }else if(state.branchCode === ""){
        alert("Please select initiating branch")
        return null
      }
      else{
        handleMakerEntry(state)
      }
    }
    const tenorDays = state.singleProduct? getTenorsInBond(state.makerData.tenor) : ""
    let showYield = state.singleProduct.product.productCategory.id   == 2 || 
                    state.singleProduct.product.productCategory.id   == 4 || 
                    state.singleProduct.product.productCategory.id   == 5 ||
                    state.singleProduct.product.productCategory.id   == 6 ||
                    state.singleProduct.product.productCategory.id   == 9 ||
                    state.singleProduct.product.productCategory.id   == 7 ?  true : false
    return (
      <Paper elevation={0} style={myStyles.steps}>
         <Grid container elevation={0} spacing={1} style={{ marginBottom: "5px" }}>
              <Grid elevation={0}  item xs={12} sm={3} md={3} 
                    container
                    direction="column"
                    alignItems="flex-end"
                    justify="flex-end" >
                <Paper elevation={0} >
                  <div className={classes.userTab}>
                  <PersonIcon></PersonIcon>&nbsp;&nbsp;Cusomer Details
                  </div>
                  <br/>
                  <Typography color="textPrimary">
                  BVN: {state.form.bvn}
                  </Typography>
                  <div className={classes.userTab2}>
                    M36 Wallet ID:  {state.form.walletId}<sup><FileCopyOutlinedIcon size="small" style={{ fontSize: 18 }}></FileCopyOutlinedIcon></sup>
                  </div>
                </Paper>
              </Grid>
            
              <Grid elevation={0}  item xs={12} sm={3} md={3}>
              <Paper elevation={0} ></Paper>
              </Grid>
              <Grid elevation={0}  item xs={12} sm={3} md={3}>
              <Paper elevation={0} ></Paper>
              </Grid>
              <Grid elevation={0}  item xs={12} sm={3} md={3} 
                    container
                    direction="column"
                    alignItems="flex-end"
                    justify="flex-end" 
              >
                <Paper elevation={0} style={{marginRight:"3em"}}>
                  <div className={classes.userTab}>
                  <AccountBalanceWalletIcon></AccountBalanceWalletIcon>Wallet Balance
                  </div>
                  <br/>
                  {state.walletLoading? 
                      <CircularProgress className="w-xs" color="secondary" style={{color:"#039be5"}}/>
                      :
                    <>
                      <Typography color="textPrimary">
                          {this.currencyFormat(state.walletDetail.wallet_bal,state.walletDetail.code)}
                      </Typography>
                      <Typography variant="caption" className={classes.userTab2}>                                         
                      <Button onClick={() => getWalletBal(state.form.userUuid)} size="small" style={{textAlign:"left"}}>
                          <Replay fontSize="small" style={{marginLeft:"-0.5em"}}/><h6 style={{display:"inline", textTransform:"capitalize"}}>&nbsp;Refresh Balance</h6>
                      </Button> 
                      </Typography>
                    </>
                  }
                </Paper>
              </Grid>
          </Grid>
        <Grid container elevation={0} spacing={1} style={{ marginBottom: "10px" }}>
            <Grid item xs={12} sm={12} md={12}>
              <Divider></Divider>       
            </Grid>
        </Grid>

        <Grid container elevation={0} spacing={24}>
            <Grid item xs={4} sm={4} md={4} display="flex" flexDirection="row">
              <Typography variant="h6" component="h6">
                  <Grid m={2}> 
                    Investment Details
                  </Grid>
              </Typography>   
            </Grid>
            <Grid item sm={4} md={4} xs={4}>
            &nbsp;
            </Grid>
            <Grid item sm={4} md={4} xs={4} container
                  direction="column"
            >
              <Grid align="right"> 
                  <Typography variant="h6" component="h6">
                    <Grid m={2}> 
                    Txn Id: {state.makerData? state.makerData.ref : ""}
                    </Grid>
                  </Typography> 
                  <Typography  variant="subtitle1" color="textSecondary" style={myStyles.inlineTypography}>
                      Date:
                  </Typography>&nbsp;&nbsp;
                  <Typography  className={classes.title}  gutterBottom style={myStyles.inlineTypography}>
                  {moment(state.makerData.transactionDate).format('DD-MM-YYYY')}
                  </Typography>
                  <Divider light variant="inset"/>
                  <br/>
                  {state.makerData ?
                  <>
                      <Typography  variant="subtitle1" color="textSecondary" style={myStyles.inlineTypography}>
                          Amount to be debited
                      </Typography>
                      <Typography variant="h4" component="h4" style={{color:'#039BE5'}}>
                            {this.amountFormat(this.props.amountToBeDebited(state), state.singleProduct.product.currency)}
                      </Typography>
                  </>               
                  :""
                  }
              </Grid>
              {/* <Grid  direction="column">
                
              </Grid>
              <Grid>
                  <Divider light variant="inset"/>
              </Grid> */}
            </Grid>
        </Grid>

        
        <Grid container spacing={10} border={0} style={{marginTop:"-5rem",marginBottom:"2rem"}}>
            <Grid item sm={6} md={6} xs={6} >
              <div>
              {!showYield || state.singleProduct.product.productCategory.id   == 4 ?
              <>
                  <Typography  variant="subtitle1" color="textSecondary" style={myStyles.inlineTypography}>
                      Face Value:
                  </Typography>&nbsp;&nbsp;
                  <Typography  className={classes.title}  gutterBottom style={myStyles.inlineTypography}>
                  {this.amountFormat(state.singleProduct.faceValue, state.singleProduct.product.currency)}
                  </Typography>
                  <br/>
              </>
              :
              ""
              } 
              {
                state.singleProduct.product.productCategory.id   == 4?
              ""
              :
              <>
                  <Typography  variant="subtitle1" color="textSecondary" style={myStyles.inlineTypography}>
                      Issuer:
                  </Typography>&nbsp;&nbsp;
                  <Typography  className={classes.title}  gutterBottom style={myStyles.inlineTypography}>
                  {state.singleProduct.product.issuer}
                  </Typography>
                  <br/>
              </>
              }             
                  <Typography  variant="subtitle1" color="textSecondary" style={myStyles.inlineTypography}>
                      Maturity Date:
                  </Typography>&nbsp;&nbsp;
                  <Typography  className={classes.title}  gutterBottom style={myStyles.inlineTypography}>
                      {moment(state.singleProduct.product.maturity).format('DD-MM-YYYY')}
                  </Typography>
                  <br/>
                  <Typography  variant="subtitle1" color="textSecondary" style={myStyles.inlineTypography}>
                      Tenor:
                  </Typography>&nbsp;&nbsp;                  
                  <Typography  className={classes.title}  gutterBottom style={myStyles.inlineTypography}>
                  {state.singleProduct.product.productCategory.id === 1 ||  state.singleProduct.product.productCategory.id == 3 ? 
                    this.getTenorDays(state.singleProduct.product.maturity)
                :  `${tenorDays.years} years ${tenorDays.months} months`}
                  </Typography>
                  <br/>  
                  {state.singleProduct.product.productCategory.id === 3 ?
                  <>                  
                      <Typography  variant="subtitle1" color="textSecondary" style={myStyles.inlineTypography}>
                        Discount Rate:
                      </Typography>&nbsp; &nbsp;
                      <Typography  className={classes.title}  gutterBottom style={myStyles.inlineTypography}>
                      {state.singleProduct.product.offer}%
                      </Typography>
                      <br/>
                  </>
                  :
                  ""
                  }

                  {showYield?
                  <> 
                   <Typography  variant="subtitle1" color="textSecondary" style={myStyles.inlineTypography}>
                      Yield:
                      </Typography>&nbsp;&nbsp;
                      <Typography  className={classes.title}  gutterBottom style={myStyles.inlineTypography}>
                      {state.singleProduct.product.yieldRate}%
                    </Typography>
                    <br/>
                  <Typography  variant="subtitle1" color="textSecondary" style={myStyles.inlineTypography}>
                      Settlement Date:
                  </Typography>&nbsp;&nbsp;
                  <Typography  className={classes.title}  gutterBottom style={myStyles.inlineTypography}>
                      {moment(state.makerData.settlementDate).format('DD-MM-YYYY')}
                  </Typography>
                  <br/>
                  {state.singleProduct.product.productCategory.id != 9 ?
                    <>
                        <Typography  variant="subtitle1" color="textSecondary" style={myStyles.inlineTypography}>
                            Coupon:
                        </Typography>&nbsp;&nbsp;
                        <Typography  className={classes.title}  gutterBottom style={myStyles.inlineTypography}>
                        {state.makerData.couponRateValue}%
                        </Typography>
                        <br/>
                    </>
                    :
                    ""
                  }
                  {state.singleProduct.product.productCategory.id != 4 && state.singleProduct.product.productCategory.id != 9 ?
                  <>
                  {/* <Typography  variant="subtitle1" color="textSecondary" style={myStyles.inlineTypography}>
                      Coupon Amount:
                  </Typography>&nbsp;&nbsp;
                  <Typography  className={classes.title}  gutterBottom style={myStyles.inlineTypography}>
                  {this.amountFormat(state.makerData.couponAmount, state.singleProduct.product.currency)}
                  </Typography>

                  <br/> */}
                  <Typography  variant="subtitle1" color="textSecondary" style={myStyles.inlineTypography}>
                      Next Coupon Date:
                  </Typography>&nbsp;&nbsp;
                  <Typography  className={classes.title}  gutterBottom style={myStyles.inlineTypography}>
                        {moment(this.nextCounponData(state.makerData.timeline)).format('DD-MM-YYYY')}
                  </Typography>
                  <br/>
                  <Typography  variant="subtitle1" color="textSecondary" style={myStyles.inlineTypography}>
                      Next Coupon Amount:
                  </Typography>&nbsp;&nbsp;                 
                  <Typography  className={classes.title}  gutterBottom style={myStyles.inlineTypography}>
                      {this.amountFormat(state.makerData.couponAmount, state.singleProduct.product.currency)}
                  </Typography>
                  <br/>
                  </>
                  :
                  state.singleProduct.product.productCategory.id   == 4?
                  <>
                  <Typography  variant="subtitle1" color="textSecondary" style={myStyles.inlineTypography}>
                      Next Coupon Date:
                  </Typography>&nbsp;&nbsp;
                  <Typography  className={classes.title}  gutterBottom style={myStyles.inlineTypography}>
                        {moment(this.nextCounponData(state.makerData.timeline)).format('DD-MM-YYYY')}
                  </Typography>
                  <br/>
                  
                  </>
                  :
                  ""
                  }
                  <Typography  variant="subtitle1" color="textSecondary" style={myStyles.inlineTypography}>
                   {state.singleProduct.product.productCategory.id   == 4? "Price:" : "Clean Price:"} 
                  </Typography>&nbsp; &nbsp;
                  <Typography  className={classes.title}  gutterBottom style={myStyles.inlineTypography}>
                   {this.amountFormat(state.singleProduct.product.offer,state.singleProduct.product.currency)}
                  </Typography>
                  <br/>
                </>
                  :
                  ""}
                 {state.singleProduct.product.productCategory.id == 3?
                  <>  
                  <Typography  variant="subtitle1" color="textSecondary" style={myStyles.inlineTypography}>
                      Transaction Date: 
                  </Typography>&nbsp;&nbsp;
                  <Typography  className={classes.title}  gutterBottom style={myStyles.inlineTypography}>
                      {moment(state.makerData.transactionDate).format('DD-MM-YYYY')}
                  </Typography>
                  <br/>
                  <Typography  variant="subtitle1" color="textSecondary" style={myStyles.inlineTypography}>
                      Interest Income: 
                  </Typography>&nbsp;&nbsp;
                  <Typography  className={classes.title}  gutterBottom style={myStyles.inlineTypography}>
                      {this.amountFormat(this.getInterestIncome(state.singleProduct.faceValue,state.makerData.amountInvested), state.singleProduct.product.currency)}
                  </Typography> 
                  <br/>
                  </>
                  :
                  ""
                  }

                 
                  {showYield?
                    <>
                  <Typography  variant="subtitle1" color="textSecondary" style={myStyles.inlineTypography}>
                      Custody Fee:
                  </Typography>&nbsp;&nbsp;
                  <Typography  className={classes.title}  gutterBottom style={myStyles.inlineTypography}>
                      {this.amountFormat(state.makerData.custodyFee, state.singleProduct.product.currency)}                      
                  </Typography>

                  <br/>
                  {state.singleProduct.product.productCategory.id != 4 ?
                  <>
                    <Typography  variant="subtitle1" color="textSecondary" style={myStyles.inlineTypography}>
                        VAT:
                    </Typography>&nbsp;&nbsp;
                    <Typography  className={classes.title}  gutterBottom style={myStyles.inlineTypography}>
                      {this.amountFormat(state.makerData.vat, state.singleProduct.product.currency)}  
                    </Typography>                  
                    <br/>
                  </>
                  :
                  ""}
                  
                  </>
                  :
                  ""
                  }
                  <Typography  variant="subtitle1" color="textSecondary" style={myStyles.inlineTypography}>
                      Consideration:
                  </Typography>&nbsp;&nbsp;
                  <Typography  className={classes.title}  gutterBottom style={myStyles.inlineTypography}>
                      {this.amountFormat(state.makerData.amountInvested, state.singleProduct.product.currency)}                      
                  </Typography>
                  <br/>         
                  <Typography  variant="subtitle1" color="textSecondary" style={myStyles.inlineTypography}>
                      Customer Instruction:
                  </Typography>&nbsp;&nbsp;
                  <Typography  className={classes.title}  gutterBottom style={myStyles.inlineTypography}>
                      YES
                  </Typography>
                  <br/>
                  {state.singleProduct.product.productCategory.id == 1?
                  <>
                  <Typography  variant="subtitle1" color="textSecondary" style={myStyles.inlineTypography}>
                      Discount Rate:
                  </Typography>&nbsp;&nbsp;
                  <Typography  className={classes.title}  gutterBottom style={myStyles.inlineTypography}>
                      {state.singleProduct.product.offer}%
                      {/* {this.amountFormat(state.makerData.amountInvested, state.singleProduct.product.currency)}                       */}
                  </Typography>
                  <br/>         
                  <Typography  variant="subtitle1" color="textSecondary" style={myStyles.inlineTypography}>
                      Interest Income:
                  </Typography>&nbsp;&nbsp;
                  <Typography  className={classes.title}  gutterBottom style={myStyles.inlineTypography}>
                  {this.amountFormat(this.getInterestIncome(state.singleProduct.faceValue,state.makerData.amountInvested), state.singleProduct.product.currency)}
                  </Typography>
                  <br/>
                  <Typography  variant="subtitle1" color="textSecondary" style={myStyles.inlineTypography}>
                      Custody Fee:
                  </Typography>&nbsp;&nbsp;
                  <Typography  className={classes.title}  gutterBottom style={myStyles.inlineTypography}>
                  {this.amountFormat(state.makerData.custodyFee, state.singleProduct.product.currency)}                     
                  </Typography>
                  <br/>
                  <Typography  variant="subtitle1" color="textSecondary" style={myStyles.inlineTypography}>
                        VAT:
                    </Typography>&nbsp;&nbsp;
                    <Typography  className={classes.title}  gutterBottom style={myStyles.inlineTypography}>
                      {this.amountFormat(state.makerData.vat, state.singleProduct.product.currency)}  
                    </Typography>                  
                    <br/>         
                  </>
                  :
                  ""
                  }
              </div>
                      
            </Grid>
           
            <Grid item sm={6} md={6} xs={6} style={{ marginTop: "7rem"}}>
              <Grid container sm={12} md={12} xs={12}>
                <Grid item sm={6} md={6} xs={6}>
                  &nbsp;
                </Grid>
                <Grid item sm={6} md={6} xs={6}>
                        <TextField
                            id="branch"
                            select
                            label="Branch Code"
                            name="branchCode"
                            className="mt-8 mb-16"
                            value={state.branchCode !== ""? state.branchCode : ''}
                            onChange={handleChange}
                            SelectProps={{
                                MenuProps: {
                                    className: 'mt-8 mb-16',
                                },
                            }}
                            variant="outlined"
                            fullWidth
                        >
                            {sortedBranches &&
                                sortedBranches.map((option, i) => (
                                    <MenuItem key={i} value={option.code}>
                                        {option.name}
                                    </MenuItem>
                                ))}
                        </TextField>
                </Grid>
              </Grid>
            { state.loading ?  
                    <div className="flex flex-1 flex-col items-center justify-center">
                    <Typography className="text-20 mb-16" color="textSecondary">Sending...</Typography>
                    <LinearProgress className="w-xs" color="secondary"/>
                  </div> 
            : <>
              <Grid display="flex"  width={"100%"}  height={60} style={{ marginTop: "5rem"}}>
                {renderButton({ label: "SUBMIT", variant:"contained", custom: true, fullWidth:true, onClick: () => sendMakerEntry(state)})}
              </Grid> 
              <Grid display="flex"  width={"100%"}  height={60} style={{ marginTop: "1rem"}}>
                {renderButton({ label: "Back", color:"inheritDefault2",  custom: false, fullWidth:true, onClick: handlePrev })}
              </Grid>    
              </>  
              }       
            </Grid>
           
        </Grid>
      
      </Paper>
    );
      };
  }
  function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
          getBvnDetail: Actions.getBvnDetail,
          getBranches: Actions.getAllBranches,
        },
        dispatch
    );
  }
  const mapStateToProps = ({ newInvestmentApp, auth }) => {
    //console.log("Investment App 6 ", newInvestmentApp);
    const { newinvestment } = newInvestmentApp;
    return {
        branches: newinvestment.branches, 
        user: auth.user.data,
        rights: auth.rights.right.rights,
    };
  };
  export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Step6));