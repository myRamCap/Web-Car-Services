import React, { useState } from 'react';
import MaterialTable from "@material-table/core";
import EditIcon from '@mui/icons-material/Edit';

export default function VehiclesDataTable() {
  const paginationAlignment = useState("center")

  const columns = [
    { field: "Name", title: "Customer Name" },
    { field: "Chassis_Number", title: "Chassis Number" },
    { field: "Contact_Number", title: "Contact Number" },
    { field: "Model", title: "Model" },
    { field: "Year", title: "Year" },
    { field: "Date_Created", title: "Date Created" },
   ];

  const data = [
    { Name: "Joe James", Chassis_Number: "ABC12345", Contact_Number: "123456789", Model: "Civic", Year: "2022", Date_Created: "2023-04-03" },
    { Name: "John Walsh", Chassis_Number: "DEF67890", Contact_Number: "987654321", Model: "Fortuner", Year: "2020", Date_Created: "2023-04-05" },
    { Name: "Bob Herm", Chassis_Number: "GHI111213", Contact_Number: "1231445862", Model: "City", Year: "2021", Date_Created: "2023-04-06" },
    { Name: "James Houston", Chassis_Number: "JKL141516", Contact_Number: "9753863362", Model: "Dodge", Year: "2023", Date_Created: "2023-04-04" },
    { Name: "Joe James", Chassis_Number: "MNO171819", Contact_Number: "6491017362", Model: "Montero", Year: "2022", Date_Created: "2023-04-06" },
    { Name: "John Walsh", Chassis_Number: "PQR202122", Contact_Number: "52940163512", Model: "Vios", Year: "2022", Date_Created: "2023-04-01 " },
    { Name: "Bob Herm", Chassis_Number: "STU232425", Contact_Number: "01587459043", Model: "Raptor", Year: "2023", Date_Created: "2023-04-07" },
  ];

  const action = [
    {
      icon: () => <div className="btn btn-primary">Add New</div> ,
      tooltip: 'Add User',
      isFreeAction: true,
      onClick: (event) => alert("You want to add a new row")
    },
    {
      icon: () => <div className="btn btn-success btn-sm"><EditIcon  /></div> ,
      tooltip: 'Save User',
      onClick: (event) => alert("You edit")
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
    </div>
  )
}
