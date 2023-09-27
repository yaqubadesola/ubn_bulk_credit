import React, { Component } from 'react';
// import { matchRoutes } from 'react-router-config';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import AppContext from '../../../app/AppContext';
//import RoleDetails from '../../../app/main/roleManager/role/RoleDetails';

class FuseAuthorization extends Component {
    constructor(props, context) {
        super(props);
        const { routes } = context;
        this.state = {
            accessGranted: true,
            routes,
        };
    }

    componentDidMount() {
        if (!this.state.accessGranted) {
            this.redirectRoute(this.props);
        }
    }

    componentDidUpdate() {
        if (!this.state.accessGranted) {
            this.redirectRoute(this.props);
        }
    }

    static getDerivedStateFromProps(props, state) {
        const { location, user, rights, authRoles, navigation } = props;
        authRoles.push('Super Admin');
        const { role } = user.data;
        const { pathname } = location;

        // Url restrictions by role rights
        const { children } = navigation[0];
        let selected = [];
        let matchUrl = false;
        let dashboard = 'apps/dashboards/analytics';
        if (role && role.id !== 1) {
            selected =
                children &&
                children.filter((child) => {
                    return (
                        rights &&
                        rights.some((r) => {
                            //
                            return r.module.id === child.key && r.canview === true;
                        })
                    );
                });

            let subChildren = [];
            selected.forEach((child, i) => {
                if (child.children && child.children.length > 0) {
                    child.children.forEach((obj) => {
                        subChildren.push(obj);
                        if (obj.url != null) {
                            if (pathname.includes(obj.url)) {
                                matchUrl = true;
                            }
                        }
                    });
                }
                if (child.url != null) {
                    if (pathname.includes(child.url)) {
                        matchUrl = true;
                    } else if (pathname.includes(dashboard)) {
                        matchUrl = true;
                    }
                }
            });

            //Checking Restriction Level for Sub children menu - Temporary Fix will be revisited
            //For Branch Module Onbording for HeadTeller(34)
            let filterSelected =
                role.id == 30 || role.id == 31
                    ? selected.map((item) => {
                          if (item.id !== 'branch-teller') {
                              // Do normal for other module
                              return item;
                          } else {
                              // Restrict Branch Teller from Onboarding Customer
                              let newItem = item;
                              let trimmedItem = item.children.filter(
                                  (child) => child.id !== 'new-customer'
                              );
                              newItem.children = trimmedItem;
                              return newItem;
                          }
                      })
                    : [];

            let filterSubChildren =
                role.id == 30 || role.id == 31
                    ? subChildren.filter((item) => item.id !== 'new-customer')
                    : [];

            subChildren = filterSubChildren.length > 0 ? filterSubChildren : subChildren;
            selected = filterSelected.length > 0 ? filterSelected : selected;
            selected = [...selected, ...subChildren];
        } else {
            let subChildren = [];
            children.forEach((child, i) => {
                if (child.children && child.children.length > 0) {
                    child.children.forEach((obj) => {
                        subChildren.push(obj);
                        if (obj.url != null) {
                            if (pathname.includes(obj.url) || obj.url.includes(pathname)) {
                                matchUrl = true;
                            }
                        }
                    });
                }
                if (child.url != null) {
                    if (pathname.includes(child.url) || child.url.includes(pathname)) {
                        matchUrl = true;
                    }
                }
            });

            selected = [...children, ...subChildren];
        }
        console.log('Authroles =', authRoles);
        console.log('role.name =', role.name);
        const accessGranted =
            pathname && selected.length > 0 && !authRoles.includes(role.name) ? matchUrl : true;
        console.log('matchUrl Url =', matchUrl);
        console.log('accessGranted Url =', accessGranted);
        return {
            accessGranted,
        };
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextState.accessGranted !== this.state.accessGranted;
    }

    redirectRoute(props) {
        console.log(' redirectRoute props = ', props);
        const { location, user, history } = props;
        const { pathname, state } = location;
        /*
        User is guest
        Redirect to Login Page
        */
        if (user.data.role.name === 'guest') {
            history.push({
                pathname: '/login',
                state: { redirectUrl: pathname },
            });
        } else {
            /*
        User is member
        User must be on unAuthorized page or just logged in
        Redirect to dashboard or redirectUrl
        */
            const redirectUrl =
                state && state.redirectUrl ? state.redirectUrl : '/apps/dashboards/analytics';
            history.push({
                pathname: redirectUrl,
            });
        }
    }

    render() {
        const { children } = this.props;
        const { accessGranted } = this.state;
        return accessGranted ? <React.Fragment>{children}</React.Fragment> : null;
    }
}

function mapStateToProps({ fuse, auth }) {
    return {
        user: auth.user,
        rights: auth.rights.right.rights,
        authRoles: auth.rights.authRoles,
        navigation: fuse.navigation,
    };
}

FuseAuthorization.contextType = AppContext;

export default withRouter(connect(mapStateToProps)(FuseAuthorization));
