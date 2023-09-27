import React, {Component} from "react";
import { Grid, Paper } from "@material-ui/core";
import { unstable_Box as Box } from '@material-ui/core/Box';
import { TextField, Typography } from "@material-ui/core";
import {
  renderButton,
  renderText,
} from "../common/DisplayComponent";
import { withStyles } from '@material-ui/core/styles';
import { myStyles } from "../common/styles";  
import * as Actions from '../store/actions';
import NumberFormat from 'react-number-format';
import { connect } from 'react-redux';
import LinearProgress from '@material-ui/core/LinearProgress';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import ClipLoader from "react-spinners/ClipLoader";
const styles = (theme) =>  ({
  //
    gridContainer: {
      display: "grid",
      gridTemplateColumns: "auto auto auto",
      padding: "5px",
    },
    gridItem: {
      textAlign: "center"
    }
  })

class Step1 extends Component {
  
    
  render(){
   
    const {
        state, 
        handleChange,
        classes,
        handleBvn
    } = this.props;

      
    const NumberDigitFormat = (props) => {
      const { inputRef, onChange, name, ...other } = props;
      return (
          <NumberFormat
              {...other}
              getInputRef={inputRef}
              onValueChange={(values) => {
                  onChange({
                      target: {
                          value: values.value,
                          name,
                      },
                  });
              }}
              allowNegative={false}
              allowLeadingZeros={false}
          />  
      );
    };
    //const { form } = this.state;
    return (
      <Paper style={myStyles.steps} style={{padding:"2em", textAlign:"center"}}>
        <div className={classes.gridContainer}>
          <div className={classes.gridItem}>&nbsp;</div>
            <div className={classes.gridItem} style={{fontWeight:"bold", fontSize:"20px", padding:"1em"}}>
              {renderText({
                label: "Enter BVN to get Started!",
                type: "h4",
                color: "textPrimary",
                align: "center",
              })}
            </div>
            <div className={classes.gridItem}>&nbsp;</div>
              {state.loading ?
              <>
              <div className={classes.gridItem}>&nbsp;</div>
              <div className={classes.gridItem} style={{Padding:"2em", marginTop:"2em"}}>
              <ClipLoader
              // cssOverride={override}
              size={100}
              color={"rgb(252, 237, 0)"}
              loading={state.loading}
              speedMultiplier={1.5}
            />
              </div>
              <div className={classes.gridItem}>&nbsp;</div>
              </>
             
            :
            <>
              <div className={classes.gridItem}>&nbsp;</div>
              <div  style={{fontWeight:"bold", fontSize:"20px", padding:"2em"}}>  
                  <TextField
                      name="bvn"
                      label="Enter BVN Number"
                      type="text"
                      variant='outlined'
                      color='primary'
                      size='large'
                      autoFocus
                      fullWidth={true}
                      value={state.form.bvn}
                      // disabled={state.form.bvn.length === 11 ? true : false}
                      onInput = {(e) =>{
                        e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,11)
                      }}
                      error={state.errors['bvn'] ? true : false}
                      helperText={state.errors['bvn'] ? state.errors['bvn'] : ""}
                      onChange={handleChange}
                      style={{
                        maxHeight: "100px",
                        minHeight: "50px"
                      }}
                      InputProps={{
                        inputComponent: NumberDigitFormat,
                    }}     
                    />
                  {state.loading ?
                    <div className="flex flex-1 flex-col items-center justify-center">
                      <Typography className="text-20 mb-16" color="textSecondary">Loading...</Typography>
                      <LinearProgress className="w-xs" color="secondary"/>
                    </div>
                    :
                    <div style={{Padding:"2em", marginTop:"2em"}}>  
                      {renderButton({ label: "Continue", variant:"contained", custom: true, fullWidth:true, onClick:() => handleBvn(state.form.bvn, false), disabled: state.stepSaveFlag })}
                    </div>
                  }
              </div> 
              <div className={classes.gridItem}>&nbsp;</div>
            </>     
              
            }
        </div>
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
      form: newinvestment.form,
      user: auth.user.data,
      rights: auth.rights.right.rights,
  };
};

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Step1));
