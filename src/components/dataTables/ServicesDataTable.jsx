import React, { useEffect, useState } from 'react';
import MaterialTable from "@material-table/core";
import EditIcon from '@mui/icons-material/Edit';
import ServicesModal from '../../views/modal/ServiceModal';
import axiosClient from '../../axios-client';

export default function ServicesDataTable() {
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
        // console.log(data)
        setServices(data)
      })
  }
  
  const columns = [
    { field: "id", title: "ID", hidden: true, },
    // { field: "image", title: "Image" },
    { field: "image", title: "Image", width: 100, render: (rowData) => {
      const styles = { width: 80 };
      return <img src={rowData.image} style={styles} />;
    },
  },
    { field: "name", title: "Name" },
    { field: "details", title: "Details" },
    { field: "created_at", title: "Date Created" }
   ];

   const data = [
    { Name: "Oil Change", Details: "Oil Change", Date_Created: "2023-04-03" },
    { Name: "New Tires", Details: "New Tires", Date_Created: "2023-04-05" },
    { Name: "Tire Rotation", Details: "Tire Rotation", Date_Created: "2023-04-06" },
    { Name: "Auto Detailing", Details: "Auto Detailing", Date_Created: "2023-04-04" },
    { Name: "Window Tinting", Details: "Window Tinting", Date_Created: "2023-04-06" },
    { Name: "New Car Purchase", Details: "New Car Purchase", Date_Created: "2023-04-01 " },
    { Name: "Manufacturer Recall", Details: "Manufacturer Recall", Date_Created: "2023-04-07" },
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
      tooltip: 'Save User',
      onClick: (event) => setShowModal(true)
    }
  ]
  
  console.log(services.data)

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
        data={services.data}
        actions={action}
        options={options}
      />
      <ServicesModal show={showModal} close={() => setShowModal(false)} id={1}/> 
    </div>
  )
}
