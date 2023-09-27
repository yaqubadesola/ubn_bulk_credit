import React, { Component, lazy, Suspense } from 'react';
//import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Grid, Icon, Typography, Stepper, Step, StepLabel } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import { renderText } from './common/DisplayComponent';
//import { orange } from '@material-ui/core/colors';
import { FusePageSimple, FuseAnimateGroup } from '../../../@fuse';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import withReducer from '../../store/withReducer';
import reducer from './store/reducers';
import * as Actions from './store/actions';
import _ from 'lodash';
import { myStyles } from './common/styles';
import Step1 from './Steps/Step1';
import Step2 from './Steps/Step2';
import Step3 from './Steps/Step3';
import Step4 from './Steps/Step4';
import Step5 from './Steps/Step5';
import Step6 from './Steps/Step6';
import Step7 from './Steps/Step7';
const styles = (theme) => ({
    content: {
        '& canvas': {
            maxHeight: '100%',
        },
    },
    selectedProject: {
        background: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        borderRadius: '8px 0 0 0',
    },
    projectMenuButton: {
        background: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        borderRadius: '0 8px 0 0',
        marginLeft: 1,
    },
    linkStyle: {
        minWidth: '100%',
    },
});

class NewInvestment extends Component {
    state = {
        form: this.props.form,
        data: [],
        otpDetail: this.props.otpDetail,
        walletDetail: this.props.walletDetail,
        makerData: null,
        errors: {},
        steps: [{ label: 'Select Month' }, { label: 'Upload File' }, { label: 'Finish' }],
        address: '',
        kycLevel: 0,
        kycLevelOptions: [
            { id: 0, name: 'Months' },
            { id: 1, name: 'January' },
            { id: 2, name: 'February' },
            { id: 3, name: 'March' },
            { id: 4, name: 'April' },
            { id: 5, name: 'May' },
            { id: 6, name: 'June' },
            { id: 7, name: 'July' },
            { id: 8, name: 'August' },
            { id: 9, name: 'September' },
            { id: 10, name: 'October' },
            { id: 11, name: 'November' },
            { id: 12, name: 'December' },
        ],
        singleProduct: {
            faceValue: '',
            adjusted: false,
            selectedFile1: null,
            selectedFile2: null,
            product: {},
        },
        allUploadedFiles: {},
        stepCount: 0,
        branches: [],
        branchCode: '',
        stepSaveFlag: true,
        bvnVerified: false,
        editRate: false,
        loading: false,
        walletLoading: false,
        fileUploadedUrls: null,
    };

    componentDidUpdate(props, prevState) {
        if (props.makerData !== this.props.makerData) {
            this.setState({ makerData: this.props.makerData });
        }

        if (props.otpDetail !== this.props.otpDetail) {
            this.setState({ otpDetail: this.props.otpDetail });
        }

        if (props.walletDetail !== this.props.walletDetail) {
            this.setState({ walletDetail: this.props.walletDetail });
        }

        if (props.loading !== this.props.loading) {
            //
            this.setState({ loading: this.props.loading });
        }

        if (props.walletLoading !== this.props.walletLoading) {
            //
            this.setState({ walletLoading: this.props.walletLoading });
        }
        if (props.branches !== this.props.branches) {
            //
            this.setState({ branches: this.props.branches });
        }

        if (props.branchCode !== this.props.branchCode) {
            //
            this.setState({ branchCode: this.props.branchCode });
        }
        if (props.fileUploadedUrls !== this.props.fileUploadedUrls) {
            this.setState({ fileUploadedUrls: this.props.fileUploadedUrls });
            this.props.newinvestment.branchCode =
                this.state.branchCode !== '' ? this.state.branchCode : '';
            this.props.sendMakerEntry(this.props.newinvestment, this.props.user);
        }

        if (props.stepCount !== this.props.stepCount) {
            this.setState({ stepCount: this.props.stepCount });
        }

        if (props.form !== this.props.form) {
            this.setState({ bvnVerified: true });
            this.setState({ form: _.set(this.state.form, 'bvn', this.props.form.bvn) });
            this.setState({ form: _.set(this.state.form, 'userUuid', this.props.form.userUuid) });
            this.setState({
                singleProduct: _.set(this.state.singleProduct, 'userUid', this.props.form.userUuid),
            });
            this.setState({ form: _.set(this.state.form, 'firstName', this.props.form.firstName) });
            this.setState({ form: _.set(this.state.form, 'lastName', this.props.form.lastName) });
            this.setState({ form: _.set(this.state.form, 'walletId', this.props.form.walletId) });
            this.setState({
                form: _.set(this.state.form, 'phoneNumber', this.props.form.phoneNumber),
            });
            this.setState({
                form: _.set(this.state.form, 'm36KycLevel', this.props.form.m36KycLevel),
            });
            this.setState({ form: _.set(this.state.form, 'email', this.props.form.email) });
            this.setState({ form: _.set(this.state.form, 'MockData', this.props.form.MockData) });
        }
    }

    render() {
        const { classes, user } = this.props;
        const { role } = user;

        // const enableNext = (amount, file) => {
        //   return amount >= 50000 && file? false : true;
        // }
        const enableNext = (activeState) => {
            const { product, faceValue } = activeState.singleProduct;
            const { allUploadedFiles } = activeState;
            const { editRate } = activeState;
            const { thresholdDown } = product.productCategory;
            if (Object.keys(allUploadedFiles).length > 0 && faceValue >= thresholdDown) {
                return false;
            }

            // if(!editRate && Object.keys(allUploadedFiles).length >   && faceValue >= thresholdDown){
            //   return false
            // }

            return true;
        };

        //Product Confirmation method
        const productConfirmation = (data) => {
            //
            const { allUploadedFiles, editRate, singleProduct } = data;

            if (editRate) {
                const exc_approval_flag = Object.keys(allUploadedFiles).find(
                    (item) => item === 'Exceptional_Approval_Doc'
                );
                const cust_instructn_flag = Object.keys(allUploadedFiles).find(
                    (item) => item === 'Customer_Instruction'
                );

                if (!cust_instructn_flag) {
                    alert('Please Upload Customer Instruction');
                    return false;
                }

                if (!exc_approval_flag) {
                    alert('Please Upload Exceptional Approval Document');
                    return false;
                }
            } else {
                //
                const cust_instructn_flag = Object.keys(allUploadedFiles).find(
                    (item) => item === 'Customer_Instruction'
                );
                const bvn_verifcation_flag = Object.keys(allUploadedFiles).find(
                    (item) => item === 'BVN_Verification'
                );
                if (!cust_instructn_flag) {
                    alert('Please Upload Customer Instruction');
                    return false;
                }

                if (!bvn_verifcation_flag) {
                    alert('Please Upload Customer BVN Verification');
                    return false;
                }
            }
            this.props.getProductConfirmation(singleProduct);
        };

        const handleRouteAllInvestment = () => {
            this.props.history.push('/branch/teller/view/allinvestment');
        };
        const handleRouteNewInvestment = () => {
            window.location.reload(false);
            //this.props.history.push('/apps/branch-teller/new-investment');
        };
        //Saving to makerentry endpoint
        const handleMakerEntry = async (data) => {
            //
            this.setState({ loading: true });
            // const {selectedFile1, selectedFile2} = data.allUploadedFiles
            // const customerFile = selectedFile1 !== null ? selectedFile1.base64String : null
            // const approvalFile = selectedFile2 !== null ? selectedFile2.base64String : null
            this.props.getUploadedFilesUrl({ ...data.allUploadedFiles });
        };

        //getting BVN detail
        const handleBvnSubmit = (bvn) => {
            this.props.getBvnOTP(bvn);
        };

        const verifyOTPBvn = ({ bvn, otp }) => {
            const { otp1, otp2, otp3, otp4, otp5, otp6 } = otp;
            let otpValue = otp1 + otp2 + otp3 + otp4 + otp5 + otp6;
            this.props.getBvnDetail({ bvn, otp: parseInt(otpValue) });
        };

        //Creating New M36 User
        const createM36User = (data) => {
            this.props.createNewM36User(data);
        };

        //getting walletbalance
        const getWalletBal = (uuid) => {
            this.props.getWalletBalance(uuid);
        };
        //getting amount to be debited
        const amountToBeDebited = (data) => {
            const { singleProduct, makerData } = data;
            if (data) {
                if (singleProduct.product.productCategory.id == 4) {
                    if (makerData && makerData != '') {
                        return makerData.amountInvested + makerData.custodyFee;
                    } else {
                        return '';
                    }
                } else if (
                    singleProduct.product.productCategory.id == 3 ||
                    singleProduct.product.productCategory.id == 8
                ) {
                    if (makerData && makerData != '') {
                        return makerData.amountInvested;
                    } else {
                        return '';
                    }
                } else {
                    if (makerData && makerData != '') {
                        return makerData.amountInvested + makerData.custodyFee + makerData.vat;
                    } else {
                        return '';
                    }
                }
            }
        };

        //Convert Image to Base64
        const convertBase64 = (file) => {
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

        //Removing Uploaded File
        const handleRemove = (filename) => {
            let newObj = this.state.allUploadedFiles;
            delete newObj[filename];
            this.setState({ allUploadedFiles: newObj });
        };

        //Handling a File upload
        const handleFileUpload = async ({ target }) => {
            if (target.name === '') {
                alert("Please pick a document's type");
                return false;
            }
            const { allUploadedFiles } = this.state;
            allUploadedFiles[target.name] = target.files[0];
            allUploadedFiles[target.name]['base64String'] = await convertBase64(target.files[0]);
            this.setState({ allUploadedFiles });
        };

        //Buying of a product
        const buyProduct = (product) => {
            this.setState({ stepCount: 2 });
            this.setState({ singleProduct: _.set(this.state.singleProduct, 'product', product) });
            this.setState({ stepCount: this.state.stepCount + 1 });
        };

        //Handling onchange of input values
        const handleOnChange = ({ target }) => {
            const { form, singleProduct, errors, editRate } = this.state;
            const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            let thresholdDown = '';
            let threshholdDownFormat;
            if (target.name === 'faceValue') {
                thresholdDown = singleProduct.product.productCategory.thresholdDown;
                threshholdDownFormat = thresholdDown.toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'NGN',
                });
            }

            if(target.name === "kycLevel"){
                this.setState({ ...this.state, "kycLevel": target.value });
                this.setState({ form: _.set(this.state.form, 'm36KycLevel', target.value)});    
                }

            if (target.name === 'branchCode') {
                this.setState({ branchCode: target.value });
                // threshholdDownFormat = thresholdDown.toLocaleString('en-US', { style: 'currency', currency: 'NGN' });
            }

            if (target.name === 'editRate') {
                this.setState({ ...this.state, editRate: target.checked });
                singleProduct['adjusted'] = target.checked;
                this.setState({ singleProduct });
            }

            if (target.name === 'offer' || target.name === 'yieldRate') {
                singleProduct.product[target.name] = target.value;
            }
            //Handling errors
            if (target.name === 'bvn' && target.value.length !== 11) {
                errors[target.name] = `Note! ${target.name} should be 11 digits`;
            } else if (
                (target.name === 'checkerEmail' || target.name === 'email') &&
                !target.value.match(mailformat)
            ) {
                errors[target.name] = `Note! ${target.name} must be valid email address`;
            } else if (
                target.name === 'faceValue' &&
                (target.value < thresholdDown || target.value === '')
            ) {
                errors[target.name] = `Minimum of ${threshholdDownFormat} is required`;
            } else {
                errors[target.name] = '';
            }

            if (target.name === 'faceValue') {
                singleProduct[target.name] = target.value;
                this.setState({ singleProduct });
                // }else if(target.name === "kycLevel"){
                //   this.setState({ ...this.state, "kycLevel": target.value });
                // }else if(target.name === "address"){
                //   this.setState({ ...this.state, "address": target.value });
            } else {
                form[target.name] = target.value;

                this.setState({ form, errors });
            }

            //Enabling/Disabling next button when form is not filled

            if (
                this.state.stepCount === 0 &&
                this.state.form.bvn !== '' &&
                errors[target.name] === ''
            ) {
                this.setState({ stepSaveFlag: false });
            } else {
                this.setState({ stepSaveFlag: true });
            }
        };

        // const handleKycChange = (event) => {
        //     const { name, value } = event.target;
        //     //const val = value? true : false
        //     this.setState(_.set(this.state.form, "docRequired", value));
        //     console.log(this.state.form, 'Form Change');
        // };
        //Handling next step
        const handleNextStep = () => {
            let { stepCount } = this.state;
            stepCount = stepCount + 1;
            this.setState({ stepCount });
        };

        //Hadnling bac step
        const handleBackStep = () => {
            let { stepCount } = this.state;
            stepCount = stepCount - 1;
            this.setState({ stepCount });
        };

        //Getting Step Count
        const getStepContent = (step) => {
            switch (step) {
                case 0:
                    return (
                        <Step1
                            state={this.state}
                            handleChange={handleOnChange}
                            handleNext={handleNextStep}
                            handleBvn={handleBvnSubmit}
                        />
                    );
                case 1:
                    return (
                        <Step2
                            state={this.state}
                            handleChange={handleOnChange}
                            handleNext={handleNextStep}
                            verifyOTPBvn={verifyOTPBvn}
                            handlePrev={handleBackStep}
                            handleBvnSubmit={handleBvnSubmit}
                        />
                    );
                case 2:
                    return (
                        <Step3
                            state={this.state}
                            handleChange={handleOnChange}
                            handleNext={handleNextStep}
                            createM36User={createM36User}
                            handlePrev={handleBackStep}
                        />
                    );
                case 3:
                    return (
                        <Step4
                            buyProduct={buyProduct}
                            state={this.state}
                            getWalletBal={getWalletBal}
                            handleChange={handleOnChange}
                            handleNext={handleNextStep}
                            handlePrev={handleBackStep}
                        />
                    );
                case 4:
                    return (
                        <Step5
                            state={this.state}
                            enableNext={enableNext}
                            getWalletBal={getWalletBal}
                            handleRemove={handleRemove}
                            handleFileUpload={handleFileUpload}
                            productConfirmation={productConfirmation}
                            handleChange={handleOnChange}
                            handleNext={handleNextStep}
                            handlePrev={handleBackStep}
                        />
                    );
                case 5:
                    return (
                        <Step6
                            state={this.state}
                            handleChange={handleOnChange}
                            getWalletBal={getWalletBal}
                            handleMakerEntry={handleMakerEntry}
                            amountToBeDebited={amountToBeDebited}
                            handlePrev={handleBackStep}
                        />
                    );
                case 6:
                    return (
                        <Step7
                            state={this.state}
                            handleChange={handleOnChange}
                            handleRouteNewTransaction={handleRouteNewInvestment}
                            handleRouteViewTransactions={handleRouteAllInvestment}
                        />
                    );
                default:
                    return <h1>No component to display</h1>;
            }
        };
        if (role.id == 30 || role.id == 31 || role.id == 34 || role.id == 1) {
            return (
                <FusePageSimple
                    classes={{
                        header: 'min-h-160 h-160',
                        toolbar: 'min-h-48 h-48',
                        rightSidebar: 'w-288',
                        content: classes.content,
                    }}
                    header={
                        <div className="flex flex-1 items-center justify-between p-24">
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
                                    <Typography color="textSecondary">Upload</Typography>
                                </div>
                            </div>
                        </div>
                    }
                    content={
                        <div className="p-12">
                            <FuseAnimateGroup
                                className="flex flex-wrap"
                                enter={{
                                    animation: 'transition.slideUpBigIn',
                                }}
                            >
                                <div className="widget flex w-full p-12">
                                    <Grid container className={myStyles.formContainer}>
                                        <Grid item xs={12} sm={12} md={12}>
                                            <form
                                                onSubmit={this.handleSubmit}
                                                className={myStyles.form}
                                            >
                                                <Grid pt={2}>
                                                    {renderText({
                                                        type: 'h6',
                                                        color: 'primary',
                                                        label: '',
                                                        align: 'center',
                                                    })}
                                                </Grid>
                                                <Stepper
                                                    activeStep={this.state.stepCount}
                                                    alternativeLabel={true}
                                                >
                                                    {this.state.steps.map((item) => (
                                                        <Step key={item.label}>
                                                            <StepLabel>{item.label}</StepLabel>
                                                        </Step>
                                                    ))}
                                                </Stepper>
                                                {getStepContent(this.state.stepCount)}
                                            </form>
                                        </Grid>
                                    </Grid>
                                </div>
                            </FuseAnimateGroup>
                        </div>
                    }
                    onRef={(instance) => {
                        this.pageLayout = instance;
                    }}
                />
            );
        } else {
            return '';
        }
    }
}

const mapStateToProps = ({ newInvestmentApp, auth }) => {
    //console.log("Investment App ", newInvestmentApp);
    const { newinvestment } = newInvestmentApp;
    return {
        newinvestment,
        form: newinvestment.form,
        otpDetail: newinvestment.otpDetail,
        walletDetail: newinvestment.walletDetail,
        loading: newinvestment.loading,
        walletLoading: newinvestment.walletLoading,
        stepCount: newinvestment.stepCount,
        makerData: newinvestment.makerData,
        fileUploadedUrls: newinvestment.fileUploadedUrls,
        user: auth.user.data,
        rights: auth.rights.right.rights,
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(
        {
            saveAdmin: Actions.saveAdmin,
            getRoles: Actions.getRoles,
            getAdminByEmail: Actions.getAdminByEmail,
            getBvnDetail: Actions.getBvnDetail,
            getWalletBalance: Actions.getWalletBalance,
            createNewM36User: Actions.createNewM36User,
            getUploadedFilesUrl: Actions.getUploadedFilesUrl,
            sendMakerEntry: Actions.createPendingProductMakerEntry,
            resetState: Actions.resetStateData,
            getProductConfirmation: Actions.getProductConfirmation,
            getBvnOTP: Actions.getBvnOTP,
            getDepartments: Actions.getDepartments,
        },
        dispatch
    );
};

export default withReducer(
    'newInvestmentApp',
    reducer
)(
    withStyles(styles, { withTheme: true })(
        withRouter(connect(mapStateToProps, mapDispatchToProps)(NewInvestment))
    )
);
