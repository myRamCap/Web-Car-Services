import React, { useEffect, useState } from 'react';
import MaterialTable from "@material-table/core";
import EditIcon from '@mui/icons-material/Edit';
import NotificationModal from '../../views/modal/NotificationModal';
import { useLocation } from 'react-router-dom';
import axiosClient from '../../axios-client';
import Loading from '../loader/Loading';

export default function NotificationDataTable() {
    const location = useLocation()
    const [showModal, setShowModal] = useState(false)
    const paginationAlignment = useState("center")
    const [loading, setLoading] = useState(true);
    const [notification, setNotification] = useState([])
    const [notificationInfo, setNotificationInfo] = useState({
      id: null,
      corporate_id: null,
      first_name: null,
      last_name: null,
      service_center_id: null,
      service_center: null,
      title: "",
      content: "",
      datefrom: "",
      dateto: "",
      image_url: null,
    })

    const getNotification = () => {
      // setLoading(true)
      // try {
      //   const {data} = await axiosClient.get('/notification')
      //   setNotification(data.data)
      //   setLoading(false)
      // } catch (error) {

      // }

      setLoading(true)
      axiosClient.get('/web/notification')
    .then(({data}) => {
      setNotification(data)
      setLoading(false)
    })
    }

    const columns = [
        // { field: "image_url", title: "Image", width: 100, render: (rowData) => {
        //     const styles = { width: 80, borderRadius: "50%" };
        //     return <img src={rowData.image_url} style={styles} />;
        // },},
        { field: "title", title: "Title" },
        { field: "content", title: "Content" },
        { field: "date_range", title: "Date Range" },
        { field: "created_at", title: "Date Created" }
    ];

    
    
    const action = [
        {
          icon: () => <div className="btn btn-primary">Add New</div> ,
          isFreeAction: true,
          onClick: (event) => setShowModal(true)
        },
        {
          icon: () => <div className="btn btn-success btn-sm"><EditIcon  /></div> ,
          tooltip: 'Edit',
          onClick: (event,rowData) => {
            console.log(rowData)
            setNotificationInfo({
              ...notificationInfo,
              id: rowData.id,
              corporate_id: rowData.corporate_id,
              first_name: rowData.first_name,
              last_name: rowData.last_name,
              service_center_id: rowData.service_center_id,
              service_center: rowData.service_center,
              title: rowData.title,
              content: rowData.content,
              datefrom: rowData.datefrom,
              dateto: rowData.dateto,
              image_url: rowData.image_url,
            })
            setShowModal(true)
          }
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
        // setVehicleInfo([])
      }

      useEffect(() => {
        getNotification()
        if (location.state == 'success'){
          getNotification()
          setShowModal(false)
          location.state = null
        }
      }, [location.state])

  return (
    <div>
        <MaterialTable
        title=""
        columns={columns}
        data={notification.data}
        actions={action}
        options={options}
        isLoading={loading}
        components={components}
      />
      <NotificationModal show={showModal} close={handleModalClose} Data={notificationInfo}/>
    </div>
  )
}
