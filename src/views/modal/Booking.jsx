import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form'
import React, { useEffect, useState } from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { Autocomplete, FormControlLabel, Input, Radio, RadioGroup, TextField } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import Customer from '../../data/JSON/dummy/refCustomer.json'
import Services from '../../data/JSON/dummy/refServices.json'
import Vehicles from '../../data/JSON/dummy/refVehicles.json'
import Status from '../../data/JSON/dummy/refStatus.json'
import SC from '../../data/JSON/dummy/refSC.json'
import Time from '../../data/JSON/dummy/refTime.json'
import axiosClient from '../../axios-client';


export default function Booking(props) {
  const [disabledVehicle, setDisabledVehicle] = useState(true)
  const [disabledTime, setDisabledTime] = useState(true)
  const [services, setServices] = useState([])
  const [timeSlot, setTimeSlot] = useState([])
  const [vehicle, setVehicle] = useState([])
  const [clients, setClients] = useState([])
  const [booking, setBooking] = useState({
    id: null,
    client_id: "",
    client_name: "",
    vehicle_id: "",
    vehicle_name: "",
    services_id: "",
    service: "",
    estimated_time: "",
    service_center_id: "",
    contact_number: null,
    status: "",
    booking_date: null,
    time: "",
    estimated_time_desc: "",
    notes: "",
  })

  const getClients = () => {
    axiosClient.get('/client')
    .then(({data}) => {
      setClients(data.data)
    })
  }

  // const getServices = () => {
  //   axiosClient.get('/service_center/services')
  //   .then(({data}) => {
  //     setServices(data.data)
  //   })
  // }

  // const getTimeSlot = () => {
  //   axiosClient.get('/service_center/timeslot')
  //   .then(({data}) => {
  //     setTimeSlot(data.data)
  //   })
  // }

  // // const getVehicle = () => {
  // //   axiosClient.get('/service_center/timeslot')
  // //   .then(({data}) => {
  // //     setVehicle(data.data)
  // //   })
  // // }

  const handleChangeClient = async (event, newValue) => {
    setDisabledVehicle(true)
    setVehicle([])
    setBooking({
      ...booking,
      client_id: newValue.id,
      client_name: newValue.fullname,
      vehicle_name: "",
      vehicle_id: "",
    })

    try {
      const {data} = await axiosClient.get(`/service_center/vehicle/${newValue.id}`)
      setVehicle(data)
      setDisabledVehicle(false)
    } catch (error) {

    }
  }

  const handleChangeDate = async (event, newValue) => {
    setDisabledTime(true)
    const d = new Date(date);
    const year = d.getFullYear();
    const month = ('0' + (d.getMonth() + 1)).slice(-2);
    const day = ('0' + d.getDate()).slice(-2);
    const convertedDate = year + '/' + month + '/' + day;
    setBooking({
      ...booking,
      booking_date: convertedDate,
    })

    try {
      const {data} = await axiosClient.get(`/service_center/timeslot/${param.id}/${convertedDate}`)
      setTimeSlot(data.data)
      setDisabledTime(false)
    } catch (error) {

    }
  }

  const handleChangeVehicle = (event, newValue) => {
    setBooking({
      ...booking,
      vehicle_id: newValue.id,
      vehicle_name: newValue.vehicle_name,
    })
  }

  const optionsClient = clients.map((option) => {
    const firstLetter = option.fullname[0].toUpperCase();
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
      ...option,
    };
  })

  // const optionsServices = services.map((option) => {
  //   const firstLetter = option.name[0].toUpperCase();
  //   return {
  //     firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
  //     ...option,
  //   };
  // })

  // const optionsStatus = Status.RECORDS.map((option) => {
  //   const firstLetter = option.name[0].toUpperCase();
  //   return {
  //     firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
  //     ...option,
  //   };
  // }) 

  // const optionsSC = SC.RECORDS.map((option) => {
  //   const firstLetter = option.name[0].toUpperCase();
  //   return {
  //     firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
  //     ...option,
  //   };
  // })

  // const optionsTime = timeSlot.map((option) => {
  //   const firstLetter = option.time[0].toUpperCase();
  //   return {
  //     firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
  //     ...option,
  //   };
  // })

  const onSubmit = (ev) => {
    alert('randy')
    ev.preventDefault()
  }

  useEffect(() => {
    // getServices()
    // getTimeSlot()
    getClients()
  }, [])

  return (
    <div id="servicesModal">
        <Modal show={props.show} onHide={props.close} backdrop="static" size="lg">
            <Modal.Header closeButton>
            <Modal.Title>Create Booking</Modal.Title>
            </Modal.Header>
            <Modal.Body className="modal-main">
            <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Row>
                <Col xs={12} md={6}>
                  <Autocomplete
                    id="customerName"
                    disableClearable
                    options={optionsClient.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
                    onChange={handleChangeClient}
                    value={booking.client_name}
                    getOptionLabel={(options) => options.fullname ? options.fullname.toString() : booking.client_name}
                    isOptionEqualToValue={(option, value) => option.fullname ?? "" === booking.client_name}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Client Name"
                        InputProps={{
                          ...params.InputProps,
                          type: 'search',
                        }}
                      />
                    )}
                  />
                </Col>

                <Col xs={12} md={6}> 
                  <LocalizationProvider dateAdapter={AdapterDayjs} >
                    <DatePicker 
                      disablePast
                      value={booking.booking_date ? dayjs(booking.booking_date) : null}
                      className='datePicker' 
                      label="Date"
                      onChange={handleChangeDate}
                      renderInput={(params) => <TextField {...params} fullWidth />}
                    />
                  </LocalizationProvider>
                </Col>
              </Row>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Row>
                <Col xs={12} md={6}>
                  {/* <Autocomplete
                    id="service"
                    disableClearable
                    // onChange={handleChangeService}
                    // value={booking.service}
                    options={optionsServices.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
                    getOptionLabel={(options) => options.name ? options.name+' - '+options.estimated_time_desc : booking.service+' - '+booking.estimated_time_desc}
                    isOptionEqualToValue={(option, value) => option.name ?? "" === booking.service}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Service"
                        InputProps={{
                          ...params.InputProps,
                          type: 'search',
                        }}
                      />
                    )}
                  /> */}
                </Col>

                <Col xs={12} md={6}> 
                  <Autocomplete
                    id="time"
                    disableClearable
                    disabled={disabledTime}
                    // options={optionsTime.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
                    // getOptionLabel={(options) => options.time }  
                    // isOptionEqualToValue={(option, value) => option.time === value.time}
                    renderInput={(params) => (
                        <TextField
                        {...params}
                        label="Time"
                        InputProps={{
                            ...params.InputProps,
                            type: 'search',
                        }}
                        />
                    )}
                  />
                </Col>
              </Row>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Row>
                <Col xs={12} md={6}>
                  <Autocomplete
                    id="vehicle"
                    disableClearable
                    disabled={disabledVehicle}
                    value={booking.vehicle_name}
                    onChange={handleChangeVehicle}
                    options={vehicle.data || []}
                    getOptionLabel={(options) => options.vehicle_name ? options.vehicle_name.toString() : booking.vehicle_name} 
                    isOptionEqualToValue={(option, value) => option.vehicle_name ?? null === booking.vehicle_name}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Vehicle"
                        InputProps={{
                          ...params.InputProps,
                          type: 'search',
                        }}
                      />
                    )}
                  />
                </Col>

                <Col xs={12} md={6}> 
                  {/* <Autocomplete
                    id="status"
                    disableClearable
                    options={optionsStatus.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
                    getOptionLabel={(options) => options.name}
                    isOptionEqualToValue={(option, value) => option.name === value.name}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Status"
                        InputProps={{
                          ...params.InputProps,
                          type: 'search',
                        }}
                      />
                    )}
                  /> */}
                </Col>
              </Row>
            </Form.Group>
            {/* <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Row>
                <Col xs={12} md={6}>
                  <Autocomplete
                    id="service_center"
                    disableClearable
                    options={optionsSC.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
                    getOptionLabel={(options) => options.name}
                    isOptionEqualToValue={(option, value) => option.name === value.name}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Service Center"
                        InputProps={{
                          ...params.InputProps,
                          type: 'search',
                        }}
                      />
                    )}
                  />
                </Col>
                <Col xs={12} md={6}> 
                  <TextField type="text" id="notes" label="Notes.." variant="outlined" fullWidth/>
                </Col>
              </Row>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Row >
                <Col xs={12} md={12}>
                  <Button variant="success"  type="submit">Save Changes</Button>
                </Col>
              </Row>
            </Form.Group> */}
          </Form>
            </Modal.Body>
        </Modal>
    </div>
  )
}
