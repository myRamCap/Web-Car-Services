import React from 'react'
import ServicesLogoDataTable from '../../components/dataTables/ServicesLogoDataTable'

export default function Services_Logo() {
  return (
    <div id="services">
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <h1 className='pb-2'>Services Logo</h1>
      </div> 
        <ServicesLogoDataTable />
    </div>
  )
}
