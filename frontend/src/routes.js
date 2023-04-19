import React from 'react'

const Dashboard = React.lazy(() => import('./views/MainPanelViews/Dashboard'))
const NewOrder = React.lazy(() => import('./views/OrderViews/NewOrder'))
const ProductList = React.lazy(() => import('./views/ProductsViews/ProductList.js'))
const ProjectDetail = React.lazy(() => import('./views/ProductsViews/ProjectDetail'))
const ConstantDetail = React.lazy(() => import('./views/ProductsViews/ConstantDetail'))
const LiquidDetail = React.lazy(() => import('./views/ProductsViews/LiquidDetail'))
const JobList = React.lazy(() => import('./views/AssignmentViews/JobList'))
const JobDetail = React.lazy(() => import('./views/AssignmentViews/JobDetail'))
const CreateProjects = React.lazy(() => import('./views/ProductsViews/CreateProjects'))
const CreateConstant = React.lazy(() => import('./views/ProductsViews/CreateConstant'))
const CreateLiquid = React.lazy(() => import('./views/ProductsViews/CreateLiquid'))
const Order = React.lazy(() => import('./views/OrderViews/Order'))
const Delivery = React.lazy(() => import('./views/DeliveryView/Delivery'))


const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/Dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/ProductList', name: 'ProductList', element: ProductList },
  { path: '/NewOrder', name: 'NewOrder', element: NewOrder },
  { path: '/ProjectDetail', name: 'ProjectDetail', element: ProjectDetail },
  { path: '/CreateConstant', name: 'CreateConstant', element: CreateConstant },
  { path: '/LiquidDetail', name: 'LiquidDetail', element: LiquidDetail },
  { path: '/JobList', name: 'JobList', element: JobList },
  { path: '/JobDetail', name: 'JobDetail', element: JobDetail },
  { path: '/CreateProjects', name: 'CreateProjects', element: CreateProjects },
  { path: '/ConstantDetail', name: 'ConstantDetail', element: ConstantDetail },
  { path: '/CreateLiquid', name: 'CreateLiquid', element: CreateLiquid },
  { path: '/Order', name: 'Order', element: Order },
  { path: '/Delivery', name: 'Delivery', element: Delivery },
]

export default routes
