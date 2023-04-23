import React, { useEffect, useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';
import OTP from './OTP';
import { TextField } from '@mui/material';
import axiosClient from '../../axios-client';
import { useNavigate } from 'react-router-dom';
import { useStateContext } from '../../contexts/ContextProvider';
 

export default function ModalOTP(props) {
    
    const [open, setShow] = useState();
    const handleClose = () => setShow(false);
    const inputPassRef = useRef()
    const inputConfirmPassRef = useRef()
    const navigate = useNavigate()
    const {setUser,setToken} = useStateContext()
 
    
    const [product, setProduct] = useState({
      sku: '',
      name: '',
      description: '',
      price: '',
      popularity: '',
      image: '',
    })
     
    const onSubmit = (ev) => {
      ev.preventDefault()

      const payload = {
        email: props.email,
        password: inputPassRef.current.value,
        password_confirmation: inputConfirmPassRef.current.value
      }
      //console.log(payload)

      axiosClient.post(`/changepwd/${props.id}`, payload)
        .then(({data}) => {
          // navigate('/dashboard')
          setUser(data.user)
          setToken(data.token)
          console.log(data)
        })
        .catch(err => {
          const response = err.response
          if (response && response.status === 422) {
            console.log(response.data.errors)
            // setErrors(response.data.errors)
          }
        })
    }

 

  return (
    <div id="modal">
      {/* <input type="submit" className="btn" value="Login" onClick={handleShow}/> */}
 
      <Modal show={props.show} onHide={props.close} backdrop="static" >
        <Modal.Header closeButton>
          <Modal.Title>New Password</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-main">
            <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Row> 
                <Col xs={12} md={12}>
                  <TextField inputRef={inputPassRef}  type="text"   label="Password" variant="outlined" fullWidth/>
                </Col>
                <Col xs={12} md={12} className="mt-3">
                    <TextField inputRef={inputConfirmPassRef}  type="text"  label="Confirm Password" variant="outlined" fullWidth/>
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
