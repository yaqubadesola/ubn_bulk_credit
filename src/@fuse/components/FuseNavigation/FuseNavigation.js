import React from 'react';
import { connect } from 'react-redux';
import { Divider, List, Hidden } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import FuseNavVerticalGroup from './vertical/FuseNavVerticalGroup';
import FuseNavVerticalCollapse from './vertical/FuseNavVerticalCollapse';
import FuseNavVerticalItem from './vertical/FuseNavVerticalItem';
import FuseNavVerticalLink from './vertical/FuseNavVerticalLink';
import FuseNavHorizontalGroup from './horizontal/FuseNavHorizontalGroup';
import FuseNavHorizontalCollapse from './horizontal/FuseNavHorizontalCollapse';
import FuseNavHorizontalItem from './horizontal/FuseNavHorizontalItem';
import FuseNavHorizontalLink from './horizontal/FuseNavHorizontalLink';
import _ from 'lodash';

const propTypes = {
    navigation: PropTypes.array.isRequired,
};

const defaultProps = {
    layout: 'vertical',
};

const FuseNavigation = ({ navigation, layout, active, dense, className, rights, role }) => {
    let navigations = [];

    if (role && role.id === 1) {
        navigations = navigation;
    } else {
        let { children } = navigation[0];

        const selected =
            children &&
            children.filter((child) => {
                return (
                    rights &&
                    rights.some((r) => {
                        return r.module.id === child.key && r.canview === true;
                    })
                );
            });

        const selectedNav = Object.assign({}, navigation[0], {
            children: [children[0], ...selected],
        });
        navigations[0] = selectedNav;
    }

    if (!navigations) {
        return '';
    }

    navigations[0].children = _.uniq(navigations[0].children, function (item, key, a) {
        return item.id;
    });

    const verticalNav = (
        <List className={classNames('navigation whitespace-no-wrap', className)}>
            {navigations.map((item) => (
                <React.Fragment key={item.id}>
                    {item.type === 'group' && (
                        <FuseNavVerticalGroup
                            item={item}
                            nestedLevel={0}
                            active={active}
                            dense={dense}
                        />
                    )}

                    {item.type === 'collapse' && (
                        <FuseNavVerticalCollapse
                            item={item}
                            nestedLevel={0}
                            active={active}
                            dense={dense}
                        />
                    )}

                    {item.type === 'item' && (
                        <FuseNavVerticalItem
                            item={item}
                            nestedLevel={0}
                            active={active}
                            dense={dense}
                        />
                    )}

                    {item.type === 'link' && (
                        <FuseNavVerticalLink
                            item={item}
                            nestedLevel={0}
                            active={active}
                            dense={dense}
                        />
                    )}

                    {item.type === 'divider' && <Divider className="my-16" />}
                </React.Fragment>
            ))}
        </List>
    );

    const horizontalNav = (
        <List className={classNames('navigation whitespace-no-wrap flex p-0', className)}>
            {navigations.map((item) => (
                <React.Fragment key={item.id}>
                    {item.type === 'group' && (
                        <FuseNavHorizontalGroup item={item} nestedLevel={0} dense={dense} />
                    )}

                    {item.type === 'collapse' && (
                        <FuseNavHorizontalCollapse item={item} nestedLevel={0} dense={dense} />
                    )}

                    {item.type === 'item' && (
                        <FuseNavHorizontalItem item={item} nestedLevel={0} dense={dense} />
                    )}

                    {item.type === 'link' && (
                        <FuseNavHorizontalLink item={item} nestedLevel={0} dense={dense} />
                    )}

                    {item.type === 'divider' && <Divider className="my-16" />}
                </React.Fragment>
            ))}
        </List>
    );

    if (navigations.length > 0) {
        switch (layout) {
            case 'horizontal': {
                return (
                    <React.Fragment>
                        <Hidden lgUp>{verticalNav}</Hidden>
                        <Hidden mdDown>{horizontalNav}</Hidden>
                    </React.Fragment>
                );
            }
            case 'vertical':
            default: {
                return verticalNav;
            }
        }
    } else {
        return null;
    }
};

FuseNavigation.propTypes = propTypes;
FuseNavigation.defaultProps = defaultProps;

function mapStateToProps({ auth }) {
    return {
        role: auth.user.data.role,
        // userRole: auth.user.data.role.name,
        rights: auth.rights.right.rights,
        authRoles: auth.rights.authRoles,
    };
}

export default withRouter(connect(mapStateToProps, null)(FuseNavigation));
