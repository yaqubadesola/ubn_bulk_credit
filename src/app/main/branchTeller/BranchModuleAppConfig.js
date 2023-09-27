import { FuseLoadable } from '../../../@fuse';

export const BranchModuleAppConfig = {
    settings: {
        layout: {},
    },
    routes: [
        /* {
            path     : '/admin/accounts/:adUserID',
            component: FuseLoadable({
                loader: () => import('./admin/Admin')
            })
        }, */
        {
            path: '/admin/accounts/:id?',
            component: FuseLoadable({
                loader: () => import('./admins/Admins'),
            }),
        },
        {
            path: '/apps/bulkFeature/upload',
            component: FuseLoadable({
                loader: () => import('./NewInvestment'),
            }),
        },

        // {
        //     path     : '/apps/accounts',
        //     component: () => <Redirect to="/apps/accounts/accounts"/>
        // }
    ],
};
