import React, { Component } from 'react';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import { bindActionCreators } from 'redux';
import reducer from '../../../store/reducers';
import {
    Icon,
    Button,
    IconButton,
    TextField,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Grid,
    Paper,
    Typography,
} from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { unstable_Box as Box } from '@material-ui/core/Box';
import _ from 'lodash';
const styles = (theme) => ({
    customizedButton: {
        position: 'absolute',
        left: '95%',
        top: '-9%',
        backgroundColor: 'lightgray',
        color: 'gray',
    },
    table: {
        minWidth: 0,
        display: 'block',
    },
});

class ResultScreen extends Component {
    // componentDidMount(){
    //     this.setState({ form: this.props.form })
    // }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.composeDialog != this.props.composeDialog) {
            this.setState({ composeDialog: this.props.composeDialog });
        }
        if (prevProps.newMakerObj != this.props.newMakerObj) {
            this.setState({ newMakerObj: this.props.newMakerObj });
        }
    }

    // handleRoute = () => {
    //     if(this.state.composeDialog === false) {
    //         console.log("I got here");
    //         this.props.history.push('/branch/teller/view/allinvestment')
    //     };
    // };

    render() {
        const { classes, uploadResult } = this.props;

        const handleRouteNewInvestment = () => {
            window.location.reload(false);
            //this.props.history.push('/apps/branch-teller/new-investment');
        };

        return (
            <div className="p-24">
                <Grid
                    container
                    component={Box}
                    justifyContent="center"
                    alignItems="center"
                    style={{ marginTop: '-10px', marginBottom: '45px' }}
                    mt={2}
                    p={2}
                >
                    {/* <Box  display="flex" width={500} justifyContent="center" m="auto" height={80} style={{margin: "10px", padding:"2em", textAlign: "center"}}>
                                    <CheckCircleIcon style={{color:"#03E550",fontSize: "50px"}} ></CheckCircleIcon>
                                </Box>     */}
                    {/* <Box  display="flex" width={500} justifyContent="center" m="auto"   mb={10} height={100} style={{margin: "10px", padding:"2em",  textAlign: "center"}}> */}
                    <div component={Paper}>
                        <Table className={classes.table} aria-label="simple table">
                            <TableHead>
                                <TableRow style={{ borderBottom: '0px' }}>
                                    <TableCell
                                        component="th"
                                        scope="row"
                                        style={{
                                            borderBottom: '0px',
                                            fontSize: '15px',
                                            textAlign: 'center',
                                        }}
                                    >
                                        <Typography variant="h5" color="primary">
                                            <b>File Successfully Uploaded</b>
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow
                                    style={{
                                        borderBottom: '0px',
                                        padding: '5em 2em',
                                        margin: '5em 2em',
                                        textAlign: 'center',
                                    }}
                                >
                                    <TableCell
                                        style={{ borderBottom: '0px', textAlign: 'center' }}
                                        component="th"
                                        scope="row"
                                        align="center"
                                        colspan={2}
                                    >
                                        <Typography variant="h6" color="initial">
                                            <span
                                                style={{
                                                    margin: '10px 2px',
                                                    padding: '5em 3em',
                                                    textAlign: 'center',
                                                }}
                                            >
                                                <CheckCircleIcon
                                                    style={{
                                                        color: '#03E550',
                                                        fontSize: '100px',
                                                    }}
                                                ></CheckCircleIcon>
                                            </span>
                                            <br />
                                            Upload Results
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                                <TableRow style={{ borderBottom: '0px' }}>
                                    <TableCell
                                        style={{
                                            borderBottom: '0px',
                                            padding: '3em 0em',
                                            textAlign: 'center',
                                        }}
                                        component="th"
                                        scope="row"
                                        colspan={2}
                                    >
                                        <Typography variant="h6" color="initial">
                                            <span
                                                style={{
                                                    fontSize: '14px',
                                                    margin: '2em 0em',
                                                    padding: '2em 0em',
                                                    textAlign: 'center',
                                                }}
                                            >
                                                No of records :{' '}
                                                <b>{uploadResult.totalNumbers - 1}</b>
                                            </span>
                                            <br />
                                            <span
                                                style={{
                                                    fontSize: '14px',
                                                    margin: '2em 0em',
                                                    padding: '2em 0em',
                                                    textAlign: 'center',
                                                }}
                                            >
                                                Successful records :{' '}
                                                <b>{uploadResult.successNumbers}</b>
                                            </span>
                                            <br />
                                            <span
                                                style={{
                                                    fontSize: '14px',
                                                    margin: '2em 0em',
                                                    padding: '2em 0em',
                                                    textAlign: 'center',
                                                }}
                                            >
                                                Failed records : <b>{uploadResult.failedNumbers}</b>
                                            </span>
                                            <br />
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={() => handleRouteNewInvestment()}
                                            >
                                                Upload New File
                                            </Button>
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>
                </Grid>
            </div>
        );
    }
}

export default withStyles(styles)(ResultScreen);
