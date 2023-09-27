import { authRoles } from '../auth';
console.log('Auth Roles = ', authRoles);
const navigationConfig = [
    {
        id: 'applications',
        title: 'BACK OFFICE',
        type: 'group',
        icon: 'apps',
        exact: true,
        auth: authRoles.admin,
        tooltip: 'Overview of data metrics',
        children: [
            {
                id: 'branch-teller',
                title: 'Bulk Credit Feature',
                key: 1,
                type: 'collapse',
                icon: 'assignment',
                url: '/apps/dashboards/analytics',
                exact: true,
                auth: authRoles.admin,
                tooltip: 'List of transaction carried out by Branch Teller',
                children: [
                    {
                        id: 'bulk-credit-feature',
                        title: 'Bulk Upload Feature',
                        key: 1,
                        type: 'item',
                        icon: 'calendar_today',
                        url: '/app/bulk-credit-feature',
                        auth: authRoles.admin,
                        tooltip: 'Bulk funding for staffs',
                    },
                    {
                        id: 'report',
                        title: 'Reports',
                        key: 2,
                        type: 'item',
                        icon: 'subject',
                        url: '/apps/reports',
                        exact: true,
                        auth: authRoles.admin,
                        tooltip: 'View a list of report for download',
                        children: [
                            {
                                id: 'reports-context',
                                title: 'Reports',
                                key: 2,
                                type: 'item',
                                icon: 'subject',
                                url: '/reports',
                                auth: authRoles.admin,
                            },
                        ],
                    },
                ],
            },
            {
                id: 'manage-kyc-tiering',
                title: 'M36 KYC Level',
                key: 3,
                type: 'item',
                icon: 'view_list',
                url: '/branch/teller/kyc_ugrade',
                tooltip: "Manage customer's KYC Level",
            },
        ],
    },
];

export default navigationConfig;
