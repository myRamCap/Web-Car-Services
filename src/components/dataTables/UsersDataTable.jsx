import React, { useEffect, useState } from 'react';
import MaterialTable from "@material-table/core";
import EditIcon from '@mui/icons-material/Edit';
import UserModal from '../../views/modal/UserModal';
import Loading from '../loader/Loading';
import axiosClient from '../../axios-client';
import { useStateContext } from '../../contexts/ContextProvider';

export default function UsersDataTable() {
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(true)
  const [users, setUsers] = useState([])
  const paginationAlignment = useState("center")
  const {role, user} = useStateContext()

  const getUsers = () => {
    setLoading(true)
    axiosClient.get(`/users/${role}` )
    .then(({data}) => {
      setUsers(data)
      setLoading(false)
    })
  }
console.log(role)
  const columns = [
    { title: 'Name', field: 'fullname' },
    { title: 'Email', field: 'email' },
    { title: 'Contact Number', field: 'contact_number' },
    { title: 'Role',field: 'role_name' },
  ]

 

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

  const components = {
    // define your custom components here
    OverlayLoading: () => <Loading />,
  };

  useEffect(() => {
    getUsers()
  }, [])

  return (
    <div>
      <MaterialTable
        title=""
        columns={columns}
        data={users.data}
        actions={action} 
        options={options}
        isLoading={loading}
        components={components}
      />
      <UserModal show={showModal} close={() => setShowModal(false)} id={1}/>
    </div>
  )
}
