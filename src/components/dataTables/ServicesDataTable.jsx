import React, { useEffect, useState } from 'react';
import MaterialTable from "@material-table/core";
import EditIcon from '@mui/icons-material/Edit';
import ServicesModal from '../../views/modal/ServiceModal';
import axiosClient from '../../axios-client';
import { useLocation } from 'react-router-dom';

export default function ServicesDataTable() {
  const location = useLocation()
  const [showModal, setShowModal] = useState(false)
  const paginationAlignment = useState("center")
  const [services, setServices] = useState([])

  useEffect(() => {
    getServices()
  }, [])

  const getServices = () => {
    // loading here
    axiosClient.get('/services')
      .then(({data}) => {
        setServices(data)
      })
  }
  
  const columns = [
    { field: "id", title: "ID", hidden: true, },
    { field: "image", title: "Image", width: 100, render: (rowData) => {
        const styles = { width: 80 };
        return <img src={rowData.image} style={styles} />;
      },
    },
    { field: "name", title: "Name", customSort: (a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: 'base' })},
    { field: "details", title: "Details", customSort: (a, b) => a.details.localeCompare(b.details, undefined, { sensitivity: 'base' }) },
    { field: "created_at", title: "Date Created", customSort: (a, b) => a.created_at.localeCompare(b.created_at, undefined, { sensitivity: 'base' }) }
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

  useEffect(() => {
    // getServicesLogo()
    if (location.state){
      getServices()
      setShowModal(false)
      location.state = null
    }
  }, [location.state])

  return (
    <div>
      <MaterialTable
        title=""
        columns={columns}
        data={services.data}
        actions={action}
        options={options}
      />
      <ServicesModal show={showModal} close={() => setShowModal(false)} id={1}/> 
    </div>
  )
}
