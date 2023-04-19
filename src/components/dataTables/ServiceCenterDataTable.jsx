import React, { useState } from 'react';
import MaterialTable from "@material-table/core";
import EditIcon from '@mui/icons-material/Edit';
import { color } from '@mui/system';
import ServiceCenterModal from '../../views/modal/ServiceCenterModal';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function ServiceCenterDataTable(props) {
  // const location = useLocation()
  // console.log(location.state)
  const [showModal, setShowModal] = useState(false)
  const paginationAlignment = useState("center")
  const navigate = useNavigate()

  const handleClickSC = () => {
    console.log(rowData.Name)
    // navigate('//servicecenter/test', {state: { id: data.id, email: data.email }})
  }

  const columns = [
    { field: "Name", title: "Name", render:rowData=><Link underline="hover" to='/servicecenter/services' state={rowData.Name}>{rowData.Name}</Link>},
    { field: "Category", title: "Category" },
    { field: "Brgy", title: "Barangay" },
    { field: "Municipality", title: "Municipality" },
    { field: "Province", title: "Province" },
    { field: "Date_Created", title: "Date Created" },
   ];

   const data = [
    { Name: "Ramcap 1 Dealers", Category: "Dealership", Brgy: "Cristo rey", Municipality: "Capas", Province: "Tarlac", Date_Created: "2023-04-03" },
    { Name: "Ramcap 2 Dealers", Category: "Non Dealership", Brgy: "Sta Lucia", Municipality: "Capas", Province: "Tarlac", Date_Created: "2023-04-05" },
    { Name: "Ramcap 3 Dealers", Category: "Dealership", Brgy: "Patling", Municipality: "Capas", Province: "Tarlac", Date_Created: "2023-04-06" },
    { Name: "Ramcap 1 Dealers", Category: "Non Dealership", Brgy: "Aranguren", Municipality: "Capas", Province: "Tarlac", Date_Created: "2023-04-04" },
    { Name: "Ramcap 4 Dealers", Category: "Dealership", Brgy: "Lawy", Municipality: "Capas", Province: "Tarlac", Date_Created: "2023-04-06" },
    { Name: "Ramcap 5 Dealers", Category: "Non Dealership", Brgy: "Bueno", Municipality: "Capas", Province: "Tarlac", Date_Created: "2023-04-01 " },
    { Name: "Ramcap 1 Dealers", Category: "Dealership", Brgy: "Kamatis", Municipality: "Capas", Province: "Tarlac", Date_Created: "2023-04-07" },
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
      tooltip: 'Save User',
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
      <button>randy button</button>
      <MaterialTable
        title=""
        columns={columns}
        data={data}
        actions={action}
        options={options}
      />
      <ServiceCenterModal show={showModal} close={() => {setShowModal(false)}} id={1} /> 
    </div>
  )
}
