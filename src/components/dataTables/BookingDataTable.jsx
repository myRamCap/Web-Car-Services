import React, { useEffect, useState } from 'react';
import MaterialTable from "@material-table/core";
import EditIcon from '@mui/icons-material/Edit';
// import BookingsModal from '../../views/modal/BookingsModal';
import ZoomInRoundedIcon from '@mui/icons-material/ZoomInRounded';
import { Button, Popover, Typography } from '@mui/material';
import axiosClient from '../../axios-client';
import Loading from '../loader/Loading';
import Booking from '../../views/modal/Booking';
import { useStateContext } from '../../contexts/ContextProvider';
import { useLocation } from 'react-router-dom';

 

export default function BookingDataTable() {
  const location = useLocation()
  const {user_ID} = useStateContext()
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(true);
  const paginationAlignment = useState("center")
  const [booking, setBooking] = useState([])
  const [bookingInfo, setBookingInfo] = useState([
    {
      id: null,
      client_id: "",
      client_name: "",
      vehicle_id: "",
      vehicle_name: "",
      services_id: "",
      service: "",
      service_center_id: "",
      service_center: "",
      estimated_time: "",
      contact_number: null,
      status: "",
      booking_date: "",
      time: "",
      estimated_time_desc: "",
      notes: "",
    }
  ])

  // const [anchorEl, setAnchorEl] = React.useState(null);

  // const handleClick = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };

  // const handleClose = () => {
  //   setAnchorEl(null);
  // };

  // const open = Boolean(anchorEl);
  // const id = open ? 'simple-popover' : undefined;

  const getBooking = () => {
    setLoading(true)
    axiosClient.get(`/booking/${user_ID}`)
    .then(({data}) => {
      setBooking(data)
      setLoading(false)
    })
  }
 

  const columns = [
    { field: "client_name", title: "Client Name" },
    { field: "service", title: "Service" },
    { field: "service_center", title: "Service Center" },
    { field: "contact_number", title: "Contact Number" },
    { field: "status", title: "Status" },
    { field: "booking_date", title: "Booking Date" },
    { field: "created_at", title: "Date Created" },
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
      onClick: (event,rowData) => {
        setBookingInfo({
          ...bookingInfo,
          id: rowData.id,
          client_id: rowData.client_id,
          client_name: rowData.client_name,
          vehicle_id: rowData.vehicle_id,
          vehicle_name: rowData.vehicle_name,
          services_id: rowData.services_id,
          service: rowData.service,
          service_center_id: rowData.service_center_id,
          service_center: rowData.service_center,
          estimated_time: rowData.estimated_time,
          contact_number: rowData.contact_number,
          status: rowData.status,
          booking_date: rowData.booking_date,
          time: rowData.time,
          estimated_time_desc: rowData.estimated_time_desc,
          notes: rowData.notes,
        })
        setShowModal(true)
      }
    },
    // {
    //   icon: () => 
    //   <div className="btn btn-success btn-sm" onClick={handleClick}> <ZoomInRoundedIcon  /></div> ,
    //   tooltip: 'Note'
    // }
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

  const handleClose = () => {
    setShowModal(false)
    setBookingInfo([])
  }

  useEffect(() => {
    getBooking()
    if (location.state == 'success'){
      setShowModal(false)
      setBookingInfo([])
      getBooking()
      location.state = null
    }
  }, [location.state])

  return (
    <div>
          {/* <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Typography sx={{ p: 2 }}>Sangkap yukung Kape kabang manaya ku!</Typography>
      </Popover> */}

      <MaterialTable
        title=""
        columns={columns}
        data={booking.data}
        actions={action}
        options={options}
        isLoading={loading}
        components={components}
      />
      <Booking show={showModal} close={handleClose} userID={user_ID} Data={bookingInfo}/> 
    </div>
  )
}
