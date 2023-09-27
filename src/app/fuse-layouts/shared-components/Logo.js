import React from 'react';
import { Typography, withStyles } from '@material-ui/core';
import classNames from 'classnames';
import connect from 'react-redux/es/connect/connect';

const styles = (theme) => ({
    root: {
        '& .logo-icon': {
            width: 24,
            height: 24,
            transition: theme.transitions.create(['width', 'height'], {
                duration: theme.transitions.duration.shortest,
                easing: theme.transitions.easing.easeInOut,
            }),
        },
    },
    reactBadge: {
        backgroundColor: 'rgba(0,0,0,0.6)',
        color: theme.palette.secondary.light, //'#61dafb'
    },
    reactText: {
        color: theme.palette.secondary.light, //#FCED00
    },
});

function Logo({ user, classes }) {
    console.log('M36 User', user);
    return (
        <div className={classNames(classes.root, 'flex items-center')}>
            <img className="logo-icon" src="assets/images/logos/m36.svg" alt="logo" />
            <Typography className="text-16 ml-12 font-light logo-text">M36</Typography>
            <div
                className={classNames(
                    classes.reactBadge,
                    'react-badge flex items-center ml-12 mr-8 py-4 px-8 rounded'
                )}
            >
                {/* <img
                    className="react-logo"
                    src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xMS41IC0xMC4yMzE3NCAyMyAyMC40NjM0OCI+CiAgPHRpdGxlPlJlYWN0IExvZ288L3RpdGxlPgogIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIyLjA1IiBmaWxsPSIjNjFkYWZiIi8+CiAgPGcgc3Ryb2tlPSIjNjFkYWZiIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIi8+CiAgICA8ZWxsaXBzZSByeD0iMTEiIHJ5PSI0LjIiIHRyYW5zZm9ybT0icm90YXRlKDYwKSIvPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIiB0cmFuc2Zvcm09InJvdGF0ZSgxMjApIi8+CiAgPC9nPgo8L3N2Zz4K"
                    alt="react"
                    width="16"
                /> */}
                <span className="react-text text-12 ml-4" style={{ color: '#FCED00' }}>
                    ADMIN
                </span>
            </div>
        </div>
    );
}

//export default withStyles(styles, {withTheme: true})(Logo);
function mapStateToProps({ fuse, auth }) {
    return {
        // user: auth.user,
        user: JSON.parse(localStorage.getItem('data')),
    };
}

export default withStyles(styles, { withTheme: true })(connect(mapStateToProps)(Logo));
