import {createBrowserRouter, Navigate} from "react-router-dom"
import DefaultLayout from "./components/DefaultLayout"
import Loader from "./components/loader/Loader"
import ChangePassword from "./views/authentication/ChangePassword"
import Login from "./views/authentication/Login"
import Dashboard from "./views/pages/Dashboard"
import OTP from "./views/otp verification/OTP"
import Workout from "./views/pages/Services"
import DataFake from "./components/DataFake"
import DataTable from "./components/dataTables/ServicesDataTable"
import Vehicles from "./views/pages/Vehicles"
import Service_Center from "./views/pages/Service_Center"
import Bookings from "./views/pages/Bookings"
import Users from "./views/pages/Users"
import Customers from "./views/pages/Customers"
import GoogleMaps from "./views/GoogleMaps"
import Testing from "./views/pages/Testing"
import Services_Logo from "./views/pages/Services_Logo"

const router = createBrowserRouter([
    {
        path: '/',
        element: <DefaultLayout />,
        children: [
            {
                path: '/',
                element: <Navigate to="/dashboard" />,
                
            },
            {
                path: '/dashboard',
                element: <Dashboard />
            },
            {
                path: '/services',
                element: <Workout />
            },
            {
                path: '/vehicles',
                element: <Vehicles />
            },
            {
                path: '/servicecenter',
                element: <Service_Center />
            },
            {
                path: '/bookings',
                element: <Bookings />
            },
            {
                path: '/users',
                element: <Users />
            },
            {
                path: '/customer',
                element: <Customers />
            },
            {
                path: '/servicecenter/test',
                element: <Testing />
            },
            {
                path: '/serviceslogo',
                element: <Services_Logo />
            },
            
        ]
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/otp',
        element: <OTP />
    },
    {
        path: '/changepassword',
        element: <ChangePassword />
    },
    {
        path: '/loader',
        element: <Loader />
    },
    {
        path: '/table',
        element: <DataTable />
    },
    {
        path: '/data',
        element: <GoogleMaps />
    },

]) 

export default router