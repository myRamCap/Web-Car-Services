import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form'
import React, { useState } from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Customer from '../../data/JSON/dummy/refCustomer.json' 
import { Autocomplete, Box, Card, CardMedia, Input, InputLabel, TextField } from '@mui/material';


export default function VehicleModal(props) {

  const optionsCustomer = Customer.RECORDS.map((option) => {
    const firstLetter = option.name[0].toUpperCase();
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
      ...option,
    };
  })

  const [image, setImage] = useState('')
  const onSubmit = (ev) => {
      alert('randy')
      ev.preventDefault()

      console.log(product)
  }

  const handleChange = (event, newValue) => {
    // console.log(newValue.year)
  //  if (newValue != null) {
       console.log(newValue.year)
       setImage(newValue.image);
    //  }
  }

   

  return (
    <div id="VehicleModal">
        <Modal show={props.show} onHide={props.close} backdrop="static" size="lg">
            <Modal.Header closeButton>
            <Modal.Title>Create Vehicle</Modal.Title>
            </Modal.Header>
            <Modal.Body className="modal-main">
            <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Row>

                <Col xs={12} md={6}>
                <Autocomplete
                      id="customerName"
                      disableClearable
                      options={optionsCustomer.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
                      // onChange={handleChangeProvince}
                      getOptionLabel={(options) => options.name }  
                      isOptionEqualToValue={(option, value) => option.name === value.name}
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
                    <TextField type="text" id="chassis_number" label="Chassis Number" variant="outlined" fullWidth/>
                </Col>

              </Row>
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Row>
                <Col xs={12} md={6}>
                    <TextField type="text" id="make" label="Make" variant="outlined" fullWidth/>
                </Col>
                <Col xs={12} md={6}>
                    <TextField type="text" id="model" label="Model" variant="outlined" fullWidth/>
                </Col>
                </Row>
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Row>
                <Col xs={12} md={6}>
                    <TextField type="text" id="year" label="Year" variant="outlined" fullWidth/>
                </Col>
                <Col xs={12} md={6}>
                    <TextField type="text" id="contact_number" label="Contact Number" variant="outlined" fullWidth/>
                </Col>
                </Row>
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Row>
              <Col xs={12} md={6}>
                    <TextField type="text" id="notes" label="Notes" variant="outlined" fullWidth/>
                </Col>
                <Col xs={12} md={6} className="mt-1">
                    <input accept=".jpg, .jpeg, .png" className="fileUpload" name="arquivo" id="arquivo" type="file" />
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
