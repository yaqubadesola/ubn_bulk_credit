import React , {Component} from "react";
import CircularProgress from '@material-ui/core/CircularProgress';
import { 
  Paper, 
  Typography, 
  FormControlLabel,
  Switch,
  IconButton,
  MenuItem,
  TextField,
  FormHelperText,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,//
  List
} from "@material-ui/core";  
import PropTypes from 'prop-types';
import { myStyles } from "../common/styles";
import { withStyles } from '@material-ui/core/styles';
import PersonIcon from '@material-ui/icons/Person';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import DeleteIcon from '@material-ui/icons/Delete';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import AssignmentOutlinedIcon from '@material-ui/icons/AssignmentOutlined';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';//
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
//import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
//import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import NumberFormat from 'react-number-format';
import Replay from '@material-ui/icons/Replay';
import Card from '@material-ui/core/Card';
import moment from 'moment';
import CardContent from '@material-ui/core/CardContent';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import Button from '@material-ui/core/Button';
import { bindActionCreators } from 'redux';
import * as Actions from '../store/actions';
import { connect } from 'react-redux';
import _ from 'lodash';

import {
  renderButton,
} from "../common/DisplayComponent";

const styles = (theme) =>  ({
  // gridContainer: {
  //   display: "grid",
  //   gridTemplateColumns: "auto auto auto",
  //   padding: "5px",
  // },
  // gridItem: {
  //   textAlign: "center"
  // },
  smallInput: {
    width: 150,
    height: 30,
    '& input + fieldset': {
      borderColor: 'hotpink',
    },
  },
  input: {
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  userTab:{
    fontSize:"18px", fontWeight:"bolder", display:"flex", alignItems: "center", flexWrap:"wrap"
  },
  userTab2:{
    display:"flex", alignItems: "center", flexWrap:"wrap"
  },
  grid3Column :{
	  width:"33.33%",
	  padding: "10px",
	  margin: "5px",
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
	   display: "flex"
	},
  gridProductContainer :{
    display: "flex",
    flexDirection: "column"
 }	
})

const NumberFormatCustom = (props) => {
  // console.log("All props ",props);
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
          thousandSeparator
          prefix="₦"
      />
  );
};

const NumberEuroFormat = (props) => {
  // console.log("All props ",props);
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
          thousandSeparator
          prefix="$"
      />
  );
};

// const NumberFormatCustom = (props) => {
//   const { inputRef, onChange, ...other } = props;

//   return (
//       <NumberFormat
//           {...other}
//           getInputRef={inputRef}
//           onValueChange={(values) => {
//               onChange({
//                   target: {
//                       value: values.value,
//                   },
//               });
//           }}
//           thousandSeparator
//           prefix="$"
//       />
//   );
// }
const NumberFormatCustomRate = (props) => {
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
          // thousandSeparator
          suffix="%"
      />
  );
};

const NumberDecimalFormatCustom = (props) => {
  const { inputRef, onChange,name, ...other } = props;

  return (
      <NumberFormat
          {...other}
          getInputRef={inputRef}
          onValueChange={(values) => {
              onChange({
                  target: {
                      value: values.value,
                      name
                  },
              });
          }}
          //thousandSeparator
          //prefix=""
      />
  );
};

NumberFormatCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

class Step5 extends Component{
  state = {
    form: {
        doctypeId: '',
    },
  };
  componentDidMount(){
    this.props.getWalletBal(this.props.state.form.userUuid)
    this.props.getDocTypes()
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

  handleDropDownChange = (event) => {
    // console.log( 'dropdown Change',event);
    this.setState(
        _.set(
            this.state.form,
            event.target.name,
            event.target.type === 'checkbox' ? event.target.checked : event.target.value
        )
    );
    
    // console.log(this.state.form, 'Form Change');
};

  
  render(){
    const {
      state, 
      handleChange,
      handlePrev,
      getWalletBal,
      handleFileUpload,
      handleRemove,      
      productConfirmation,
      classes,
      enableNext,
      doctypes,
      user,
      rights
    } = this.props
    const { form } = this.state;
    const r = _.find(rights, function (o) {
        return o.module.id === 59;
    });
    
    const newDocs = !state.editRate? doctypes.filter(item => item.id != '19') : doctypes
    const getDocTypeName = (id) => {
          const docObj = doctypes.filter(item => item.id === id)
          // console.log("docObj",docObj)
          const docName = docObj? docObj[0].name.split(" ").join('_') : ""
          // console.log("docObj ", docName)
          return docName
    }
    
    // console.log("user's role = ", user.role.id);
    // console.log("r ", r);
    // console.log("state single product ", state.singleProduct);
    let specialRate = state.singleProduct.product.productCategory.id == 1 || state.singleProduct.product.productCategory.id == 3? false : true
    let showYield = state.singleProduct.product.productCategory.id   == 2 || 
                    state.singleProduct.product.productCategory.id   == 5 ||
                    state.singleProduct.product.productCategory.id   == 6 ||
                    state.singleProduct.product.productCategory.id   == 7 ?  true : false

    return (
      <div>
        <Paper elevation={0} style={myStyles.steps}>
            <div className={classes.gridContainer} style={{ marginBottom: "16px" }}>
                <div className={classes.grid3Column}>
                  {/* style={{direction:"column",alignItems:"flex-end",justify:"flex-end" }} */}
                  <Paper elevation={0} >
                    <div className={classes.userTab}>
                    <PersonIcon></PersonIcon>&nbsp;&nbsp;Customer's Details
                    </div>
                    <br/>
                    <Typography color="textPrimary">
                    BVN: {state.form.bvn}
                    </Typography>
                    <div className={classes.userTab2}>
                      M36 Wallet ID:  {state.form.walletId}<sup><FileCopyOutlinedIcon size="small" style={{ fontSize: 18 }}></FileCopyOutlinedIcon></sup>
                    </div>
                  </Paper>
                </div>
              
                <div className={classes.grid3Column}>
                    <Paper elevation={0}>&nbsp;</Paper>
                </div>
                <div className={classes.grid3Column} style={{ marginLeft:"2em"}}>
                <Paper elevation={0} style={{marginRight:"3em"}}>
                  <div className={classes.userTab}>
                  <AccountBalanceWalletIcon></AccountBalanceWalletIcon>&nbsp;&nbsp;Wallet Balance
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
                </div>
            </div>
          <div className={classes.gridContainer}>
              <div className={classes.gridColumn}>
                <hr/> <Divider></Divider>
              </div>
          </div>
    
          <div className={classes.gridContainer}>
              <div className={classes.grid3Column}>
                <Typography variant="h6" component="h6">
                <div m={2}> 
                  Buy {`${state.singleProduct.product.productCategory.name}`}
                </div>
                </Typography>   
              </div>
              <div className={classes.grid3Column}>
                &nbsp;
              </div>
            <div className={classes.grid3Column} style={{ direction:"column", alignContent :"flex-end",  justify:"flex-end"}}>
              <div style={{textAlign:"right"}}>
              <Button variant="outlined" onClick = {handlePrev} color="secondary" className="m-2"  startIcon={<KeyboardBackspaceIcon />}>
                Go Back
              </Button>
              </div>    
            </div>
          </div>
        
          <div className={classes.gridContainer}>
              {/* {getRecords(products)} */}
            <div className={classes.grid2Column}>
               &nbsp;
            </div>
            <div className={classes.grid2Column}>
                &nbsp;
            </div>
          </div>
            {/* Start debugging from here */}
          <div className={classes.gridContainer} style={{marginBottom:"1rem"}}>
              <div className={classes.grid2Column} >
                <div  className={classes.gridContainer}>

                    <div className={classes.gridColumn} >
                          <FormHelperText className="text-center" id="outlined-weight-helper-text">
                            <span style={{fontSize:"2em",padding:"15px"}}>Enter Amount</span> 
                          </FormHelperText>
                          {state.singleProduct.product.productCategory.id === 4 ?
                            <TextField
                              className="mb-24"
                              type="text"
                              autoFocus
                              id="outlined-adornment-faceValue"
                              name="faceValue"
                              value={state.singleProduct.faceValue}
                              error={state.errors['faceValue'] ? true : false}
                              onChange={handleChange}
                              variant="outlined"
                              required
                              fullWidth                           
                              InputProps={{
                                  inputComponent: NumberEuroFormat,
                              }}
                            />
                            :
                            <TextField
                              className="mb-24"
                              type="text"
                              autoFocus
                              id="outlined-adornment-faceValue"
                              name="faceValue"
                              value={state.singleProduct.faceValue}
                              error={state.errors['faceValue'] ? true : false}
                              onChange={handleChange}
                              variant="outlined"
                              required
                              fullWidth                           
                              InputProps={{
                                  inputComponent: NumberFormatCustom,
                              }}
                            />
                          }

                            <Typography color="textSecondary" style={{color:"red", display:"block",  marginTop: "1rem", marginBottom: "2rem"}}>
                              {state.errors['faceValue'] ? state.errors['faceValue'] : ""}
                            </Typography>
                    </div>
                </div>
                <div className={classes.gridContainer}>
                  <div className={classes.gridColumn} justifyContent="center">
                  
                  </div>                        
                </div>
                <div className={classes.gridProductContainer} style={{ marginTop: "-10px", backgroundColor: "rgb(247, 247, 247)", borderRadius:"0.5em" }}>
                  
                  <div className={classes.gridContainer}>
                    <div className={classes.grid2Column}>
                      <Typography  variant="subtitle1" color="textSecondary">
                        Issuer
                      </Typography>
                    </div>
                    <div className={classes.grid2Column} >
                      <Typography className={classes.title}  gutterBottom>
                        
                          <TextField
                              name="issuer"
                              type="text"
                              variant='outlined'
                              color='primary'
                              size='small'
                              value={state.singleProduct.product.issuer}
                              disabled={true}
                              // error={state.errors['bvn'] ? true : false}
                              // helperText={state.errors['bvn'] ? state.errors['bvn'] : ""}
                              onChange={handleChange}
                              InputProps={{
                                className: classes.smallInput,
                              }}
                          />
                      </Typography>                    
                    </div>
                  </div>
                  
                  <div className={classes.gridContainer}>
                    <div className={classes.grid2Column}>
                      <Typography  variant="subtitle1" color="textSecondary">
                        { specialRate? "Clean Price" : "Discount Rate"}
                      </Typography>
                    </div>
                    <div className={classes.grid2Column} >
                      <Typography className={classes.title}  gutterBottom>
                      {state.singleProduct.product.productCategory.id === 4 ?
                          <TextField
                              name="offer"
                              type="text"
                              variant='outlined'
                              color='primary'
                              size='small'
                              value={state.singleProduct.product.offer}
                              disabled={!state.editRate}
                              // error={state.errors['bvn'] ? true : false}
                              // helperText={state.errors['bvn'] ? state.errors['bvn'] : ""}
                              onChange={handleChange}
                              
                              InputProps={{
                                inputComponent: specialRate ? NumberEuroFormat   : NumberFormatCustomRate,
                                className: classes.smallInput,
                              }}
                          />
                          :
                          <TextField
                              name="offer"
                              type="text"
                              variant='outlined'
                              color='primary'
                              size='small'
                              value={state.singleProduct.product.offer}
                              disabled={!state.editRate}
                              // error={state.errors['bvn'] ? true : false}
                              // helperText={state.errors['bvn'] ? state.errors['bvn'] : ""}
                              onChange={handleChange}
                              
                              InputProps={{
                                inputComponent: specialRate ? NumberFormatCustom    : NumberFormatCustomRate,
                                className: classes.smallInput,
                              }}
                          />
                      }

                      </Typography>                    
                    </div>
                  </div>

                  <div className={classes.gridContainer}>
                    <div className={classes.grid2Column} style={{display:`${!showYield? 'none' : ''}`}}>
                      <Typography  variant="subtitle1" color="textSecondary">
                        Coupon
                      </Typography>
                    </div>
                    <div className={classes.grid2Column} direction="column" style={{display:`${!showYield? 'none' : ''}`}} alignItems="flex-end" justify="flex-end" >
                      <Typography className={classes.title}  gutterBottom>
                      
                        <TextField
                              name="couponRate"
                              type="text"
                              variant='outlined'
                              color='primary'
                              size='small'
                              value={state.singleProduct.product.couponRate}
                              InputProps={{
                                        inputComponent: NumberFormatCustomRate,
                                        className: classes.smallInput,
                              }}
                              // error={state.errors['bvn'] ? true : false}
                              // helperText={state.errors['bvn'] ? state.errors['bvn'] : ""}
                              onChange={handleChange}
                              style={{
                                maxHeight: "100px",
                                minHeight: "50px"
                              }}
                              disabled={true}
                          />
                      </Typography>                    
                    </div>
                  </div>

                  <div className={classes.gridContainer}>
                    <div className={classes.grid2Column} style={{display:`${!showYield? 'none' : ''}`}}>
                      <Typography  variant="subtitle1" color="textSecondary">
                        Yield
                      </Typography>
                    </div>
                    <div className={classes.grid2Column} style={{display:`${!showYield? 'none' : ''}`}} justify="flex-end" >
                      <Typography className={classes.title}  gutterBottom>
                      
                          <TextField
                              name="yieldRate"
                              type="text"
                              variant='outlined'
                              color='primary'
                              disabled={!state.editRate}
                              size='small'
                              value={state.singleProduct.product.yieldRate}
                              // error={state.errors['bvn'] ? true : false}
                              // helperText={state.errors['bvn'] ? state.errors['bvn'] : ""}
                              onChange={handleChange}
                              style={{
                                maxHeight: "100px",
                                minHeight: "50px"
                              }}
                              InputProps={{
                                  inputComponent: NumberFormatCustomRate,
                                  className: classes.smallInput
                              }}
                          />
                      </Typography>                    
                    </div>
                  </div>
                  
                  <div className={classes.gridContainer}>
                    <div className={classes.grid2Column}>
                      <Typography  variant="subtitle1" color="textSecondary">
                        Maturity
                      </Typography>
                    </div>
                    <div className={classes.grid2Column} >
                      <Typography className={classes.title}  gutterBottom>
                      
                      <TextField
                              name="maturity"
                              type="text"
                              variant='outlined'
                              color='primary'
                              size='small'
                              value={moment(state.singleProduct.product.maturity).format('LL')}
                              disabled={true}
                              onChange={handleChange}
                              style={{
                                maxHeight: "100px",
                                minHeight: "50px"
                              }}
                              InputProps={{
                                className: classes.smallInput,
                              }}
                          />
                      </Typography>                    
                    </div>
                  </div>
                </div>                
                {(user.role && user.role.id === 31) && (r && r.cancreate && r.canedit) ?
               
                  <div className={classes.gridContainer} style={{ marginTop: "0.5rem" }}>
                      <div className={classes.gridColumn}>
                        <div>
                            <FormControlLabel
                                  label="Edit rate"
                                  name="editRate"
                                  labelPlacement="start"
                                  color="primary"
                                  control={
                                      <Switch
                                          color="primary"
                                          checked={state.editRate}
                                      />
                                  }
                                  onChange={handleChange}
                            />
                        </div>
                      </div>
                  </div>   
                :
                ""
                }        
              </div>
              <div className={classes.grid2Column} style={{ marginTop: "1rem"}}>
               <Card>
                  <CardContent rounded={0} style={{ backgroundColor:" #F7F7F7" }}>
                    <div className={classes.gridContainer}>
                      
                      <div className={classes.grid2Column} style={{ marginTop: "0.5rem" }}>
                        <Typography className={classes.title} gutterBottom>
                          {/* <AssignmentOutlinedIcon></AssignmentOutlinedIcon>&nbsp; Customer Instruction */}
                          <TextField
                            id="doctypeId"
                            select
                            label="Doc Type"
                            name="doctypeId"
                            className="mt-8 mb-16"
                            value={form.doctypeId}
                            onChange={this.handleDropDownChange}
                            SelectProps={{
                                MenuProps: {
                                    className: 'mt-8 mb-8',
                                },
                            }}
                            variant="outlined"
                            fullWidth
                        >   
                            {newDocs &&
                                newDocs.map((option, i) => 
                                      (<MenuItem key={i} value={option.id}>
                                          {option.name}
                                      </MenuItem>
                                )
                            )}
                        </TextField>
                        </Typography>   
                      </div>
                      <div className={classes.grid2Column}>
                        <div className="" height={60} style={{textAlign:"right"}}>
                          <input
                              style={{ display: "none" }}
                              id="contained-button-file"
                              type="file"
                              name={form.doctypeId? getDocTypeName(form.doctypeId) : ""}
                              onChange={handleFileUpload}
                            />
                            <label htmlFor="contained-button-file">
                              <Button variant="contained" color="primary" component="span" style={{background:"#039BE5"}}>
                              <FileCopyIcon size="small"></FileCopyIcon> &nbsp; { Object.keys(state.allUploadedFiles).length > 0 ? "Upload More": "Upload Doc"}
                              </Button>
                            </label>                                      
                        </div>
                      </div>
                    </div>
                    <div className={classes.gridContainer}>                    
                    </div>
                  </CardContent>
                </Card>
                {<div style={{}}>
                        {
                          Object.keys(state.allUploadedFiles).length > 0 
                          ?
                          <>
                          <div component={Paper}>
                            <Table className={classes.table} aria-label="simple table">
                              <TableHead>
                                <TableRow>
                                  <TableCell>Doc Type</TableCell>
                                  <TableCell>Filename</TableCell>
                                  <TableCell>Action</TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {Object.keys(state.allUploadedFiles).map((item,index) => (
                                  <TableRow key={index}>
                                    <TableCell component="th" scope="row">
                                      {item? item.split("_").join(' ')  : ""}
                                    </TableCell>
                                    <TableCell>{state.allUploadedFiles[item].name}</TableCell>
                                    <TableCell align="right">  
                                      <IconButton aria-label="Delete" onClick={()=>handleRemove(item)}>
                                        <DeleteIcon style={{color:"red"}}/>
                                      </IconButton>
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </div>
                          {/* <List>
                          {
                            Object.keys(state.allUploadedFiles).map( item => {
                            return ( <ListItem>
                              <div className={classes.userTab2}><PictureAsPdfIcon />  <span style={{display:"inline"}}>{item}</span></div>
                                <ListItemText
                                  primary={state.allUploadedFiles[item].name}
                                  secondary={null}
                                />
                               
                                <ListItemSecondaryAction>
                                  <IconButton aria-label="Delete" onClick={()=>handleRemove(item)}>
                                    <DeleteIcon style={{color:"red"}}/>
                                  </IconButton>
                                </ListItemSecondaryAction>
                              </ListItem>)
                            })                              
                            }
                          </List>                         */}
                          </>
                          :
                          <Typography color="textSecondary"  className="text-center" >
                              <span>
                               Please upload necessary document(s) for this transaction <br/> Support PNG, JPG and PDF format
                              </span>
                        </Typography>
                        }
                </div>}
                {/* {state.editRate ? 
                <div style={{mar4ed >
                    <CardContent rounded={0} style={{ backgroundColor:" #F7F7F7"}}>
                      <div className={classes.gridContainer}>
                        
                        <div className={classes.grid2Column} style={{ marginTop: "0.5rem" }}>
                          <Typography className={classes.title} gutterBottom>
                            <AssignmentOutlinedIcon></AssignmentOutlinedIcon>&nbsp; Exceptional Approval
                            </Typography>   
                        </div>
                        <div className={classes.grid2Column}>
                          <div className="" height={60} style={{textAlign:"right"}}>
                            <input
                                style={{ display: "none" }}
                                id="contained-button-file-2"
                                type="file"
                                name="selectedFile2"
                                onChange={handleFileUpload}
                              />
                              <label htmlFor="contained-button-file-2">
                                <Button variant="contained" color="primary" component="span" style={{background:"#039BE5"}}>
                                <FileCopyIcon size="small"></FileCopyIcon> &nbsp; Upload { state.singleProduct.selectedFile2? "New": "Doc"}
                                </Button>
                              </label>                                      
                          </div>
                        </div>
                      </div>
                      <div className={classes.gridContainer}>                    
                      </div>
                    </CardContent>
                  </Card>
                  <div style={{}}>
                          {
                            state.singleProduct.selectedFile2
                            ?
                            <>
                            <List>
                                <ListItem>
                                    <PictureAsPdfIcon />
                                  <ListItemText
                                    primary={state.singleProduct.selectedFile2.name}
                                    secondary={null}
                                  />
                                  <ListItemSecondaryAction>
                                    <IconButton aria-label="Delete" onClick={()=>handleRemove("selectedFile2")}>
                                      <DeleteIcon style={{color:"red"}}/>
                                    </IconButton>
                                  </ListItemSecondaryAction>
                                </ListItem>
                            </List>                        
                            </>
                            :
                            <Typography color="textSecondary"  className="text-center">
                            <span>
                               Please upload exceptional Approval's Instruction form <br/> Support PNG, JPG and PDF format
                              </span>
                          </Typography>
                          }
                  </div>
                </div> 
                :""} */}
                { state.loading ?  
                    <div className="flex flex-1 flex-col items-center justify-center">
                    <Typography className="text-20 mb-16" color="textSecondary">Loading...</Typography>
                    <CircularProgress className="w-xs" color="secondary"/>
                  </div> 
                    : 
                  <div display="flex"  width={"100%"}  height={60} style={{ marginTop: "12rem"}}>
                    {renderButton({ label: "Proceed", variant:"contained", custom: true, fullWidth:true, onClick: () => productConfirmation(state), disabled :enableNext(state)})}
                  </div>  
                }
              </div>
          </div>
        
        </Paper>
      </div>
    );
  
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
      {
        getBvnDetail: Actions.getBvnDetail,
        getDocTypes: Actions.getDocTypes,    
      },
      dispatch
  );
}
const mapStateToProps = ({ newInvestmentApp, auth }) => {
  // console.log("Investment App Step 4", newInvestmentApp);
  const { newinvestment } = newInvestmentApp;
  return {
      user: auth.user.data,            
      doctypes: newinvestment.doctypes, 
      rights: auth.rights.right.rights,
  };
};
export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Step5));