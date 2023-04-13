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
            {/* <OTP /> */}
            form
            input Password
            retype password
        </Modal.Body>
      </Modal>
    </div>
  )
}
