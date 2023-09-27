import React from 'react';
import { Redirect } from 'react-router-dom';
import { FuseLoadable } from '../../../@fuse';

export const ReportsAppConfig = {
    settings: {
        layout: {
            config: {},
        },
    },
    routes: [
        // Report for investment
        {
            path: '/apps/reports',
            component: FuseLoadable({
                loader: () => import('./ReportsApp'),
            }),
        },
        {
            path: '/reports/bulksummary',
            component: FuseLoadable({
                loader: () => import('./bulksummary/BulkSummaryReportApp'),
            }),
        },
        {
            path: '/reports/bulk-upload-details',
            component: FuseLoadable({
                loader: () => import('./bulkuploaddetails/BulkUploadDetailsApp'),
            }),
        },
    ],
};
