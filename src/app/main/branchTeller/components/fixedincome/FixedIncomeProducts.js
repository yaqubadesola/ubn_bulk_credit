import React , {Component} from "react";
import { Grid, Paper,Input, Icon, Typography } from "@material-ui/core";
import { myStyles } from "../../common/styles";
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
// import PersonIcon from '@material-ui/icons/Person';
// import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
// import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';//
// import RefreshIcon from '@material-ui/icons/Refresh';
// import InputBase from '@material-ui/core/InputBase'../../../../@fuse;
import Avatar from "@material-ui/core/Avatar";
import { FuseUtils } from '../../../../../@fuse';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import * as Actions from '../../store/actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ProductDisplay from "./ProductDisplay";

const styles = (theme) =>  ({
  root: {
    margin: "1px",
    padding: "1px",
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
  productName:{
    fontSize:"15px", fontWeight:"bolder",fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif", textTransform:"uppercase"
  },
  issuerName:{
    color:"#880000", fontSize: "12px", textAlign:"center", fontWeight:"bold"
  },
  btnPill:{
    borderRadius: '4.5rem',textTransform: 'uppercase',padding:"0.3em", fontSize: '10px', color: '#fff',backgroundColor: '#7a7b97',
    lineHeight: '21px'
  },
  btnPill2:{
    borderRadius: '1rem',textTransform: 'uppercase',padding:"1em", fontSize: '18px', color: '#fff',backgroundColor: '#000',
    lineHeight: '21px',width:"100%"
  },
  avatar: {
    display: "inline-block",
    border: "2px solid white",
  }

})

class FixedIncomeProducts extends Component {  

componentDidMount(){
    this.props.getFixedIncomeProducts(this.props.prodId)
}
getFilteredArray = (data, searchText) => {
    if (searchText.length === 0) {
        return data;
    }
    return FuseUtils.filterArrayByString(data, searchText);
};

currencyFormat = (value,id) => {
  const nf = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: id === 4? 'USD' : 'NGN',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return nf.format(value);
}

getRecords = (prods,classes,handleNext,searchString) => {
    const products = this.getFilteredArray(prods,searchString)
    const records =  products?
      products.map((product,index) => {
          return(
          <Grid key={index} item sm={4} md={4} xs={4} >
          <Card >
              <ProductDisplay product={product} prodId={this.props.prodId}/>
              <CardActions>
              <Grid container elevation={0} spacing={1}>
                  <Grid item xs={12} sm={12} md={12} alignItems="center" justify="center">    
                      <Button variant="primary" color="secondary" className={classes.btnPill2} 
                      onClick={() => this.props.buyProduct({...product})} style={{cursor:"pointer"}}>
                        BUY
                      </Button>            
                  </Grid>
              </Grid>
              </CardActions>
          </Card>            
          </Grid>
          )
      }) 
    : 
    <div className="flex flex-1 flex-col items-center justify-center">
      <Typography className="text-20 mb-16" color="textSecondary">Loading...</Typography>
      <LinearProgress className="w-xs" color="secondary"/>
    </div>

    return records
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
        setSearchText
      } = this.props
      
      return (
       
        <Paper elevation={0} style={myStyles.steps}>
        
          <Grid container elevation={0} style={{ marginBottom: "15px", marginTop: "5px" }}>
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
          </Grid>

        </Paper>
      );
  }
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
      {
        getFixedIncomeProducts: Actions.getFixedIncomeProducts,
        setSearchText: Actions.setOrdersSearchText
      },
      dispatch
  );
}
const mapStateToProps = ({ newInvestmentApp, auth }) => {
    const { fixedincome } = newInvestmentApp;
    //console.log("prods new" , fixedincome);
  return {
      //
      products: fixedincome.data,
      searchText: fixedincome.searchText,
      user: auth.user.data,
      rights: auth.rights.right.rights,
  };
};
export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(FixedIncomeProducts));
