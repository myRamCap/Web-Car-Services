import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form'
import React, { useEffect, useState } from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Customer from '../../data/JSON/dummy/refCustomer.json' 
import { Autocomplete, Card, CardMedia, TextField } from '@mui/material';
import NoImage from '../../assets/images/No-Image.png';
import { VoiceChatOutlined } from '@mui/icons-material';
import axiosClient from '../../axios-client';
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';


export default function VehicleModal(props) {
  const [image, setImage] = useState('')
  const navigate = useNavigate()
  const [errors, setErrors] = useState(null)
  const id = props.Data?.id ?? null
  const [vehicle, setVehicle] = useState({
    id: null,
    customer_name: "",
    vehicle_name: "",
    chassis_number: "",
    contact_number: "",
    make: "",
    model: "",
    year: "",
    image: "",
    notes: "",
  })

  useEffect(() => {
    if (id) {
      setVehicle({
        ...vehicle,
        id: props.Data.id,
        customer_name: props.Data.customer_name,
        vehicle_name: props.Data.vehicle_name,
        chassis_number: props.Data.chassis_number,
        contact_number: props.Data.contact_number,
        make: props.Data.make,
        model: props.Data.model,
        year: props.Data.year,
        image: props.Data.image,
        notes: props.Data.notes,
      })
    }
  }, [id])

  const optionsCustomer = Customer.RECORDS.map((option) => {
    const firstLetter = option.name[0].toUpperCase();
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
      ...option,
    };
  })

  const onSubmit = (ev) => {
      ev.preventDefault()
      const payload = {...vehicle}
      if (id) {
        axiosClient.put(`/vehicles/${id}`, payload)
        .then(() => {
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: "Your data has been successfully updated!",
          }).then(() => {
            navigate('/vehicles' , {state:  'success' })
          })
        }) 
        .catch(err => {
          const response = err.response
          if (response && response.status === 422) {
            setErrors(response.data.errors)
          }
        }) 
      } else {
        axiosClient.post('/vehicles', payload)
        .then(() => {
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: "Your data has been successfully saved!",
          }).then(() => {
            navigate('/vehicles' , {state:  'success' })
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

  const handleChangeCustomer = (event, newValue) => {
    setVehicle({
      ...vehicle,
      customer_name: newValue.name,
    }) 
  }

  const onImageChoose = (ev) => {
    const file = ev.target.files[0]
    const reader = new FileReader()
    reader.onload = () => {
      setVehicle({
        ...vehicle,
        image: reader.result,
      }) 
    }
    reader.readAsDataURL(file)
  }

  useEffect(() => {
    if (props.show == false) {
      setVehicle({
        ...vehicle,
        id: null,
        customer_name: "",
        vehicle_name: "",
        chassis_number: "",
        contact_number: "",
        make: "",
        model: "",
        year: "",
        image: "",
        notes: "",
      })
      setErrors(null)
    }
  },[props.show])

  return (
    <div id="VehicleModal">
        <Modal show={props.show} onHide={props.close} backdrop="static" size="lg">
            <Modal.Header closeButton>
            <Modal.Title>Create Vehicle</Modal.Title>
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
                    disableClearable
                    value={vehicle.customer_name}
                    options={optionsCustomer.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
                    onChange={handleChangeCustomer}
                    getOptionLabel={(options) => options.name ? options.name.toString() : vehicle.customer_name}
                    isOptionEqualToValue={(option, value) => option.name ?? "" === vehicle.customer_name}
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
                    <TextField type="text" value={vehicle.vehicle_name} onChange={ev => setVehicle({...vehicle, vehicle_name: ev.target.value})} id="vehicle_name" label="Vehicle Name" variant="outlined" fullWidth/>
                </Col>

              </Row>
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Row>
              <Col xs={12} md={6}>
                    <TextField type="text" value={vehicle.chassis_number} onChange={ev => setVehicle({...vehicle, chassis_number: ev.target.value})} id="chassis_number" label="Chassis Number" variant="outlined" fullWidth/>
                </Col>
                <Col xs={12} md={6}>
                    <TextField type="text" value={vehicle.make} onChange={ev => setVehicle({...vehicle, make: ev.target.value})} id="make" label="Make" variant="outlined" fullWidth/>
                </Col>  
              </Row>
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Row>
              <Col xs={12} md={6}>
                    <TextField type="text" value={vehicle.model} onChange={ev => setVehicle({...vehicle, model: ev.target.value})} id="model" label="Model" variant="outlined" fullWidth/>
                </Col>
                <Col xs={12} md={6}>
                    <TextField type="text" value={vehicle.year} onChange={ev => setVehicle({...vehicle, year: ev.target.value})} id="year" label="Year" variant="outlined" fullWidth/>
                </Col>
              </Row>
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Row>
              <Col xs={12} md={6}>
                    <TextField type="text" value={vehicle.contact_number} onChange={ev => setVehicle({...vehicle, contact_number: ev.target.value})} id="contact_number" label="Contact Number" variant="outlined" fullWidth/>
                </Col>
                <Col xs={12} md={6}>
                    <TextField type="text" value={vehicle.notes} onChange={ev => setVehicle({...vehicle, notes: ev.target.value})} id="notes" label="Notes" variant="outlined" fullWidth/>
                </Col>
              </Row>
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Row>
                <Col xs={12} md={6} className="mt-1">
                    <input accept=".jpg, .jpeg, .png" className="fileUpload" name="arquivo" id="arquivo" type="file"  onChange={onImageChoose} />
                </Col>
                <Col xs={12} md={6}> 
                  <Card raised >
                    <CardMedia src={vehicle.image ? vehicle.image : NoImage}
                      component="img"
                      height="250"
                      alt={"not found"} 
                      sx={{ padding: "0 1em 0 1em", objectFit: "contain" }}/>
                  </Card>
                </Col>
              </Row>
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Row >
                <Col xs={12} md={6}>
                  <Button variant="success"  type="submit">Create Vehicle</Button>
                </Col>
              </Row>
            </Form.Group>
          </Form>
            </Modal.Body>
        </Modal>
    </div>
  )
}
