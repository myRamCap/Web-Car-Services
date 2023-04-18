import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';
import OTP from './OTP';
 

export default function ModalOTP(props) {
    
     const [open, setShow] = useState();
      const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);
 
    
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

    //   console.log(product)
    }

 

  return (
    <div id="modal">
      {/* <input type="submit" className="btn" value="Login" onClick={handleShow}/> */}
 
      <Modal show={props.show} onHide={props.close} backdrop="static" >
        <Modal.Header closeButton>
          <Modal.Title>Change Password</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-main">
            <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Row>
                <Col xs={12} md={6}>
                    <Col xs={12} md={12}>
                      <TextField type="text" id="password" label="Password" variant="outlined" fullWidth/>
                    </Col>
                    <Col xs={12} md={12} className="mt-5">
                        <TextField type="text" id="confirmpassword" label="Confirm Password" variant="outlined" fullWidth/>
                    </Col>
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
