import React , {Component} from "react";
import { Grid, Paper,Input, Tab, Tabs, Icon, Typography } from "@material-ui/core";
import { myStyles } from "../common/styles";
import { withStyles } from '@material-ui/core/styles';
import {FusePageSimple, FuseUtils } from '../../../../@fuse';
import Divider from '@material-ui/core/Divider';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import * as Actions from '../store/actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FixedIncomeProducts from "./fixedincome/FixedIncomeProducts";

const styles = (theme) =>  ({
  root: {
    padding: '2px 0px',
    display: 'flex',
    alignItems: 'center',
  },
  input: {
    flex: 1,
  },
  whiteBg:{
      backgroundColor:"#fff"
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
  productName:{
    fontSize:"16px", fontWeight:"bolder",fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif"
  },
  btnPill:{
    borderRadius: '4.5rem',textTransform: 'uppercase',padding:"0.3em", fontSize: '10px', color: '#fff',backgroundColor: '#7a7b97',
    lineHeight: '21px'
  },
  btnPill2:{
    borderRadius: '0.2rem',textTransform: 'uppercase',padding:"0.3em", fontSize: '12px', color: '#fff',backgroundColor: '#000',
    lineHeight: '21px'
  },
  tabsRoot: {
    borderBottom: 'none',
  },
  tabsIndicator: {
    backgroundColor: '#000',
  },
  tabRoot: {
    textTransform: 'initial',
    minWidth: 72,
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing.unit * 4,
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
      color: '#40a9ff',
      opacity: 1,
    },
    '&$tabSelected': {
      color: '#000',
      fontWeight: theme.typography.fontWeightMedium,
    },
    '&:focus': {
      color: '#000',
    },
  },

})

class FixedIncome extends Component {  
state = {
    tabVal: 0,
};

getFilteredArray = (data, searchText) => {
    if (searchText.length === 0) {
        return data;
    }
    return FuseUtils.filterArrayByString(data, searchText);
};

handleChangeTab = (event, tabVal) => {
    this.setState({ tabVal });
};

getRecords = (prods,classes,handleNext,searchString) => {
    //console.log("All products ", products )
    const products = this.getFilteredArray(prods,searchString)
    const records =  products?
    products.map((product,index) => {
        return(
        <Grid key={index} item sm={4} md={4} xs={4} onClick = {handleNext} style={{cursor:"pointer"}}>
        <Card >
            <CardContent>
            <Grid container elevation={0} spacing={1}>
                <Grid item xs={8} sm={8} md={8}>
                <span className={classes.productName}>
                     {product.glName.split(" ")[0]}
                </span>
                </Grid>
                <Grid item xs={4} sm={4} md={4} container direction="column"  alignItems="flex-end" justify="flex-end" >
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    Price
                </Typography>
                
                </Grid>
            </Grid>
            <Grid container elevation={0} spacing={1} style={{ marginTop: "-10px" }}>
                <Grid item xs={8} sm={8} md={8}>
                <Typography  variant="subtitle1" color="textSecondary" style={{fontSize: "10px", color:"green"}}>
                    Maturity: {product.updatedAt}
                </Typography>
                </Grid>
                <Grid item xs={4} sm={4} md={4} container direction="column"  alignItems="flex-end" justify="flex-end" >
                <Typography variant="h5" className={classes.title} component="h5" gutterBottom>
                    #{product.thresholdDown}
                </Typography>
                
                </Grid>
            </Grid>
            
            <Grid container elevation={0} spacing={1} style={{ marginTop: "5px" }}>
                <Grid item xs={8} sm={8} md={8}>
                <Typography  variant="subtitle1" color="textSecondary" style={{fontSize: "10px"}}>
                    Coupon: <span style={{color:"#880000"}}>{product.coupon ? "" : 16.29}%</span>&nbsp;&nbsp;&nbsp;&nbsp;
                    Yield: <span style={{color:"#880000"}}>{product.coupon ? "" : 16.29}%</span>
                </Typography>
                </Grid>
                <Grid item xs={4} sm={4} md={4} container direction="column"  alignItems="flex-end" justify="flex-end" >
                <Typography variant="h5" className={classes.title} component="h5" gutterBottom>
                    &nbsp;
                </Typography>                    
                </Grid>
            </Grid>
            </CardContent>
            <CardActions>
            <Grid container elevation={0} spacing={1}>
                <Grid item xs={6} sm={6} md={6}>
                    <span className={classes.btnPill}>{product.name}</span>
                </Grid>
                <Grid item xs={6} sm={6} md={6} alignItems="flex-end" justify="flex-end"> 
                    <span className={classes.btnPill2}>Buy Investment</span>                
                </Grid>
            </Grid>
            </CardActions>
        </Card>            
        </Grid>
        )
    }) 
    : "No records to display"

    return records
}

getProductTabs = prodlists => {
    return  prodlists.map( product => 
    (<Tab key={product.id} className="h-64 normal-case" label={product.name} />))
}

  render(){
      const {
        state, 
        handleChange,
        handlePrev,
        handleNext,
        classes,
        products,
        searchText,
        buyProduct,
        setSearchText
      } = this.props
      
      return (
       
        <Paper elevation={0} style={myStyles.steps}>
            <Grid container elevation={0} style={{ marginBottom: "15px", marginTop: "5px" }}>
              <Grid item xs={12} sm={12} md={12}>
              <FusePageSimple
               
                classes={{
                    toolbar: `min-h-64 h-64 ${classes.whiteBg}`,
                    content: classes.content,
                }}
                contentToolbar={
                    <Tabs
                        style={{backgroundColor:"#fff"}}
                        value={this.state.tabVal}
                        onChange={this.handleChangeTab}
                        indicatorColor="secondary"
                        textColor="secondary"
                        variant="scrollable"
                        scrollButtons="auto"
                        classes={{
                           root: classes.tabsRoot, indicator: classes.tabsIndicator
                        }}
                    >    
                                    
                    <Tab className={{ root: classes.tabRoot, selected: classes.tabSelected }} label="Treasury Bills" /> {/*   1 */}
                    <Tab className={{ root: classes.tabRoot, selected: classes.tabSelected }} label="NGN Bonds" />{/*   2 */}
                    <Tab className={{ root: classes.tabRoot, selected: classes.tabSelected }} label="Commercial Papers" /> {/*   3 */}
                    <Tab className={{ root: classes.tabRoot, selected: classes.tabSelected }} label="Euro Bonds" /> {/*   4 */}
                    <Tab className={{ root: classes.tabRoot, selected: classes.tabSelected }} label="Sukuk Bonds" /> {/*   5 */}
                    <Tab className={{ root: classes.tabRoot, selected: classes.tabSelected }} label="Corporate Bonds" /> {/*   6 */}
                    <Tab className={{ root: classes.tabRoot, selected: classes.tabSelected }} label="State Bond" />{/*   7 */}
                    <Tab className={{ root: classes.tabRoot, selected: classes.tabSelected }} label="Security Linked Note" /> {/*   8 */}
                    <Tab className={{ root: classes.tabRoot, selected: classes.tabSelected }} label="Promissory Note" /> {/*   9 */}
                     
                    </Tabs>
                }
                content={
                    <div>
                        {this.state.tabVal === 0 && <FixedIncomeProducts  prodId={1} buyProduct={buyProduct}/>}
                        {this.state.tabVal === 1 && <FixedIncomeProducts  prodId={2} buyProduct={buyProduct}/> }
                        {this.state.tabVal === 2 && <FixedIncomeProducts  prodId={3} buyProduct={buyProduct}/>}
                        {this.state.tabVal === 3 && <FixedIncomeProducts  prodId={4} buyProduct={buyProduct}/>}
                        {this.state.tabVal === 4 && <FixedIncomeProducts  prodId={5} buyProduct={buyProduct}/> }
                        {this.state.tabVal === 5 && <FixedIncomeProducts  prodId={6} buyProduct={buyProduct}/>}
                        {this.state.tabVal === 6 && <FixedIncomeProducts  prodId={7} buyProduct={buyProduct}/>}
                        {this.state.tabVal === 7 && <FixedIncomeProducts  prodId={8} buyProduct={buyProduct}/>}
                        {this.state.tabVal === 8 && <FixedIncomeProducts  prodId={9} buyProduct={buyProduct}/>}
                    </div>
                }
                style={{background:"#fff"}}
                />     
              </Grid>
          </Grid>
          {/* <Grid container elevation={0} style={{ marginBottom: "15px", marginTop: "5px" }}>
              <Grid item xs={4} sm={4} md={4} xs={12}>
                <Typography variant="h6" component="h6">
                <Grid m={2}> 
                  Buy Investment
                </Grid>
                </Typography>   
              </Grid>
              <Grid item sm={4} spacing={24} md={8} xs={12}>
                <Paper className="flex items-center w-full max-w-512 px-8 py-4 rounded-8" elevation={1}>

                    <Icon className="mr-8" color="action">search</Icon>

                    <Input
                        placeholder=""
                        className="flex flex-1"
                        disableUnderline
                        fullWidth
                        value={searchText}
                        inputProps={{
                            'aria-label': 'Search'
                        }}
                        onChange={setSearchText}
                    />
                </Paper>
            </Grid>
          </Grid>

          <Grid container spacing={24} style={{ marginBottom: "5rem"}}>
               {this.getRecords(products,classes,handleNext,searchText)}           
           </Grid> */}

        </Paper>
      );
  }
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
      {
       
      },
      dispatch
  );
}
const mapStateToProps = ({ newInvestmentApp, auth }) => {
    const { fixedincome } = newInvestmentApp;
  return {
      //
      products: fixedincome.data,
      searchText: fixedincome.searchText,
      user: auth.user.data,
      rights: auth.rights.right.rights,
  };
};
export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(FixedIncome));
