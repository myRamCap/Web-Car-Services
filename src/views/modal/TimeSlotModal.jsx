import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form'
import React, { useEffect, useState } from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { Autocomplete, FormControlLabel, Input, Radio, RadioGroup, TextField } from '@mui/material';
import Timeslot from '../../data/JSON/dummy/refTimeslot.json'
import MaxLimit from '../../data/JSON/dummy/refMaxLimit.json'
import { useNavigate, useParams } from 'react-router-dom';
import axiosClient from '../../axios-client';
import Swal from 'sweetalert2'

export default function TimeSlotModal(props) {
  const navigate = useNavigate()
  const param = useParams()
  const id = props.Data?.id ?? null;
  const [errors, setErrors] = useState(null)
  const [timeSlot, setTimeSlot] = useState({
    id: null,
    service_center_id: param.id,
    time: null,
    max_limit: null
  })

  useEffect(() => {
    if (id) { 
      setTimeSlot({
        ...timeSlot,
        id: props.Data.id,
        service_center_id: props.Data.service_center_id,
        time: props.Data.time,
        max_limit: props.Data.max_limit,
      })
    }
  }, [id])
 
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
    ev.preventDefault()
    const payload = {...timeSlot}
    setErrors(null)
    if (id) {
      axiosClient.put(`/service_center/timeslot/${id}`, payload)
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: "Your data has been successfully updated!",
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
      axiosClient.post('/service_center/timeslot', payload)
      .then(() => {
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

  const handleChangeTime = (event, newValue) => {
    setTimeSlot({
      ...timeSlot,
      time: newValue.time
    })
  }

  const handleChangeMaxLimit = (event, newValue) => {
    setTimeSlot({
      ...timeSlot,
      max_limit: newValue.number
    })
  }

  useEffect(() => {
    if (props.show == false) {
      setTimeSlot({
        ...timeSlot,
        id: null,
        time: null,
        max_limit: null
      })
      setErrors(null)
    }
  },[props.show])

  return (
    <div id="TimeSlotModal">
        <Modal show={props.show} onHide={props.close} backdrop="static" size="lg">
            <Modal.Header closeButton>
            <Modal.Title>Add Time Slot</Modal.Title>
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
                <Col xs={12} md={12}>
                  <Autocomplete
                      disableClearable
                      options={optionsTimeslot.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
                      onChange={handleChangeTime}
                      value={timeSlot.time}
                      getOptionLabel={(options) => options.time ? options.time.toString() : timeSlot.time }  
                      isOptionEqualToValue={(option, value) => option.time ?? "" === timeSlot.time}
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
                    disableClearable
                    onChange={handleChangeMaxLimit}
                    options={optionsMaxLimit.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
                    value={timeSlot.max_limit}
                    getOptionLabel={(options) => options.number ? options.number.toString() : timeSlot.max_limit.toString() }  
                    isOptionEqualToValue={(option, value) => option.number ?? "" === timeSlot.max_limit}
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
