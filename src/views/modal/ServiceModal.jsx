import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form'
import React, { useEffect, useState } from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { Autocomplete, Card, CardMedia, TextField } from '@mui/material';
import axiosClient from '../../axios-client';
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';

export default function ServicesModal(props) {
  const navigate = useNavigate()
  const [errors, setErrors] = useState(null)
  const id = props.Data?.id ?? null;
  const [serviceLogo, setServiceLogo] = useState([])
  const [service, setService] = useState({
    id: null,
    name: "",
    details: "",
    image_id: "",
    image_url: "",
  })

  useEffect(() => {
    getServiceLogo()
  }, [])

  useEffect(() => {
    if (id) { 
      setService({
        ...service,
        id: props.Data.id,
        name: props.Data.name,
        details: props.Data.details,
        image_id: props.Data.image_id,
        image_url: props.Data.image_url,
      })
    }
  }, [id])
 
  const getServiceLogo = () => {
    axiosClient.get('/serviceslogo')
    .then(({data}) => {
      setServiceLogo(data.data)
    })
  }

  const onSubmit = (ev) => {
      ev.preventDefault()
      const payload = {...service}
      if (id) {
        axiosClient.put(`services/${id}`, payload)
        .then(() => {
          Swal.fire({
                icon: 'success',
                title: 'Success',
                text: "Your data has been successfully saved!",
          }).then(() => {
            navigate('/services' , {state:  'success' })
          })
        })
        .catch(err => {
          const response = err.response
          if (response && response.status === 422) {
            setErrors(response.data.errors)
          }
        }) 
      } else {
        axiosClient.post('/services', payload)
        .then(() => {
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: "Your data has been successfully saved!",
          }).then(() => {
            navigate('/services' , {state:  'success' })
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

  const handleChange = (event, newValue) => {
    setService({
      ...service,
      name: newValue.title,
      details: newValue.description,
      image_id: newValue.id,
    })
  }

  useEffect(() => {
    if (props.show == false) {
      setService({
        ...service,
        id: null,
        name: "",
        details: "",
        image_id: "",
      })
      setErrors(null)
    }
  },[props.show])

  return (
    <div id="servicesModal">
        <Modal show={props.show} onHide={props.close} backdrop="static" size="lg">
            <Modal.Header closeButton>
            <Modal.Title>Create Services</Modal.Title>
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
                    <Col xs={12} md={12}>
                    <Autocomplete
                        freeSolo
                        disableClearable
                        onChange={handleChange}
                        options={serviceLogo}  
                        value={service.name}
                        getOptionLabel={(options) => options.title ? options.title.toString() : service.name}
                        // isOptionEqualToValue={(option, value) => option.title === service.name}
                        renderInput={(params) => (
                            <TextField
                            {...params}
                            label="Name" 
                            InputProps={{
                                ...params.InputProps,
                                type: 'search',
                            }}
                            value={service.name}
                            onChange={(event) =>
                              setService({
                                ...service,
                                name: event.target.value,
                              })}
                            />
                        )}
                        />
                    </Col>
                    <Col xs={12} md={12} className="mt-5">
                        <TextField type="text" value={service.details} id="description" label="Description" variant="outlined" fullWidth/>
                    </Col>
                </Col>

                <Col xs={12} md={6}> 
                    <Card raised >
                        <CardMedia image={service.image_url ? service.image_url : "data:image/png;base64,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"}
                            component="img"
                            height="250"
                            alt={"alt"}
                            title={"titleasdasdsada"}
                            sx={{ padding: "1em 1em 0 1em", objectFit: "contain" }}/>
                    </Card>
            
                </Col>
              </Row>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Row >
                <Col xs={12} md={12}>
                  <Button variant="success"  type="submit">Save Changes</Button>
                </Col>
              </Row>
            </Form.Group>
          </Form>
            </Modal.Body>
        </Modal>
    </div>
  )
}
