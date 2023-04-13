import React from 'react'
import CustomerDataTable from '../components/dataTables/CustomerDataTable'

export default function Customer() {
  return (
    <div id="customer">
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <h1 className='pb-2'>Customer</h1>
        </div> 
        <CustomerDataTable />
    </div>
  )
}
