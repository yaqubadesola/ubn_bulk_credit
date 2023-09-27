import { FuseLoadable } from '../../../@fuse';

export const AdminsAppConfig = {
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
            path: '/admin/new/',
            component: FuseLoadable({
                loader: () => import('./NewAdmin'),
            }),
        },
        // {
        //     path     : '/maker-checker/admin/accounts',
        //     component: FuseLoadable({
        //         loader: () => import('../checkers/createNewAdminChecker/EntryListApp')
        //     })
        // },

        // {
        //     path     : '/apps/accounts',
        //     component: () => <Redirect to="/apps/accounts/accounts"/>
        // }
    ],
};
