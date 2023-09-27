
import React, { Component, ReactDOM } from 'react';
import {//
    renderButton,
    renderInputField,
    renderText,
  } from "../common/DisplayComponent";
  import { Button, Typography } from '@material-ui/core';
  import Replay from '@material-ui/icons/Replay';
  import "../components/otp.css";  
import LinearProgress from '@material-ui/core/LinearProgress';
import OtpCountdown from '../components/OtpCountdown';
class Step2 extends React.Component {
//
  constructor(props) {
    super(props);
    this.state = { 
        otpValue: '', 
        otp1: "", 
        otp2: "", 
        otp3: "", 
        otp4: "", 
        otp5: "",
        otp6: "", 
        disableFlag: false,
        otpTime: 120
   };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.disableOtpFields = this.disableOtpFields.bind(this);
  }

  handleChange(value1, event) {

    this.setState({ 
      [value1]: event.target.value.replace(/\D/g, '')
    });

    //console.log("OTP values ",this.state.otpValue)
  }

  disableOtpFields(flag){
    //console.log("I get called ",flag)
    this.setState({disableFlag: flag, otpTime: 0});
   }

  handleSubmit(event) {

    const data = new FormData(event.target);
    console.log(this.state);
    event.preventDefault();
  }

  inputfocus = (elmnt) => {
   
    const elVal = elmnt.target.value.replace(/\D/g, '')
    
    if (elmnt.key === "Delete" || elmnt.key === "Backspace" || elVal === "") {
      const next = elmnt.target.tabIndex - 2;
      if (next > -1) {

        elmnt.target.form.elements[next].focus()
      }
    }
    else {     
        const next = elmnt.target.tabIndex;
        if (next < 6) {
          elmnt.target.form.elements[next].focus()
        }
    }

  }

  render() {
    const {
      state, 
      handleBvnSubmit,
      verifyOTPBvn
    } = this.props;
    return (
      <div className='rootContainer'>
        <div className="customText">
              {renderText({
                label: "Enter Customer's OTP",
                type: "h4",
                color: "textPrimary",
                align: "center",
              })}
              <br/>
              {renderText({
                label: "A one-time password was sent to the customer's phone number and email address. Please request that the customer provide the code to proceed.",
                type: "p",
                color: "textPrimary",
                align: "center",
              })}
        </div>
        {state.loading ?
                    <div className="flex flex-1 flex-col items-center justify-center">
                      <Typography className="text-20 mb-16" color="textSecondary">Loading...</Typography>
                      <LinearProgress className="w-xs" color="secondary"/>
                    </div>
        :
        <div className="otpContainer">

          <input
            name="otp1"
            type="text"
            autoComplete="off"
            disabled={this.state.disableFlag}
            className="otpInput"
            value={this.state.otp1}
            onKeyPress={this.keyPressed}
            onChange={e => this.handleChange("otp1", e)}
            tabIndex="1" maxLength="1" onKeyUp={e => this.inputfocus(e)}

          />
          <input
            name="otp2"
            type="text"
            autoComplete="off"
            disabled={this.state.disableFlag}
            className="otpInput"
            value={this.state.otp2}
            onChange={e => this.handleChange("otp2", e)}
            tabIndex="2" maxLength="1" onKeyUp={e => this.inputfocus(e)}

          />
          <input
            name="otp3"
            type="text"
            autoComplete="off"
            disabled={this.state.disableFlag}
            className="otpInput"
            value={this.state.otp3}
            onChange={e => this.handleChange("otp3", e)}
            tabIndex="3" maxLength="1" onKeyUp={e => this.inputfocus(e)}
          />

          <input
            name="otp4"
            type="text"
            autoComplete="off"
            className="otpInput"
            disabled={this.state.disableFlag}
            value={this.state.otp4}
            onChange={e => this.handleChange("otp4", e)}
            tabIndex="4" maxLength="1" onKeyUp={e => this.inputfocus(e)}
          />

          <input
            name="otp5"
            type="text"
            autoComplete="off"
            disabled={this.state.disableFlag}
            className="otpInput"
            value={this.state.otp5}
            onChange={e => this.handleChange("otp5", e)}
            tabIndex="5" maxLength="1" onKeyUp={e => this.inputfocus(e)}
          />

        <input
            name="otp6"
            type="text"
            autoComplete="off"
            disabled={this.state.disableFlag}
            className="otpInput"
            value={this.state.otp6}
            onChange={e => this.handleChange("otp6", e)}
            tabIndex="6" maxLength="1" onKeyUp={e => this.inputfocus(e)}
        />

        </div>
        }
        <div className="customButtom">
                  {this.state.disableFlag? 
                  <>
                    <Typography variant="caption" color="error">
                                          <h4 style={{display:"inline"}}>resend OTP{' '}</h4>
                          <Button onClick={() => handleBvnSubmit(state.otpDetail.bvn)} size="small">
                              {' '}
                              <Replay fontSize="small" color="error" />
                          </Button>
                    </Typography><br/><br/>   
                  </>
                   
                  :
                 <>
                  <OtpCountdown disableOtpField={this.disableOtpFields} defaultTimer={this.state.otpTime}/><br/><br/>
                 </> 
                 }
                {renderButton({ label: "Process", variant:"contained",color:"inheritDefault1", custom: true,disabled:this.state.disableFlag, fullWidth:true, onClick:() => verifyOTPBvn({bvn:state.form.bvn, otp:this.state}) })}
        </div>
            </div>
    );
  }
}


export default Step2;