import { Suspense, lazy } from 'react';
import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom';

import LoadingSpinner from './components/UI/LoadingSpinner';

const LandingPage = lazy(() => import('./pages/Landing'));
const DefaultLayout = lazy(() => import('./layout/DefaultLayout'));
const DataLayout = lazy(() => import('./layout/DataLayout'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const NotFound = lazy(() => import('./pages/NotFound'));
const BlankPage = lazy(() => import('./pages/Blank'));
const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const CampaingsPage = lazy(() => import('./pages/Campaings'));
const WarehousePage = lazy(() => import('./pages/WarehousePage'));
const NomenclaturePage = lazy(() => import('./pages/NomenclaturePage'));
const PlansAdvertPage = lazy(() => import('./pages/PlansAdvertPage'));
const PlansSalesPage = lazy(() => import('./pages/PlansSalesPage'));
const TgWebOrders = lazy(() => import('./pages/TgWebOrders'));

const ProtectedRoute = ({
  isAllowed,
  redirectPath = '/',
  children,
}: {
  isAllowed: boolean;
  redirectPath?: string;
  children?: React.ReactElement;
}) => {
  if (!isAllowed) return <Navigate to={redirectPath} replace />;
  return children ? children : <Outlet />;
};

export default function App() {
  const isAuth = false;
  const user = {
    id: '1',
    name: 'robin',
    permissions: ['analitics'],
    roles: ['admin'],
  };

  return (
    <BrowserRouter>
      <Suspense
        fallback={
          isAuth ? (
            <DefaultLayout>
              <LoadingSpinner />
            </DefaultLayout>
          ) : (
            'loading'
          )
        }
      >
        <Routes>
          <Route path="/" element={isAuth ? <DefaultLayout /> : <LandingPage />}>
            <Route
              element={
                <ProtectedRoute isAllowed={isAuth && user.permissions.includes('analitics')} redirectPath="/login" />
              }
            >
              <Route index element={<DashboardPage />} />
              <Route path="/finance" element={<BlankPage />} />
              <Route path="/analytics" element={<BlankPage />} />
              <Route path="/orders" element={<BlankPage />} />
              <Route path="/deliveries" element={<BlankPage />} />
              <Route path="/data" element={<DataLayout />}>
                {/* <Route index element={<BlankPage />} /> */}
                <Route index path="nomenclature" element={<NomenclaturePage />} />
                <Route path="campaings" element={<CampaingsPage />} />
                <Route path="plans/sales" element={<PlansSalesPage />} />
                <Route path="plans/advert" element={<PlansAdvertPage />} />
                <Route path="warehouse" element={<WarehousePage />} />
              </Route>
            </Route>
          </Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/tgweb/orders/:order_key" element={<TgWebOrders />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
