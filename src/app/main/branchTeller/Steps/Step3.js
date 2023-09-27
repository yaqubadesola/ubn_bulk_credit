import React,{Component} from "react";
import {  Grid, Paper, TextField ,MenuItem} from "@material-ui/core";
import { myStyles } from "../common/styles";
import Divider from "../common/Divider";
//import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import CompareArrowsIcon from '@material-ui/icons/CompareArrows';
import {//
  renderButton,
  renderInputField,
  renderText,
} from "../common/DisplayComponent";
import * as Actions from '../store/actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class Step3 extends Component{ 

  getKycLevelDesc = (level) => {
    switch (level) {
      case 1:
        return "BVN Validated"
        break;
      case 2:
        return "ID and Selfie Validated"
        break;
      case 3:
        return "Address Verified"
        break;
    
      default:
        return "Not Yet Verified";
    }
  }
  render(){
    
    const {
      state, 
      handleChange,
      handlePrev,
      handleNext,
      createM36User
    } = this.props;
   //console.log("state.form ",state.form);
    return (
        <Paper style={myStyles.steps}>
            <Grid mt={2} mb={8}>
            <span  style={{fontWeight:"bold", fontSize:"20px"}}>
              {renderText({
                label: "Confirm BVN Details",
                type: "h4",
                color: "textPrimary",
                align: "center",
              })}
              </span>
            </Grid>
      
            <Grid container spacing={24} mt={4} style={{ marginBottom: "16px", marginTop: "3em" }}>
              <Grid item xs={12} sm={6} m={2} p={2} alignItems="center"  justifyContent="center"  >
                {renderInputField({
                  state,
                  name: "firstName",
                  label: "First Name",
                  onChange: handleChange,
                  disabled: state.bvnVerified
                })}
              </Grid>
              <Grid item xs={12} sm={6} p={2} m={2} alignItems="center"  justifyContent="center" >
                {renderInputField({
                  state,
                  name: "walletId",
                  label: "M36 Wallet ID",
                  onChange: handleChange,
                  disabled: state.bvnVerified
                })}
              </Grid>
            </Grid>
          
            <Grid container spacing={24} style={{ marginBottom: "16px" }}>
              <Grid item xs={12} md={6} sm={6} m={2}>
                {renderInputField({
                  state,
                  name: "phoneNumber",
                  label: "Phone Number",
                  onChange: handleChange,
                  disabled: state.bvnVerified
                })}
              </Grid>
              <Grid item xs={12} sm={6} md={6} m={2}>
              <TextField
                  name="email"
                  label="Enter valid email"
                  type="text"
                  variant='outlined'
                  color='primary'
                  size='large'
                  autoFocus
                  fullWidth={true}
                  value={state.form.email}
                  disabled={state.form.walletId ?  true : false}
                  error={state.errors['email'] ? true : false}
                  helperText={state.errors['email'] ? state.errors['email'] : ""}
                  onChange={handleChange}
                  style={{
                    maxHeight: "100px",
                    minHeight: "50px"
                  }}
                />
                
{/*                 
                
                {renderInputField({
                  state,
                  name: "email",
                  label: "Email Address",
                  type: "email",
                  onChange: handleChange,
                  disabled: state.bvnVerified
                })} */}
              </Grid>
            </Grid>
            {/* <Grid container spacing={24} style={{ marginBottom: "16px" }}>
              <Grid item xs={12} md={6} sm={6} m={2}>
                <TextField
                    name="address"
                    label="Enter Customer's Address"
                    type="text"
                    variant='outlined'
                    color='primary'
                    size='large'
                    autoFocus
                    fullWidth={true}
                    value={state.address}
                    disabled={state.form.walletId ?  true : false}
                    error={state.errors['address'] ? true : false}
                    helperText={state.errors['address'] ? state.errors['address'] : ""}
                    onChange={handleChange}
                    style={{
                      maxHeight: "100px",
                      minHeight: "50px"
                    }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6} m={2}>
                    <TextField
                        id="kycLevel"
                        select
                        label="Customer's KYC Level"
                        name="kycLevel"
                        className="mt-8 mb-16"
                        value={state.kycLevel}
                        onChange={handleChange}
                        SelectProps={{
                            MenuProps: {
                                className: 'mt-8 mb-16',
                            },
                        }}
                        variant="outlined"
                        fullWidth
                    >
                        {state.kycLevelOptions &&
                            state.kycLevelOptions.map((kyc, index) => (
                                <MenuItem key={index} value={kyc.id}>
                                    {kyc.name}
                                </MenuItem>
                            ))
                        }
                    </TextField>
              </Grid>
            </Grid> */}
            <Grid mt={1} mb={2} style={{ marginTop: "3em" }}>
                <Divider><span style={{fontSize:"20px",fontWeight:"bold"}}>KYC STATUS & BVN CONNECT</span></Divider>
            </Grid>
            <Grid container spacing={10} style={{ marginBottom: "5px" }}>
              <Grid item xs={12} sm={6} md={6}>
                <Card elevation={0} >
                    <CardContent elevation={0}>
              
                      <Typography variant="p" component="Grid" style={{fontSize:"18px",fontWeight:"bold"}} >
                        KYC STATUS &nbsp;&nbsp;<br/>
                      </Typography>
                      <br/>
                      <Typography  color="textSecondary">
                        M36: Tier {this.props.form.m36KycLevel} ({this.getKycLevelDesc(this.props.form.m36KycLevel)})
                      </Typography>
                      <Typography  color="textSecondary">
                        {/* UBN Account: Tier 3 (Savings) */}
                      </Typography>
                    </CardContent>
                </Card>    
              </Grid>
              <Grid item xs={12} sm={6} md={6} direction="row"  alignItems="right"  justify="flex-end">
              <Card elevation={0} >
                    <CardContent elevation={0} alignItems="center"  justify="flex-end">
              
                      <Typography variant="h6" component="Grid" style={{fontSize:"18px",fontWeight:"bold"}} >
                        BVN CONNECT <br/>
                      </Typography>
                      <br/>
                      <Typography  color="textSecondary">
                        BVN &nbsp;&nbsp;<CompareArrowsIcon></CompareArrowsIcon>&nbsp;&nbsp;M36: YES
                      </Typography>
                      <Typography color="textSecondary">
                        {/* BVN &nbsp;&nbsp;<CompareArrowsIcon></CompareArrowsIcon>&nbsp;&nbsp;UBN Account: YES */}
                      </Typography>
                    </CardContent>
                </Card> 
              </Grid>
            </Grid>
          
            <Grid container spacing={24} style={{ marginBottom: "16px", marginTop: "3em"}}>
              <Grid item xs={12} sm={6} md={6}>
                <Grid display="flex"  width={"100%"}  height={60} >
                  {renderButton({ label: "Back", variant:"contained",color:"inheritDefault1", custom: false, fullWidth:true, onClick: handlePrev })}
                </Grid> 
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                {state.loading ?
                    <div className="flex flex-1 flex-col items-center justify-center">
                      <Typography className="text-20 mb-16" color="textSecondary">Loading...</Typography>
                      <LinearProgress className="w-xs" color="secondary"/>
                    </div>
                :
                <Grid display="flex"  width={"100%"}  height={60} >
                  {renderButton({ label: state.form.walletId === null ? "Create New Customer" : "Confirm", variant:"contained", custom: true, fullWidth:true, onClick: state.form.walletId === null ? () => createM36User(state.form) : handleNext, disabled: state.errors['email'] ? true : false})}
                </Grid> 
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
      },
      dispatch
  );
}
const mapStateToProps = ({ newInvestmentApp, auth }) => {
  const { newinvestment } = newInvestmentApp;
  return {
      form: newinvestment.form,
      user: auth.user.data,
      rights: auth.rights.right.rights,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Step3);
