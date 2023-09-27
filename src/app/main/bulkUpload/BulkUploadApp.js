import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
// import { FusePageSimple } from '../../../@fuse';
import { FusePageSimple, FuseAnimateGroup } from '../../../@fuse';
import { TextField, Grid, Button, Typography, IconButton, Icon, Paper } from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import LinearProgress from '@material-ui/core/LinearProgress';
import DeleteIcon from '@material-ui/icons/Delete';
//import TableContainer from '@material-ui/core/TableContainer';
import CustomizedDialogs from './components/CustomizedDialogs';
import TableRow from '@material-ui/core/TableRow';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import withReducer from '../../store/withReducer';
import reducer from './store/reducers';
import * as Actions from './store/actions';
import _ from 'lodash';
import moment from 'moment';
import { textEncryption } from '../../encryption';
import ResultScreen from './components/ResultScreen';

const styles = (theme) => ({
    //
    gridContainer: {
        display: 'grid',
        gridTemplateColumns: 'auto auto auto',
        padding: '5px',
    },
    gridItem: {
        textAlign: 'center',
    },
});

class BulkUploadApp extends Component {
    state = {
        form: {
            selectedFile: null,
            day: '',
            csvContent: null,
            openDialog: false,
        },
        fileHash: null,
        uploadErr: null,
        isLoading: false,
        uploadResult: null,
    };

    calculateSHA256 = async (file) => {
        //console.log('I got hashed');
        const buffer = await file.arrayBuffer();
        const crypto = window.crypto || window.msCrypto; // Browser's crypto API
        const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map((byte) => byte.toString(16).padStart(2, '0')).join('');
        // console.log('I got hashed2 ', hashHex);
        return textEncryption(hashHex);
        //this.setState({ fileHash: hashHex });
    };

    componentDidMount() {}
    componentDidUpdate(props, prevState) {
        if (props.uploadErr !== this.props.uploadErr) {
            this.setState({ uploadErr: this.props.uploadErr });
        }

        if (props.uploadResult !== this.props.uploadResult) {
            this.setState({ uploadResult: this.props.uploadResult });
            this.setState({ form: _.set(this.state.form, 'selectedFile', null) });
            this.setState({ form: _.set(this.state.form, 'day', '') });
        }

        if (props.isLoading !== this.props.isLoading) {
            //
            this.setState({ isLoading: this.props.isLoading });
        }

        if (props.form !== this.props.form) {
            this.setState({ form: _.set(this.state.form, this.props.form) });
        }
    }
    handleChange = (event) => {
        this.setState({ form: _.set(this.state.form, event.target.name, event.target.value) });
    };

    handleRemove = () => {
        this.setState({ form: _.set(this.state.form, 'selectedFile', null) });
    };
    handleFileChange = (event) => {
        //setSelectedFile(event.target.files[0]);
        this.setState({ form: _.set(this.state.form, 'selectedFile', event.target.files[0]) });
    };

    convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    submitUploadedFile = async (form) => {
        const { selectedFile } = form;
        const hashedFIle = await this.calculateSHA256(selectedFile);
        const base64File = await this.convertBase64(selectedFile);
        form.hashedFIle = hashedFIle;
        form.base64File = base64File;
        // console.log('base64File ', base64File);
        // console.log('hashedFile ', hashedFIle);
        // const formData = new FormData();
        // formData.append('date', day);
        // formData.append('file', selectedFile);
        // formData.append('hashedFile', hashedFIle);
        // formData.append('base64String', base64File);
        this.props.uploadFile(form);
    };

    canBeSubmitted() {
        const { selectedFile, day } = this.state.form;
        return selectedFile && day.length > 0;
    }

    render() {
        const { form, isLoading, uploadErr, uploadResult } = this.state;
        const { classes } = this.props;
        {
            console.log('All form = ', form);
        }
        return (
            <React.Fragment>
                <FusePageSimple
                    classes={{
                        contentCardWrapper: 'p-16 sm:p-32 pb-80',
                        leftSidebar: 'w-256 border-0',
                        header: 'min-h-72 h-72 sm:h-136 sm:min-h-136',
                    }}
                    header={
                        <div className="flex flex-1 items-center justify-between p-32">
                            <div className="flex flex-col">
                                <div className="flex items-center mb-16">
                                    <Icon className="text-18" color="action">
                                        view_list
                                    </Icon>
                                    <Typography color="textSecondary">
                                        Bulk Credit Feature
                                    </Typography>

                                    <Icon className="text-16" color="action">
                                        chevron_right
                                    </Icon>
                                    <Typography color="textSecondary">Upload a file</Typography>
                                </div>
                            </div>
                        </div>
                    }
                    content={
                        <>
                            {uploadResult ? (
                                <ResultScreen uploadResult={uploadResult} />
                            ) : (
                                <div className="p-12">
                                    <FuseAnimateGroup
                                        className="flex flex-wrap"
                                        enter={{
                                            animation: 'transition.slideUpBigIn',
                                        }}
                                    >
                                        <div className="widget flex w-full p-12">
                                            <Grid container>
                                                <Grid item xs={12} sm={12} md={12}>
                                                    <Paper
                                                        style={{
                                                            padding: '5em',
                                                            textAlign: 'center',
                                                        }}
                                                    >
                                                        <div className={classes.gridContainer}>
                                                            <div className={classes.gridItem}>
                                                                &nbsp;
                                                            </div>
                                                            <div className={classes.gridItem}>
                                                                <h1>Upload a file</h1>
                                                                <p style={{ color: '#880000' }}>
                                                                    Note: only CSV file is allowed
                                                                </p>
                                                                <br />
                                                            </div>

                                                            <div className={classes.gridItem}>
                                                                &nbsp;
                                                            </div>
                                                            <>
                                                                <div className={classes.gridItem}>
                                                                    &nbsp;
                                                                </div>
                                                                <div
                                                                    style={{
                                                                        fontWeight: 'bold',
                                                                        fontSize: '20px',
                                                                        padding: '0em 5em',
                                                                    }}
                                                                >
                                                                    <div
                                                                        classes={{
                                                                            root: 'p-16 pb-0 sm:p-24 sm:pb-0',
                                                                        }}
                                                                    >
                                                                        {/* <TextField
                                                                        className="mt-8 mb-16"
                                                                        label="Name"
                                                                        id="name"
                                                                        name="name"
                                                                        autoFocus
                                                                        value={form.name}
                                                                        onChange={this.handleChange}
                                                                        variant="outlined"
                                                                        fullWidth
                                                                        required
                                                                    /> */}
                                                                        <div className="mt-8 mb-16">
                                                                            {!form.selectedFile ? (
                                                                                <>
                                                                                    <input
                                                                                        type="file"
                                                                                        accept=".csv"
                                                                                        onChange={
                                                                                            this
                                                                                                .handleFileChange
                                                                                        }
                                                                                        style={{
                                                                                            display:
                                                                                                'none',
                                                                                        }}
                                                                                        id="fileInput"
                                                                                    />
                                                                                    <label htmlFor="fileInput">
                                                                                        <Button
                                                                                            variant="contained"
                                                                                            color="primary"
                                                                                            component="span"
                                                                                            style={{
                                                                                                background:
                                                                                                    '#039BE5',
                                                                                            }}
                                                                                        >
                                                                                            <CloudUploadIcon size="small"></CloudUploadIcon>{' '}
                                                                                            &nbsp;&nbsp;Upload
                                                                                            XLSX
                                                                                        </Button>
                                                                                    </label>
                                                                                </>
                                                                            ) : (
                                                                                <>
                                                                                    <div
                                                                                        component={
                                                                                            Paper
                                                                                        }
                                                                                    >
                                                                                        <Table
                                                                                            className={
                                                                                                classes.table
                                                                                            }
                                                                                            aria-label="simple table"
                                                                                        >
                                                                                            <TableBody>
                                                                                                <TableRow
                                                                                                    style={{
                                                                                                        border: 'none',
                                                                                                    }}
                                                                                                >
                                                                                                    <TableCell
                                                                                                        style={{
                                                                                                            border: 'none',
                                                                                                        }}
                                                                                                    >
                                                                                                        <Button
                                                                                                            color="primary"
                                                                                                            onClick={
                                                                                                                this
                                                                                                                    .handlePreviewClick
                                                                                                            }
                                                                                                            disabled={
                                                                                                                !form.selectedFile
                                                                                                            }
                                                                                                            style={{
                                                                                                                textDecoration:
                                                                                                                    'none',
                                                                                                                color: 'blue',
                                                                                                                textTransform:
                                                                                                                    'capitalize',
                                                                                                            }}
                                                                                                        >
                                                                                                            Preview
                                                                                                        </Button>
                                                                                                    </TableCell>
                                                                                                    <TableCell
                                                                                                        style={{
                                                                                                            border: 'none',
                                                                                                        }}
                                                                                                    >
                                                                                                        <h3>
                                                                                                            {
                                                                                                                form
                                                                                                                    .selectedFile
                                                                                                                    .name
                                                                                                            }{' '}
                                                                                                        </h3>
                                                                                                    </TableCell>
                                                                                                    <TableCell
                                                                                                        align="right"
                                                                                                        style={{
                                                                                                            border: 'none',
                                                                                                        }}
                                                                                                    >
                                                                                                        <IconButton
                                                                                                            aria-label="Delete"
                                                                                                            onClick={() =>
                                                                                                                this.handleRemove()
                                                                                                            }
                                                                                                        >
                                                                                                            <DeleteIcon
                                                                                                                style={{
                                                                                                                    color: 'red',
                                                                                                                }}
                                                                                                            />
                                                                                                        </IconButton>
                                                                                                    </TableCell>
                                                                                                </TableRow>
                                                                                            </TableBody>
                                                                                        </Table>
                                                                                    </div>
                                                                                </>
                                                                            )}
                                                                        </div>
                                                                        <TextField
                                                                            className="mt-8 mb-30"
                                                                            label="Upload Date"
                                                                            id="day"
                                                                            name="day"
                                                                            type="date"
                                                                            InputLabelProps={{
                                                                                shrink: true,
                                                                            }}
                                                                            //value={form.day}
                                                                            value={moment(
                                                                                form.day
                                                                            ).format('YYYY-MM-DD')}
                                                                            onChange={
                                                                                this.handleChange
                                                                            }
                                                                            variant="outlined"
                                                                            fullWidth
                                                                            required
                                                                        />

                                                                        <div className="pt-8"></div>
                                                                    </div>
                                                                    <div>
                                                                        {isLoading ? (
                                                                            <div className="flex flex-1 flex-col items-center justify-center">
                                                                                <Typography
                                                                                    className="text-20 mb-16"
                                                                                    color="textSecondary"
                                                                                >
                                                                                    Loading...
                                                                                </Typography>
                                                                                <LinearProgress
                                                                                    className="w-xs"
                                                                                    color="secondary"
                                                                                />
                                                                            </div>
                                                                        ) : (
                                                                            <Button
                                                                                style={{
                                                                                    maxHeight:
                                                                                        '70px',
                                                                                    minHeight:
                                                                                        '50px',
                                                                                }}
                                                                                size="large"
                                                                                sx={{
                                                                                    height: '75%',
                                                                                    width: 'width:100%',
                                                                                }}
                                                                                variant="contained"
                                                                                color="primary"
                                                                                fullWidth
                                                                                disabled={
                                                                                    !this.canBeSubmitted()
                                                                                }
                                                                                onClick={() =>
                                                                                    this.submitUploadedFile(
                                                                                        form
                                                                                    )
                                                                                }
                                                                            >
                                                                                Send
                                                                            </Button>
                                                                        )}
                                                                        {/* <Button
                                                                        type="submit"
                                                                        disabled={
                                                                            !this.canBeSubmitted()
                                                                        }
                                                                        onClick={() =>
                                                                            this.submitUploadedFile(
                                                                                form
                                                                            )
                                                                        }
                                                                        variant="contained"
                                                                        color="primary"
                                                                        
                                                                    ></Button> */}
                                                                    </div>
                                                                </div>
                                                                <div className={classes.gridItem}>
                                                                    &nbsp;
                                                                </div>
                                                            </>
                                                        </div>
                                                    </Paper>
                                                </Grid>
                                            </Grid>
                                        </div>
                                    </FuseAnimateGroup>
                                </div>
                            )}
                        </>
                    }
                />
                <CustomizedDialogs state={this.state} closeDialog={this.closeDialog} />
            </React.Fragment>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            uploadFile: Actions.uploadFile,
        },
        dispatch
    );
}

function mapStateToProps({ auth, bulkUploadApp }) {
    const { bulkupload } = bulkUploadApp;
    return {
        bulkupload,
        form: bulkupload.form,
        uploadResult: bulkupload.uploadResult,
        uploadErr: bulkupload.uploadErr,
        isLoading: bulkupload.isLoading,
    };
}
export default withReducer(
    'bulkUploadApp',
    reducer
)(
    withStyles(styles, { withTheme: true })(
        withRouter(connect(mapStateToProps, mapDispatchToProps)(BulkUploadApp))
    )
);
