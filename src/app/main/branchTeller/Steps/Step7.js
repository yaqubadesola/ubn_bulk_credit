import React , {Component} from "react";
import {  Grid, Paper,} from "@material-ui/core";
import {
  renderButton,
  renderText,
} from "../common/DisplayComponent";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { withStyles } from '@material-ui/core/styles';
import { bindActionCreators } from 'redux';
import * as Actions from '../store/actions';
import { connect } from 'react-redux';

const styles = (theme) =>  ({
  
  input: {
    flex: 1,
  },
  userTab:{
    fontSize:"18px", fontWeight:"bolder", display:"flex", alignItems: "center", flexWrap:"wrap"
  },
  userTab2:{
    display:"flex", alignItems: "center", flexWrap:"wrap"
  },
  grid2Column :{
	  width:"50%",
	  padding: "10px",
	  margin: "5px",
	},
  gridColumn:{
    width:"100%",
  },
	gridContainer :{
	   display: "flex",
     padding:"2em 5em"
	},
  gridProductContainer :{
    display: "flex",
    padding:"5em 10em",
    flexDirection: "column"
 }	
})

class Step7 extends Component{

  
  render(){
    const {
      state, 
      setStateToNull,
      handleRouteNewTransaction,
      handleRouteViewTransactions,
      classes
    } = this.props
    
  //console.log("The new state step 7 =>",state);
  
    return (
      <Paper  direction="column" justifyContent="center"  alignItems="center">
          <div className={classes.gridProductContainer} style={{ marginTop: "-10px", justifyContent:"center", alignItems:"center" ,marginBottom: "45px" }} mt={2} p={2}>
              <div className={classes.gridColumn}  style={{margin: "2px", padding:"2em", textAlign: "center",justifyContent:"center"}}>
                  <CheckCircleIcon style={{color:"#03E550",fontSize: "60px"}} ></CheckCircleIcon>
              </div>    
              <div className={classes.gridColumn} style={{margin: "2px", padding:"2em", justifyContent:"center", textAlign: "center"}}>
                {renderText({
                  label: "Request sent successfully!",
                  type: "h5",
                  color: "textPrimary",
                  align: "center",
                  InputProps:{ classes: { input: classes.input1 } }, 
                })}
              </div>
              
              <div className={classes.gridColumn} style={{padding:"2em", margin: "2px", textAlign: "center", justifyContent:"center"}}>
                {renderText({
                  label: "Please inform the customer that they will be notified via email and phone number when the investment is approved and the Wallet is debited.",
                  type: "h6",
                  color: "textPrimary",
                  align: "center",
                  InputProps:{ classes: { input: classes.input1 } }, 
                })}
              </div>
              <div className={classes.gridColumn}  mb={10} height={80} style={{margin: "2px", padding:"2em",  textAlign: "center", justifyContent:"center"}}>
                {renderButton({ label: "Start New", variant:"contained", custom: true, fullWidth:true, onClick: handleRouteNewTransaction  })}
              </div>
          </div>
      </Paper>
    )

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
  //console.log("Investment App ", newInvestmentApp);
  const { newinvestment } = newInvestmentApp;
  return {
      investment: newinvestment,
      user: auth.user.data,
      rights: auth.rights.right.rights,
  };
};
export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Step7));