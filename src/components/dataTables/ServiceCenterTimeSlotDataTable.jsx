import React, { useEffect, useState } from 'react';
import MaterialTable from "@material-table/core";
import EditIcon from '@mui/icons-material/Edit';
import TimeSlotModal from '../../views/modal/TimeSlotModal';
import axiosClient from '../../axios-client';
import { useLocation, useParams } from 'react-router-dom';
import Loading from '../loader/Loading';

export default function ServiceCenterTimeSlotDataTable() {
  const location = useLocation()
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(true);
  const param = useParams()
  const paginationAlignment = useState("center")
  const [serviceCenterTimeSLot, setServiceCenterTimeSLot] = useState([])
  const [serviceCenterTimeSLotInfo, setServiceCenterTimeSLotInfo] = useState([
    {
      id: null,
      service_center_id: null,
      time: null,
      // max_limit: null
    }
  ])

  const getServiceCenterTimeSlot = () => {
    setLoading(true)
    axiosClient.get(`/web/service_center/timeslot/${param.id}`)
    .then(({data}) => {
      setServiceCenterTimeSLot(data)
      setLoading(false)
    })
  }

  const columns = [
    { field: "time", title: "Time Slot" },
    // { field: "max_limit", title: "Max Limit" },
    { field: "date_created", title: "Date Created" },

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
        setServiceCenterTimeSLotInfo({
          ...serviceCenterTimeSLotInfo,
          id: rowData.id,
          service_center_id: rowData.service_center_id,
          time: rowData.time,
          // max_limit: rowData.max_limit,
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

  const handleClose = () => {
    setShowModal(false)
    setServiceCenterTimeSLotInfo([])
  }

  useEffect(() => {
    getServiceCenterTimeSlot()
    if (location.state == 'success'){
      getServiceCenterTimeSlot()
      setShowModal(false)
      setServiceCenterTimeSLotInfo([])
      location.state = null
    }
  }, [location.state])

  return (
    <div>
      <MaterialTable
        title=""
        columns={columns}
        data={serviceCenterTimeSLot.data}
        actions={action}
        options={options}
        isLoading={loading}
        components={components}
      />
      <TimeSlotModal show={showModal} close={handleClose} Data={serviceCenterTimeSLotInfo} /> 
    </div>
  )
}
