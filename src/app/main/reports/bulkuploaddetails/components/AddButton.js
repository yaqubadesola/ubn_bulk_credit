import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { Button, Tooltip, Typography, TextField } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import * as Actions from '../../store/actions';
import classNames from 'classnames';
import moment from 'moment';
import _ from 'lodash';
import DataService from '../../../../services/dataService/data.service';

const defaultToolbarStyles = (theme) => ({
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    button: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
});

class CustomToolbar extends React.Component {
    state = {
        startDate: this.props.startDate
            ? this.props.startDate
            : moment(new Date()).format('YYYY-MM-DD'),
        endDate: this.props.endDate ? this.props.endDate : moment(new Date()).format('YYYY-MM-DD'),
    };

    handleChange = (event) => {
        if (event.target.name === 'startDate') {
            DataService.setStartDate(event.target.value);
        }

        if (event.target.name === 'endDate') {
            DataService.setEndDate(event.target.value);
        }

        this.setState(_.set({ ...this.state }, event.target.name, event.target.value));
    };

    convertDateToTimesttamp = (inputDate) => {
        const dateArr = inputDate.split('-');
        const newDateInTimestamp = new Date(dateArr[2], dateArr[1] - 1, dateArr[0]);
        return newDateInTimestamp;
    };

    render() {
        const { classes, getBulkUploadDetailsReport, value } = this.props;
        const { startDate, endDate } = this.state;
        console.log('All date props ', this.props);

        return (
            <React.Fragment>
                <Tooltip title={'Date filter'}>
                    <div>
                        <TextField
                            className={classNames(classes.textField, 'mt-8 mb-16')}
                            label="Start Date"
                            id="startDate"
                            name="startDate"
                            type="date"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={startDate}
                            onChange={this.handleChange}
                            variant="outlined"
                            fullWidth
                            required
                        />
                        <TextField
                            className={classNames(classes.textField, 'mt-8 mb-16')}
                            label="End Date"
                            id="endDate"
                            name="endDate"
                            type="date"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={endDate}
                            onChange={this.handleChange}
                            variant="outlined"
                            fullWidth
                            required
                        />

                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            onClick={() =>
                                getBulkUploadDetailsReport({
                                    value: value,
                                    startDate: moment(this.state.startDate)
                                        .startOf('day')
                                        .valueOf(),
                                    endDate: moment(this.state.endDate).startOf('day').valueOf(),
                                    size: this.props.size,
                                    page: 0,
                                })
                            }
                            className={classNames(classes.button, 'mt-8 mb-16')}
                        >
                            Search
                        </Button>
                    </div>
                </Tooltip>
            </React.Fragment>
        );
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            getBulkUploadDetailsReport: Actions.getBulkUploadDetailsReport,
        },
        dispatch
    );
}

function mapStateToProps({ BulkUploadDetailsApp }) {
    return {
        data: BulkUploadDetailsApp.bulkUploadDetails.data,
        startDate: BulkUploadDetailsApp.bulkUploadDetails.startDate,
        endDate: BulkUploadDetailsApp.bulkUploadDetails.endDate,
        size: BulkUploadDetailsApp.bulkUploadDetails.size,
        count: BulkUploadDetailsApp.bulkUploadDetails.count,
        page: BulkUploadDetailsApp.bulkUploadDetails.page,
    };
}

export default withStyles(defaultToolbarStyles, { name: 'CustomToolbar' })(
    withRouter(connect(mapStateToProps, mapDispatchToProps)(CustomToolbar))
);
