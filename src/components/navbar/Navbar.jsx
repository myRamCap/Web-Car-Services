import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import logo from '../../assets/images/Logo-RC.png'
import PeopleIcon from '@mui/icons-material/People';


export default function Navbar() {
    // const {user, token, notification, setUser, setToken} = useStateContext()
    const location = useLocation();
    const { pathname } = location;
    const splitLocation = pathname.split("/");
    const [active, setActive] = useState(true)
    const toggle = () => setActive (!active);
  return (
    <div className={`sidebar ${active ? 'active' : ''}`}>
        <div className="logo_content">
            <div className="logo">
            <img src={logo} alt="Logo" style={{ width: '200px', height: '150px' }} />
                <div className="logo_name">
                   
                </div>
            </div>
            <i onClick={toggle} >
                <box-icon name="menu" id="btn" size="sm" />
            </i>
        </div>
        <ul className="nav">
            <li>
                <Link className={splitLocation[1] === "dashboard" ? "isActive" : ""} to="/dashboard">
                    <i>
                        <box-icon name='bar-chart-square' color={splitLocation[1] === "dashboard" ? 'white' : ''}/>
                    </i>
                    <span className="link_name">Dashboard</span>
                </Link>
                <span className="tooltip">Dashboard</span>
            </li>
            <li>
                <Link className={splitLocation[1] === "serviceslogo" ? "isActive" : ""} to="/serviceslogo">
                    <i>
                        <box-icon name='image-alt' color={splitLocation[1] === "serviceslogo" ? 'white' : ''} />
                    </i>
                    <span className="link_name">Services Logo</span>
                </Link>
                <span className="tooltip">Services Logo</span>
            </li>
            <li>
                <Link className={splitLocation[1] === "services" ? "isActive" : ""} to="/services"> 
                    <i>
                        <box-icon name='cog' color={splitLocation[1] === "services" ? 'white' : ''} />
                    </i>
                    <span className="link_name">Services</span>
                </Link>
                <span className="tooltip">Services</span>
            </li>
            <li>
                <Link className={splitLocation[1] === "vehicles" ? "isActive" : ""} to="/vehicles">
                    <i>
                        <box-icon name='car' color={splitLocation[1] === "vehicles" ? 'white' : ''} />
                    </i>
                    
                    <span className="link_name">Vehicles</span>
                </Link>
                <span className="tooltip">Vehicles</span>
            </li>
            <li>
                <Link className={splitLocation[1] === "servicecenter" ? "isActive" : ""} to="/servicecenter">
                    <i>
                        <box-icon  type='solid' name='car-mechanic' color={splitLocation[1] === "servicecenter" ? 'white' : ''} />
                    </i>
                    
                    <span className="link_name">Service Center</span>
                </Link>
                <span className="tooltip">Service Center</span>
            </li>
            <li>
                <Link className={splitLocation[1] === "bookings" ? "isActive" : ""} to="/bookings">
                    <i>
                        <box-icon name='calendar-check' color={splitLocation[1] === "bookings" ? 'white' : ''} />
                    </i>
                    
                    <span className="link_name">Bookings</span>
                </Link>
                <span className="tooltip">Bookings</span>
            </li>
            <li>
                <Link className={splitLocation[1] === "notification" ? "isActive" : ""} to="/notification">
                    <i>
                        <box-icon name='notification' color={splitLocation[1] === "notification" ? 'white' : ''} />
                    </i>
                    
                    <span className="link_name">Notifications</span>
                </Link>
                <span className="tooltip">Notifications</span>
            </li>
            <li>
                <Link className={splitLocation[1] === "users" ? "isActive" : ""} to="/users">
                    <i>
                        <box-icon name='user-circle' color={splitLocation[1] === "users" ? 'white' : ''} />
                    </i>
                    
                    <span className="link_name">Users</span>
                </Link>
                <span className="tooltip">Users</span>
            </li>
            <li>
                <Link className={splitLocation[1] === "customer" ? "isActive" : ""} to="/customer">
                    <i>
                        <box-icon name='group' color={splitLocation[1] === "customer" ? 'white' : ''} />
                    </i>
                    
                    <span className="link_name">Customer</span>
                </Link>
                <span className="tooltip">Customer</span>
            </li>
       
         
            <li>
                <hr />
            </li>
            <li>
                
                <a href="#">
                    <i>
                        <box-icon name='log-out'/>
                    </i>
                    
                    <span className="link_name">Logout</span>
                </a>
                <span className="tooltip">Logout</span>
            </li>
            </ul>
    </div>
  )
}
