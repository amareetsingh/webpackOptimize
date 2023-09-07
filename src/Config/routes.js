import React, { Suspense, lazy } from "react";
import Showlandingpage from "../Pages/Front/Showlandingpage";
const Login = lazy(() =>
  import(/* webpackChunkName:'loginPage'*/ "../Pages/Login")
);
const Register = lazy(() =>
  import(/* webpackChunkName:'RegisterPage'*/ "../Pages/Login/Register")
);
const ResetPassword = lazy(() =>
  import(
    /* webpackChunkName:'ResetPasswordPage'*/ "../Pages/Login/ResetPassword"
  )
);
const Dashboard = lazy(() =>
  import(/* webpackChunkName:'DashboardPage'*/ "../Pages/Dashboard")
);
const Pricing = lazy(() =>
  import(/* webpackChunkName:'PricingPage'*/ "../Pages/Pricing")
);
const NotFound = lazy(() =>
  import(/* webpackChunkName:'NotfoundPage'*/ "../Pages/NotFound")
);
const Templates = lazy(() =>
  import(/* webpackChunkName:'TemplatesPage'*/ "../Pages/Templates")
);
const TemplateView = lazy(() =>
  import(/* webpackChunkName:'TemplateView'*/ "../Pages/Templates/TemplateView")
);
const AssesmentPage = lazy(() =>
  import(/* webpackChunkName:'AssesmentPage'*/ "../Pages/Assesment")
);
const AnalyticsresultPage = lazy(() =>
  import(/* webpackChunkName:'Analyticsresult'*/ "../Pages/Analyticsresult")
);

const Setting = lazy(() =>
  import(/* webpackChunkName:'SettingPage'*/ "../Pages/Settings/Setting")
);
const Profile = lazy(() =>
  import(/* webpackChunkName:'ProfilePage'*/ "../Pages/Profile/Profile")
);
const Thankyou = lazy(() =>
  import(/* webpackChunkName:'ThankYou'*/ "../Pages/Thankyou/Thankyou")
);
const AccountVerify = lazy(() =>
  import(
    /* webpackChunkName:'AccountVerifyPage'*/ "../Pages/Login/AccountVerify"
  )
);
const constantcontact = lazy(() =>
  import(
    /* webpackChunkName:'ConstentContectPage'*/ "../constantcontact/constantcontact"
  )
);
const Hubspot = lazy(() =>
  import(/* webpackChunkName:'HubspotPage'*/ "../Integrations/hubspot")
);
const Preregistration = lazy(() =>
  import(
    /* webpackChunkName:'PreregistrationPage'*/ "../Pages/Dashboard/Preregistration/Preregistration"
  )
);
const AnalyticsresultG = lazy(() =>
  import(
    /* webpackChunkName:'AnaylticsresultGroupPage'*/ "../Pages/Dashboard/AnalyticsresultGroup"
  )
);
const AnalyticsResultEval = lazy(() =>
  import(
    /* webpackChunkName:'AnaylticsResultEvalPage'*/ "../Pages/Dashboard/AnalyticsresultGroup/AnalyticsResultEval"
  )
);
const LinkedAssessments = lazy(() =>
  import(
    /* webpackChunkName:'LinkedAssessementsPage'*/ "../Pages/Dashboard/LinkedAssessments"
  )
);
const ViewResultsPage = lazy(() =>
  import(
    /* webpackChunkName:'ViewResultPage'*/ "../Pages/Front/ViewResultsPage"
  )
);

const routes = [
  {
    path: "/login",
    component: Login,
    isPrivate: false,
  },
  {
    path: "/register",
    component: Register,
    isPrivate: false,
  },
  {
    path: "/reset-password",
    component: ResetPassword,
    isPrivate: false,
  },
  {
    path: "/confirm",
    component: AccountVerify,
    isPrivate: false,
  },
  {
    path: "/dashboard",
    component: Dashboard,
    isPrivate: true,
  },
  {
    path: "/profile",
    component: Profile,
    isPrivate: true,
  },
  {
    path: "/pricing",
    component: Pricing,
    isPrivate: false,
  },
  {
    path: "/templates",
    component: Templates,
    isPrivate: true,
  },
  {
    path: "/assesment/:id",
    component: AssesmentPage,
    isPrivate: false,
  },
  {
    path: "/:slug/assessment/:id/:stage",
    component: Showlandingpage,
    isPrivate: false,
  },
  {
    path: "/:slug/assessment/:id",
    component: Showlandingpage,
    isPrivate: false,
  },
  {
    path: "/thank-you",
    component: Thankyou,
    isPrivate: false,
  },
  {
    path: "/template-view",
    component: TemplateView,
    isPrivate: false,
  },
  {
    path: "/analyticsresult",
    component: AnalyticsresultPage,
    isPrivate: false,
  },
  {
    path: "/setting",
    component: Setting,
    isPrivate: true,
  },
  {
    path: `/constantcontact`,
    component: constantcontact,
    isPrivate: true,
  },
  {
    path: `/hubspot`,
    component: Hubspot,
    isPrivate: true,
  },
  {
    path: `/analyticsresultgroup`,
    component: AnalyticsresultG,
    isPrivate: true,
  },

  {
    path: "/preregistration",
    component: Preregistration,
    isPrivate: true,
  },
  {
    path: "/linkedassessments",
    component: LinkedAssessments,
    isPrivate: true,
  },
  {
    path: "/viewresults/:id",
    component: ViewResultsPage,
    isPrivate: true,
  },

  {
    path: "/analyticsresultevalgroup",
    component: AnalyticsResultEval,
    isPrivate: true,
  },

  {
    path: "/*",
    component: NotFound,
    isPrivate: true,
  },
];

export default routes;
