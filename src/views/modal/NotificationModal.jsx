import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form'
import React, { useEffect, useState } from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import SC from '../../data/JSON/dummy/refSC.json'
import CorporateAccount from '../../data/JSON/dummy/refCorporateAccount.json'
import { Autocomplete, Checkbox, FormControlLabel, Card, CardMedia, TextField } from '@mui/material';
import axiosClient from '../../axios-client';

export default function NotificationModal(props) {
  const [selected, setSelected] = useState('');
  const [corporate, setCorporate] = useState([])
  const [image, setImage] = useState('')

  const getCorporate = async () => {
    try {
      const {data} = await axiosClient.get('/corporate_account')
      setCorporate(data)
    } catch (error) {

    }
  }

  const handleCheckboxChange = (event) => {
    setSelected(event.target.value);
  };

  const optionsSC = SC.RECORDS.map((option) => {
    const firstLetter = option.name[0].toUpperCase();
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
      ...option,
    };
  })

  const optionsCorporateAccount = corporate.map((option) => {
    const firstLetter = option.first_name[0].toUpperCase();
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
      ...option,
    };
  })

  const onSubmit = (ev) => {
      ev.preventDefault()
  }

  useEffect(() => {
    getCorporate()
  },[])


  return (
    <div id="NotificationModal">
      <Modal show={props.show} onHide={props.close} backdrop="static" size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Create Notification</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-main">
          <Form onSubmit={onSubmit}>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Row>
                <Col xs={12} md={6}>
                  <FormControlLabel
                    control={ 
                      <Checkbox
                        checked={selected === 'corporate_account'}
                        onChange={handleCheckboxChange}
                        value="corporate_account"
                      />
                    }
                    label="CORPORATE ACCOUNT"
                  />
                </Col>
                <Col xs={12} md={6}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={selected === 'service_center'}
                        onChange={handleCheckboxChange}
                        value="service_center"
                      />
                    }
                    label="SERVICE CENTER"
                  />
                </Col>
                <Col xs={12} md={6}>
                  <Autocomplete
                    id="corporate-account-autocomplete"
                    options={optionsCorporateAccount}
                    disabled={selected === 'service_center'} // disable when Corporate Account is checked
                    getOptionLabel={(options) => options.first_name+' '+options.last_name }
                      isOptionEqualToValue={(option, value) => option.first_name+' '+option.last_name === value.first_name+' '+value.last_name}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Corporate Account"
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
                      id="service-center-autocomplete"
                      options={optionsSC}
                      disabled={selected === 'corporate_account'} // disable when Corporate Account is checked
                      getOptionLabel={(option) => option.name }
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
              </Row>
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Row>
                <Col xs={12} md={12}>
                  <TextField type="text" id="title" label="Title" variant="outlined" fullWidth/> 
                </Col>
              </Row>
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Row>
                <Col xs={12} md={12}>
                  <TextField
                      type= "text"
                      id="content"
                      label="Content"
                      variant="outlined"
                      multiline
                      rows={4}
                      maxRows={10}
                      fullWidth
                  />
                </Col>
              </Row>
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Row>
                <Col xs={12} md={4} className="mt-2">
                  <input accept=".jpg, .jpeg, .png" className="fileUpload" name="arquivo" id="arquivo" type="file" />
                </Col>
                <Col xs={12} md={8}>
                    <Card raised >
                        <CardMedia image={image ? image : "data:image/png;base64,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"}
                            component="img"
                            height="200"
                            alt={"alt"}
                            title={"notification"}
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
