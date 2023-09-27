import {FuseLoadable} from '../../../@fuse';

export const BranchModuleOnboardingConfig = {
    settings: {
        layout: {}
    },
    routes  : [
        /* {
            path     : '/admin/accounts/:adUserID',
            component: FuseLoadable({
                loader: () => import('./admin/Admin')
            })
        }, */
        {
            path     : '/apps/branchTeller/registerCustomer',
            component: FuseLoadable({
                loader: () => import('./CustomerOnboarding')
            })
        },
        // {
        //     path     : '/apps/accounts',
        //     component: () => <Redirect to="/apps/accounts/accounts"/>
        // }
    ]
};
