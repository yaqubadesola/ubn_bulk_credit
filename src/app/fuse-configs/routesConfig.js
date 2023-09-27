import React from 'react';
import { Redirect } from 'react-router-dom';
import { FuseUtils } from '../../@fuse/index';
import { LoginConfig } from '../main/login/LoginConfig';

import { AnalyticsDashboardAppConfig } from '../main/dashboards/analytics/AnalyticsDashboardAppConfig';
import { ProjectDashboardAppConfig } from '../main/dashboards/project/ProjectDashboardAppConfig';
import { AdminsAppConfig } from '../main/admin/AdminsAppConfig';
import { BranchModuleAppConfig } from '../main/branchTeller/BranchModuleAppConfig';
import { ReportsAppConfig } from '../main/reports/ReportsAppConfig';
import { BranchModuleOnboardingConfig } from '../main/branchOnboarding/BranchModuleOnboardingConfig';
import { HolidayCalendarAppConfig } from '../main/bulkUpload/BulkUploadAppConfig';
import { pagesConfigs } from '../main/pages/pagesConfigs';

const routeConfigs = [
    ...pagesConfigs,
    AdminsAppConfig,
    BranchModuleAppConfig,
    BranchModuleOnboardingConfig,
    LoginConfig,
    ReportsAppConfig,
    AnalyticsDashboardAppConfig,
    ProjectDashboardAppConfig,
    HolidayCalendarAppConfig,
];

const routes = [
    ...FuseUtils.generateRoutesFromConfigs(routeConfigs),
    {
        path: '/',
        exact: true,
        component: () => <Redirect to="/login" />,
    },
];

export default routes;
