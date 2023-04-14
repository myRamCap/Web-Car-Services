import React, { useState } from 'react';
import MaterialTable from "@material-table/core";
import EditIcon from '@mui/icons-material/Edit';
import BookingsModal from '../../views/modal/BookingsModal';

export default function BookingDataTable() {
  const [showModal, setShowModal] = useState(false)
  const paginationAlignment = useState("center")

  const columns = [
    { field: "Name", title: "Name" },
    { field: "Service", title: "Service" },
    { field: "Service_center", title: "Service Center" },
    { field: "Contact_Number", title: "Contact Number" },
    { field: "Status", title: "Status" },
    { field: "Booking_Date", title: "Booking Date" },
    { field: "Date_Created", title: "Date Created" },

   ];

   const data = [
    { Name: "John Walsh", Service: "Oil Change", Service_center: "Ramcap 1 Dealers", Contact_Number: "12346799", Status: "In Process", Booking_Date: "2023-04-03", Date_Created: "2023-04-03" },
    { Name: "Bob Herm", Service: "New Tires", Service_center: "Ramcap 2 Dealers", Contact_Number: "987654321", Status: "Completed", Booking_Date: "2023-04-05", Date_Created: "2023-04-05" },
    { Name: "James Houston", Service: "Tire Rotation", Service_center: "Ramcap 3 Dealers", Contact_Number: "5123483545", Status: "Up Coming", Booking_Date: "2023-04-06", Date_Created: "2023-04-06" },
    { Name: "Joe James", Service: "Auto Detailing", Service_center: "Ramcap 4 Dealers", Contact_Number: "124984234216", Status: "Completed", Booking_Date: "2023-04-04", Date_Created: "2023-04-04" },
    { Name: "John Walsh", Service: "Window Tinting", Service_center: "Ramcap 5 Dealers", Contact_Number: "92852940273", Status: "Up Coming", Booking_Date: "2023-04-06", Date_Created: "2023-04-06" },
    { Name: "Bob Herm", Service: "New Car Purchase", Service_center: "Ramcap 6 Dealers", Contact_Number: "2795027536", Status: "Missed", Booking_Date: "2023-04-01", Date_Created: "2023-04-01" },
    { Name: "James Houston", Service: "Manufacturer Recall", Service_center: "Ramcap 7 Dealers", Contact_Number: "184029653", Status: "Cancelled", Booking_Date: "2023-04-07", Date_Created: "2023-04-07" },
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
      <BookingsModal show={showModal} close={() => setShowModal(false)} id={1}/> 
    </div>
  )
}
