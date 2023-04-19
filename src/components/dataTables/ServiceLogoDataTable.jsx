import React, { useState } from 'react';
import MaterialTable from "@material-table/core";
import EditIcon from '@mui/icons-material/Edit';
import ServicesLogoModal from '../../views/modal/ServicesLogoModal';

export default function ServiceLogoDataTable() {
    const [showModal, setShowModal] = useState(false)
    const paginationAlignment = useState("center")

    const columns = [
        { field: "Name", title: "Image", width: 100, render: (rowData) => {
            const styles = { width: 40, borderRadius: "50%" };
            return <img src={rowData.imageUrl} style={styles} />;
          },
        },
        { field: "Details", title: "Name" },
        { field: "Date_Created", title: "Date Created" }
    ];

    const data = [
        { Name: "Oil Change", Details: "Oil Change", Date_Created: "2023-04-03", imageUrl: "https://avatars0.githubusercontent.com/u/7895451?s=460&v=4" },
        { Name: "New Tires", Details: "New Tires", Date_Created: "2023-04-05", imageUrl: "https://avatars0.githubusercontent.com/u/7895451?s=460&v=4" },
        { Name: "Tire Rotation", Details: "Tire Rotation", Date_Created: "2023-04-06", imageUrl: "https://avatars0.githubusercontent.com/u/7895451?s=460&v=4" },
        { Name: "Auto Detailing", Details: "Auto Detailing", Date_Created: "2023-04-04", imageUrl: "https://avatars0.githubusercontent.com/u/7895451?s=460&v=4" },
        { Name: "Window Tinting", Details: "Window Tinting", Date_Created: "2023-04-06", imageUrl: "https://avatars0.githubusercontent.com/u/7895451?s=460&v=4" },
        { Name: "New Car Purchase", Details: "New Car Purchase", Date_Created: "2023-04-01", imageUrl: "https://avatars0.githubusercontent.com/u/7895451?s=460&v=4" },
        { Name: "Manufacturer Recall", Details: "Manufacturer Recall", Date_Created: "2023-04-07", imageUrl: "https://avatars0.githubusercontent.com/u/7895451?s=460&v=4" },
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
      <ServicesLogoModal show={showModal} close={() => setShowModal(false)} id={1}/>
    </div>
  )
}
