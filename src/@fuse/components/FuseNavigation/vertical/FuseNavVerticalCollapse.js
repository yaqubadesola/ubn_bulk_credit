import React, { Component } from 'react';
import { withStyles, Collapse,Tooltip, Icon, IconButton, ListItem, ListItemText } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FuseNavVerticalGroup from './FuseNavVerticalGroup';
import FuseNavVerticalItem from './FuseNavVerticalItem';
import FuseNavBadge from './../FuseNavBadge';
import FuseNavVerticalLink from './FuseNavVerticalLink';
import _ from 'lodash';

const propTypes = {
    item: PropTypes.shape(
        {
            id      : PropTypes.string.isRequired,
            title   : PropTypes.string,
            icon    : PropTypes.string,
            children: PropTypes.array
        })
};

const defaultProps = {};

const styles = theme => ({
    root: {
        padding : 0,
        '&.open': {
            backgroundColor: 'rgba(0,0,0,.08)'
        }
    },
    item: {
        height      : 40,
        width       : 'calc(100% - 16px)',
        borderRadius: '0 20px 20px 0',
        paddingRight: 12,
        '&.square'  : {
            width       : '100%',
            borderRadius: '0'
        }
    }
});

function needsToBeOpened(props)
{
    return props.location && isUrlInChildren(props.item, props.location.pathname)
}

function isUrlInChildren(parent, url)
{
    if ( !parent.children )
    {
        return false;
    }

    for ( let i = 0; i < parent.children.length; i++ )
    {
        if ( parent.children[i].children )
        {
            if ( isUrlInChildren(parent.children[i], url) )
            {
                return true;
            }
        }

        if ( parent.children[i].url === url || url.includes(parent.children[i].url) )
        {
            return true;
        }
    }

    return false;
}

class FuseNavVerticalCollapse extends Component
{

    constructor(props)
    {
        super(props);

        this.state = {open: needsToBeOpened(this.props)};
    }

    componentDidUpdate(prevProps, prevState, snapshot)
    {
        if (
            !prevState.open &&
            (!_.isEqual(this.props.location, prevProps.location) || !_.isEqual(this.props.item, prevProps.item)) &&
            needsToBeOpened(this.props)
        )
        {
            this.setState({open: true});
        }
    }

    handleClick = () =>
    {
        this.setState({open: !this.state.open});
    };

    render()
    {
        const {item, nestedLevel, classes, authRoles, rights, role, active} = this.props;
        let newItem = {}
        if(role && role.id === 1){
            newItem = item
        }else{
            const { children } = item
            const selected = children && children.filter(child => {
                return rights && rights.some(r => {
                    return r.module.id === child.key && r.canview === true
                })
            })
            newItem = Object.assign({}, item, {children: selected})
        }

        let paddingValue = 40 + (nestedLevel * 16);
        const listItemPadding = nestedLevel > 0 ? 'pl-' + (paddingValue > 80 ? 80 : paddingValue) : 'pl-24';
        let toolTip = item && item.tooltip ? item.tooltip : ''

        return (
            <ul className={classNames(classes.root, this.state.open && "open")}>
       <Tooltip title={toolTip}>
                <ListItem
                    button
                    className={classNames(classes.item, listItemPadding, 'list-item', active)}
                    onClick={this.handleClick}
                >
                    {item.icon && (
                        <Icon color="action" className="text-16 flex-no-shrink">{item.icon}</Icon>
                    )}
                    <ListItemText className="list-item-text" primary={item.title} classes={{primary: 'text-14'}}/>
                    {item.badge && (
                        <FuseNavBadge className="mr-4" badge={item.badge}/>
                    )}
                    <IconButton disableRipple className="w-16 h-16 p-0">
                        <Icon className="text-16 arrow-icon" color="inherit">
                            {this.state.open ? 'expand_less' : 'expand_more'}
                        </Icon>
                    </IconButton>
                </ListItem>
                </Tooltip>
                {newItem.children && (
                    <Collapse in={this.state.open} className="collapse-children">
                        {
                            newItem.children.map((item) => (

                                <React.Fragment key={item.id}>

                                    {item.type === 'group' && (
                                        <FuseNavVerticalGroup item={item} nestedLevel={nestedLevel + 1} active={active}/>
                                    )}

                                    {item.type === 'collapse' && (
                                        <NavVerticalCollapse item={item} nestedLevel={nestedLevel + 1} active={active}/>
                                    )}

                                    {item.type === 'item' && (
                                        <FuseNavVerticalItem item={item} nestedLevel={nestedLevel + 1} active={active}/>
                                    )}

                                    {item.type === 'link' && (
                                        <FuseNavVerticalLink item={item} nestedLevel={nestedLevel + 1} active={active}/>
                                    )}

                                </React.Fragment>
                            ))
                        }
                    </Collapse>
                )}
            </ul>
        );
    };
}

function mapStateToProps({auth})
{
    return {
        // userRole: auth.user.data.role.name,
        role: auth.user.data.role,
        authRoles: auth.rights.authRoles,
        rights: auth.rights.right.rights,
    }
}

FuseNavVerticalCollapse.propTypes = propTypes;
FuseNavVerticalCollapse.defaultProps = defaultProps;

const NavVerticalCollapse = withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps)(FuseNavVerticalCollapse)));

export default NavVerticalCollapse;
