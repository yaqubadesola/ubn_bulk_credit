import React , {Component} from "react";
import {Grid, Paper, Typography,TextField
} from "@material-ui/core";
import { myStyles } from "../common/styles";
import { withStyles } from '@material-ui/core/styles';
import PersonIcon from '@material-ui/icons/Person';
import CircularProgress from '@material-ui/core/CircularProgress';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';//
import RefreshIcon from '@material-ui/icons/Refresh';
//import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
//import SearchIcon from '@material-ui/icons/Search';
import { bindActionCreators } from 'redux';
import * as Actions from '../store/actions';
import { connect } from 'react-redux';
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

class Step7_backup extends Component{
  
  render(){
    const {
      state, 
      handleChange,
      handlePrev,
      handleMakerEntry,
      classes
    } = this.props
    
    return (
      <Paper elevation={0} style={myStyles.steps}>
         <Grid container elevation={0} spacing={24} style={{ marginBottom: "10px" }}>
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
                  <Typography color="textPrimary">
                  NGN500,000.58
                  </Typography>
                  <div className={classes.userTab2}>
                  <RefreshIcon size="small"></RefreshIcon>Wallet Balance
                  </div>
                </Paper>
              </Grid>
          </Grid>
        <Grid container elevation={0} spacing={24} style={{ marginBottom: "2px" }}>
            <Grid item xs={12} sm={12} md={12}>
              <Divider></Divider>       
            </Grid>
        </Grid>
  
        <Grid container elevation={0} spacing={24}>
            <Grid item xs={4} sm={4} md={4}>
              <Typography variant="h6" component="h6">
                <Grid m={2}> 
                  Request Approval
                </Grid>
              </Typography>   
            </Grid>
            <Grid item sm={4} md={4} xs={4}>
            &nbsp;
            </Grid>
            <Grid item sm={4} md={4} xs={4} container
                direction="column"
                alignItems="flex-end"
                justify="flex-end">
            
            <Grid>
            &nbsp;
            </Grid>
  
          </Grid>
        </Grid>
  
        {/* <Grid container spacing={24}>
            <Grid item xs={12} sm={6} md={6}>
              <Grid display="flex"  width={"100%"}  height={60} >
              
              </Grid> 
            </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <Grid display="flex"  width={"100%"}  height={60} >
              
            </Grid> 
          </Grid>
        </Grid> */}
        <Grid container spacing={24} border={0} style={{marginBottom:"2rem"}}>
            <Grid item sm={6} md={6} xs={6} >
              <div>
                {/* <FormHelperText className="text-center" id="outlined-weight-helper-text">
                  Enter Amount
                </FormHelperText> */}
                <Grid>
                <TextField
                  name="request_id"
                  label=  "Request ID"
                  type="text"
                  variant='outlined'
                  color='primary'
                  size='large'
                  autoFocus
                  fullWidth={true}
                  value={state.makerData.ref ? state.makerData.ref : ""}
                />
                </Grid>
                <br/><br/>
                <Grid>
                <TextField
                  name="checkerEmail"
                  label= "Approval Email Address"
                  type="email"
                  id="email"
                  variant='outlined'
                  color='primary'
                  size='large'
                  autoFocus
                  fullWidth={true}
                  value={state.form.checkerEmail}
                  error={state.errors['checkerEmail'] ? true : false}
                  helperText={state.errors['checkerEmail'] ? state.errors['checkerEmail'] : ""}
                  onChange={handleChange}
                  style={{
                    maxHeight: "100px",
                    minHeight: "50px"
                  }}
                />
                </Grid>
                <br/><br/>
                <Grid>
                <TextField
                  name="comment"
                  label= "Comments (Optional)"
                  type="text"
                  variant='outlined'
                  color='primary'
                  size='large'
                  multiline
                  rows={4}
                  rowsMax={4}
                  autoFocus
                  fullWidth={true}
                  value={state.form.comment}
                  error={state.errors['comment'] ? true : false}
                  helperText={state.errors['comment'] ? state.errors['comment'] : ""}
                  onChange={handleChange}
                  style={{
                    maxHeight: "100px",
                    minHeight: "50px"
                  }}
                />
                </Grid>
              </div>   
            </Grid>
            <Grid item sm={6} md={6} xs={6} style={{ marginTop: "2rem"}}>
            { state.loading ?  
              <div className="flex flex-1 flex-col items-center justify-center">
              <Typography className="text-20 mb-16" color="textSecondary">Loading...</Typography>
              <CircularProgress className="w-xs" color="secondary"/>
            </div> 
            : <>
              <Grid  width={"100%"}  height={60} style={{ marginTop: "10rem"}}>
                {renderButton({ label: "Send", variant:"contained", custom: true, fullWidth:true, onClick:  () => handleMakerEntry(state), disabled : state.form.checkerEmail ? false : true })}
              </Grid> 
              <Grid  width={"100%"}  height={60} style={{ marginTop: "2rem"}}>
                {renderButton({ label: "Go back", color:"inheritDefault2",  custom: false, fullWidth:true, onClick: handlePrev })}
              </Grid>
              </>
            }            
            </Grid>
         </Grid>
      
      </Paper>
    );
  }
  
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(
      {
        getBvnDetail: Actions.getBvnDetail,
      },
      dispatch
  );
}
const mapStateToProps = ({ newInvestmentApp, auth }) => {
  //console.log("Investment App ", newInvestmentApp);
  const { newinvestment } = newInvestmentApp;
  return {
      investment: newinvestment,
      user: auth.user.data,
      rights: auth.rights.right.rights,
  };
};
export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Step7_backup));