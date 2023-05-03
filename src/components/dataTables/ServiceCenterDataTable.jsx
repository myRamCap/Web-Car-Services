import React, { useEffect, useState } from 'react';
import MaterialTable from "@material-table/core";
import EditIcon from '@mui/icons-material/Edit';
import { color } from '@mui/system';
import ServiceCenterModal from '../../views/modal/ServiceCenterModal';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axiosClient from '../../axios-client';

export default function ServiceCenterDataTable(props) {
  // const location = useLocation()
  // console.log(location.state)
  const location = useLocation()
  const [showModal, setShowModal] = useState(false)
  const paginationAlignment = useState("center")
  const [serviceCenter, setServiceCenter] = useState([])
  const [serviceCenterInfo, setServiceCenterInfo] = useState([
    {
      id: null,
      name: "",
      Category: "",
      country: "",
      house_number: "",
      barangay: "",
      municipality: "",
      province: "",
      longitude: "",
      latitude: "",
      branch_manager_id: "",
      image: "",
    }
  ])

  const getServiceCenter = () => {
    // loading here
    axiosClient.get('/servicecenter')
      .then(({data}) => {
        setServiceCenter(data)
      })
  }

  const columns = [
    { field: "name", title: "Name", customSort: (a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: 'base' }), render:rowData=><Link underline="hover" to={`/servicecenter/details/${rowData.id}`} state={{SCName:rowData.name}}>{rowData.name}</Link>},
    { field: "category", title: "Category", customSort: (a, b) => a.category.localeCompare(b.category, undefined, { sensitivity: 'base' }) },
    { field: "barangay", title: "Barangay", customSort: (a, b) => a.barangay.localeCompare(b.barangay, undefined, { sensitivity: 'base' }) },
    { field: "municipality", title: "Municipality", customSort: (a, b) => a.municipality.localeCompare(b.municipality, undefined, { sensitivity: 'base' }) },
    { field: "province", title: "Province", customSort: (a, b) => a.province.localeCompare(b.province, undefined, { sensitivity: 'base' }) },
    { field: "created_at", title: "Date Created" },
   ];

   const action = [
    {
      icon: () => <div className="btn btn-primary">Add New</div> ,
      tooltip: 'Add User',
      isFreeAction: true,
      onClick: ((event) => {
        setShowModal(true)
        localStorage.removeItem('lati')
        localStorage.removeItem('longi')
      })
    },
    {
      icon: () => <div className="btn btn-success btn-sm"><EditIcon  /></div> ,
      tooltip: 'Edit User',
      onClick: (event,rowData) => {
        setServiceCenterInfo({
          ...serviceCenterInfo,
          id: rowData.id,
          name: rowData.name,
          category: rowData.category,
          country: rowData.country,
          house_number: rowData.house_number,
          barangay: rowData.barangay,
          municipality: rowData.municipality,
          province: rowData.province,
          longitude: rowData.longitude,
          latitude: rowData.latitude,
          branch_manager_id: rowData.branch_manager_id,
          image: rowData.image,
        })
        setShowModal(true)
      }
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
    getServiceCenter()
    if (location.state == 'success'){
      getServiceCenter()
      setShowModal(false)
      location.state = null
    }
  }, [location.state])

  const handleClose = () => {
    setShowModal(false)
    setServiceCenterInfo([])
  }

  return (
    <div>
      <MaterialTable
        title=""
        columns={columns}
        data={serviceCenter.data}
        actions={action}
        options={options}
      />
      <ServiceCenterModal show={showModal} close={handleClose} Data={serviceCenterInfo} /> 
    </div>
  )
}
