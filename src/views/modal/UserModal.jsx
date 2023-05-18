import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form'
import React, { useEffect, useState } from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { Autocomplete, TextField } from '@mui/material';
import axiosClient from '../../axios-client';
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';


export default function UserModal(props) {
  const navigate = useNavigate()
  const [roles, setRoles] = useState()
  const [errors, setErrors] = useState(null)
  const id = props.Data?.id ?? null
  const [user, setUser] = useState({
    id: null,
    first_name: "",
    last_name: "",
    email: "",
    contact_number: "",
    role_id: "",
    role_name: ""
  })

  useEffect(() => {
    if (id) {
      setUser({
        ...user,
        id: props.Data.id,
        first_name: props.Data.first_name,
        last_name: props.Data.last_name,
        email: props.Data.email,
        contact_number: props.Data.contact_number,
        role_id: props.Data.role_id,
        role_name: props.Data.role_name,
      })
    }
  }, [id])

  const getRoles = async () => {
    try {
      const response = await axiosClient.get('/roles')
      setRoles(response.data.data)
    } catch (error) {
      // Handle error
    }
  }

  const handleChangeRole = (event, newValue) => {
    setUser({
      ...user,
      role_id: newValue?.id || '',
      role_name: newValue?.name || '',
    })
  }

  const onSubmit = (ev) => {
    ev.preventDefault()
    const payload = {...user}

    const handleSuccess = () => {
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: id ? 'Your data has been successfully updated!' : 'Your data has been successfully saved!',
      }).then(() => {
        navigate('/users', { state: 'success' });
      });
    }

    const handleErrors = (response) => {
      if (response && response.status === 422) {
        console.log(response.data.errors);
        setErrors(response.data.errors);
      }
    }

    const handleRequest = id ? axiosClient.put(`/users/${id}`, payload) : axiosClient.post('/users', payload);

    handleRequest
    .then(() => {
      handleSuccess();
    })
    .catch((err) => {
      const response = err.response;
      handleErrors(response);
    });
  }

  useEffect(() => {
    getRoles()
  }, [])

  useEffect(() => {
    getRoles()
    if (props.show == false) {
      setUser({
        ...user,
        id: null,
        first_name: "",
        last_name: "",
        email: "",
        contact_number: "",
        role_id: "",
        role_name: ""
      })
      setErrors(null)
    }
  },[props.show])

  return (
    <div id="servicesModal">
        <Modal show={props.show} onHide={props.close} backdrop="static" size="lg">
            <Modal.Header closeButton>
              <Modal.Title>{id ? 'Update User' : 'Create User'}</Modal.Title>
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
                  <TextField 
                    type="text"
                    value={user.first_name}
                    onChange={ev => setUser({...user, first_name: ev.target.value})}
                    id="fname"
                    label="First Name"
                    variant="outlined"
                    fullWidth
                  />
                </Col>
                <Col xs={12} md={6}> 
                  <TextField 
                    type="text"
                    value={user.last_name}
                    onChange={ev => setUser({...user, last_name: ev.target.value})}
                    id="lname"
                    label="Last Name"
                    variant="outlined"
                    fullWidth
                  />
                </Col>
              </Row>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Row>
                <Col xs={12} md={6}>
                  <TextField
                    type="email"
                    value={user.email}
                    onChange={ev => setUser({...user, email: ev.target.value})}
                    id="email"
                    label="Email"
                    variant="outlined"
                    fullWidth
                  />
                </Col>
                <Col xs={12} md={6}> 
                <TextField
                  type="text"
                  value={user.contact_number}
                  onChange={ev => setUser({...user, contact_number: ev.target.value})}
                  id="number"
                  label="Contact Number"
                  variant="outlined"
                  fullWidth
                />
                </Col>
              </Row>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Row>
                <Col xs={12} md={6}>
                <Autocomplete
                    disableClearable
                    value={user.role_name}
                    onChange={handleChangeRole}
                    options={roles}
                    
                    getOptionLabel={(options) => options?.name ? options.name.toString() : user.role_name}
                    renderInput={(params) => (
                        <TextField
                        {...params}
                        label="Role"
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
