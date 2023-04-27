import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form'
import React, { useState } from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { Autocomplete, FormControlLabel, Input, Radio, RadioGroup, TextField } from '@mui/material';
import Timeslot from '../../data/JSON/dummy/refTimeslot.json'
import MaxLimit from '../../data/JSON/dummy/refMaxLimit.json'

export default function TimeSlotModal(props) {

  const optionsTimeslot = Timeslot.RECORDS.map((option) => {
    const firstLetter = option.time[0].toUpperCase();
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
      ...option,
    };
  })

  const optionsMaxLimit = MaxLimit.RECORDS.map((option) => {
    const firstLetter = option.number[0].toUpperCase();
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
    <div id="TimeSlotModal">
        <Modal show={props.show} onHide={props.close} backdrop="static" size="lg">
            <Modal.Header closeButton>
            <Modal.Title>Add Time Slot</Modal.Title>
            </Modal.Header>
            <Modal.Body className="modal-main">
            <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Row>
                <Col xs={12} md={12}>
                  <Autocomplete
                      id="Timeslot"
                      disableClearable
                      options={optionsTimeslot.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
                      // onChange={handleChangeProvince}
                      getOptionLabel={(options) => options.time }  
                      isOptionEqualToValue={(option, value) => option.time === value.time}
                      renderInput={(params) => (
                          <TextField
                          {...params}
                          label="Time Slot"
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
                <Col xs={12} md={12}> 
                  <Autocomplete
                    id="MaxLimit"
                    disableClearable
                    options={optionsMaxLimit.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
                    getOptionLabel={(options) => options.number }  
                    isOptionEqualToValue={(option, value) => option.number === value.number}
                    renderInput={(params) => (
                        <TextField
                        {...params}
                        label="Max Limit"
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
