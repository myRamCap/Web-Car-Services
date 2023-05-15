import React, { useState } from 'react';
import MaterialTable from "@material-table/core";
import EditIcon from '@mui/icons-material/Edit';
import PromotionModal from '../../views/modal/PromotionModal';

export default function PromotionDataTable() {
    const [showModal, setShowModal] = useState(false)
    const paginationAlignment = useState("center")

    const columns = [
        { field: "Title", title: "Image", width: 100, render: (rowData) => {
            const styles = { width: 80, borderRadius: "50%" };
            return <img src={rowData.imageUrl} style={styles} />;
        },},
        { field: "Title", title: "Title" },
        { field: "Content", title: "Content" },
        { field: "Date_Created", title: "Date Created" }
    ];

    const data = [
        { Title: "Sale", Content: "Promo", Date_Created: "2023-04-03", imageUrl: "https://hips.hearstapps.com/hmg-prod/images/2019-honda-civic-sedan-1558453497.jpg?resize=480:*" },
        { Title: "Sale", Content: "Promo", Date_Created: "2023-04-05", imageUrl: "https://hips.hearstapps.com/hmg-prod/images/2019-honda-civic-sedan-1558453497.jpg?resize=480:*" },
        { Title: "Sale", Content: "Promo", Date_Created: "2023-04-06", imageUrl: "https://hips.hearstapps.com/hmg-prod/images/2019-honda-civic-sedan-1558453497.jpg?resize=480:*" },
        { Title: "Sale", Content: "Promo", Date_Created: "2023-04-04", imageUrl: "https://hips.hearstapps.com/hmg-prod/images/2019-honda-civic-sedan-1558453497.jpg?resize=480:*" },
        { Title: "Sale", Content: "Promo", Date_Created: "2023-04-06", imageUrl: "https://hips.hearstapps.com/hmg-prod/images/2019-honda-civic-sedan-1558453497.jpg?resize=480:*" },
        { Title: "Sale", Content: "Promo", Date_Created: "2023-04-01", imageUrl: "https://hips.hearstapps.com/hmg-prod/images/2019-honda-civic-sedan-1558453497.jpg?resize=480:*" },
        { Title: "Sale", Content: "Promo", Date_Created: "2023-04-07", imageUrl: "https://hips.hearstapps.com/hmg-prod/images/2019-honda-civic-sedan-1558453497.jpg?resize=480:*" },
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
      <PromotionModal show={showModal} close={() => setShowModal(false)} id={1}/>
    </div>
  )
}
