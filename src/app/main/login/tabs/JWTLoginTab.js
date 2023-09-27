import React, { useRef, Component } from 'react';
import { Button, Divider, Typography, InputAdornment, Icon, IconButton } from '@material-ui/core';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Replay from '@material-ui/icons/Replay';

import { TextFieldFormsy, FuseAnimate } from '../../../../@fuse';
import Formsy from 'formsy-react';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import connect from 'react-redux/es/connect/connect';
import * as authActions from '../../../auth/store/actions';
import Loader from 'react-loader-spinner';

class JWTLoginTab extends Component {
    state = {
        canSubmit: false,
        loading: false,
        resendOTP: false,
        username: '',
        password: '',
    };

    form = React.createRef();

    disableButton = () => {
        this.setState({ canSubmit: false });
    };

    enableButton = () => {
        this.setState({ canSubmit: true });
    };

    reset = () => {
        this.setState({});
    };

    onSubmit = (model) => {
        if (!this.props.login.hasOtp) {
            this.props.getUserOtp(model);
            this.setState({
                loading: false,
                canSubmit: false,
                username: model.email,
                password: model.password,
            });
        } else {
            this.props.submitLogin(model);
            this.setState({ loading: false, canSubmit: false });
        }
    };

    resendOtp = () => {
        let model = {
            email: this.state.username,
            password: this.state.password,
        };
        this.props.getUserOtp(model);
    };

    componentDidUpdate(prevProps, prevState) {
        if (
            this.props.login.error &&
            (this.props.login.error.email || this.props.login.error.password)
        ) {
            this.form.updateInputsWithError({
                ...this.props.login.error,
            });

            this.props.login.error = null;
            this.disableButton();
        } else if (prevProps.login.error !== this.props.login.error) {
            this.enableButton();
            this.setState({ loading: false });
        }

        return null;
    }

    render() {
        const { canSubmit, loading } = this.state;
        const { hasOtp } = this.props.login;
        return (
            <div className="w-full">
                {this.props.login.success === false && (
                    <FuseAnimate animation="transition.slideUpIn" delay={300}>
                        <Typography
                            component="p"
                            variant="body1"
                            className="mb-6 font-light text-red-dark"
                        >
                            {this.props.login.error.error_description}
                        </Typography>
                    </FuseAnimate>
                )}

                <Formsy
                    onValidSubmit={this.onSubmit}
                    onValid={this.enableButton}
                    onInvalid={this.disableButton}
                    onReset={this.reset}
                    ref={(form) => (this.form = form)}
                    className="flex flex-col justify-center w-full"
                >
                    <TextFieldFormsy
                        className="mb-16"
                        type="text"
                        name="email"
                        label="Email"
                        autoComplete="off"
                        validations={{
                            minLength: 4,
                        }}
                        validationErrors={{
                            minLength: 'Min character length is 4',
                        }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <Icon className="text-20" color="action">
                                        email
                                    </Icon>
                                </InputAdornment>
                            ),
                        }}
                        variant="outlined"
                        required
                    />

                    <TextFieldFormsy
                        className="mb-16"
                        type="password"
                        name="password"
                        label="Password"
                        autoComplete="off"
                        validations={{
                            minLength: 4,
                        }}
                        validationErrors={{
                            minLength: 'Min character length is 4',
                        }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <Icon className="text-20" color="action">
                                        vpn_key
                                    </Icon>
                                </InputAdornment>
                            ),
                        }}
                        variant="outlined"
                        required
                    />

                    {hasOtp ? (
                        <TextFieldFormsy
                            className="mb-16"
                            type="number"
                            name="passcode"
                            label="OTP"
                            autoComplete="off"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <Icon className="text-20" color="action">
                                            text
                                        </Icon>
                                    </InputAdornment>
                                ),
                            }}
                            variant="outlined"
                            required={this.state.resendOTP ? false : true}
                        />
                    ) : null}
                    {hasOtp ? (
                        <Typography variant="caption" color="error" align="right">
                            resend OTP{' '}
                            <Button onClick={this.resendOtp} size="small">
                                {' '}
                                <Replay fontSize="small" color="error" />
                            </Button>
                        </Typography>
                    ) : null}

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className="w-full mx-auto mt-16 normal-case"
                        aria-label="LOG IN"
                        disabled={!canSubmit}
                        value="legacy"
                    >
                        {loading && !canSubmit && (
                            <Loader
                                type="Oval"
                                color="#039be5"
                                height={25}
                                width={25}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    marginRight: '5px',
                                }}
                            />
                        )}
                        Login
                    </Button>
                </Formsy>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            submitLogin: authActions.submitLogin,
            getUserOtp: authActions.getUserOtp,
        },
        dispatch
    );
}

function mapStateToProps({ auth }) {
    // console.log(auth, 'Auth');
    return {
        login: auth.login,
        user: auth.user,
        hasOtp: auth.login.hasOtp
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(JWTLoginTab));
