import React, { useState } from 'react';
import MaterialTable from "@material-table/core";
import EditIcon from '@mui/icons-material/Edit';
import ServiceCenterServiceModal from '../../views/modal/ServiceCenterServiceModal';
import { useLocation } from 'react-router-dom';

export default function ServiceCenterServicesDataTable() {
  const [showModal, setShowModal] = useState(false)
  const paginationAlignment = useState("center")
  
  const columns = [
    { field: "Name", title: "Name" },
    { field: "Details", title: "Details" },
    { field: "Date_Created", title: "Date Created" }
   ];

   const data = [
    { Name: "Oil Change", Details: "Oil Change", Date_Created: "2023-04-03" },
    { Name: "New Tires", Details: "New Tires", Date_Created: "2023-04-05" },
    { Name: "Tire Rotation", Details: "Tire Rotation", Date_Created: "2023-04-06" },

   ];

   const action = [
    {
      icon: () => <div className="btn btn-primary">Add New</div> ,
      tooltip: 'Add User',
      isFreeAction: true,
      onClick: (event) => setShowModal(true)
    },
    {
      icon: () => <div className="btn btn-success btn-sm"><EditIcon  /></div> ,
      tooltip: 'Edit User',
      onClick: (event) => setShowModal(true)
    }
  ]

  const options = {
    paginationAlignment,
    actionsColumnIndex: -1,
    searchFieldAlignment: "left",
    //selection: true,
    searchFieldStyle: {
      whiteSpace: 'nowrap',
      // width: '60%', 
      fontWeight: 450,
    },
    rowStyle: {
      fontSize: 14,
    },
    headerStyle: {
      whiteSpace: 'nowrap',
      flexDirection: 'row',
      overflow: 'hidden', 
      backgroundColor:'#8d949e',
      color: '#F1F1F1',
      fontSize: 16,
    },
  }

  return (
    <div>
      <MaterialTable
        title=""
        columns={columns}
        data={data}
        actions={action}
        options={options}
      />
      <ServiceCenterServiceModal show={showModal} close={() => setShowModal(false)} id={1}/> 
    </div>
  )
}
