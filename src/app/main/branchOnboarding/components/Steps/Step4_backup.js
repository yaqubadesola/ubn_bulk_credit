import React , {Component} from "react";
import { Grid, Paper,Tab, Tabs, Button, Typography,CircularProgress } from "@material-ui/core";
import { myStyles } from "../common/styles";
import { withStyles } from '@material-ui/core/styles';
import PersonIcon from '@material-ui/icons/Person';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';//
import Replay from '@material-ui/icons/Replay';
import Divider from '@material-ui/core/Divider';
import { FusePageSimple } from '../../../../@fuse';
import * as Actions from '../store/actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  renderButton,
} from "../common/DisplayComponent";
import FixedIncome from "../components/FixedIncome";
import _ from 'lodash';
const styles = (theme) =>  ({
  root: {
    padding: '2px 0px',
    display: 'flex',
    alignItems: 'center',
  },
  input: {
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
  userTab:{
    fontSize:"18px", fontWeight:"bolder", display:"flex", alignItems: "center", flexWrap:"wrap"
  },
  userTab2:{
    display:"flex", alignItems: "center", flexWrap:"wrap"
  }
})

class Step4 extends Component {  
//const [products, setProducts] = useState(null)

  state = {
    tabValue: 0,
};

handleChangeTab = (event, tabValue) => {
    this.setState({ tabValue });
};

componentDidMount(){
  this.props.getWalletBal(this.props.state.form.userUuid)
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


  render(){
      const {
        state, 
        handleChange,
        handlePrev,   
        getWalletBal,
        handleNext,
        buyProduct,
        classes,
        user,
        rights
      } = this.props

      const r = _.find(rights, function (o) {
        return o.module.id === 59;
      });     

      return (
        <Paper elevation={0} style={myStyles.steps}>
          <Grid container elevation={0} spacing={1} style={{ marginBottom: "16px" }}>
            <Grid elevation={0}  item xs={12} sm={3} md={3} 
                  container
                  direction="column"
                  alignItems="flex-end"
                  justify="flex-end" >
              <Paper elevation={0} >
                <div className={classes.userTab}>
                <PersonIcon></PersonIcon>&nbsp;&nbsp;Customer's Details
                </div>
                <br/>
                <Typography color="textPrimary">
                BVN: {state.form.bvn}
                </Typography>
                <div className={classes.userTab2}>
                  M36 Wallet ID: {state.form.walletId}<sup><FileCopyOutlinedIcon size="small" style={{ fontSize: 18 }}></FileCopyOutlinedIcon></sup>
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
          <Grid container elevation={0} spacing={1} style={{ marginBottom: "16px" }}>
              <Grid item xs={12} sm={12} md={12}>
                <Divider></Divider>       
              </Grid>
          </Grid>
          <Grid container spacing={24} style={{ marginBottom: "16px" }}>
              <Grid item xs={12} sm={12} md={12}>
              <FusePageSimple
                classes={{
                    toolbar: 'min-h-64 h-64',
                    content: classes.content,
                }}
                contentToolbar={
                  (user.role && user.role.id === 31) && (r && r.cancreate && r.canedit) ? 
                  <Tabs
                        value={this.state.tabValue}
                        onChange={this.handleChangeTab}
                        indicatorColor="secondary"
                        textColor="secondary"
                        variant="scrollable"
                        scrollButtons="auto"
                        classes={{
                            root: 'h-64 w-full border-b-1',
                        }}
                    >
                        <Tab className="h-64 normal-case" label="FIXED INCOME" />
                        <Tab className="h-64 normal-case" label="MUTUAL FUNDS" />
                        <Tab className="h-64 normal-case" label="EQUITIES" />
                        <Tab className="h-64 normal-case" label="ALTERNATIVE INVESTMENT" />
                  </Tabs> : 
                  ""
                }
                content={
                    <div>
                        {this.state.tabValue === 0 &&  <FixedIncome buyProduct={buyProduct}/>}
                        {this.state.tabValue === 1 && "No available products" }
                        {this.state.tabValue === 2 && "No available products"}
                        {this.state.tabValue === 3 && "No available products"}
                    </div>
                }
                />     
              </Grid>
          </Grid>
       
          <Grid container
                spacing={0}
                direction="column"
                alignItems="center"
                justify="center"
          >
            <Grid item xs={12} sm={12} md={12} style={{ width:'50%', marginBottom: "10px" }}>           
              {renderButton({ label: "Go Back", variant:"contained",color:"inheritDefault1", custom: false, fullWidth:true, onClick: handlePrev })}
            </Grid> 
            
             {/* <Grid item xs={12} sm={6} md={6}>
           <Grid display="flex"  width={"100%"}  height={60} >
              {renderButton({ label: "Continue", variant:"contained", custom: true, fullWidth:true, onClick: handleNext })}
            </Grid>  
            </Grid>*/}
          </Grid>
        </Paper>
      );
  }
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
      {
        getBvnDetail: Actions.getBvnDetail,
      },
      dispatch
  );
}
const mapStateToProps = ({ newInvestmentApp, auth }) => {
  console.log("Investment App ", newInvestmentApp);
  const { newinvestment } = newInvestmentApp;
  return {
      form: newinvestment.form,
      user: auth.user.data,
      rights: auth.rights.right.rights,
  };
};
export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Step4));
