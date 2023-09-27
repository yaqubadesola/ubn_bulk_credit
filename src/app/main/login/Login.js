import React, { Component } from 'react';
import { motion } from 'framer-motion';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Checkbox from '@material-ui/core/Checkbox';
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { withStyles, Tabs, Tab } from '@material-ui/core';
import { darken } from '@material-ui/core/styles/colorManipulator';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { FuseAnimate } from '../../../@fuse';
import { withRouter } from 'react-router-dom';
import clsx from 'clsx';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import _ from '@lodash';
import JWTLoginTab from './tabs/JWTLoginTab';
// import FirebaseLoginTab from './tabs/FirebaseLoginTab';
import Auth0LoginTab from './tabs/Auth0LoginTab';

const styles = (theme) => ({
    root: {
        background:
            'linear-gradient(to right, ' +
            theme.palette.primary.dark +
            ' 0%, ' +
            darken(theme.palette.primary.dark, 0.5) +
            ' 100%)',
        color: theme.palette.primary.contrastText,
    },
});

class Login extends Component {
    state = {
        tabValue: 0,
    };

    handleTabChange = (event, value) => {
        this.setState({ tabValue: value });
    };

    render() {
        const { classes } = this.props;
        const { tabValue } = this.state;

        return (
            <div
                className={clsx(
                    classes.root,
                    'flex flex-col flex-auto items-center justify-center flex-shrink-0 p-16 md:p-24'
                )}
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex w-full max-w-400 md:max-w-3xl rounded-20 shadow-2xl overflow-hidden"
                >
                    <Card
                        className={clsx(
                            classes.leftSection,
                            'flex flex-col w-full max-w-sm items-center justify-center shadow-0'
                        )}
                        square
                    >
                        <CardContent className="flex flex-col items-center justify-center w-full py-96 max-w-320">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1, transition: { delay: 0.2 } }}
                            >
                                <div className="items-center mb-48">
                                    <FuseAnimate animation="transition.expandIn">
                                        <img
                                            className="w-128 mb-32"
                                            src="assets/images/logos/m36.black.png"
                                            alt="logo"
                                        />
                                    </FuseAnimate>
                                    <FuseAnimate animation="transition.expandIn">
                                        <div>
                                            <Typography
                                                className="text-16 tracking-widest font-700"
                                                color="textSecondary"
                                            >
                                                ADMIN LOGIN
                                            </Typography>
                                        </div>
                                    </FuseAnimate>
                                </div>
                            </motion.div>
                            {tabValue === 0 && <JWTLoginTab />}
                        </CardContent>

                        <div className="flex flex-col items-center justify-center pb-32">
                            &nbsp;
                        </div>
                    </Card>

                    <div
                        className={clsx(
                            classes.rightSection,
                            'hidden md:flex flex-1 items-center justify-center p-64'
                        )}
                    >
                        <div className="max-w-320">
                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
                            >
                                <Typography
                                    variant="h4"
                                    color="inherit"
                                    className="font-semibold leading-tight"
                                >
                                    M36 BACK OFFICE
                                </Typography>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1, transition: { delay: 0.3 } }}
                            >
                                <Typography variant="subtitle1" color="inherit" className="mt-32">
                                    This is used for bulk credit feature, bulk funding, customer's
                                    KYC upgrade, etc.
                                </Typography>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </div>
        );
    }
}

export default withStyles(styles, { withTheme: true })(withRouter(Login));
