import {createBrowserRouter, Navigate} from "react-router-dom"
import DefaultLayout from "./components/DefaultLayout"
import Loader from "./components/loader/Loader"
import ChangePassword from "./views/authentication/ChangePassword"
import Login from "./views/authentication/Login"
import Dashboard from "./views/Dashboard"
import OTP from "./views/otp verification/OTP"
import Workout from "./views/Services"
import DataFake from "./components/DataFake"
import DataTable from "./components/dataTables/ServicesDataTable"
import Vehicles from "./views/Vehicles"
import Service_Center from "./views/Service_Center"
import Bookings from "./views/Bookings"
import Users from "./views/Users"
import Customers from "./views/Customers"

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
        element: <DataFake />
    },

]) 

export default router