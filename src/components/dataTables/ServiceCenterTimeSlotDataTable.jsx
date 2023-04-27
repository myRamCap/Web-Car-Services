import React, { useState } from 'react';
import MaterialTable from "@material-table/core";
import EditIcon from '@mui/icons-material/Edit';
import TimeSlotModal from '../../views/modal/TimeSlotModal';

export default function ServiceCenterTimeSlotDataTable() {
  const [showModal, setShowModal] = useState(false)
  const paginationAlignment = useState("center")

  const columns = [
    { field: "Timeslot", title: "Time Slot" },
    { field: "MaxLimit", title: "Max Limit" },
    { field: "Booking_Date", title: "Booking Date" },
    { field: "Date_Created", title: "Date Created" },

   ];

   const data = [
    { Timeslot: "08:00", MaxLimit: "1", Booking_Date: "2023-04-03", Date_Created: "2023-04-03" },
    { Timeslot: "08:30", MaxLimit: "1", Booking_Date: "2023-04-05", Date_Created: "2023-04-05" },
    { Timeslot: "09:00", MaxLimit: "1", Booking_Date: "2023-04-06", Date_Created: "2023-04-06" },
    { Timeslot: "09:30", MaxLimit: "1", Booking_Date: "2023-04-06", Date_Created: "2023-04-04" },
    { Timeslot: "10:00", MaxLimit: "1", Booking_Date: "2023-04-06", Date_Created: "2023-04-06" },
    { Timeslot: "10:30", MaxLimit: "1", Booking_Date: "2023-04-01", Date_Created: "2023-04-01" },
    { Timeslot: "11:00", MaxLimit: "1", Booking_Date: "2023-04-07", Date_Created: "2023-04-07" },
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
      <TimeSlotModal show={showModal} close={() => setShowModal(false)} id={1}/> 
    </div>
  )
}
