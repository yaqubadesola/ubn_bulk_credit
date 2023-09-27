import React,{Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux';
import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import withReducer from '../../../store/withReducer';
import * as Actions from './store/actions'
import reducer from './store/reducers';

const styles = (theme) =>  ({
  icon: {
    marginRight: theme.spacing.unit * 2,
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: "10em",
  },
  heroButtons: {
    padding: "5em",
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

});


class BranchTeller extends Component {

render(){
    const {classes, user} = this.props;
    const userRec = user.user.data
    const userRole =  user.user.data.role;

    return (
        <React.Fragment>
          <CssBaseline />
         
          <main>
            {/* Hero unit */}
            <div className={classes.heroContent}>
              <div maxWidth="sm">
                <Typography component="h3" variant="h3" align="center" color="textPrimary" gutterBottom>
                  {`Welcome ${userRec.firstName} ${userRec.lastName}`}
                </Typography>
                {userRole.id == 30 || userRole.id == 31 || userRole.id == 34?
                <Typography variant="h5" align="center" color="textSecondary" paragraph>
                    This platform will enable you {userRole.id == 34 ? "Onboard Customer,":""} Book investments, Liquidate investments and Upgrade KYC for customers on M36 platform for both existing and new users.
                </Typography>
                :
                <Typography variant="h5" align="center" color="textSecondary" paragraph>
                    This platform will enable you approve buying of investments, approve investments liquidation and reject both investments respectively.
                </Typography>
                }
                <div className={classes.heroButtons}>
                {userRole.id == 33 ||userRole.id == 32 ?
                  <div className={classes.gridContainer} style={{textAlign:"center"}}>
                    <div className={classes.gridColumn} style={{textAlign:"center"}}>
                      <Button variant="contained" color="primary" 
                      onClick={(ev, dispatch) =>{
                                ev.stopPropagation(); 
                                this.props.history.push('/branch/teller/view/allinvestment');
                                }}  
                        >
                       Manage All Investments here
                      </Button>
                    </div>
                  </div>
                  :
                  userRole.id == 34 ?
                  <>
                    <Grid container spacing={2} justifyContent="center" justify="space-between" alignItems='center' style={{marginBottom:"5em"}}>
                      <Grid item xs={12} sm={6}>
                        <Button variant="contained" color="primary"
                        onClick={(ev, dispatch) =>{
                                  ev.stopPropagation(); 
                                  this.props.history.push('/apps/branchTeller/registerCustomer');
                                  }}  
                          >
                        Onboard Customer
                        </Button>
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <Button variant="contained" color="primary"
                        onClick={(ev, dispatch) =>{
                                  ev.stopPropagation(); 
                                  this.props.history.push('/apps/branchTeller/newInvestment');
                                  }}  
                          >
                        Book Investment
                        </Button>
                      </Grid>                  
                    </Grid>
                    <Grid container spacing={2} justifyContent="center" justify="space-between" alignItems='center' style={{marginBottom:"5em"}}>
                      <Grid item xs={12} sm={6}>
                      <Button variant="contained" color="primary"
                      onClick={(ev, dispatch) =>{
                                ev.stopPropagation(); 
                                this.props.history.push('/apps/branchTeller/liquidation');
                                }}  
                        >
                        Liquidate Investment
                      </Button>
                    </Grid>
                      <Grid item xs={12} sm={6}>
                      <Button variant="contained" color="primary"
                      onClick={(ev, dispatch) =>{
                                ev.stopPropagation(); 
                                this.props.history.push('/branch/teller/kyc_ugrade');
                                }}  
                        >
                        Upgrade KYC
                      </Button>
                    </Grid>
                  
                    </Grid>
                 </>
                  :
                  <Grid container spacing={2} justifyContent="center" justify="space-between" alignItems='center'>
                  <Grid item>
                    <Button variant="contained" color="primary"
                    onClick={(ev, dispatch) =>{
                              ev.stopPropagation(); 
                              this.props.history.push('/apps/branchTeller/newInvestment');
                              }}  
                      >
                     Book New Investment
                    </Button>
                  </Grid>

                  <Grid item>
                    <Button variant="contained" color="primary"
                    onClick={(ev, dispatch) =>{
                              ev.stopPropagation(); 
                              this.props.history.push('/apps/branchTeller/liquidation');
                              }}  
                      >
                      Liquidate Investment
                    </Button>
                  </Grid>

                  <Grid item>
                    <Button variant="contained" color="primary"
                    onClick={(ev, dispatch) =>{
                              ev.stopPropagation(); 
                              this.props.history.push('/branch/teller/kyc_ugrade');
                              }}  
                      >
                      Upgrade KYC
                    </Button>
                  </Grid>
               
                </Grid>

                }
                </div>
              </div>
            </div>
          </main>
          
        </React.Fragment>
      );
}
  
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getWidgets: Actions.getWidgets
    }, dispatch);
}
function mapStateToProps({ analyticsDashboardApp, auth }) {
    const {rights} = auth
    return {
        widgets: analyticsDashboardApp.widgets.data,
        user: auth,
        rights: rights.right.role,
    }
}
//export default withReducer('analyticsDashboardApp', reducer)(withRouter(connect(mapStateToProps, mapDispatchToProps)(BranchTeller)));
export default withReducer(
    'analyticsDashboardApp',
    reducer
  )(
    withStyles(styles, { withTheme: true })(withRouter(
        connect(mapStateToProps, mapDispatchToProps)(BranchTeller)
    )
  ));
  