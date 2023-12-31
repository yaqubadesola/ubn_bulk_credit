import React from 'react';
import {FuseScrollbars} from '../../../../@fuse';
import Logo from '../../shared-components/Logo';
import Navigation from '../../shared-components/Navigation';

const NavbarLayout2 = () => {
    return (
        <div className="flex flex-auto justify-between items-center w-full h-full container p-0 lg:px-24">

            <div className="flex flex-no-shrink items-center pl-8 pr-16">
                <Logo/>
            </div>

            <FuseScrollbars className="flex h-full items-center">
                <Navigation className="w-full" layout="horizontal" dense/>
            </FuseScrollbars>
        </div>
    );
};

export default NavbarLayout2;


