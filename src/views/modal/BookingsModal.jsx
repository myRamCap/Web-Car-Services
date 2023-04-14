import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form'
import React, { useState } from 'react'
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


export default function BookingsModal(props) {

  const optionsCustomer = Customer.RECORDS.map((option) => {
    const firstLetter = option.name[0].toUpperCase();
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
      ...option,
    };
  })

  const optionsServices = Services.RECORDS.map((option) => {
    const firstLetter = option.name[0].toUpperCase();
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
      ...option,
    };
  })

  const optionsVehicles = Vehicles.RECORDS.map((option) => {
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

  const optionsTime = Time.RECORDS.map((option) => {
    const firstLetter = option.time[0].toUpperCase();
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
      ...option,
    };
  })

   

  const onSubmit = (ev) => {
    alert('randy')
    ev.preventDefault()

    // console.log(product)
  }

  return (
    <div id="servicesModal">
        <Modal show={props.show} onHide={props.close} backdrop="static" size="lg">
            <Modal.Header closeButton>
            <Modal.Title>Service Center</Modal.Title>
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
                  <LocalizationProvider dateAdapter={AdapterDayjs} >
                    <DatePicker 
                      disablePast 
                      className='datePicker'
                      label="Date"
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
                    options={optionsServices.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
                    getOptionLabel={(options) => options.name }  
                    isOptionEqualToValue={(option, value) => option.name === value.name}
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
                    options={optionsTime.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
                    getOptionLabel={(options) => options.time }  
                    isOptionEqualToValue={(option, value) => option.time === value.time}
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
                    options={optionsVehicles.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
                    getOptionLabel={(options) => options.name }  
                    isOptionEqualToValue={(option, value) => option.name === value.name}
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
                  />
                </Col>
              </Row>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
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
            </Form.Group>
          </Form>
            </Modal.Body>
        </Modal>
    </div>
  )
}
