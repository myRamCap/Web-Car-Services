import React from 'react'
import NotificationDataTable from '../../components/dataTables/NotificationDataTable'

export default function Notification() {
  return (
    <div id="notification">
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <h1 className='pb-2'>Notifications</h1>
      </div> 
        <NotificationDataTable />
    </div>
  )
}
