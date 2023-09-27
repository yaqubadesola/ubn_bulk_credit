import React, { Component } from 'react';
import {
    TextField,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    Icon,
    IconButton,
    Typography,
    Toolbar,
    AppBar,
} from '@material-ui/core';
import { bindActionCreators } from 'redux';
import * as Actions from '../store/actions';
import { connect } from 'react-redux';
import _ from 'lodash';

class AdminStatusChangeDialog extends Component {
    state = {
        composeDialog: false,
        reason: '',
    };

    static getDerivedStateFromProps(props, state) {
        if (props.composeDialog !== state.composeDialog) {
            return {
                form: props.composeDialog,
            };
        }
        return null;
    }
    handleSubmit = () => {
        const { toggelComposeDialog } = this.props;
        let { maker, admin, statusUpdateData } = this.props;
        let intent = admin.enable ? 'Deactivate' : 'Activate';
        let data = Object.assign(admin, statusUpdateData);
        
        this.props.updateAdminStatus(data, maker, this.state.reason, intent);
        toggelComposeDialog();
    };

    handleCloseEnableProductDialog = () => {
        this.setState({ composeDialog: false });
    };

    canBeSubmitted() {
        const { reason } = this.state;
        return reason !== '';
    }

    handleChange = (event) => {
        this.setState({ reason: event.target.value });
    };

    render() {
        const { composeStatusDialog, toggelComposeDialog } = this.props;
        const { reason } = this.state;
        return (
            <div className="p-24">
                <Dialog
                    open={composeStatusDialog}
                    onClose={toggelComposeDialog}
                    aria-labelledby="form-dialog-title"
                >
                    <AppBar position="static">
                        <Toolbar className="flex w-full">
                            <Typography variant="subtitle1" color="inherit">
                                Change Availability
                            </Typography>
                        </Toolbar>
                    </AppBar>

                    <DialogContent classes={{ root: 'p-16 pb-0 sm:p-24 sm:pb-0' }}>
                        <TextField
                            className="mt-8 mb-16"
                            label="Reason"
                            id="reason"
                            name="reason"
                            value={reason}
                            onChange={this.handleChange}
                            variant="outlined"
                            fullWidth
                            multiline
                            rows={5}
                            required
                        />

                        <div className="pt-8"></div>
                    </DialogContent>

                    <DialogActions className="justify-between pl-8 sm:pl-16">
                        <div>
                            <Button
                                type="submit"
                                disabled={!this.canBeSubmitted()}
                                variant="contained"
                                color="primary"
                                onClick={() => this.handleSubmit()}
                            >
                                Change Availability
                            </Button>
                        </div>
                        <IconButton onClick={() => this.toggelComposeDialog}>
                            <Icon>close</Icon>
                        </IconButton>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            updateAdminStatus: Actions.updateAdmin,
        },
        dispatch
    );
}

function mapStateToProps({ auth }) {
    return {
        maker: auth.user.data,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminStatusChangeDialog);
