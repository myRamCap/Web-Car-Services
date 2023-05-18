import React, { useEffect, useState } from 'react';
import MaterialTable from "@material-table/core";
import EditIcon from '@mui/icons-material/Edit';
import UserModal from '../../views/modal/UserModal';
import Loading from '../loader/Loading';
import axiosClient from '../../axios-client';
import { useStateContext } from '../../contexts/ContextProvider';
import { useLocation } from 'react-router-dom';

export default function UsersDataTable() {
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(true)
  const [users, setUsers] = useState([])
  const location = useLocation()
  const paginationAlignment = useState("center")
  const {role, user, user_ID} = useStateContext()
  const [userInfo, setUserInfo] = useState([
    {
      id: null,
      first_name: "",
      last_name: "",
      email: "",
      contact_number: "",
      role_id: "",
      role_name: "",
    }
  ])

  const getUsers = async () => {
    setLoading(true)
    try {
      const response = await axiosClient.get(`/users/${user_ID}` )
      setUsers(response.data)
    } catch (error) {
      // Handle error
    } finally {
      setLoading(false);
    }
  }
  
  const columns = [
    { title: 'Name', field: 'fullname' },
    { title: 'Email', field: 'email' },
    { title: 'Contact Number', field: 'contact_number' },
    { title: 'Role',field: 'role_name' },
  ]

  const handleAddUser = () => {
    setShowModal(true);
  };
  
  const handleEditUser = (rowData) => {
    setUserInfo({
      id: rowData.id,
      first_name: rowData.first_name,
      last_name: rowData.last_name,
      email: rowData.email,
      contact_number: rowData.contact_number,
      role_id: rowData.role_id,
      role_name: rowData.role_name,
    });
    setShowModal(true);
  };

   const action = [
    {
      icon: () => <div className="btn btn-primary">Add New</div> ,
      tooltip: 'Add User',
      isFreeAction: true,
      onClick: handleAddUser,
    },
    {
      icon: () => <div className="btn btn-success btn-sm"><EditIcon  /></div> ,
      tooltip: 'Edit User',
      onClick: handleEditUser,
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

  const handleModalClose = () => {
    setShowModal(false)
    setUserInfo([])
  }

  useEffect(() => {
    getUsers()
    if (location.state == 'success'){
      getUsers()
      setShowModal(false)
      location.state = null
    }
  }, [location.state])

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
      <UserModal show={showModal} close={handleModalClose} Data={userInfo} />
    </div>
  )
}
