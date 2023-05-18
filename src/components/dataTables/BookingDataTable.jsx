import React, { useEffect, useState } from 'react';
import MaterialTable from "@material-table/core";
import EditIcon from '@mui/icons-material/Edit';
// import BookingsModal from '../../views/modal/BookingsModal';
import ZoomInRoundedIcon from '@mui/icons-material/ZoomInRounded';
import { Button, Popover, Typography } from '@mui/material';
import axiosClient from '../../axios-client';
import Loading from '../loader/Loading';

 

export default function BookingDataTable() {
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(true);
  const paginationAlignment = useState("center")
  const [booking, setBooking] = useState([])

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
    axiosClient.get('/service_center/booking')
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
      onClick: (event) => setShowModal(true)
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

  useEffect(() => {
    getBooking()
  }, [])

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
      {/* <BookingsModal show={showModal} close={() => setShowModal(false)} id={1}/>  */}
    </div>
  )
}
