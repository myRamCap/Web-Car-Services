import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './navbar/Navbar'


export default function DefaultLayout() {
    
  return (
    <div>
        <Navbar />
        <div className="home_content"> 
                <Outlet />
        </div>
    </div>
  )
}
