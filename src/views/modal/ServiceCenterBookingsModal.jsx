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
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2'
import dayjs from 'dayjs';

export default function ServiceCenterBookingsModal(props) {
  const [errors, setErrors] = useState(null)
  const [disabledVehicle, setDisabledVehicle] = useState(true)
  const [disabledTime, setDisabledTime] = useState(true)
  const [services, setServices] = useState([])
  const [timeSlot, setTimeSlot] = useState([])
  const [vehicle, setVehicle] = useState([])
  const [clients, setClients] = useState([])
  const navigate = useNavigate()
  const param = useParams()
  const id = props.Data?.id ?? null
  const [booking, setBooking] = useState({
    id: null,
    client_id: "",
    client_name: "",
    vehicle_id: "",
    vehicle_name: "",
    services_id: "",
    service: "",
    estimated_time: "",
    service_center_id: param.id,
    contact_number: null,
    status: "",
    booking_date: null,
    time: "",
    estimated_time_desc: "",
    notes: "",
  })
 
  const getServices = () => {
    axiosClient.get('/service_center/services')
      .then(({ data }) => {
        setServices(data.data)
      })
  }

  const getClients = () => {
    axiosClient.get('/client')
    .then(({data}) => {
      setClients(data.data)
    })
  }

  useEffect(() => {
    if (id) {
      const [year, month, day] =  props.Data.booking_date.split('-')
      const date = `${year}/${month}/${day}` 
      setBooking({
        ...booking,
        id: props.Data.id,
        client_id: props.Data.client_id,
        client_name: props.Data.client_name,
        vehicle_id: props.Data.vehicle_id,
        vehicle_name: props.Data.vehicle_name,
        services_id: props.Data.services_id,
        service: props.Data.service,
        estimated_time: props.Data.estimated_time,
        contact_number: props.Data.contact_number,
        status: props.Data.status,
        booking_date: date,
        time: props.Data.time,
        estimated_time_desc: props.Data.estimated_time_desc,
        notes: props.Data.notes,
      })
      setDisabledTime(false)
      setDisabledVehicle(false)
    }
  }, [id])

  const handleChangeCustomer = (event, newValue) => {
    setDisabledVehicle(true)
    setBooking({
      ...booking,
      client_id: newValue.id,
      client_name: newValue.fullname,
      vehicle_name: "",
      vehicle_id: "",
    })

    axiosClient.get(`/service_center/vehicle/${newValue.id}`)
      .then(({ data }) => {
        setVehicle(data)
        setDisabledVehicle(false)
      })
  }

  const handleChangeDate = (date) => {
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

    axiosClient.get(`/service_center/timeslot/${param.id}/${convertedDate}`)
    .then(({ data }) => {
      setTimeSlot(data.data)
      setDisabledTime(false)
    })

  }

  const handleChangeService = (event, newValue) => {
    setBooking({
      ...booking,
      services_id: newValue.service_id,
      service: newValue.name,
      estimated_time: newValue.estimated_time,
      estimated_time_desc: newValue.estimated_time_desc,
    })
  }
  
  const handleChangeTime = (event, newValue) => {
    
    setBooking({
      ...booking,
      time: newValue.time,
    })
  }
  const handleChangeVehicle = (event, newValue) => {
    console.log(newValue)
    setBooking({
      ...booking,
      vehicle_id: newValue.id,
      vehicle_name: newValue.vehicle_name,
    })
  }

  const handleChangeStatus = (event, newValue) => {
    setBooking({
      ...booking,
      status: newValue.name,
    })
  }




  const optionsCustomer = clients.map((option) => {
    const firstLetter = option.fullname[0].toUpperCase();
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
      ...option,
    };
  })

  const optionsServices = services.map((option) => {
    const firstLetter = option.name[0].toUpperCase();
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
      ...option,
    };
  })

  const optionsStatus = Status.RECORDS.map((option) => {
    const firstLetter = option.name[0].toUpperCase();
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
      ...option,
    };
  })

  const optionsSC = SC.RECORDS.map((option) => {
    const firstLetter = option.name[0].toUpperCase();
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
      ...option,
    };
  })

  const optionsTime = timeSlot.map((option) => {
    const firstLetter = option.time[0].toUpperCase();
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
      ...option,
    };
  })

  const onSubmit = (ev) => {
    ev.preventDefault()
    const payload = { ...booking }
    if (id) {
      axiosClient.put(`/service_center/booking/${id}`, payload)
      .then(({}) => {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: "Your data has been successfully Updated!",
        }).then(() => {
          navigate(`/servicecenter/details/${param.name}/${param.id}` , {state:  'success' })
        })
      })
      .catch(err => {
        const response = err.response
        if (response && response.status === 422) {
          setErrors(response.data.errors)
        }
      }) 
    } else {
      axiosClient.post('/service_center/booking', payload)
      .then(({}) => {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: "Your data has been successfully saved!",
        }).then(() => {
          navigate(`/servicecenter/details/${param.name}/${param.id}` , {state:  'success' })
        })
      })
      .catch(err => {
        const response = err.response
        if (response && response.status === 422) {
          setErrors(response.data.errors)
        }
      }) 
    }

    
  }
  useEffect(() => {
    getServices()
    getClients()
    if (props.show == false) {
      setBooking({
        ...booking,
        id: null,
        client_id: "",
        client_name: "",
        vehicle_id: "",
        vehicle_name: "",
        services_id: "",
        service: "",
        estimated_time: "",
        service_center_id: param.id,
        contact_number: null,
        status: "",
        booking_date: null,
        time: "",
        estimated_time_desc: "",
        notes: "",
      })
      setErrors(null)
    }
  },[props.show])
  
  return (
    <div id="servicesModal">
      <Modal show={props.show} onHide={props.close} backdrop="static" size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Create Booking</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-main">
        {errors && 
              <div className="sevices_logo_errors">
                {Object.keys(errors).map(key => (
                  <p key={key}>{errors[key][0]}</p>
                ))}
              </div>
            }
          <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Row>
                <Col xs={12} md={6}>
                  <Autocomplete
                    id="customerName"
                    disableClearable
                    options={optionsCustomer.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
                    onChange={handleChangeCustomer}
                    value={booking.client_name}
                    getOptionLabel={(options) => options.fullname ? options.fullname.toString() : booking.client_name}
                    isOptionEqualToValue={(option, value) => option.fullname ?? "" === booking.client_name}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Customer Name"
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
                  <Autocomplete
                    id="service"
                    disableClearable
                    onChange={handleChangeService}
                    value={booking.service}
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
                  />
                </Col>

                <Col xs={12} md={6}>
                  <Autocomplete
                    id="time"
                    disableClearable
                    disabled={disabledTime}
                    onChange={handleChangeTime}
                    value={booking.time}
                    options={optionsTime.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
                    getOptionLabel={(options) => options.time ? options.time.toString() : booking.time}
                    isOptionEqualToValue={(option, value) => option.time ?? "" === booking.time}
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
                  <Autocomplete
                    id="status"
                    disableClearable
                    onChange={handleChangeStatus}
                    options={optionsStatus.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
                    value={booking.status}
                    getOptionLabel={(options) => options.name ? options.name.toString() : booking.status}
                    isOptionEqualToValue={(option, value) => option.name ?? "" === booking.status}
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
                  />
                </Col>
              </Row>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Row>
                <Col xs={12} md={6}>
                  <TextField value={param.name} disabled type="text" id="service_center" label="Service Center" variant="outlined" fullWidth />
                </Col>
                <Col xs={12} md={6}>
                  <TextField type="text" value={booking.notes} onChange={ev => setBooking({...booking, notes: ev.target.value})} id="notes" label="Notes.." variant="outlined" fullWidth />
                </Col>
              </Row>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Row >
                <Col xs={12} md={12}>
                  <Button variant="success" type="submit">Save Changes</Button>
                </Col>
              </Row>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  )
}
