import React from 'react';
import {AppBar, Hidden, Icon, withStyles} from '@material-ui/core';
import {FuseScrollbars} from '../../../../@fuse';
import classNames from 'classnames';
import UserNavbarHeader from '../../shared-components/UserNavbarHeader';
import NavbarFoldedToggleButton from '../../shared-components/NavbarFoldedToggleButton';
import NavbarMobileToggleButton from '../../shared-components/NavbarMobileToggleButton';
import Logo from '../../shared-components/Logo';
import Navigation from '../../shared-components/Navigation';

const styles = theme => ({
    content: {
        overflowX                   : 'hidden',
        overflowY                   : 'auto',
        '-webkit-overflow-scrolling': 'touch',
        background                  : 'linear-gradient(rgba(0, 0, 0, 0) 30%, rgba(0, 0, 0, 0) 30%), linear-gradient(rgba(0, 0, 0, 0.25) 0, rgba(0, 0, 0, 0) 40%)',
        backgroundRepeat            : 'no-repeat',
        backgroundSize              : '100% 40px, 100% 10px',
        backgroundAttachment        : 'local, scroll'
    }
});

const NavbarMobileLayout3 = ({classes}) => {
    return (
        <div className="flex flex-col h-full overflow-hidden">
            <AppBar
                color="primary"
                position="static"
                elevation={0}
                className="flex flex-row items-center flex-shrink h-64 min-h-64 pl-20 pr-12"
            >
                <div className="flex flex-1 pr-8">
                    <Logo/>
                </div>

                <Hidden mdDown>
                    <NavbarFoldedToggleButton className="w-40 h-40 p-0"/>
                </Hidden>

                <Hidden lgUp>
                    <NavbarMobileToggleButton className="w-40 h-40 p-0">
                        <Icon>arrow_back</Icon>
                    </NavbarMobileToggleButton>
                </Hidden>
            </AppBar>

            <FuseScrollbars className={classNames(classes.content)}>

                <UserNavbarHeader/>

                <Navigation layout="vertical"/>
            </FuseScrollbars>
        </div>
    );
};

export default withStyles(styles, {withTheme: true})(NavbarMobileLayout3);


