import AddProduct from '@/pages/addProduct';
import CouponCode from '@/pages/couponCode';
import CouponManager from '@/pages/couponCode/CouponManager';
import FormPage from '@/pages/form';
import NotFound from '@/pages/not-found';
import OrderManagment from '@/pages/Order Managment/index';
import BookCategoryGrid from '@/pages/students/categories';
import CustomersPage from '@/pages/students/customers';
import AddBannerForm from '@/pages/students/form/AddBanner';
import PackageForm from '@/pages/students/form/AddBasket';
import PlanForm from '@/pages/students/form/AddPricing';
import CategoryForm from '@/pages/students/form/CreateCategoryForm';
import PricingPlanList from '@/pages/students/PricingPlan';
import { Suspense, lazy } from 'react';
import { Navigate, Outlet, useRoutes } from 'react-router-dom';
import ShopsManagement from '../pages/shop Managment';
import Invoices from '@/pages/invoices/index1';
import Invoice from '@/pages/invoices/InvoiceDetails1';
import ProductList from '@/pages/ProductList';
import ViewBasket from '@/pages/students/ViewBasket';
import ShowBanner from '@/pages/showBanner/ShowBanner';
import PrivateRoute from './PrivateRoutes';
import EditBannerForm from '@/pages/form/EditBanner';
import EditBasket from '@/pages/students/EditBasket';
import EditProduct from '@/pages/students/EditProduct';
// import EditProduct from '@/pages/students/EditProductD';
const DashboardLayout = lazy(
  () => import('@/components/layout/dashboard-layout')
);
const SignInPage = lazy(() => import('@/pages/auth/signin'));
const DashboardPage = lazy(() => import('@/pages/dashboard'));
const StudentPage = lazy(() => import('@/pages/students'));
const StudentDetailPage = lazy(
  () => import('@/pages/students/StudentDetailPage')
);

// Routes setup
export default function AppRouter() {
  const dashboardRoutes = [
    {
      path: '/',
      element: (
        <PrivateRoute>
          <DashboardLayout>
            <Suspense>
              <Outlet />
            </Suspense>
          </DashboardLayout>
        </PrivateRoute>
      ),
      children: [
        {
          element: <DashboardPage />,
          index: true
        },
        {
          path: 'transections',
          element: <StudentPage />
        },
        {
          path: 'customers',
          element: <CustomersPage />
        },
        {
          path: 'couponCode',
          element: <CouponCode />
        },
        {
          path: 'couponManager',
          element: <CouponManager />
        },
        {
          path: 'categories',
          element: <BookCategoryGrid />
        },
        {
          path: 'orderManagment',
          element: <OrderManagment />
        },
        {
          path: 'shopsManagement',
          element: <ShopsManagement />
        },
        {
          path: 'pricing-plan',
          element: <PricingPlanList />
        },
        {
          path: 'productsList',
          element: <ProductList />
        },
        {
          path: 'invoices',
          element: <Invoices />
        },
        {
          path: 'invoice/:slug',
          element: <Invoice />
        },
        {
          path:'editBasket/:paymentId/:paymentStoreId',
          element: <EditBasket />
        },
        {
          path:'editProduct/:paymentId',
          element: <EditProduct />
        },
        {
          path: 'add-plan',
          element: <PlanForm />
        },
        {
          path: 'addBasket',
          element: <PackageForm />
        },
        {
          path: 'viewBaskets',
          element: <ViewBasket />
        },
        {
          path: 'addBanner',
          element: <AddBannerForm />
        },
        {
          path: 'editBanner/:slug',
          element: <EditBannerForm />
        },
        {
          path: 'showBanner',
          element: <ShowBanner />
        },

        {
          path: 'add-category',
          element: <CategoryForm />
        },
        {
          path: 'student/details',
          element: <StudentDetailPage />
        },
        {
          path: 'addProduct',
          element: <AddProduct />
        },
        {
          path: 'form',
          element: <FormPage />
        }
      ]
    }
  ];

  const publicRoutes = [
    {
      path: '/login',
      element: <SignInPage />,
      index: true
    },
    {
      path: '/404',
      element: <NotFound />
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />
    }
  ];

  const routes = useRoutes([...dashboardRoutes, ...publicRoutes]);

  return routes;
}