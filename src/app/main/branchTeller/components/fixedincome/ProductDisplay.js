import React , {Component} from "react";
import moment from 'moment';
import CardContent from '@material-ui/core/CardContent';
import Avatar from "@material-ui/core/Avatar";
import { Grid, Typography} from "@material-ui/core";
//import { unstable_Box as Box} from '@material-ui/core/Box';
import { withStyles } from '@material-ui/core/styles';

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
      color:"green", fontSize: "12px", textAlign:"center", fontWeight:"bold"
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
    },
    gContainer: {
        display: "grid",
        gridTemplateColumns: "auto auto",
        padding: "2px",
    },
    gItem: {
    textAlign: "center"
    }
  
  })
  
class ProductDisplay extends Component {

    currencyFormat = (value,id) => {
        const nf = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: id === 4? 'USD' : 'NGN',
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
        return nf.format(value);
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

    render(){
        const {
          product,
          classes,
          prodId,
        } = this.props
        
        return (
            <CardContent>
                {(() => {
                    switch (prodId) {
                    case 1 : return (
                    <>  
                        <Grid container elevation={0} spacing={1}>
                            <Grid item xs={3} sm={3} md={3} container direction="column"  alignItems="flex-start" justify="flex-start" >
                            <Avatar className={classes.avatar} src= {product.productCategory.icon} />
                            </Grid>
                            <Grid item xs={9} sm={9} md={9} alignItems="center" justify="center">
                                <Typography className={classes.productName} style={{textAlign:"center", textTransform: "capitalize"}}>
                                    {product.productCategory.name}
                            <br/>
                            </Typography>
                            </Grid>               
                        </Grid>
                        <Grid container elevation={0} spacing={1} style={{ marginTop: "-10px" }}>
                        <Grid item xs={12} sm={12} md={12} className={classes.root}>
                            <div display="row" justifyContent="center" m={1} p={1} bgcolor="background.paper" className={classes.root}>
                                <div className={classes.root}>
                                    <Typography variant="p" className={classes.title} component="p" style={{padding:"0.5em", fontSize:"14px",textAlign:"center"}}>
                                        Maturity Date<br/>
                                        <span style={{color:"green"}}>
                                        <b>{moment(product.maturity).format('LL')} </b>
                                        </span>
                                    </Typography>
                                </div>
                                <div className={classes.root}>
                                    <Typography variant="p" className={classes.title} component="p" style={{padding:"0.5em", fontSize:"14px",textAlign:"center"}}>
                                        Tenor<br/>
                                        <span style={{color:"green"}}>
                                        <b>{this.getTenorDays(product.maturity)}</b>
                                        </span>
                                    </Typography>
                                </div>
                                <div className={classes.root}>
                                    <Typography variant="p" className={classes.title} component="p" style={{padding:"0.5em", fontSize:"14px",textAlign:"center"}}>
                                        Discount Rate<br/>
                                        <span style={{color:"green"}}>
                                        <b>{product.offer}% p.a</b>
                                        </span>
                                    </Typography>
                                </div>
                            </div>
                    
                        </Grid>
                        
                        </Grid>
                    </>  
                    )
                    case 2:case 5:case 6:case 7: return (
                        <>
                            <Grid container elevation={0} spacing={1}>
                                <Grid item xs={3} sm={3} md={3} container direction="column"  alignItems="flex-start" justify="flex-start" >
                                <Avatar className={classes.avatar} src= {product.productCategory.icon} />
                                </Grid>
                                <Grid item xs={9} sm={9} md={9} alignItems="center" justify="center">
                                    <Typography className={classes.productName} style={{textAlign:"center"}}>
                                        {product.productCategory.name}
                                <br/>
                                    <span className={classes.issuerName} >{product.issuer}</span>
                                </Typography>
                                </Grid>               
                            </Grid>
                            <Grid container elevation={0} spacing={1} style={{ marginTop: "-10px" }}>
                                <Grid item xs={12} sm={12} md={12} className={classes.root}>
                                    <div display="row" justifyContent="center" m={1} p={1} bgcolor="background.paper" className={classes.root}>
                                        <div className={classes.root}>
                                            <Typography variant="p" className={classes.title} component="p" style={{padding:"0.5em", fontSize:"14px",textAlign:"center"}}>
                                                Maturity Date<br/>
                                                <span style={{color:"green"}}>
                                                <b>{moment(product.maturity).format('LL')} </b>
                                                </span>
                                            </Typography>
                                        </div>
                                        <div className={classes.root}>
                                            <Typography variant="p" className={classes.title} component="p" style={{padding:"0.5em", fontSize:"14px",textAlign:"center"}}>
                                                Price<br/>
                                                <span style={{color:"green"}}>
                                                <b>{this.currencyFormat(product.amount_on_Bid,prodId)}</b>
                                                </span>
                                            </Typography>
                                        </div>
                                      
                                    </div>                                
                                    <div  m={1} p={1} bgcolor="background.paper" className={classes.gContainer}>
                                        <span className={classes.gItem}>
                                            <Typography variant="span" className={classes.title} component="span" gutterBottom>
                                            Coupon:  <b><span style={{color:"green"}}>{product.couponRate}%</span></b>
                                            </Typography>
                                        </span>
                                        <span className={classes.root}>
                                            <Typography variant="span" className={classes.title} component="span" gutterBottom>
                                            Yield:  <b><span style={{color:"green"}}>{product.yieldRate}%</span></b>
                                            </Typography>
                                        </span>
                                    </div>
                                </Grid>                        
                            </Grid>
                        </>
                    )
                    case 3: return (//Commerial paper card display
                        <>
                            <Grid container elevation={0} spacing={1}>
                                <Grid item xs={3} sm={3} md={3} container direction="column"  alignItems="flex-start" justify="flex-start" >
                                <Avatar className={classes.avatar} src= {product.productCategory.icon} />
                                </Grid>
                                <Grid item xs={9} sm={9} md={9} alignItems="center" justify="center">
                                    <Typography className={classes.productName} style={{textAlign:"center"}}>
                                        {product.productCategory.name}
                                <br/>
                                    <span className={classes.issuerName} >{product.issuer}</span>
                                </Typography>
                                </Grid>               
                            </Grid>
                            <Grid container elevation={0} spacing={1} style={{ marginTop: "-10px" }}>
                                <Grid item xs={12} sm={12} md={12} className={classes.root}>
                                    <div display="row" justifyContent="center" m={1} p={1} bgcolor="background.paper" className={classes.root}>
                                        <div className={classes.root}>
                                            <Typography variant="span" className={classes.title} component="span" style={{padding:"0.5em", fontSize:"14px",textAlign:"center"}}>
                                                Maturity Date<br/>
                                                <span style={{color:"green"}}>
                                                <b>{moment(product.maturity).format('LL')} </b>
                                                </span>
                                            </Typography>
                                        </div>
                                        <div className={classes.root}>
                                            <Typography variant="span" className={classes.title} component="span" style={{padding:"0.5em", fontSize:"14px",textAlign:"center"}}>
                                                Tenor<br/>
                                                <span style={{color:"green"}}>
                                                <b>{this.getTenorDays(product.maturity)}</b>
                                                </span>
                                            </Typography>
                                        </div>
                                        <div className={classes.root}>
                                            <Typography variant="p" className={classes.title} component="p" style={{padding:"0.5em", fontSize:"14px",textAlign:"center"}}>
                                                Discount Rate<br/>                                             
                                                <b><span style={{color:"green"}}>{product.offer}% p.a</span></b>
                                            </Typography>
                                        </div>
                                    </div>                            
                                </Grid>                        
                            </Grid>
                        </>
                    )
                    case 4: return (// Euro Bond 
                        <>
                            <Grid container elevation={0} spacing={1}>
                                <Grid item xs={3} sm={3} md={3} container direction="column"  alignItems="flex-start" justify="flex-start" >
                                <Avatar className={classes.avatar} src= {product.productCategory.icon} />
                                </Grid>
                                <Grid item xs={9} sm={9} md={9} alignItems="center" justify="center">
                                    <Typography className={classes.productName} style={{textAlign:"center"}}>
                                        {product.productCategory.name}
                                </Typography>
                                </Grid>               
                            </Grid>
                            <Grid container elevation={0} spacing={1} style={{ marginTop: "-10px" }}>
                                <Grid item xs={12} sm={12} md={12} className={classes.root}>
                                    <div display="row" justifyContent="center" m={1} p={1} bgcolor="background.paper" className={classes.root}>
                                        <div className={classes.root}>
                                                <Typography variant="p" className={classes.title} component="p" style={{padding:"0.5em", fontSize:"14px",textAlign:"center"}}>
                                                    Maturity Date<br/>
                                                    <span style={{color:"green"}}>
                                                    <b>{moment(product.maturity).format('LL')} </b>
                                                    </span>
                                                </Typography>
                                        </div>
                                        <div className={classes.root}>
                                            <Typography variant="p" className={classes.title} component="p" style={{padding:"0.5em", fontSize:"14px",textAlign:"center"}}>
                                               Price<br/>
                                                <span style={{color:"green"}}>
                                                <b>{this.currencyFormat(product.amount_on_Bid,prodId)} </b>
                                                </span>
                                            </Typography>
                                        </div>
                                        <div className={classes.gContainer} >
                                        <span className={classes.gItem}>
                                                <Typography variant="span" className={classes.title} style={{ width:"100%"}} component="span" gutterBottom>
                                                Coupon:  <b><span style={{color:"green"}}>{product.couponRate}%</span></b>
                                                </Typography>
                                        </span>
                                        <span className={classes.gItem}>
                                                <Typography variant="span" className={classes.title} style={{ width:"100%"}} component="span" gutterBottom>
                                                Tenor:   <span style={{color:"green"}}><b>{this.getTenorDays(product.maturity)}</b></span>
                                                </Typography>
                                        </span>
                                        </div>
                                    </div>
                                </Grid>                        
                            </Grid>
                        </>
                    )
                    case 8: return (//Security Linked Note Card display
                        <>
                            <Grid container elevation={0} spacing={1}>
                                <Grid item xs={3} sm={3} md={3} container direction="column"  alignItems="flex-start" justify="flex-start" >
                                <Avatar className={classes.avatar} src= {product.productCategory.icon} />
                                </Grid>
                                <Grid item xs={9} sm={9} md={9} alignItems="center" justify="center">
                                    <Typography className={classes.productName} style={{textAlign:"center"}}>
                                        {product.productCategory.name}
                                <br/>
                                    <span className={classes.issuerName} >{product.issuer}</span>
                                </Typography>
                                </Grid>               
                            </Grid>
                            <Grid container elevation={0} spacing={1} style={{ marginTop: "-10px" }}>
                                <Grid item xs={12} sm={12} md={12} className={classes.root}>     
                                    <div display="flex" justifyContent="center" m={1} p={1} bgcolor="background.paper" className={classes.root}>
                                        <div className={classes.root}>
                                        {product.isSpecialNote? 
                                        <Typography variant="p" className={classes.title} component="p" style={{fontSize:"14px", textAlign:"center"}}>
                                                Maturity Date<br/>
                                                <span> <b>{moment(product.maturity).format('LL')} </b></span>
                                            </Typography>
                                            :
                                            <Typography variant="p" className={classes.title} component="p" style={{fontSize:"14px", textAlign:"center"}}>
                                                Tenor<br/>
                                                <span><b>{product.tenor} day(s)</b></span>
                                            </Typography>
                                        }
                                        </div>
                                    </div>
                                    <div display="flex" justifyContent="center" m={1} p={1} bgcolor="background.paper" className={classes.root}>
                                        <div className={classes.root}>
                                            <Typography variant="p" className={classes.title} component="p" style={{fontSize:"14px", textAlign:"center"}}>
                                                Interest Rate<br/>
                                                <b><span style={{color:"green"}}>{product.offer}% p.a</span></b>
                                            </Typography>
                                        </div>
                                    </div>
                
                                    
                                </Grid>                        
                            </Grid>
                        </>
                    )
                    case 9: return (// Promissory Note Card Display
                        <>
                            <Grid container elevation={0} spacing={1}>
                                <Grid item xs={3} sm={3} md={3} container direction="column"  alignItems="flex-start" justify="flex-start" >
                                <Avatar className={classes.avatar} src= {product.productCategory.icon} />
                                </Grid>
                                <Grid item xs={9} sm={9} md={9} alignItems="center" justify="center">
                                    <Typography className={classes.productName} style={{textAlign:"center"}}>
                                        {product.productCategory.name}
                                <br/>
                                    <span className={classes.issuerName} >{product.issuer}</span>
                                </Typography>
                                </Grid>               
                            </Grid>
                            <Grid container elevation={0} spacing={1} style={{ marginTop: "-10px" }}>
                                <Grid item xs={12} sm={12} md={12} className={classes.root}>     
                                    <div display="row" justifyContent="center" m={1} p={1} bgcolor="background.paper" className={classes.root}>
                                        <div className={classes.root}>
                                        
                                        <Typography variant="p" className={classes.title} component="p" style={{fontSize:"14px", textAlign:"center"}}>
                                                Maturity Date<br/>
                                                <span> <b>{moment(product.maturity).format('LL')} </b></span>
                                            </Typography>
                                        </div>
                                        <div className={classes.root}> 
                                            <Typography variant="p" className={classes.title} component="p" style={{fontSize:"14px", textAlign:"center"}}>
                                                Tenor<br/>
                                                <span><b>{this.getTenorDays(product.maturity)}</b></span>
                                            </Typography>
                                        </div>                                       
                                    </div>
                                    <div display="flex" justifyContent="center" m={1} p={1} bgcolor="background.paper" className={classes.root}>
                                        <div className={classes.root}>
                                            <Typography variant="p" className={classes.title} component="p" style={{textAlign:"center", fontSize:"14px"}}>
                                                Interest Rate<br/>
                                                <b><span style={{color:"green"}}>{product.offer}% p.a</span></b>
                                            </Typography>
                                        </div>
                                    </div>
                
                                    
                                </Grid>                        
                            </Grid>
                        </>
                    )
                    default: return (
                        <div className="">
                            ""
                        </div>
                    )
                    }
                })()}

            </CardContent>
        );

    }
}

export default withStyles(styles)(ProductDisplay);