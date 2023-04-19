import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Box, Tab } from '@mui/material'
import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import ServiceCenterBooking from '../../views/pages/ServiceCenterBooking'
import ServiceCenterTimeSlot from '../../views/pages/ServiceCenterTimeSlot'
import ServiceCenterServices from '../../views/pages/ServiceCenterServices'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function ServiceCenterTabs() {
    const location = useLocation()
    const [value, setValue] = useState('1')

    const handleChange = (event, newValue) => {
        setValue(newValue)
    }

  return (
    <div id="services">
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <h1 className='pb-2'>{location.state}</h1>
        </div> 
        
        <button className="btn btn-secondary"><ArrowBackIcon /> Back</button>
        <Box sx={{width: '100%', typography: 'body1'}} className="pt-3">
            <TabContext value={value}>
                <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                        <Tab label="Services" value="1" /> 
                        <Tab label="Time Slot" value="2" /> 
                        <Tab label="Booking" value="3" /> 
                    </TabList>
                    <TabPanel value="1">
                        <ServiceCenterServices />
                    </TabPanel>
                    <TabPanel value="2">
                        <ServiceCenterTimeSlot />
                    </TabPanel>
                    <TabPanel value="3">
                        <ServiceCenterBooking />
                    </TabPanel>
                </Box>
            </TabContext>
        </Box>
    </div>
  )
}
