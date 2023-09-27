import React from 'react';
import { Redirect } from 'react-router-dom';
import { FuseLoadable } from '../../../@fuse';

export const HolidayCalendarAppConfig = {
    settings: {
        layout: {
            config: {},
        },
    },
    routes: [
        {
            path: '/app/bulk-credit-feature',
            component: FuseLoadable({
                loader: () => import('./BulkUploadApp'),
            }),
        },
    ],
};
